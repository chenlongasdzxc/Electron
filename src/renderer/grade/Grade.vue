<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="导入成绩" align="left">
                    <el-row>
                        <el-col :span="12">
                            <div>
                                <el-button size="mini" type="primary">下载模板</el-button>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div style="width: 50%">
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        multiple
                                        :action="action"
                                >
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                </el-upload>
                            </div>
                        </el-col>
                    </el-row>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="成绩详情" align="left">
                    <!--搜索框-->
                    <div>
                        <el-form ref="searchForm" :model="searchForm" label-width="40px">
                            <el-row>
                                <el-col :span="18">
                                    <el-row :gutter="180">
                                        <el-col :span="6">
                                            <el-form-item label="专业">
                                                <el-select v-model="searchForm.major" size="mini"
                                                           style="width: 180px"
                                                           @change="majorChange"
                                                >
                                                    <el-option
                                                            v-for="item in major"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="学年">
                                                <el-select size="mini" style="width: 180px"
                                                           v-model="searchForm.year"
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
                                            <el-form-item label="班级">
                                                <el-select size="mini" style="width: 180px"
                                                           v-model="searchForm.studentClass"
                                                >
                                                    <el-option
                                                            v-for="item in studentClass"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                    ></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="科目">
                                                <el-select size="mini" style="width: 180px"
                                                           v-model="searchForm.gradeName"
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
                                    </el-row>
                                </el-col>
                                <el-col :span="6">
                                    <div style="float: right">
                                        <el-button size="mini" type="danger" @click="restSearchForm('searchForm')">重置
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="searchGradeData">搜索
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <!--表格-->
                    <div>
                        <el-table
                                :data="gradeInformation"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                style="font-size: 12px"
                                border
                                height="401px"
                                size="mini">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="grade"
                                    label="年级"
                                    align="center"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentName"
                                    label="姓名"
                                    align="center"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentNumber"
                                    label="学号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentClass"
                                    label="班级"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="major"
                                    label="专业"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeYear"
                                    label="学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeName"
                                    label="科目"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeScore"
                                    label="分数"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="states"
                                    label="状态"
                                    align="center"
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
                        </el-table>
                    </div>
                    <!--分页-->
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="gradePageSize"
                                @current-change="gradePageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="gradePage.currentPage"
                                :page-size="gradePage.size"
                                :total="gradePage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>

            <div>
                <FormPanel name="设置绩点算法" align="left">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <!--搜索-->
                                <div>
                                    <el-form ref="searchData" :model="searchData" label-width="40px">
                                        <el-form-item label="专业">
                                            <el-select v-model="searchData.major" size="mini"
                                                       style="width: 120px">
                                                <el-option
                                                        v-for="item in major"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="学年">
                                            <el-select size="mini" style="width: 120px"
                                                       v-model="searchData.year"
                                            >
                                                <el-option
                                                        v-for="item in year"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="分数">
                                            <el-input-number size="mini" style="width: 120px"
                                                             v-model="searchData.gradeScore"></el-input-number>
                                        </el-form-item>
                                        <div>
                                            <el-button size="mini" type="primary" @click="searchNameList">搜索
                                            </el-button>
                                            <el-button size="mini" type="danger" @click="restForm('searchData')">重置
                                            </el-button>
                                            <el-button size="mini" type="success" @click="updateStudentGpa">保存
                                            </el-button>
                                        </div>
                                    </el-form>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <!--穿梭框-->
                                <div>
                                    <el-transfer :titles="['未选择科目', '已选择科目']" v-model="value"
                                                 :data="data"></el-transfer>
                                </div>
                            </el-col>
                        </el-row>
                        <!--表格-->
                        <div>
                            <el-table
                                    :data="gpaData"
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
                                        prop="major"
                                        label="专业"
                                        align="center"
                                        min-width="80px"
                                ></el-table-column>
                                <el-table-column
                                        prop="year"
                                        label="学年"
                                        align="center"
                                        min-width="80px"
                                ></el-table-column>
                                <el-table-column
                                        prop="gpaNameList"
                                        label="计算绩点科目"
                                        align="center"
                                        min-width="400px"
                                ></el-table-column>
                                <el-table-column
                                        prop="gpaScore"
                                        label="分数"
                                        align="center"
                                        min-width="50px"
                                ></el-table-column>
                                <el-table-column
                                        prop="creditCount"
                                        label="学分总计"
                                        align="center"
                                        min-width="80px"
                                ></el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center"
                                        min-width="80px"
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger"
                                                   @click="deleteGpa(scope.row)">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <div>

                        </div>

                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="修改成绩" align="left">
                    <div>
                        <div>
                            <el-table
                                    :data="gradeWrongInformation"
                                    :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                    style="font-size: 12px"
                                    border
                                    height="401px"
                                    size="mini">
                                <el-table-column
                                        type="index"
                                        label="序号"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="studentName"
                                        label="姓名"
                                        align="center"
                                        width="100px"
                                ></el-table-column>
                                <el-table-column
                                        prop="studentNumber"
                                        label="学号"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="studentClass"
                                        label="班级"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="gradeYear"
                                        label="学年"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="gradeName"
                                        label="科目"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="gradeScore"
                                        label="分数"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="states"
                                        label="状态"
                                        align="center"
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
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="updateGrade(scope.row)">编辑</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <!--分页-->
                        <div>
                            <el-pagination
                                    style="display: flex;justify-content: center"
                                    background
                                    @size-change="wrongGradePageSize"
                                    @current-change="wrongGradePageCurrent"
                                    layout="prev, pager, next,total"
                                    :current-page="wrongGradePage.currentPage"
                                    :page-size="wrongGradePage.size"
                                    :total="wrongGradePage.total"
                            >
                            </el-pagination>
                        </div>
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
        name: "Grade",
        data() {
            return {
                action: ``,
                value: [],
                data: [],
                gpaData: [],
                studentClass: [],
                gradeName: [],
                searchData: {
                    major: '',
                    year: '',
                    gradeScore: '',
                },
                gradePage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                searchForm: {
                    major: '',
                    year: '',
                    studentClass: '',
                    gradeName: '',
                },
                wrongGradePage:{
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                gradeInformation: [],
                gradeWrongInformation: [],
                dev: [],
                major: [],
                year: [],
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
                studentData:[],
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },

        methods: {

            init(){
                this.createActionUrl();
                this.getMajor();
                this.getGpaData();
                this.getGradeWrongInformation();
            },

            /**
             * @description导入表格
             * **/
            createActionUrl: function () {
                this.action = `${Config.Grade}/importExcel`
            },

            /**
             * @description专业改变事件
             * **/
            majorChange: function (value) {
                this.searchForm.studentClass = '';
                this.studentClass = [];
                this.searchForm.gradeName = '';
                this.gradeName = [];
                this.getStudentClass(value);
                if (this.searchForm.year) {
                    this.getGradeNameList(this.searchForm.year, value);
                }

            },

            /**
             * @description学年改变事件
             * **/
            yearChange: function (value) {
                this.searchForm.gradeName = '';
                this.gradeName = [];
                if (this.searchForm.major) {
                    this.getGradeNameList(value, this.searchForm.major);
                }

            },

            /**
             * @description重置
             * **/
            restSearchForm: function (formName) {
                this.$refs[formName].resetFields();
                this.searchForm.year = '';
                this.searchForm.major = '';
                this.searchForm.studentClass = '';
                this.searchForm.gradeName = '';
            },


            /**
             * @description获取专业list数据
             * **/
            getMajor: function () {
                this.$http.get(Config.studentInfo + '/findMajorList').then(response => {
                    if (response.data.code == '200') {
                        const list = response.data.data;
                        if (list) {
                            for (let i = 0; i < list.length; i++) {
                                const option = {
                                    label: list[i],
                                    value: list[i],
                                }
                                this.major.push(option);
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
             * @description通过专业获取班级下拉列表数据
             * **/
            getStudentClass: function (major) {
                this.$http.get(`${Config.studentInfo}/findStudentClass/${major}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const options = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.studentClass.push(options);
                                }
                            }
                            else {
                                this.$message({
                                    showClose: true,
                                    message: '获取失败！',
                                    type: 'error'
                                });
                            }
                        }
                    })
            },


            /**
             * @description通过学年，专业获取科目下拉列表数据
             * **/
            getGradeNameList: function (year, major) {
                if (year && major) {
                    this.$http.get(`${Config.Grade}/findGradeNameList/${year}/${major}`)
                        .then(response => {
                            if (response.data.code == '200') {
                                const list = response.data.data;
                                if (list) {
                                    for (let i = 0; i < list.length; i++) {
                                        const option = {
                                            label: list[i],
                                            value: list[i],
                                        }
                                        this.gradeName.push(option);
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
                }
            },

            /**
             * @param获取科目名称
             * **/
            getGradeName: function () {
                this.$http.get(`${Config.Grade}/findGradeNameList/${this.searchData.year}/${this.searchData.major}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            const tempData = response.data.data;
                            this.data = [];
                            console.log(tempData);
                            for (let i = 0; i < tempData.length; i++) {
                                this.data.push({
                                    key: tempData[i],
                                    label: tempData[i],
                                });
                            }

                        }
                    })
            },


            /**
             * @description搜索数据
             * **/
            searchNameList: function () {
                this.getGradeName();
            },

            /**
             * @description保存
             * **/
            updateStudentGpa: function () {
                const params = [];
                const major = this.searchData.major;
                const year = this.searchData.year;
                const gpaScore = this.searchData.gradeScore;
                const gpaNameCount = this.value.length;
                for (const gpaName of this.value) {
                    params.push({
                        gpaName: gpaName,
                    })
                }
                this.$http.post(`${Config.GPA}/update/${year}/${major}/${gpaScore}/${gpaNameCount}`, params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })

                            this.restForm('searchData');
                        }
                    })
            },

            /**
             * @description删除
             * **/
            deleteGpa: function (value) {

            },

            /**
             * @description重置
             * **/
            restForm: function (formName) {
                this.$refs[formName].resetFields();
                this.data = [];
                this.value = [];
                this.searchData.gradeScore = '';
                this.searchData.major = '';
                this.searchData.year = '';
            },

            /**
             *
             * **/
            getGpaData: function () {
                this.$http.get(Config.GPA + '/findAllGpa')
                    .then(response => {
                        if (response.data.code == '200') {
                            this.gpaData = response.data.data;
                        }
                    })
            },

            /**
             * @description搜索成绩数据
             * **/
            searchGradeData: function () {
                const params = {
                    year: this.searchForm.year,
                    major: this.searchForm.major,
                    studentClass: this.searchForm.studentClass,
                    gradeName: this.searchForm.gradeName,
                    size: this.gradePage.size,
                    page: this.gradePage.currentPage - 1,
                    sort: 'id,desc',
                };
                this.$http.get(Config.Grade + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.gradeInformation = response.data.data.content;
                            this.gradePage.total = response.data.data.totalElements;
                        }
                    })
            },

            /**
             * @description分页size事件
             * **/
            gradePageSize: function (value) {
                this.gradePage.size = value;
                this.gradePage.currentPage = 1;
                this.searchGradeData();
            },
            /**
             * @description分页current事件
             * **/
            gradePageCurrent: function (value) {
                this.gradePage.currentPage = value;
                this.searchGradeData();
            },


            /**
             * @description获取成绩不正确数据
             * **/
            getGradeWrongInformation:function () {
                const params = {
                    states:'GS003',
                    grade:this.studentData.grade,
                    page: this.wrongGradePage.currentPage - 1,
                    size:this.wrongGradePage.size,
                }
                this.$http.get(Config.Grade+'/findFuzzy',{params:params})
                    .then(response=>{
                        if (response.data.code =='200'){
                            this.gradeWrongInformation = response.data.data.content;
                            this.wrongGradePage.total = response.data.data.totalElements;
                        }else {
                            this.$message({
                                message:'获取不正确成绩数据失败',
                                type:'warning',
                                center:true,
                            })
                        }
                    })
            },

            /**
             * @description修改成绩
             * **/
            updateGrade:function (value) {

            },

            /**
             * @description不正确成绩page size事件
             * **/
            wrongGradePageSize:function (value) {
                this.wrongGradePage.size = value;
                this.wrongGradePage.currentPage = 1;
                this.getGradeWrongInformation();
            },


            /**
             * @description不正确成绩page current事件
             * **/
            wrongGradePageCurrent:function (value) {
                this.wrongGradePage.currentPage = value;
                this.getGradeWrongInformation();
            }

        },

    }
</script>

<style scoped>

</style>