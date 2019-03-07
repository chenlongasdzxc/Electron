<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育加分" align="left">
                    <el-table :data="personalMoralPlus"
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
                                prop="states"
                                label="状态"
                                align="center"
                        >
                            <template>

                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        ></el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="PageSize"
                                @current-change="PageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalMoralPlusPage.currentPage"
                                :page-size="personalMoralPlusPage.size"
                                :total="personalMoralPlusPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="新增德育加分" align="left">
                    <el-form :model="personalMoralPlusAddForm" size="small"
                             style="font-size: 12px;text-align: left">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="德育加分类型" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.moralPlusType" size="small"
                                               style="width: 120px"
                                               @change="moralPlusTypechange"
                                    >
                                        <el-option
                                                v-for="item in moralPlusTypeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="德育加分名称" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.moralPlusName" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralPlusNameList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="德育加分年度" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.year" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralYear"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div style="float: right">
                            <el-button size="mini" @click="restPersonalMoralPlus('personalMoralPlusAddForm')">取消</el-button>
                            <el-button size="mini" type="primary" @click="savePersonalMoralPlus">保存</el-button>
                        </div>
                    </el-form>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="班级德育加分" align="left">
                </FormPanel>
            </div>
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
        name: "MoralPlus",
        data() {
            return {
                formLabelWidth: '120px',
                moralPlusTypeList: [],
                personalMoralPlus: [],
                moralPlusNameList: [],
                personalMoralPlusAddForm: {
                    studentName: '',
                    studentClass: '',
                    studentNumber: '',
                    grade: '',
                    major: '',
                    moralPlusName: '',
                    moralPlusType: '',
                    moralPlusScore: '',
                    year: '',
                },
                personalMoralPlusPage:{
                  size:10,
                    total: 1,
                    currentPage: 1
                },
                moralYear: [{
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
                moralPlusList: [],
                studentData: [],
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralPlusTypeList();
            this.getPersonalMoralPlus();
        },

        methods: {

            /**
             * @description 获取个人德育加分详情
             * **/
            getPersonalMoralPlus:function(){
               const params = {
                   studentNumber:this.studentData.studentNumber,
                   size: this.personalMoralPlusPage.size,
                   page: this.personalMoralPlusPage.currentPage - 1,
                   sort: 'id,desc',
               }
               this.$http.get(Config.StudentMoral + '/findPersonal',{params:params})
                   .then(response=>{
                       if (response.data.code == '200'){
                           this.personalMoralPlus = response.data.data.content;
                           this.personalMoralPlusPage.total = response.data.data.totalElements;
                       } else {

                       }
                   })
            },

            /**
             * @description获取德育加分下拉框数据
             * **/
            getMoralPlusTypeList: function () {
                this.$http.get(Config.moralPlus + '/findType')
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralPlusTypeList.push(option);
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
             * @description获取德育加分名称
             * **/
            getmoralPlusNameList: function (type) {
                this.$http.get(Config.moralPlus + '/findNameList', {params: {moralPlusType: type}})
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i].moralPlusName,
                                        value: list[i].moralPlusName,
                                    }
                                    this.moralPlusNameList.push(option);
                                }
                            }
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '获取失败！',
                                type: 'error'
                            });
                        }
                    })
            },

            restPersonalMoralPlus:function(formName){
                    this.$refs[formName].resetFields();
            },

            moralPlusTypechange: function (value) {
                this.personalMoralPlusAddForm.moralPlusName = '';
                this.moralPlusNameList = [];
                this.getmoralPlusNameList(value);
            },

            /**
             * @descriptions上传
             * **/
            savePersonalMoralPlus: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    studentName: this.studentData.studentName,
                    studentNumber: this.studentData.studentNumber,
                    major: this.studentData.major,
                    grade: this.studentData.grade,
                    moralPlusName: this.personalMoralPlusAddForm.moralPlusName,
                    moralPlusType:this.personalMoralPlusAddForm.moralPlusType,
                    year:this.personalMoralPlusAddForm.year,
                }
                this.$http.post(Config.StudentMoral + '/update',params)
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'保存成功',
                                type:'success'
                            })
                        } else {
                            this.$message({
                                message:'保存失败',
                                type:'danger'
                            })
                        }
                    })
            },

            PageSize:function (value) {
                this.personalMoralPlusPage.size = value;
                this.personalMoralPlusPage.currentPage = 1;
                this.getPersonalMoralPlus();
            },

            PageCurrent:function (value) {
                this.personalMoralPlusPage.currentPage = value;
                this.getPersonalMoralPlus();
            }

        },
    }
</script>

<style scoped>

</style>