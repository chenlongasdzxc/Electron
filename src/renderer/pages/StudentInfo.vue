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
                        <el-col :span="15">
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
                    <el-row>
                        <el-form ref="form" :model="studentForm" label-width="100px" label-position="left">
                            <el-col :span="10" style="padding-left: 0px">
                                <el-form-item label="联系电话">
                                    <el-input v-model="studentForm.phoneNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <el-input v-model="studentForm.email" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号码">
                                    <el-input v-model="studentForm.idCard" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="民族">
                                    <el-select v-model="studentForm.nation" placeholder="请选择">
                                        <el-option v-for="item in options"
                                                   :key="item.studentForm"
                                                   :label="item.label"
                                                   :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="籍贯">
                                    <el-input v-model="studentForm.originPlace" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                    <div>
                        <VButton @click="cleanStudentInfo">重置</VButton>
                        <VButton @click="saveStudentInfo">保存</VButton>
                    </div>
                </form-panel>
                <form-panel name="密码修改" align="left" isNone="false" collapsible>
                    <el-form ref="form" v-model="passwordForm">
                        <el-form-item label="新密码">
                            <el-input v-model="passwordForm.userPassword" size="small" style="width: 150px"></el-input>
                        </el-form-item>
                        <VInput></VInput>
                    </el-form>
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
    import VInput from  '../components/Input'

    export default {
        components: {VButton, FormPanel,VInput},
        name: "StudentInfo",
        data() {
            return {
                options: [{
                    value: '',
                    label: '汉族',
                }],
                passwordForm: {
                    id: '',
                    userPassword: '',

                },

                uid: '',
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
                    nation: '',
                    originPlace: '',
                },
            }
        },
        mounted() {
            this.findStudentInfo();
            this.findStudentForm();
        },
        methods: {
            backToMenu: function () {
                this.$router.push({path: '/Menu'})
            },


            /**
             * @description 查找个人基本信息
             * **/
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

            /**
             * @description 查找编辑信息
             * **/
            findStudentForm: function () {
                const that = this;
                let url = Config.studentInfo + '/get';
                const name = sessionStorage.getItem("userName");
                this.$http.get(url, {params: {userName: name}}).then(function (response) {
                    if (response.data.code == '200') {
                        sessionStorage.setItem("userInfo", response.data.data);
                        that.studentForm = response.data.data;
                    }
                })
            },
            /**
             * @description:重置
             * **/
            cleanStudentInfo: function () {

            },

            /**
             * @description 保存编辑信息
             * **/
            saveStudentInfo: function () {
                let url = Config.studentInfo + '/update';
                this.$http.post(url, this.studentForm).then(response => {
                    if (response.data.code == '200') {
                        this.$notify({
                            title: '提示',
                            message: '编辑成功'
                        })
                        this.findStudentInfo();
                    }
                })
            },

            /**
             * @description:修改密码
             * **/
            saveNewPassword: function () {
                this.passwordForm.id = sessionStorage.getItem("uid");
                let url = Config.userInfo + '/changePassword';
                this.$http.post(url, this.passwordForm).then(response => {
                    if (response.data.code == '200') {
                        this.$notify({
                            title: '提示',
                            message: '密码修改成功'
                        })
                    }
                    if (response.data.code == '402') {
                        this.$notify({
                            title: '提示',
                            message: '密码相同，请重新输入'
                        })
                    }
                })
            },

        }
    }
</script>

<style>

</style>