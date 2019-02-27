<template>
    <div>
        <el-card>
            <FormPanel align="left" name="请假申请">
                <div style="width: 80%;margin-left: 10%">
                    <div class="form-title">
                        <span>请假信息</span>
                    </div>
                    <div>
                        <el-form ref="form" :model="leaving" label-width="80px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="请假名称:">
                                        <el-input v-model="leaving.leaveName" size="small"
                                                  style="width: 160px"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="请假时间:">
                                        <el-date-picker
                                                v-model="leaving.leaveDate"
                                                type="datetimerange"
                                                size="small"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                range-separator="至"
                                        >
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div>
                            <el-form-item label="请假理由:">
                                <el-input v-model="leaving.leaveValue" size="small"
                                          type="textarea"></el-input>
                            </el-form-item>
                            <div style="float: right">
                                <el-button size="small" type="danger" @click="resetForm('leaving')">取消
                                </el-button>
                                <el-button size="small" type="primary" @click="saveLeaving">保存</el-button>
                            </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </FormPanel>
            <!--我的请假-->
            <FormPanel align="left" name="我的请假">
                <div>
                    <el-table
                            :data="personalLeaving"
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
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveName"
                                align="center"
                                label="请假科目"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveDateStart"
                                align="center"
                                label="请假开始时间"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveDateEnd"
                                align="center"
                                label="请假结束时间"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveValue"
                                align="center"
                                label="请假理由"
                        ></el-table-column>
                        <el-table-column
                                align="center"
                                label="审核理由"
                                prop="applyValue"
                        ></el-table-column>
                        <el-table-column
                                label="状态"
                                align="center"
                                width="100px"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='DO001' ">未审核
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='DO002' ">审核通过
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='DO003' ">审核未通过
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="80px"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger"
                                           @click="deleteLeaving(scope.row)"
                                           :disabled="buttonDisabled(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </FormPanel>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "AskForLeave",
        data() {
            return {
                leaving: {
                    leaveName: '',
                    leaveValue: '',
                    leaveDate: '',
                    leaveDateStart: '',
                    leaveDateEnd: '',
                },
                personalLeaving:[],
                personalInfo:[],
            }
        },

        mounted(){
            this.personalInfo = JSON.parse(sessionStorage.getItem("user"));
            this.getPersonalLeavingData();
        },
        methods: {

            /**
             * @description保存个人请假数据
             * **/
            saveLeaving: function () {
                let params = {
                    studentNumber: this.personalInfo.studentNumber,
                    studentClass: this.personalInfo.studentClass,
                    studentName: this.personalInfo.studentName,
                    grade: this.personalInfo.grade,
                    major: this.personalInfo.major,
                    leaveName: this.leaving.leaveName,
                    leaveValue: this.leaving.leaveValue,
                    leaveDateStart: this.leaving.leaveDate[0],
                    leaveDateEnd: this.leaving.leaveDate[1],
                };
                this.$http.post(Config.Leaving + '/update', params).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            type: 'success',
                            message: '上传成功',
                            center:true
                        })
                        this.getPersonalLeavingData();
                        this.getLeaveData();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '上传失败',
                            center:true
                        })
                    }
                })
            },

            resetForm:function (formName) {
                console.log(formName)
            },


            /**
             * @description获取个人请假数据
             * **/
            getPersonalLeavingData:function(){
                let params = {
                    studentNumber: this.personalInfo.studentNumber,
                }
                this.$http.get(Config.Leaving + '/findPersonal',{params:params}).then(response=>{
                    if (response.data.code == '200'){
                        this.personalLeaving = response.data.data.content;
                    } else {
                        this.personalLeaving = response.data.data.content;
                    }
                })
            },

            /**
             * @description删除个人请假信息
             * **/
            deleteLeaving:function (value) {
                let params = {
                    id: value.id,
                }
                this.$confirm('此操作将删除该条数据，是否继续？','提示',{
                    confirmButtonText:'确认',
                    cancelButtonText:'取消',
                }).then(() =>{
                    this.$http.get(Config.Leaving + '/delete',{params:params}).then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                type: 'success',
                                message: '删除成功',
                                center:true
                            });
                            this.getPersonalLeavingData();
                            this.getLeaveData();
                        } else {
                            this.$message({
                                type: 'danger',
                                message: '删除失败',
                                center:true
                            });
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除',
                        center:true
                    })
                })

            },

            buttonDisabled:function (value) {
                if (value.states == 'DO002') {
                    return true;
                } else {
                    return false;
                }
            }

        }
    }
</script>

<style scoped>

</style>