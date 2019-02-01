<template>
    <div>
        <FormPanel name="删除考勤" align="left">
            <div>
                <el-input style="width: 90%" size="small" v-model="keyword"
                          class="value-search-box"
                          placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <VButton style="float: right">搜索</VButton>
            </div>

            <div>
                <el-table
                        :data="checkingManageData"
                        border
                        :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                        size="mini"
                        style="width: 100%"
                >
                    <el-table-column
                            fixed
                            align="center"
                            type="index"
                            label="序号"
                            width="60px"
                    ></el-table-column>
                    <el-table-column
                            fixed
                            prop="studentName"
                            align="center"
                            label="姓名"
                            width="60px"
                    ></el-table-column>
                    <el-table-column
                            prop="studentNumber"
                            align="center"
                            label="学号"
                            width="100px"
                    ></el-table-column>
                    <el-table-column
                            prop="studentClass"
                            align="center"
                            label="班级"
                            width="100px"
                    ></el-table-column>
                    <el-table-column
                            prop="checkingName"
                            align="center"
                            label="缺勤名称"
                    ></el-table-column>
                    <el-table-column
                            prop="checkingDate"
                            align="center"
                            label="缺勤日期"
                    ></el-table-column>
                    <el-table-column
                            prop="updateStudentName"
                            align="center"
                            label="考勤人"
                            width="60px"
                    ></el-table-column>
                    <el-table-column
                            prop="deletedApplyValue"
                            label="删除理由"
                            align="center"
                    ></el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="deleteChecking(scope.row)">删除</el-button>
                            <el-button size="mini" type="warning" @click="rejectApply(scope.row)">驳回</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div>

            </div>

            <div>
                <el-pagination
                        style="display: flex;justify-content: center"
                        background
                        @size-change="deleteApplyPageSize"
                        @current-change="deleteApplyPageCurrentPage"
                        layout="prev, pager, next,total"
                        :current-page="deleteApplyPage.currentPage"
                        :page-size="deleteApplyPage.size"
                        :total="deleteApplyPage.total"
                >
                </el-pagination>
            </div>
        </FormPanel>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "CheckingManage",
        data() {
            return {
                checkingManageData: [],
                keyword: '',
                deleteApplyPage: {
                    size: 20,
                    total: 1,
                    currentPage: 1,
                },
            }
        },

        mounted() {
            this.getDeleteApplyData();
        },

        methods: {

            /**
             * @description获取申请删除考勤数据
             * **/
            getDeleteApplyData: function () {
                let personalData = JSON.parse(sessionStorage.getItem("user"));
                let params = {
                    grade: personalData.grade,
                    page: this.deleteApplyPage.currentPage - 1,
                    size: this.deleteApplyPage.size,
                    keyWord: this.keyword,
                };
                this.$http.get(Config.checkingIn + '/findDeleteApplyData', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.checkingManageData = response.data.data.content;
                        this.deleteApplyPage.total = response.data.data.totalElements;
                    } else {
                        this.checkingManageData = response.data.data.content;
                    }
                })
            },

            /**
             * @description申请删除考勤数据分页size事件
             * **/
            deleteApplyPageSize: function (value) {
                this.deleteApplyPage.size = value;
                this.deleteApplyPage.currentPage = 1;
                this.getDeleteApplyData();
            },

            /**
             * @description申请删除考勤数据分页page事件
             * **/
            deleteApplyPageCurrentPage: function (value) {
                this.deleteApplyPage.currentPage = value;
                this.getDeleteApplyData();
            },


            /**
             * @description删除考勤
             * **/
            deleteChecking:function (value) {
                console.log(value);
                let params = {
                    id: value.id,
                }
                this.$http.get(Config.checkingIn + '/delete',{params:params}).then(response=>{
                    if (response.data.code == '200'){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getDeleteApplyData();
                    }else {
                        this.$message({
                            message:'删除失败',
                            type:'warning'
                        })
                    }
                })
            },

            /**
             * @description驳回删除考勤申请
             * **/
            rejectApply:function (value) {
                console.log(value);
                let params = {
                    id: value.id,
                };
                this.$http.get(Config.checkingIn + '/rejectApply',{params:params}).then(response=>{
                    if (response.data.code == '200'){
                        this.$message({
                            message: '驳回成功',
                            type: 'success'
                        });
                        this.getDeleteApplyData();
                    }else {
                        this.$message({
                            message: '驳回失败',
                            type: 'warning'
                        });
                        this.getDeleteApplyData();
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>