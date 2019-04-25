<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的成绩" align="left">
                    <!--搜索-->
                    <div>
                        <el-form :model="personalGrade" size="small" ref="personalGrade">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="年度：" label-width="60px">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="personalGrade.year"
                                                   @change="yearChange"
                                        >
                                            <el-option
                                                    v-for="item in year"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="科目：" label-width="60px">
                                        <el-select size="mini" style="width: 300px"
                                                   v-model="personalGrade.gradeName"
                                        >
                                            <el-option
                                                    v-for="item in gradeName"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <div style="float: right">
                                    <el-button size="mini" type="danger" @click="restForm('personalGrade')">重置</el-button>
                                    <el-button size="mini" type="primary" @click="searchPersonalGradeData">搜索</el-button>
                                </div>
                            </el-row>

                        </el-form>
                    </div>
                    <!--表格-->
                    <div>
                        <el-table
                                :data="personalGradeData"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                style="font-size: 12px"
                                border
                                height="450px"
                                size="mini">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeYear"
                                    label="学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeName"
                                    label="科目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeScore"
                                    label="科目成绩"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="score"
                                    label="学分"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gpa"
                                    label="单科绩点"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="states"
                                    label="状态"
                                    align="center"
                                    width="80px"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini"
                                            v-if="scope.row.states =='GS001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini"
                                            v-if="scope.row.states =='GS002' ">正确
                                    </el-tag>
                                    <el-tag type="danger" size="mini"
                                            v-if="scope.row.states =='GS003' ">不正确
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                                    min-width="80px"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="gradeIsWrong(scope.row)"
                                               :disabled="gradeDisabled(scope.row)">错误
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="gradeIsRight(scope.row)"
                                               :disabled="gradeDisabled(scope.row)">正确
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
                                @size-change="personalGradePageSize"
                                @current-change="personalGradePageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalGradePage.currentPage"
                                :page-size="personalGradePage.size"
                                :total="personalGradePage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="我的成绩详情" align="left">
                    <div>

                    </div>
                </FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel},
        name: "GradeManage",
        data() {
            return {
                personalGrade: {
                    year: '',
                    gradeName: '',
                },
                gradeName: [],
                personalGradeData: [],
                personalGradePage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                year: [{
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
                studentData: [],
            }
        },


        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getPersonalGradeData();
        },

        methods: {

            /**
             * @description获取当前学生成绩详情
             * **/
            getPersonalGradeData: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    major: this.studentData.major,
                    gradeYear:this.personalGrade.year,
                    gradeName:this.personalGrade.gradeName,
                    page: this.personalGradePage.currentPage - 1,
                    size: this.personalGradePage.size,
                }
                this.$http.get(Config.Grade + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalGradeData = response.data.data.content;
                            this.personalGradePage.total = response.data.data.totalElements;
                        }
                    })
            },

            /**
             * @description成绩详情分页size事件
             * **/
            personalGradePageSize: function (value) {
                this.personalGradePage.size = value;
                this.personalGradePage.currentPage = 1;
                this.getPersonalGradeData();
            },

            /**
             * @description成绩详情分页current事件
             * **/
            personalGradePageCurrent: function (value) {
                this.personalGradePage.currentPage = value;
                this.getPersonalGradeData();
            },

            /**
             * @description成绩有误
             * **/
            gradeIsWrong: function (value) {
                const params = {
                    id: value.id,
                    states: 'GS003',
                }
                this.updateGradeStates(params);
            },

            /**
             * @description成绩无误
             * **/
            gradeIsRight: function (value) {
                const params = {
                    id: value.id,
                    states: 'GS002',
                }
                this.updateGradeStates(params);
            },


            /**
             * @description更新状态
             * **/
            updateGradeStates: function (value) {
                this.$http.get(`${Config.Grade}/updateStates/${value.id}/${value.states}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '提交成功',
                                type: 'success',
                                center: true
                            })
                        } else {
                            this.$message({
                                message: '提交失败',
                                type: 'warning',
                                center: true
                            })
                        }
                        this.getPersonalGradeData();
                    })
            },

            /**
             * @description按钮禁用事件
             * **/
            gradeDisabled: function (value) {
                if (value.states == 'GS002') {
                    return true
                } else {
                    return false
                }
            },

            /**
             * @description获取科目list
             * **/
            getGradeName: function (value) {
                this.$http.get(`${Config.Grade}/findGradeNameList/${value}/${this.studentData.major}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            const params = response.data.data;
                            for (let i = 0; i < params.length; i++) {
                                const option = {
                                    label: params[i],
                                    value: params[i],
                                }
                                this.gradeName.push(option);
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
             * @description学年change事件
             * **/
            yearChange: function (value) {
                this.personalGrade.gradeName = '';
                this.gradeName = [];
                this.getGradeName(value);
            },

            /**
             * @description搜索个人成绩按钮
             * **/
            searchPersonalGradeData:function () {
               this.getPersonalGradeData();
            },

            restForm:function (formName) {
                this.$refs[formName].resetFields();
                this.personalGrade.gradeName='';
                this.personalGrade.year = '';
            }

        }
    }
</script>

<style scoped>

</style>