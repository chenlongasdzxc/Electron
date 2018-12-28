<template>
    <div>
        <el-table
                ref="table"
                style="width: 100%;"
                :height="height - 32" :data="table.data"
                stripe border @sort-change="table_sort"
                @select="table_handleSelectionChange"
                @select-all="table_handleSelectionChange"
                :row-class-name="tableRowClassName"
        >
            <el-table-column v-if="selection" type="selection" width="20">
            </el-table-column>
            <el-table-column v-if="sequence" label="序号">
                <template slot-scope="scope">{{ (pagination.page - 1) * pagination.size + scope.$index + 1 }}</template>
            </el-table-column>
            <slot></slot>
            <el-table-column v-if="operational" label="操作" :width="operational_width" fixed="right">
                <template slot-scope="scope">
                    <DataTableButton @click="table_view(scope.$index, scope.row)" icon="el-icon-view"
                                                 v-if="defaultButton"/>
                    <DataTableButton @click="table_edit(scope.$index, scope.row)" icon="el-icon-edit"
                                                 v-if="defaultButton"/>
                    <DataTableButton @click="table_remove(scope.$index, scope.row)" icon="el-icon-delete"
                                                 v-if="defaultButton"/>
                    <slot name="ni-btn"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt20">
            <page
                    :currentPage="pagination.page"
                    :total="pagination.total"
                    @currentChange="pagination_pageChange"
                    @sizeChange="pagination_sizeChange">
            </page>
        </div>

    </div>
</template>
<script>
    import DataTableButton from "./DataTableButton";
    import Page from './Page'

    export default {
        components: {DataTableButton,Page},
        props: {
            selection: {
                type: Boolean,
                default: false
            },
            defaultButton: {
                type: Boolean,
                default: false
            },
            sequence: {
                type: Boolean,
                default: false
            },
            url: {
                type: String,
                required: true
            },
            operational_width: {
                type: String,
                default: '90px'
            },
            operational: {
                type: Boolean,
                default: false
            },
            data: Array,
            autoHeight: Boolean,
            height: Number,
            params: Object
        },
        watch: {
            url(val) {
                this.table_init();
                this.initPage();
            },
            params() {
                this.table_init();
                this.initPage();
            }
        },
        data() {
            return {
                pagination: {
                    pageSizes: [1, 2, 5, 10, 20, 50],
                    total: 1,
                    page: 1,
                    size: 10,
                },
                table: {
                    selection: [],
                    style: {
                        height: '',
                    },
                    sort: '',
                    data: [],
                    page: {
                        size: 10,
                        page: 0,
                        sort: null
                    },
                }
            }
        },
        mounted() {
            this.table_init();
            this.initPage();
        },
        methods: {
            /**
             * 用于多选表格，切换某一行的选中状态
             * 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
             */
            table_toggleRowSelection(row, selected) {
                if (selected === true) {
                    this.table.selection.push(row);
                }
                this.$refs.table.toggleRowSelection(row, selected);
            },
            tableRowClassName({row, rowIndex}) {
                for (let i = 0; i < this.table.selection.length; i++) {
                    const select = this.table.selection[i];
                    if (select.id == row.id) {
                        return "warning-row"
                    }
                }
                return "";
            },
            /**
             * 初始化页面
             */
            initPage() {
                if (this.data) {
                    this.table.data = this.data;
                } else {
                    this.table_getData();
                }
            },
            table_handleSelectionChange(row, index) {
                this.table.selection = JSON.parse(JSON.stringify(row));
                this.$emit('select-change', row, index);
            },
            table_init() {
                if (this.autoHeight) {
                    document.getElementsByTagName('header')[0].style.height;
                    "60px";
                } else {
                    this.table.style.height = this.height - 32;
                }
            },
            table_view(index, data) {
                this.$emit('view-click', data);
            },
            table_edit(index, data) {
                this.$emit('edit-click', data);
            },
            /**
             * 删除数据
             */
            table_remove(index, data) {
                const that = this;
                this.$confirm("此操作将删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    that.$http.delete(`${that.url}/${data.id}`)
                        .then(response => {
                            if (response.data.code === "200") {
                                that.$message({message: "删除成功！", type: "success"});
                                that.table_getData();
                            }
                        })
                        .catch(data => console.log(data));
                });
                console.log(index, data);

            },
            /**
             * 获取表格数据
             */
            table_getData() {
                const that = this;
                const params = {
                    ...this.params,
                    page: that.pagination.page - 1,
                    size: that.pagination.size,
                };
                if (that.table.sort) {
                    params.sort = that.table.sort;
                }
                this.$http.get(this.url, {params})
                    .then(response => {
                        const comRes = response.data;
                        const data = comRes.data;
                        that.table.data = data.content;
                        that.pagination.size = data.size;
                        that.pagination.page = data.number + 1;
                        that.pagination.total = data.totalElements ? data.totalElements : 1;
                    })
                    .catch(response => {
                        console.log(response);
                    });
            },
            /**
             * 分页大小事件处理
             * @param val
             */
            pagination_sizeChange(val) {
                this.pagination.size = val;
                this.pagination.page = 1;
                this.table_getData();
            },
            /**
             * 切换页码事件处理
             * @param val
             */
            pagination_pageChange(val) {
                this.pagination.page = val;
                this.table_getData();
            },
            /**
             * 变更排序
             */
            table_sort({column, order, prop}) {
                if (prop === null) {
                    this.table.sort = '';
                } else {
                    let s;
                    if (order === 'ascending') {
                        s = `${prop},asc`;
                    } else {
                        s = `${prop},desc`;
                    }
                    console.log(s);
                    this.table.sort = s;
                }
                this.pagination.page = 1;
                this.table_getData();
            },
        }
    }
</script>
<style scoped>
    .el-table .warning-row {
        background: red;
    }

    .el-table .success-row {
        background: red;
    }
</style>
