<template>
    <div>
        <el-card>
            <FormPanel name="考勤信息" align="left">
                <el-table
                        :data="checkingInData"
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
                    ></el-table-column>
                    <el-table-column
                            prop="studentNumber"
                            align="center"
                            label="学号"
                    ></el-table-column>
                    <el-table-column
                            prop="studentClass"
                            align="center"
                            label="班级"
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
                    ></el-table-column>
                    <el-table-column
                            prop="updateDate"
                            align="center"
                            label="上传时间"
                    ></el-table-column>
                </el-table>
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="checkPageSize"
                            @current-change="checkPageCurrent"
                            layout="prev, pager, next,total"
                            :current-page="checkPage.currentPage"
                            :page-size="checkPage.size"
                            :total="checkPage.total"
                    >
                    </el-pagination>
                </div>
            </FormPanel>
            <FormPanel name="上传考勤" align="left">
                <div style="width: 80%;margin-left: 10%">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <div class="form-title">
                                <span>人员信息</span>
                            </div>
                            <div>
                                <el-form ref="form" :model="studentCheckingInInfo" label-width="80px">
                                    <el-form-item label="学生姓名">
                                        <el-input v-model="studentCheckingInInfo.studentName" size="small" style="width: 80%" readonly>
                                            <el-button slot="append" icon="el-icon-search" style="width: 30px"
                                                       @click="getStudentInfo"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="学生学号">
                                        <el-input v-model="studentCheckingInInfo.studentNumber"
                                                  size="small"
                                                  style="width: 80%"
                                                  readonly></el-input>
                                    </el-form-item>
                                    <el-form-item label="学生班级">
                                        <el-input v-model="studentCheckingInInfo.studentClass"
                                                  size="small"
                                                  style="width: 80%"
                                                  readonly></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="form-title">
                                <span>缺勤信息</span>
                            </div>
                            <div>
                                <el-form ref="form" :model="checkingInForm" label-width="80px">
                                    <el-form-item label="缺勤名称">
                                        <el-input v-model="checkingInForm.checkingName" size="small"
                                                  style="width: 80%"></el-input>
                                    </el-form-item>
                                    <el-form-item label="缺勤时间">
                                        <el-date-picker
                                                v-model="checkingInForm.checkingDate"
                                                type="datetime"
                                                style="width: 80%"
                                                placeholder="选择日期时间"
                                                size="small"
                                                default-time="08:00:00"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                    <div style="float: right">
                                        <el-button size="small" type="danger">取消</el-button>
                                        <el-button size="small" type="primary" @click="updateCheckingIn">保存</el-button>
                                    </div>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </FormPanel>
        </el-card>

        <!--人员信息弹窗-->
        <div>
            <el-dialog title="人员信息" :visible.sync="studentInfoFormVisible">
                <div>
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
                                :data="studentInfoData"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                size="mini"
                                style="font-size: 12px;text-align: left"
                                highlight-current-row
                                @current-change="handleCurrentChange"
                                @select="selectionChange"
                        >
                            <el-table-column
                                    align="center"
                                    type="selection"
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    type="index"
                                    :index="indexMethod"
                                    label="序号"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="studentName"
                                    label="姓名"
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="studentNumber"
                                    label="学号"
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="studentClass"
                                    label="班级"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="SizeChange"
                                @current-change="CurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="page.currentPage"
                                :page-size="page.size"
                                :total="page.total"
                        >
                        </el-pagination>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="studentInfoFormVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="saveStudentInfo" size="small">保存</el-button>
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
        name: "CheckingInAdd",
        data() {
            return {
                studentInfoFormVisible: false,
                checkingInData: [],
                checkingInForm:{
                    checkingName:'',
                    checkingDate:'',
                },
                checkPage:{
                    currentPage:1,
                    size:10,
                    total:1,
                },
                findWord: '',
                studentCheckingInInfo: {
                    grade:'',
                    major:'',
                    studentClass:'',
                    studentName: '',
                    studentNumber: '',
                },
                page: {
                    total: 1,
                    size: 10,
                    currentPage: 1,
                },
                studentInfoData: [],
                multipleSelection: [],
            }
        },

        mounted(){
            this.getCheckingData();
        },

        methods: {

            /**
             * @description人员信息弹窗表格序号
             * **/
            indexMethod: function (index) {
                return index + this.page.size * (this.page.currentPage - 1) + 1;
            },
            /**
             * @description人员信息弹窗获取数据
             * @param studentClass
             *
             * **/
            getStudentInfo: function () {
                this.studentInfoFormVisible = true;
                const that = this;
                const studentClass = sessionStorage.getItem("userClass");
                let p = {
                    size: that.page.size,
                    page: that.page.currentPage - 1,
                    findWord: studentClass,
                }
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        that.studentInfoData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        that.studentInfoData = response.data.data.content;
                    }
                })
            },

            /**
             * @description保存人员信息弹窗中的信息
             * **/
            saveStudentInfo: function () {
                const that = this;
                that.studentCheckingInInfo.studentName = this.multipleSelection.studentName;
                that.studentCheckingInInfo.studentNumber = this.multipleSelection.studentNumber;
                that.studentCheckingInInfo.studentClass = this.multipleSelection.studentClass;
                that.studentCheckingInInfo.grade = this.multipleSelection.grade;
                that.studentCheckingInInfo.major = this.multipleSelection.major;
                this.studentInfoFormVisible = false;
            },

            /**
             * @description人员信息弹窗搜索信息
             * **/
            searchStudentInformation: function () {
                const that = this;
                let p = {
                    size: that.page.size,
                    page: that.page.currentPage - 1,
                    findWord: this.findWord,
                }
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        that.studentInfoData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        that.studentInfoData = response.data.data.content;
                    }
                })
            },

            /**
             * @description人员信息弹出框分页size事件
             * **/
            SizeChange: function (value) {
                this.page.size = value;
                this.page.currentPage = 1;
                this.getStudentInfo();
            },
            /**
             * @description人员信息弹出框分页current事件
             * **/
            CurrentChange: function (value) {
                this.page.currentPage = value;
                this.getStudentInfo();
            },


            /**
             * @description表格行点击触发事件
             * **/
            handleCurrentChange: function (value) {
                this.multipleSelection = value;
            },

            /**
             * @description复选框触发事件
             * **/
            selectionChange:function (row) {
                this.multipleSelection = row[0];
            },

            /**
             * @description上传考勤信息
             * **/
            updateCheckingIn:function () {
                let personalInfo = JSON.parse(sessionStorage.getItem("user"));
                let params ={
                    checkingName: this.checkingInForm.checkingName,
                    updateStudentNumber: personalInfo.studentNumber,
                    updateStudentName:personalInfo.studentName,
                    grade:this.studentCheckingInInfo.grade,
                    major:this.studentCheckingInInfo.major,
                    studentName:this.studentCheckingInInfo.studentName,
                    studentClass:this.studentCheckingInInfo.studentClass,
                    studentNumber:this.studentCheckingInInfo.studentNumber,
                    className:this.studentCheckingInInfo.className,
                };
                this.$http.post(Config.checkingIn + '/update',params).then(response=>{
                    if(response.data.code == '200'){
                        this.$notify({
                            title: '提示',
                            message: '上传成功'
                        })
                        this.getCheckingData();
                    }else {
                        this.$notify({
                            title: '提示',
                            message: '上传失败'
                        })
                        this.getCheckingData();
                    }
                })
            },

            /**
             * @description获取所有考勤信息
             * **/
            getCheckingData:function () {
                let params ={
                    size: this.checkPage.size,
                    page: this.checkPage.currentPage - 1,
                }
              this.$http.get(Config.checkingIn + '/get',{params:params}).then(response=>{
                  if (response.data.code == '200'){
                      this.checkingInData = response.data.data.content;
                      this.checkPage.total = response.data.data.totalElements;
                  }else {
                      this.checkingInData = response.data.data.content;
                  }
              })
            },


            /**
             * @description考勤信息分页size事件
             * **/
            checkPageSize:function (pageSize) {
                this.checkPage.size = pageSize;
                this.checkPage.currentPage = 1;
                this.getCheckingData();
            },

            /**
             * @description考勤信息分页current事件
             * **/
            checkPageCurrent:function (pageCurrent) {
                this.checkPage.currentPage = pageCurrent;
                this.getCheckingData();
            },

        }
    }
</script>

<style scoped>
    .titleSpan {
        font-size: 14px;
        font-weight: bold;
        font-family: "Hiragino Sans GB";
        text-decoration: underline #178D47;
    }

    .el-form-item {
        margin-bottom: 5px !important;
        width: 300px !important;
    }

</style>