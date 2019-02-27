<template>
    <div>
        <div>
            <FormPanel name="未审核素拓分数据" align="left">
                <!--未审核表格-->
                <el-table
                        :data="sketchData"
                        border
                        :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                        size="mini"
                        style="width: 100%"
                >
                    <el-table-column
                            align="center"
                            type="index"
                            label="序号"
                            width="60px"
                    ></el-table-column>
                    <el-table-column
                            prop="studentName"
                            align="center"
                            label="学生姓名"
                            width="80px"
                    ></el-table-column>
                    <el-table-column
                            prop="studentNumber"
                            align="center"
                            label="学号"
                            width="100px"
                    ></el-table-column>
                    <el-table-column
                            prop="sketchName"
                            align="center"
                            label="素拓分名称"
                            width="180px"
                    ></el-table-column>
                    <el-table-column
                            prop="type"
                            align="center"
                            label="素拓分类型"
                    ></el-table-column>
                    <el-table-column
                            prop="sketchScore"
                            align="center"
                            label="素拓分分数"
                            width="100px"
                    ></el-table-column>
                    <el-table-column
                            prop="sketchPart"
                            align="center"
                            label="参与角色"
                            width="80px"
                    ></el-table-column>
                    <el-table-column
                            prop="createDate"
                            align="center"
                            label="上传日期"
                            width="120px"
                    ></el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="applySketch(scope.row)">审核通过
                            </el-button>
                            <el-button size="mini" type="danger" @click="rejectSketch(scope.row)">审核不通过
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--未审核分页-->
                 <div>
                     <el-pagination
                             style="display: flex;justify-content: center"
                             background
                             @size-change="sketchCheckPageSize"
                             @current-change="sketchCheckCurrentPage"
                             layout="prev, pager, next,total"
                             :current-page="sketchCheckPage.currentPage"
                             :page-size="sketchCheckPage.size"
                             :total="sketchCheckPage.total"
                     >
                     </el-pagination>
                 </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel name="已审核素拓分数据" align="left">
                <!--搜索-->
                <div>

                </div>
                <div>
                    <!--表格-->
                    <el-table
                            :data="checkedSketchData"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                align="center"
                                type="index"
                                label="序号"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                prop="studentName"
                                align="center"
                                label="学生姓名"
                                width="80px"
                        ></el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                align="center"
                                label="学号"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchName"
                                align="center"
                                label="素拓分名称"
                                width="180px"
                        ></el-table-column>
                        <el-table-column
                                prop="type"
                                align="center"
                                label="素拓分类型"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchScore"
                                align="center"
                                label="素拓分分数"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchPart"
                                align="center"
                                label="参与角色"
                                width="80px"
                        ></el-table-column>
                        <el-table-column
                                prop="createDate"
                                align="center"
                                label="上传日期"
                        ></el-table-column>
                        <el-table-column
                                label="审核人"
                                align="center"
                                prop="applyStudentName"
                        ></el-table-column>
                    </el-table>
                </div>
                <div>
                    <!--分页-->
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="sketchCheckedPageSize"
                            @current-change="sketchCheckedCurrentPage"
                            layout="prev, pager, next,total"
                            :current-page="sketchCheckedPage.currentPage"
                            :page-size="sketchCheckedPage.size"
                            :total="sketchCheckedPage.total"
                    >
                    </el-pagination>
                </div>
            </FormPanel>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "SketchAudit",
        data() {
            return {
                sketchData: [],
                checkedSketchData: [],
                personalData: [],
                sketchCheckPage: {
                    size: 10,
                    currentPage: 1,
                    total:1,
                },
                sketchCheckedPage:{
                    size: 10,
                    currentPage: 1,
                    total:1,
                },
            }
        },

        mounted() {
            this.personalData = JSON.parse(sessionStorage.getItem("user"));
            this.getSketchData();
            this.getCheckedSketchData();
        },

        methods: {

            /**
             * @description获取未审核数据
             * **/
            getSketchData: function () {
                const params = {
                    sketchStates: 'SK001',
                    studentClass: this.personalData.studentClass,
                    size: this.sketchCheckPage.size,
                    page: this.sketchCheckPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.sketch + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.sketchData = response.data.data.content;
                            this.sketchCheckPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },


            /**
             * @description获取已审核数据
             * **/
            getCheckedSketchData: function () {
                const params = {
                    sketchStates: 'SK002',
                    studentClass: this.personalData.studentClass,
                    size: this.sketchCheckedPage.size,
                    page: this.sketchCheckedPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.sketch + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.checkedSketchData = response.data.data.content;
                        } else {

                        }
                    })
            },

            /**
             * @description申请通过
             * **/
            applySketch: function (value) {
                const that = this;
                const params = {
                    id: value.id,
                    sketchStates: 'SK002',
                    applyStudentName: that.personalData.studentName,
                    applyStudentNumber: that.personalData.studentNumber,
                }
                this.$http.get(Config.sketch + '/set', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '提交成功',
                                type: 'success',
                            });
                            this.getSketchData();
                            this.getCheckedSketchData();
                        } else {
                            this.$message({
                                message: '提交失败',
                                type: 'warning',
                            });
                            this.getSketchData();
                            this.getCheckedSketchData();
                        }
                    })
            },
            /**
             * @description驳回申请
             * **/
            rejectSketch: function (value) {
                const params = {
                    id: value.id,
                    sketchStates: 'SK003',
                    applyStudentName: this.personalData.studentName,
                    applyStudentNumber: this.personalData.studentNumber,
                }
                this.$http.get(Config.sketch + '/set', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '提交成功',
                                type: 'success',
                            });
                            this.getSketchData();
                            this.getCheckedSketchData();
                        } else {
                            this.$message({
                                message: '提交失败',
                                type: 'warning',
                            });
                            this.getSketchData();
                            this.getCheckedSketchData();
                        }
                    })
            },

            /**
             * @description未审核数据分页size事件
             * **/
            sketchCheckPageSize:function (value) {
                this.sketchCheckPage.size = value;
                this.sketchCheckPage.currentPage = 1;
                this.getSketchData();
            },

            /**
             * @description未审核数据分页current事件
             * **/
            sketchCheckCurrentPage:function (value) {
                this.sketchCheckPage.currentPage = value;
                this.getSketchData();
            },


            sketchCheckedPageSize:function (value) {
                this.sketchCheckedPage.size = value;
                this.sketchCheckedPage.currentPage = 1;
                this.getCheckedSketchData();
            },

            sketchCheckedCurrentPage:function (value) {
                this.sketchCheckedPage.currentPage = value;
                this.getCheckedSketchData();
            },

        }
    }
</script>

<style scoped>

</style>