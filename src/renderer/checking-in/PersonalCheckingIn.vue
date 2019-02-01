<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的出勤情况" align="left">
                    <div>

                    </div>
                    <div>
                        <el-table
                                :data="personalCheckingData"
                                border
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                size="mini"
                                style="width: 100%"
                                height="200px"
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
                                    prop="state"
                                    align="center"
                                    label="状态"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    prop="description"
                                    align="center"
                                    label="描述"
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="question(scope.row)">销假提交</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <el-pagination
                                    style="display: flex;justify-content: center"
                                    background
                                    @size-change="personalPageSize"
                                    @current-change="personalPageCurrent"
                                    layout="prev, pager, next,total"
                                    :current-page="personalPage.currentPage"
                                    :page-size="personalPage.size"
                                    :total="personalPage.total"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="专业出勤情况" align="left">
                    <div>
                        <el-input style="width: 90%" size="small" v-model="findWord"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton style="float: right" @click="searchMajorCheckingData">搜索</VButton>
                    </div>
                    <el-table
                            :data="majorCheckingData"
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
                                prop="state"
                                align="center"
                                label="状态"
                                width="80px"
                        ></el-table-column>
                        <el-table-column
                                prop="description"
                                align="center"
                                label="描述"
                        ></el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="majorPageSize"
                                @current-change="majorPageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="majorPage.currentPage"
                                :page-size="majorPage.size"
                                :total="majorPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="20%">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
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
        name: "PersonalCheckingIn",
        data() {
            return {
                dialogVisible: false,
                findWord: '',
                personalCheckingData: [],
                majorCheckingData: [],
                majorPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                personalPage: {
                    size: 5,
                    total: 1,
                    currentPage: 1
                },
            }
        },

        mounted() {
            this.getPersonalCheckingData();
            this.getMajorCheckingData();
        },
        methods: {

            /**
             * @description专业考勤情况size事件
             * **/
            majorPageSize: function (value) {
                this.majorPage.size = value;
                this.majorPage.currentPage = 1;
                this.getMajorCheckingData();
            },

            /**
             * @description专业考勤情况page事件
             * **/
            majorPageCurrent: function (value) {
                this.majorPage.currentPage = value;
                this.getMajorCheckingData();
            },

            /**
             * @description个人考勤情况size事件
             * **/
            personalPageSize: function (value) {
                this.personalPage.size = value;
                this.personalPage.currentPage = 1;
            },

            /**
             * @description个人考勤情况current事件
             * **/
            personalPageCurrent: function (value) {
                this.personalPage.currentPage = value;
                this.getMajorCheckingData();
            },

            /**
             * @description提交考勤质疑
             * **/
            question: function (value) {
                console.log(value)
                this.dialogVisible = true;
            },


            /**
             * @description获取个人考勤情况
             * **/
            getPersonalCheckingData: function () {
                let personalData = JSON.parse(sessionStorage.getItem("user"));
                let params = {
                    sort: 'id,desc',
                    studentNumber: personalData.studentNumber,
                    size: this.personalPage.size,
                    page: this.personalPage.currentPage - 1,
                }
                this.$http.get(Config.checkingIn + '/getPersonalData', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.personalCheckingData = response.data.data.content;
                        this.personalPage.total = response.data.data.totalElements;
                    }
                })
            },


            /**
             * @description获取专业考勤情况
             * **/
            getMajorCheckingData: function () {
                let personalDta = JSON.parse(sessionStorage.getItem("user"));
                let params = {
                    keyWord:this.findWord,
                    sort: 'id,desc',
                    major: personalDta.major,
                    grade: personalDta.grade,
                    size: this.majorPage.size,
                    page: this.majorPage.currentPage - 1,
                }
                this.$http.get(Config.checkingIn + '/findFuzzyByMajor', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.majorCheckingData = response.data.data.content;
                        this.majorPage.total = response.data.data.totalElements;
                    } else {
                        console.log("错误");
                    }
                })
            },

            /**
             * @description搜索专业考勤情况
             * **/
            searchMajorCheckingData: function () {
                this.getMajorCheckingData();
            },
        }
    }
</script>

<style scoped>

</style>