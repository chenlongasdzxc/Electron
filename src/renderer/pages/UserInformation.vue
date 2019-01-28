<template>
    <div>
        <div>
            <el-card>
                <form-panel name="个人基本信息" align="left">
                    <el-row>
                        <el-col :span="8" style="padding-left: 0px">
                            <ul>
                                <li><label>姓名：</label>{{personalInfo.studentName}}</li>
                                <li><label>性别：</label>{{personalInfo.sex}}</li>
                                <li><label>民族：</label>{{personalInfo.nation}}</li>
                                <li><label>籍贯：</label>{{personalInfo.originPlace}}</li>
                                <li><label>年级：</label>{{personalInfo.grade}}</li>
                                <li><label>专业：</label>{{personalInfo.major}}</li>
                                <li><label>班级：</label>{{personalInfo.studentClass}}</li>
                                <li><label>寝室：</label>{{personalInfo.roomNumber}}</li>
                            </ul>
                        </el-col>
                        <el-col :span="15">
                            <ul>
                                <li><label>联系电话：</label>{{personalInfo.phoneNumber}}</li>
                                <li><label>邮箱号码：</label>{{personalInfo.email}}</li>
                                <li><label>身份证号：</label>{{personalInfo.idCard}}</li>
                                <li><label>银行卡号：</label>{{personalInfo.bankNumber}}</li>
                                <li><label>开户银行：</label>{{personalInfo.bankName}}</li>
                                <li><label>家庭住址：</label>{{personalInfo.adress}}</li>
                                <li><label>政治面貌：</label>{{personalInfo.politicesStatus}}</li>
                                <li><label>建档立卡：</label>{{personalInfo.fileCard}}</li>
                            </ul>
                        </el-col>
                    </el-row>
                </form-panel>
                <form-panel name="个人信息编辑" align="left" isNone="false" collapsible>
                    <el-row>
                        <el-form ref="form" :model="studentForm" label-width="100px" label-position="left">
                            <el-col :span="12" style="padding-left: 0px">
                                <el-form-item label="联系电话">
                                    <el-input v-model="studentForm.phoneNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" class="studentFormLabel">
                                    <el-input v-model="studentForm.email" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="民族" class="studentFormLabel">
                                    <el-input v-model="studentForm.nation" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="籍贯" class="studentFormLabel">
                                    <el-input v-model="studentForm.originPlace" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="寝室" class="studentFormLabel">
                                    <el-input v-model="studentForm.roomNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="联系电话">
                                    <el-input v-model="studentForm.phoneNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="开户银行" class="studentFormLabel">
                                    <el-input v-model="studentForm.bankName" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="银行号码" class="studentFormLabel">
                                    <el-input v-model="studentForm.bankNumber" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="家庭住址" class="studentFormLabel">
                                    <el-input v-model="studentForm.adress" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                                <el-form-item label="政治面貌" class="studentFormLabel">
                                    <el-input v-model="studentForm.politicesStatus" size="small"
                                              style="width: 150px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                    <div class="studentFormButton">
                        <!-- <VButton @click="cleanStudentInfo">重置</VButton>-->
                        <VButton @click="saveStudentInfo">保存</VButton>
                    </div>
                </form-panel>
                <form-panel name="密码修改" align="left" isNone="false" collapsible>
                    <el-form ref="form" v-model="passwordForm">
                        <el-form-item label="新密码">
                            <el-input v-model="passwordForm.userPassword" size="small" style="width: 150px"></el-input>
                        </el-form-item>

                    </el-form>
                    <div class="studentFormButton">
                        <VButton @click="saveNewPassword">保存</VButton>
                    </div>
                </form-panel>
            </el-card>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import Config from '../config'
    import FormPanel from '../components/FormPanel'
    import VInput from '../components/Input'

    export default {
        components: {VButton, FormPanel, VInput},
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
                personalInfo: [],
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

            /**
             * @description 查找个人基本信息
             * **/
            findStudentInfo: function () {
                const that = this;
                const name = sessionStorage.getItem("userName");
                this.$http.get(Config.studentInfo + '/findPersonalInfo', {params: {userName: name}}).then(function (response) {
                    if (response.data.code == '200') {
                        that.personalInfo = response.data.data;
                        if (response.data.data.fileCard == '1') {
                            that.personalInfo.fileCard = '是'
                        } else {
                            that.personalInfo.fileCard = '否'
                        }
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
                this.studentForm = '';
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
                this.$http.post(Config.userInfo + '/changePassword', this.passwordForm).then(response => {
                    if (response.data.code == '200') {
                        this.$notify({
                            title: '提示',
                            message: '密码修改成功'
                        })
                    } else {
                        this.$notify({
                            title: '提示',
                            message: '修改失败'
                        })
                    }
                })
            },

        }
    }
</script>

<style>
    .studentFormLabel {
        margin-top: -22px;
    }

    .studentFormButton {
        float: right;
    }
</style>