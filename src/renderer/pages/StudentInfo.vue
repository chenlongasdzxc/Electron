<template>
    <div>
        <div>
            <el-card>
                <form-panel name="个人基本信息" align="left">
                    <el-row>
                        <el-col :span="8" style="padding-left: 0px">
                            <ul>
                                <li><label>姓名：</label>{{studentInfo.studentName}}</li>
                                <li><label>性别：</label>{{studentInfo.sex}}</li>
                                <li><label>民族：</label>{{studentInfo.nation}}</li>
                                <li><label>籍贯：</label>{{studentInfo.originPlace}}</li>
                                <li><label>年级：</label>{{studentInfo.grade}}</li>
                                <li><label>专业：</label>{{studentInfo.major}}</li>
                                <li><label>班级：</label>{{studentInfo.studentClass}}</li>
                                <li><label>寝室号：</label>{{studentInfo.roomNumber}}</li>
                            </ul>
                        </el-col>
                        <el-col :span="8">
                            <ul>
                                <li><label>联系电话：</label>{{studentInfo.phoneNumber}}</li>
                                <li><label>邮箱：</label>{{studentInfo.email}}</li>
                                <li><label>身份证号码：</label>{{studentInfo.idCard}}</li>
                                <li><label>银行卡号：</label>{{studentInfo.bankNumber}}</li>
                                <li><label>开户银行：</label>{{studentInfo.bankName}}</li>
                                <li><label>家庭住址：</label>{{studentInfo.adress}}</li>
                                <li><label>政治面貌：</label>{{studentInfo.politicesStatus}}</li>
                                <li><label>是否建档立卡：</label>{{studentInfo.fileCard}}</li>
                            </ul>
                        </el-col>
                    </el-row>
                </form-panel>
                <form-panel name="个人信息编辑" align="left" isNone="false" collapsible>
                    <div slot="header">
                        <VButton @click="saveStudentInfo">保存</VButton>
                    </div>
                    <el-row>
                        <el-col :span="8" style="padding-left: 0px">
                            <el-form ref="form" :model="studentForm" label-width="100px" label-position="left">
                                <el-form-item label="联系电话">
                                    <el-input v-model="studentForm.phoneNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <el-input v-model="studentForm.studentName" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号码">
                                    <el-input v-model="studentForm.idCard" size="small" style="width: 150px"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </form-panel>
                <form-panel name="密码修改" align="left" isNone="false" collapsible>
                    <i>新密码</i><el-input v-model="userPassword" size="small" style="width: 150px"></el-input>
                    <VButton @click="saveNewPassword">保存</VButton>
                </form-panel>
            </el-card>
            <VButton @click="backToMenu">Back</VButton>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import Config from '../config'
    import FormPanel from '../components/FormPanel'

    export default {
        components: {VButton, FormPanel},
        name: "StudentInfo",
        data() {
            return {
                userPassword: '',
                uid:'',
                studentInfo: [],
                studentForm: {
                    id: '',
                    phoneNumber: '',
                    studentName: '',
                    studentNumber: '',
                    grade: '',
                    email: '',
                    sex: '',
                    major: '',
                    studentClass: '',
                    duty: '',
                    roomNumber: '',
                    idCard: '',
                    bankNumber: '',
                    bankName: '',
                    adress: '',
                    politicesStatus: '',
                    fileCard: '',
                },
            }
        },
        mounted() {
            this.findStudentInfo();
        },
        methods: {
            backToMenu: function () {
                this.$router.push({path: '/Menu'})
            },
            findStudentInfo: function () {
                const that = this;
                let url = Config.studentInfo + '/get';
                const name = sessionStorage.getItem("userName");
                this.$http.get(url, {params: {userName: name}}).then(function (response) {
                    if (response.data.code == '200') {
                        sessionStorage.setItem("userInfo", response.data.data);
                        that.studentInfo = response.data.data;
                    }
                })
            },
            saveStudentInfo: function () {
                const that = this;
                let url = Config.studentInfo + '/update';
                this.$http.post(url, {params: this.studentForm}).then(response => {
                    if (response.data.code == '200') {
                        debugger
                    }
                })
            },
            saveNewPassword:function () {
               this.getId();
               debugger
               let studentId = this.uid;
               debugger
               this.$http.post(Config.userInfo + '/changePassword',{params:{id:studentId,userPassword: this.userPassword}}).then(response=>{
                   debugger
                   if (response.data.code=='200'){
                       this.$message({
                           message:'修改成功',
                           type:'warning'
                       })
                   }
               })
            },
            getId:function () {
                debugger
                const userName = sessionStorage.getItem("userName");
                const that =this;
                this.$http.get(Config.userInfo + '/find',{params:{userName:userName}}).then(response=>{
                    debugger
                    if (response.data.code=='200'){
                        that.uid = response.data.data;
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>