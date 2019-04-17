<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="德育减分详情" align="left">
                    <div>
                        <el-table :data="moralDeductionManageData"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  height="451px"
                                  size="mini">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="姓名"
                                    align="center"
                                    prop="studentName"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    label="学号"
                                    align="center"
                                    prop="studentNumber"
                                    width="120px"
                            ></el-table-column>
                            <el-table-column
                                    label="德育减分类型"
                                    align="center"
                                    prop="moralDeductionType"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分年度"
                                    align="center"
                                    prop="moralDeductionYear"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分次数"
                                    align="center"
                                    prop="moralDeductionNumber"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分分数"
                                    align="center"
                                    prop="moralDeductionScore"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    label="描述"
                                    align="center"
                                    prop="description"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    prop="states"
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='MD001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='MD002' ">无异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MD003' ">有异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MD004' ">已驳回
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger"
                                               @click="delteMoralDeduction(scope.row)"
                                               :disabled="deleteMoralDeductionButton(scope.row)"
                                    >删除
                                    </el-button>
                                    <el-button size="mini" type="primary"
                                                :disabled="rejectMoralDeductionButton(scope.row)"
                                               @click="rejectMoralDeduction(scope.row)"
                                    >驳回</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralDeductionManagePageChange"
                                @current-change="moralDeductionManagePageCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralDeductionManagePage.currentPage"
                                :page-size="moralDeductionManagePage.size"
                                :total="moralDeductionManagePage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
                <FormPanel name="新增德育减分" align="left">
                    <div style="width: 80%;margin-left: 10%">
                        <el-row :gutter="40">
                            <el-col :span="12">
                                <div class="form-title">
                                    <span>人员信息</span>
                                </div>
                                <div>
                                    <el-form ref="form" :model="studentInfo" label-width="80px">
                                        <el-form-item label="姓名">
                                            <el-input v-model="studentInfo.studentName" size="small"
                                                      style="width:200px" readonly>
                                                <el-button slot="append" icon="el-icon-search" style="width: 30px"
                                                           @click="getStudentInfo"></el-button>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="年级">
                                            <el-input v-model="studentInfo.grade"
                                                      size="small"
                                                      style="width: 200px"
                                                      readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="学号">
                                            <el-input v-model="studentInfo.studentNumber"
                                                      size="small"
                                                      style="width: 200px"
                                                      readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="班级">
                                            <el-input v-model="studentInfo.studentClass"
                                                      size="small"
                                                      style="width: 200px"
                                                      readonly></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="form-title">
                                    <span>德育减分信息</span>
                                </div>
                                <el-form ref="form" :model="studentInfo" label-width="120px">
                                    <el-form-item label="德育减分类型">
                                        <el-select v-model="studentInfo.moralDeductionType" size="small"
                                                   style="width: 200px">
                                            <el-option
                                                    v-for="item in moralDeductionNameData"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="德育减分次数">
                                        <el-input-number size="small" style="width: 200px"
                                                         v-model="studentInfo.moralDeductionNumber"
                                                         :min="1"
                                        ></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="德育减分学年">
                                        <el-select size="mini" style="width: 200px"
                                                   v-model="studentInfo.moralDeductionYear"
                                        >
                                            <el-option
                                                    v-for="item in moralDeductionYearData"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="德育减分描述">
                                        <el-input v-model="studentInfo.description"
                                                  size="small"
                                                  style="width: 200px"
                                                  type="textarea"
                                        ></el-input>
                                    </el-form-item>
                                    <div style="float: right">
                                        <el-button size="small" type="danger" @click="restForm('form')">取消
                                        </el-button>
                                        <el-button size="small" type="primary" @click="saveStudentMoralDeduction">保存
                                        </el-button>
                                    </div>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </FormPanel>
            </div>
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
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    import VButton from '../components/Button'

    export default {
        components: {FormPanel, VButton},
        name: "MoralDeductionManage",
        data() {
            return {
                moralDeductionManagePage:{
                    total: 1,
                    size: 10,
                    currentPage: 1,
                },
                moralDeductionManageData: [],
                studentInfoFormVisible: false,
                findWord: '',
                studentInfoData: [],
                studentInfo: {
                    studentName: '',
                    studentNumber: '',
                    studentClass: '',
                    grade: '',
                    major: '',
                    moralDeductionType: '',
                    moralDeductionYear: '',
                    moralDeductionNumber: '',
                    description: '',
                },
                page: {
                    total: 1,
                    size: 10,
                    currentPage: 1,
                },
                multipleSelection: [],
                studentData: [],
                moralDeductionNameData: [],
                moralDeductionYearData: [{
                    value: '第一学年',
                    label: '第一学年'
                }, {
                    value: '第二学年',
                    label: '第二学年'
                }, {
                    value: '第三学年',
                    label: '第三学年'
                }, {
                    value: '第四学年',
                    label: '第四学年'
                }],
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },

        methods: {


            init: function () {
                this.getMoralDeductionNameData();
                this.getMoralDeductionManageData();
                this.getStudentData();
            },
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
            },

            /**
             * @description获取学生数据
             * **/
            getStudentData: function () {
                const that = this;
                const studentClass = this.studentData.studentClass;
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

            SizeChange: function (value) {
                this.page.size = value;
                this.page.currentPage = 1;
                this.getStudentData();
            },

            CurrentChange: function (value) {
                this.page.currentPage = value;
                this.getStudentData();
            },

            /**
             * @description保存人员信息
             * **/
            saveStudentInfo: function () {
                const that = this;
                that.studentInfo.studentName = this.multipleSelection.studentName;
                that.studentInfo.studentNumber = this.multipleSelection.studentNumber;
                that.studentInfo.studentClass = this.multipleSelection.studentClass;
                that.studentInfo.grade = this.multipleSelection.grade;
                that.studentInfo.major = this.multipleSelection.major;
                this.studentInfoFormVisible = false;
            },

            handleCurrentChange: function (value) {
                this.multipleSelection = value;
            },

            /**
             * @description复选框触发事件
             * **/
            selectionChange: function (row) {
                this.multipleSelection = row[0];
            },

            /**
             * @description搜索
             * **/
            searchStudentInformation: function () {
                const that = this;
                let params = {
                    size: that.page.size,
                    page: that.page.currentPage - 1,
                    findWord: this.findWord,
                }
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.studentInfoData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        that.studentInfoData = response.data.data.content;
                    }
                })
            },


            /**
             * @description获取德育减分类型数据
             * **/
            getMoralDeductionNameData: function () {
                this.$http.get(Config.moralDeduction + '/findType')
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralDeductionNameData.push(option);
                                }
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: '获取失败！',
                                type: 'error'
                            });
                        }
                    })
            },

            /**
             * @description保存德育减分
             * **/
            saveStudentMoralDeduction: function () {
                const params = {
                    ...this.studentInfo,
                    applyPersonNumber: this.studentData.studentNumber,
                    applyPersonName: this.studentData.studentName,
                }
                this.$http.post(Config.StudentMoralDeduction + '/add', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                            this.getMoralDeductionManageData();
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },

            restForm: function (formName) {
                this.$refs[formName].resetFields();
            },

            /**
             * @description获取德育减分数据
             * **/
            getMoralDeductionManageData: function () {
                const params = {
                    applyPersonName: this.studentData.studentName,
                    studentClass:this.studentData.studentClass,
                    size:this.moralDeductionManagePage.size,
                    page:this.moralDeductionManagePage.currentPage - 1,
                }
                this.$http.get(Config.StudentMoralDeduction + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralDeductionManageData = response.data.data.content;
                            this.moralDeductionManagePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '获取数据失败',
                                type: 'success',
                                center: true,
                            })
                        }
                    })
            },


            /**
             * @description德育减分page事件
             * **/
            moralDeductionManagePageChange:function (value) {
                this.moralDeductionManagePage.size = value;
                this.moralDeductionManagePage.currentPage = 1;
                this.getMoralDeductionManageData();
            },

            /**
             * @description德育减分currentpage事件
             * **/
            moralDeductionManagePageCurrentChange:function (value) {
                this.moralDeductionManagePage.currentPage = value;
                this.getMoralDeductionManageData();
            },
            
            /**
             * @description删除
             * **/
            delteMoralDeduction:function (value) {
                this.$http.get(`${Config.StudentMoralDeduction}/delete/${value.id}`)
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'删除成功',
                                type:'success',
                                center:true,
                            })
                        }else {
                            this.$message({
                                message:'删除失败',
                                type:'warning',
                                center:true,
                            })
                        }
                        this.getMoralDeductionManageData();
                    })
            },


            /**
             * @description删除按钮禁用事件
             * **/
            deleteMoralDeductionButton: function (value) {
                if (value.states == 'MD002') {
                    return true;
                } else {
                    return false;
                }
            },

            rejectMoralDeductionButton:function(value){
                if (value.states == 'MD003') {
                    return false;
                } else {
                    return true;
                }
            },

            /**
             * @description驳回有异议德育减分
             * **/
            rejectMoralDeduction:function (value) {
                const states = 'MD004';
                this.$http.get(`${Config.StudentMoralDeduction}/update/${value.id}/${states}`)
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'驳回成功',
                                type:'success',
                                center:true,
                            })
                        } else {
                            this.$message({
                                message:'操作失败',
                                type:'warning',
                                center:true,
                            })
                        }
                        this.getMoralDeductionManageData();
                    })
            },
            


        },
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