<template>
    <div>
        <div>
            <FormPanel name="班级综合素质分" align="left">
                <!--搜索-->
                <div>
                    <el-form :model="classComprehensive" size="small" ref="classComprehensive">
                        <el-row>
                            <el-col :span="8">
                                <el-input size="small" v-model="classComprehensive.studentName"
                                          class="value-search-box"
                                          placeholder="请输入姓名"><i slot="prefix"
                                                                 class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="综合素质年度：" :label-width="width">
                                    <el-select size="mini" style="width: 120px"
                                               v-model="classComprehensive.year"
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
                            <el-col :span="8">
                                <div style="float: right">
                                    <el-button size="mini" type="success"
                                               @click="restClassComprehensive('classComprehensive')">重置
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="searchClassComprehensiveData">搜索
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
                <!--表格-->
                <div>
                    <el-table :data="classComprehensiveData"
                              :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                              style="font-size: 12px"
                              border
                              height="400px"
                              size="mini">
                        <el-table-column
                                fixed
                                type="index"
                                label="序号"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                label="姓名"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionNameList"
                                label="德育表现名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionScore"
                                label="德育表现分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutNameList"
                                label="课外加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutScore"
                                label="课外加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusNameList"
                                label="德育加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="德育加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionNameList"
                                label="德育减分名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionScore"
                                label="德育减分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="comprehensiveQualityYear"
                                label="学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="states"
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='CM001' ">未查看
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='CM002' ">无异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='CM003' ">有异议
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--分页-->
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="classComprehensiveSizeChange"
                            @current-change="classComprehensiveCurrentChange"
                            layout="prev, pager, next,total"
                            :current-page="classComprehensivePage.currentPage"
                            :page-size="classComprehensivePage.size"
                            :total="classComprehensivePage.total"
                    ></el-pagination>
                </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel name="专业综合素质分" align="left">
                <!--搜索-->
                <div>
                    <el-form :model="majorComprehensive" size="small" ref="majorComprehensive">
                        <el-row>
                            <el-col :span="8">
                                <el-input size="small" v-model="majorComprehensive.studentName"
                                          class="value-search-box"
                                          placeholder="请输入姓名"><i slot="prefix"
                                                                 class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="综合素质年度：" :label-width="width">
                                    <el-select size="mini" style="width: 120px"
                                               v-model="majorComprehensive.year"
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
                            <el-col :span="8">
                                <div style="float: right">
                                    <el-button size="mini" type="success"
                                               @click="restClassComprehensive('majorComprehensive')">重置
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="searchMajorComprehensiveData">搜索
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
                <!--表格-->
                <div>
                    <el-table :data="majorComprehensiveData"
                              :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                              style="font-size: 12px"
                              border
                              height="400px"
                              size="mini">
                        <el-table-column
                                fixed
                                type="index"
                                label="序号"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                label="姓名"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionNameList"
                                label="德育表现名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionScore"
                                label="德育表现分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutNameList"
                                label="课外加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutScore"
                                label="课外加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusNameList"
                                label="德育加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="德育加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionNameList"
                                label="德育减分名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionScore"
                                label="德育减分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="comprehensiveQualityYear"
                                label="学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="states"
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='CM001' ">未查看
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='CM002' ">无异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='CM003' ">有异议
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--分页-->
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="majorComprehensiveSizeChange"
                            @current-change="majorComprehensiveCurrentChange"
                            layout="prev, pager, next,total"
                            :current-page="majorComprehensivePage.currentPage"
                            :page-size="majorComprehensivePage.size"
                            :total="majorComprehensivePage.total"
                    ></el-pagination>
                </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel name="年级综合素质分" align="left">
                <!--搜索-->
                <div>
                    <el-form :model="gradeComprehensive" size="small" ref="gradeComprehensive">
                        <el-row>
                            <el-col :span="8">
                                <el-input size="small" v-model="gradeComprehensive.studentName"
                                          class="value-search-box"
                                          placeholder="请输入姓名"><i slot="prefix"
                                                                 class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="综合素质年度：" :label-width="width">
                                    <el-select size="mini" style="width: 120px"
                                               v-model="gradeComprehensive.year"
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
                            <el-col :span="8">
                                <div style="float: right">
                                    <el-button size="mini" type="success"
                                               @click="restClassComprehensive('gradeComprehensive')">重置
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="searchGradeComprehensiveData">搜索
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>

                    </el-form>
                </div>
                <!--表格-->
                <div>
                    <el-table :data="gradeComprehensiveData"
                              :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                              style="font-size: 12px"
                              border
                              height="400px"
                              size="mini">
                        <el-table-column
                                fixed
                                type="index"
                                label="序号"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                label="姓名"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionNameList"
                                label="德育表现名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralExpressionScore"
                                label="德育表现分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutNameList"
                                label="课外加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralOutScore"
                                label="课外加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusNameList"
                                label="德育加分名称"
                                align="center"
                                min-width="400px"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="德育加分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionNameList"
                                label="德育减分名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralDeductionScore"
                                label="德育减分分"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="comprehensiveQualityYear"
                                label="学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                fixed="right"
                                prop="states"
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='CM001' ">未查看
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='CM002' ">无异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='CM003' ">有异议
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--分页-->
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="gradeComprehensiveSizeChange"
                            @current-change="gradeComprehensiveCurrentChange"
                            layout="prev, pager, next,total"
                            :current-page="gradeComprehensivePage.currentPage"
                            :page-size="gradeComprehensivePage.size"
                            :total="gradeComprehensivePage.total"
                    ></el-pagination>
                </div>
            </FormPanel>
        </div>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel},
        name: "ComprehensiveQuality",
        data() {
            return {
                width: '120px',
                classComprehensiveData: [],
                majorComprehensiveData: [],
                gradeComprehensiveData: [],
                studentData: [],
                gradeComprehensive: {
                    year: '',
                    studentName: '',
                },
                majorComprehensive: {
                    year: '',
                    studentName: '',
                },
                classComprehensive: {
                    year: '',
                    studentName: '',
                },
                majorComprehensivePage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                classComprehensivePage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                gradeComprehensivePage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
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
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },

        methods: {


            init: function () {
                this.getClassComprehensiveData();
                this.getMajorComprehensiveData();
                this.getGradeComprehensiveData();
            },

            searchClassComprehensiveData: function () {
                this.getClassComprehensiveData();
            },

            searchMajorComprehensiveData: function () {
                this.getMajorComprehensiveData();
            },

            searchGradeComprehensiveData: function () {
                this.getGradeComprehensiveData();
            },


            restClassComprehensive: function (formName) {
                this.$refs[formName].resetFields();
            },


            /**
             * @description查询专业综合素质分
             * **/
            getMajorComprehensiveData: function () {
                const params = {
                    studentName: this.majorComprehensive.studentName,
                    comprehensiveQualityYear: this.majorComprehensive.year,
                    major: this.studentData.major,
                    grade: this.studentData.grade,
                    size: this.majorComprehensivePage.size,
                    page: this.majorComprehensivePage.currentPage - 1,
                }
                this.$http.get(Config.ComprehensiveQuality + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.majorComprehensiveData = response.data.data.content;
                            this.majorComprehensivePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查找专业综合素质失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },


            /**
             * @description查询班级综合素质分
             * **/
            getClassComprehensiveData: function () {
                const params = {
                    studentName: this.classComprehensive.studentName,
                    comprehensiveQualityYear: this.classComprehensive.year,
                    major: this.studentData.major,
                    studentClass: this.studentData.studentClass,
                    grade: this.studentData.grade,
                    size: this.classComprehensivePage.size,
                    page: this.classComprehensivePage.currentPage - 1,
                }
                this.$http.get(Config.ComprehensiveQuality + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.classComprehensiveData = response.data.data.content;
                            this.classComprehensivePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查找班级综合素质失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description查询年级综合素质分
             * **/
            getGradeComprehensiveData: function () {
                const params = {
                    studentName: this.gradeComprehensive.studentName,
                    comprehensiveQualityYear: this.gradeComprehensive.year,
                    grade: this.studentData.grade,
                    size: this.gradeComprehensivePage.size,
                    page: this.gradeComprehensivePage.currentPage - 1,
                }
                this.$http.get(Config.ComprehensiveQuality + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.gradeComprehensiveData = response.data.data.content;
                            this.gradeComprehensivePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查找年级综合素质失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },


            /*分页事件*/
            classComprehensiveSizeChange: function (value) {
                this.classComprehensivePage.size = value;
                this.classComprehensivePage.currentPage = 1;
                this.getClassComprehensiveData();
            },

            classComprehensiveCurrentChange: function (value) {
                this.classComprehensivePage.currentPage = value;
                this.getClassComprehensiveData();
            },

            majorComprehensiveSizeChange: function (value) {
                this.majorComprehensivePage.size = value;
                this.majorComprehensivePage.currentPage = 1;
                this.getMajorComprehensiveData();
            },

            majorComprehensiveCurrentChange: function (value) {
                this.majorComprehensivePage.currentPage = value;
                this.getMajorComprehensiveData();
            },

            gradeComprehensiveSizeChange: function (value) {
                this.gradeComprehensivePage.size = value;
                this.gradeComprehensivePage.currentPage = 1;
                this.getGradeComprehensiveData();
            },

            gradeComprehensiveCurrentChange: function (value) {
                this.gradeComprehensivePage.currentPage = value;
                this.getGradeComprehensiveData();
            },

        }
    }
</script>

<style scoped>

</style>