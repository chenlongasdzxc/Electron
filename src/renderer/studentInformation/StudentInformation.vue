<template>
    <div>
        <el-card>
            <FormPanel name="学生基本信息" align="left">
                <!--<div slot="header" style="margin-right: 0">
                    <el-button @click="exportExcel" style="float: right;margin: 5px" size="small" type="info">导出Excel</el-button>
                </div>-->
                <div>
                    <el-input
                            style="width: 90%" size="small" v-model="findWord"
                            class="value-search-box"
                            placeholder="请输入学号或姓名或班级">
                    </el-input>
                    <VButton @click="searchStudentInformation" style="float: right">搜索</VButton>
                </div>
                <div>
                    <el-table
                            :data="studentInformationData"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                type="index"
                                label="序号"
                                width="50"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                label="姓名"
                                width="60"
                        ></el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别"
                                width="50"
                        ></el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                label="学号"
                                min-width="86"
                        ></el-table-column>
                        <el-table-column
                                prop="studentClass"
                                label="班级"
                                min-width="86"
                        ></el-table-column>
                        <el-table-column
                                prop="roomNumber"
                                label="寝室号"
                                width="60"
                        ></el-table-column>
                        <el-table-column
                                prop="phoneNumber"
                                label="联系电话"
                                width="90"
                        ></el-table-column>
                        <el-table-column
                                prop="politicesStatus"
                                label="政治面貌"
                                width="70"
                        ></el-table-column>
                        <el-table-column
                                prop="idCard"
                                label="身份证号"
                                min-width="126"
                        ></el-table-column>
                        <el-table-column
                                prop="email"
                                label="邮箱"
                        ></el-table-column>
                        <el-table-column
                                prop="bankNumber"
                                label="银行号码"
                        ></el-table-column>
                        <el-table-column
                                prop="bankName"
                                label="开户银行"
                        ></el-table-column>
                        <el-table-column
                                prop="adress"
                                label="家庭住址"
                        ></el-table-column>
                        <el-table-column
                                prop="fileCard"
                                label="建档立卡"
                        ></el-table-column>
                    </el-table>
                </div>
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="page_handlePageSizeChange"
                            @current-change="page_handlePageCurrentChange"
                            layout="prev, pager, next,total"
                            :current-page="page.currentPage"
                            :page-size="page.size"
                            :total="page.total"
                    >
                    </el-pagination>
                </div>
            </FormPanel>
            <FormPanel name="导出Excel" align="left"></FormPanel>
            <VButton @click="exportExcel">导出</VButton>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel, DataTable},
        data() {
            return {
                findWord: '',
                studentInformationData: [],
                page: {
                    total: 1,
                    size: 10,
                    currentPage: 1,
                }
            }
        },
        mounted() {
            this.getStudentInformationData();
        },
        methods: {

            /**
             * @description获取学生基本信息
             * **/
            getStudentInformationData: function () {
                const that = this;
                let params = {
                    size: that.page.size,
                    page: that.page.currentPage - 1,
                }
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.studentInformationData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        this.studentInformationData = response.data.data;
                    }
                })
            },

            /**
             * @description搜索学生信息
             * **/
            searchStudentInformation: function () {
                const that = this;
                const parms = {
                    findWord: this.findWord,
                };
                const p = JSON.parse(JSON.stringify(parms));
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        that.studentInformationData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        that.studentInformationData = response.data.data;
                    }
                })
            },

            /**
             * @description导出学生信息Excel
             * **/
            exportExcel: function () {

            },

            /**
             * @description学生信息分页size事件
             * **/
            page_handlePageSizeChange(value) {
                this.page.size = value;
                this.page.currentPage = 1;
                this.getStudentInformationData();
            },


            /**
             * @description学生信息分页page事件
             * **/
            page_handlePageCurrentChange(value) {
                this.page.currentPage = value;
                this.getStudentInformationData();
            },

        },
    }
</script>

<style scoped>

</style>