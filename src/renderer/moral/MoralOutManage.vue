<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="课外加分审核" align="left">
                    <div>

                    </div>
                    <div>
                        <el-table :data="moralPlusManage"
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
                                    prop="moralOutName"
                                    label="项目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutType"
                                    label="项目类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutScore"
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
                                    <el-button size="mini" @click="moralOutManageButton(scope.row)" type="primary">审核
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="pageSize"
                                @current-change="pageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="moralOutManagePage.currentPage"
                                :page-size="moralOutManagePage.size"
                                :total="moralOutManagePage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="已审核课外加分" align="left">
                    <!--查询-->
                    <div>

                    </div>
                    <!--表格-->
                    <div>
                        <el-table :data="moralPlusManageApplyed"
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
                                    prop="moralOutName"
                                    label="项目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutType"
                                    label="项目类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutScore"
                                    label="项目分数"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="申报学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="applyPersonName"
                                    label="审核人"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="value"
                                    label="审核理由"
                                    align="center"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <!--分页-->
                    <div>

                    </div>
                </FormPanel>
            </div>
        </el-card>

        <!--弹窗-->
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
        name: "MoralOutManage",
        data() {
            return {
                formLabelWidth: '80px',
                dialogVisible: false,
                applyFormData: {
                    id: '',
                    value:'',
                },
                moralPlusManage: [],
                moralPlusManageApplyed: [],
                moralOutManagePage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                studentData: [],
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralOutManageData();
            this.getMoralPlusManageApplyed();
        },

        methods: {

            /**
             * @description获取数据
             * **/
            getMoralOutManageData: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    major: this.studentData.major,
                    grade: this.studentData.grade,
                    states: 'MO001'
                }
                this.$http.get(Config.StudentMoralOut + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralPlusManage = response.data.data.content;
                            this.moralOutManagePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message:'获取数据失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            },

            /**
             * @description获取已审核数据
             * **/
            getMoralPlusManageApplyed:function(){
                const params = {
                    studentClass: this.studentData.studentClass,
                    major: this.studentData.major,
                    grade: this.studentData.grade,
                    states: 'MO002'
                }
                this.$http.get(Config.StudentMoralOut + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralPlusManageApplyed = response.data.data.content;
                        } else {
                            this.$message({
                                message:'获取数据失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            },

            /**
             * @description审核弹窗
             * **/
            moralOutManageButton: function (value) {
                this.applyFormData.id =  value.id;
                this.dialogVisible = true;
            },

            /**
             * @description审核数据分页size事件
             * **/
            pageSize: function (value) {
                this.moralOutManagePage.size = value;
                this.moralOutManagePage.currentPage = 1;
                this.getMoralOutManageData();
            },

            /**
             * @description审核数据分页current事件
             * **/
            pageCurrent: function (value) {
                this.moralOutManagePage.currentPage = value;
                this.getMoralOutManageData();
            },

            /**
             * @description审核通过
             * **/
            passApply: function () {
                const params = {
                    id:this.applyFormData.id,
                    value:this.applyFormData.value,
                    applyPersonName:this.studentData.studentName,
                    applyPersonNumber:this.studentData.studentNumber,
                    states:'MO002'
                }
                this.$http.get(Config.StudentMoralOut + '/setStates',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'保存成功',
                                type:'success',
                                center:true
                            })
                            this.getMoralOutManageData();
                            this.getMoralPlusManageApplyed();
                            this.dialogVisible = false;

                        } else {
                            this.$message({
                                message:'保存失败',
                                type:'danger',
                                center:true
                            })
                            this.getMoralOutManageData();
                            this.getMoralPlusManageApplyed();
                            this.dialogVisible = false;
                        }
                    })
            },

            /**
             * @description驳回审核
             * **/
            rejectApply: function () {
                const params = {
                    id:this.applyFormData.id,
                    value:this.applyFormData.value,
                    applyPersonName:this.studentData.studentName,
                    applyPersonNumber:this.studentData.studentNumber,
                    states:'MO003'
                }
                this.$http.get(Config.StudentMoralOut + '/setStates',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'保存成功',
                                type:'success',
                                center:true
                            })
                            this.getMoralOutManageData();
                            this.getMoralPlusManageApplyed();
                            this.dialogVisible = false;

                        } else {
                            this.$message({
                                message:'保存失败',
                                type:'danger',
                                center:true
                            })
                            this.getMoralOutManageData();
                            this.getMoralPlusManageApplyed();
                            this.dialogVisible = false;
                        }
                    })
            },
        }
    }
</script>

<style scoped>

</style>