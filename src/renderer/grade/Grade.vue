<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="导入成绩" align="left">
                    <el-row>
                        <el-col :span="12">
                            <div>
                                <el-button></el-button>
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

                </FormPanel>
            </div>

            <div>
                <FormPanel name="设置绩点算法" align="left">
                    <div>
                        <div>
                            <el-form ref="searchData" :model="searchData" label-width="100px">
                                <el-row>
                                    <el-col :span="6">
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
                                    </el-col>
                                    <el-col :span="6">
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
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="分数">
                                            <el-input-number size="mini" style="width: 120px"
                                                             v-model="searchData.gradeScore"></el-input-number>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <div style="float: right">
                                            <el-button size="mini" type="primary" @click="searchNameList">搜索
                                            </el-button>
                                            <el-button size="mini" type="danger" @click="restForm('searchData')">重置
                                            </el-button>
                                            <el-button size="mini" type="success" @click="updateStudentGpa">保存
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>

                        <div>
                            <el-row>
                                <el-col :span="12">
                                    <div>
                                        <el-transfer :titles="['未选择科目', '已选择科目']" v-model="value"
                                                     :data="data"></el-transfer>
                                    </div>
                                </el-col>
                                <el-col :span="12">
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
                                            ></el-table-column>
                                            <el-table-column
                                                    prop="year"
                                                    label="学年"
                                                    align="center"
                                            ></el-table-column>
                                            <el-table-column
                                                    prop="gpaName"
                                                    label="科目"
                                                    align="center"
                                            ></el-table-column>
                                            <el-table-column
                                                    prop="gpaScore"
                                                    label="分数"
                                                    align="center"
                                            ></el-table-column>
                                            <el-table-column
                                                    label="操作"
                                                    align="center"
                                            >
                                                <template slot-scope="scope">
                                                    <el-button size="mini" type="danger"
                                                               @click="deleteGpa(scope.row)">删除
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>


                        <div>

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
                searchData: {
                    major: '',
                    year: '',
                    gradeScore: '',
                },
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
            }
        },

        mounted() {
            this.createActionUrl();
            this.getMajor();
            this.getGpaData();
        },

        methods: {

            createActionUrl: function () {
                this.action = `${Config.Grade}/importExcel`
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
                const params = {
                    major: this.searchData.major,
                    year: this.searchData.year,
                    gpaName: JSON.stringify(this.value),
                    gpaScore: this.searchData.gradeScore,
                    gpaNameCount: this.value.length,
                }
                this.$http.post(Config.GPA + '/update', params)
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

            getGpaData:function () {
                this.$http.get(Config.GPA + '/findAll')
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.gpaData = response.data.data;
                        }
                    })
            },
        },

    }
</script>

<style scoped>

</style>