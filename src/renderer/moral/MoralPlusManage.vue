<template>
    <div>
        <el-card>
        <div>
            <FormPanel name="德育加分审核" align="left">
                <!--搜索-->
                <div>
                    <el-input style="width: 90%" size="small" v-model="moralPlusKeyWord"
                              class="value-search-box"
                              placeholder="请输入姓名或年度"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                </div>

                <!--数据表-->
                <div>
                    <el-table :data="moralPlus"
                              :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                              style="font-size: 12px"
                              border
                              size="mini">
                        <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="姓名"
                                prop="studentName"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="学号"
                                prop="studentNumber"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="班级"
                                prop="studentClass"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusName"
                                label="项目名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="项目分数"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="year"
                                label="申报学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" @click="moralPlusManageButton(scope.row)" type="primary">审核
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <!--分页-->
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="PageSize"
                            @current-change="PageCurrent"
                            layout="prev, pager, next,total"
                            :current-page="MoralPlusPage.currentPage"
                            :page-size="MoralPlusPage.size"
                            :total="MoralPlusPage.total"
                    ></el-pagination>
                </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel name="已审核数据" align="left">
                <div>
                    <el-table :data="moralPlusApply"
                              :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                              style="font-size: 12px"
                              border
                              size="mini">
                        <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="姓名"
                                prop="studentName"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="学号"
                                prop="studentNumber"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="班级"
                                prop="studentClass"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusName"
                                label="项目名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="项目分数"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="year"
                                label="申报学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="value"
                                label="审核理由"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="applyPersonName"
                                label="审核人"
                                align="center"
                        ></el-table-column>
                        <!--<el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" @click="moralPlusManageButton(scope.row)" type="primary">审核
                                </el-button>
                            </template>
                        </el-table-column>-->
                    </el-table>
                </div>

                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="PageSizeApply"
                            @current-change="PageCurrentApply"
                            layout="prev, pager, next,total"
                            :current-page="moralPlusApplyPage.currentPage"
                            :page-size="moralPlusApplyPage.size"
                            :total="moralPlusApplyPage.total"
                    ></el-pagination>
                </div>
            </FormPanel>
        </div>

        </el-card>
        <div>
            <el-dialog
                    title="审核"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-form :model="applyFormData" style="font-size: 12px;text-align: left" size="small">
                        <el-form-item label="理由:" :label-width="formLabelWidth">
                            <el-input v-model="applyFormData.value" style="width: 400px" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer">
                    <el-button size="small" type="success" @click="passApply">通过</el-button>
                    <el-button size="small" type="danger" @click="rejectApply">驳回</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    export default {
        components: {VButton, FormPanel},
        name: "MoralManage",
        data() {
            return {
                dialogVisible: false,
                formLabelWidth: '120px',
                moralPlusKeyWord: '',
                moralPlus: [],
                moralPlusApply: [],
                studentData: [],
                applyFormData: {
                    id: '',
                    value: '',
                },
                MoralPlusPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                moralPlusApplyPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                }
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralPlus();
            this.getMoralPlusApplyData();
        },

        methods: {

            /**
             * @description获取德育加分未审核数据
             * **/
            getMoralPlus: function () {
                const params = {
                    grade: this.studentData.grade,
                    states: 'MP001',
                    studentClass: this.studentData.studentClass,
                    size: this.MoralPlusPage.size,
                    page: this.MoralPlusPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.StudentMoral + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralPlus = response.data.data.content;
                            this.MoralPlusPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true
                            })
                        }
                    })
            },


            /**
             * @description获取已审核数据
             * **/
            getMoralPlusApplyData: function () {
                const params = {
                    grade: this.studentData.grade,
                    states: 'MP002',
                    studentClass: this.studentData.studentClass,
                    size: this.MoralPlusPage.size,
                    page: this.MoralPlusPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.StudentMoral + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralPlusApply = response.data.data.content;
                            this.moralPlusApplyPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true
                            })
                        }
                    })
            },


            /**
             * @description审核按钮事件
             * **/
            moralPlusManageButton: function (value) {
                this.applyFormData.id = value.id;
                this.dialogVisible = true;
            },

            /**
             * @description未审核数据size事件
             * **/
            PageSize: function (value) {
                this.MoralPlusPage.size = value;
                this.MoralPlusPage.currentPage = 1;
                this.getMoralPlus();
            },

            /**
             * @description未审核数据current事件
             * **/
            PageCurrent: function (value) {
                this.MoralPlusPage.currentPage = value;
                this.getMoralPlus();
            },

            /**
             * @description已审核数据分页size事件
             * **/
            PageSizeApply: function (value) {
                this.moralPlusApplyPage.size = value;
                this.moralPlusApplyPage.currentPage = 1;
                this.getMoralPlusApplyData();
            },

            /**
             * @description已审核数据current事件
             * **/
            PageCurrentApply: function () {
                this.moralPlusApplyPage.currentPage = value;
                this.getMoralPlusApplyData();
            },

            /**
             * @description同意申请
             * **/
            passApply: function () {
                const params = {
                    id: this.applyFormData.id,
                    value: this.applyFormData.value,
                    states: 'MP002',
                    applyPersonName: this.studentData.studentName,
                    applyPersonNumber: this.studentData.studentNumber,
                }
                this.$http.post(Config.StudentMoral + '/setStates', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                            })
                            this.getMoralPlus();
                            this.getMoralPlusApplyData();
                            this.dialogVisible = false;
                        } else {
                            this.$message({
                                message: '上传失败',
                                type: 'danger',
                            })
                            this.getMoralPlus();
                            this.getMoralPlusApplyData();
                            this.dialogVisible = false;
                        }
                    })
            },

            /**
             * @description驳回申请
             * **/
            rejectApply: function () {
                const params = {
                    id: this.applyFormData.id,
                    value: this.applyFormData.value,
                    states: 'MP003',
                    applyPersonName: this.studentData.studentName,
                    applyPersonNumber: this.studentData.studentNumber,
                }
                this.$http.post(Config.StudentMoral + '/setStates', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                            })
                            this.applyFormData.value = '';
                            this.dialogVisible = false;
                            this.getMoralPlus();
                            this.getMoralPlusApplyData();
                        } else {
                            this.$message({
                                message: '上传失败',
                                type: 'danger',
                            })
                            this.dialogVisible = false;
                            this.getMoralPlus();
                            this.getMoralPlusApplyData();
                        }
                    })
            },


            /**
             * @description搜索未审核数据
             * **/
            searchMoralPlus: function () {
                const params = {
                    grade: this.studentData.grade,
                    states: 'MP001',
                    studentClass: this.studentData.studentClass,
                    size: this.MoralPlusPage.size,
                    page: this.MoralPlusPage.currentPage - 1,
                    sort: 'id,desc',
                    keyWord: this.moralPlusKeyWord,
                }
                console.log(params)
                this.$http.get(Config.StudentMoral + '/search', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            console.log(response.data.data)
                            this.moralPlus = response.data.data.content;
                            this.MoralPlusPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true
                            })
                        }
                    })
            },

        },
    }
</script>

<style scoped>

</style>