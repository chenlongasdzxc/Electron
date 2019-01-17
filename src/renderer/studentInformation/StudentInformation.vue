<template>
    <div>
        <el-card>
            <FormPanel name="学生基本信息" align="left">
                <!--<div slot="header" style="margin-right: 0">
                    <el-button @click="exportExcel" style="float: right;margin: 5px" size="small" type="info">导出Excel</el-button>
                </div>-->
                <div>
                    <el-input
                            style="width: 90%" size="small" v-model="findWord"
                            class="value-search-box"
                            placeholder="请输入学号或姓名或班级">
                    </el-input>
                    <VButton @click="searchStudentInformation" style="float: right">搜索</VButton>
                </div>
                <div>
                    <el-table
                        :data="studentInformationData"
                        height="300"
                        border
                        size="small"
                        style="width: 100%;text-align: center;font-size: 12px"
                    >
                        <el-table-column
                            fixed
                            prop="xuhao"
                            label="序号"
                            width="50"
                        ></el-table-column>
                        <el-table-column
                            fixed
                            prop="studentName"
                            label="姓名"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别"
                                width="50"
                        ></el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                label="学号"
                                min-width="86"
                        ></el-table-column>
                        <el-table-column
                                prop="studentClass"
                                label="班级"
                                min-width="86"
                        ></el-table-column>
                        <el-table-column
                                prop="roomNumber"
                                label="寝室号"
                                width="60"
                        ></el-table-column>
                        <el-table-column
                                prop="phoneNumber"
                                label="联系电话"
                                width="90"
                        ></el-table-column>
                        <el-table-column
                                prop="politicesStatus"
                                label="政治面貌"
                                width="70"
                        ></el-table-column>
                        <el-table-column
                                prop="idCard"
                                label="身份证号"
                                min-width="126"
                        ></el-table-column>
                        <el-table-column
                                prop="email"
                                label="邮箱"
                        ></el-table-column>
                        <el-table-column
                                prop="bankNumber"
                                label="银行号码"
                        ></el-table-column>
                        <el-table-column
                                prop="bankName"
                                label="开户银行"
                        ></el-table-column>
                        <el-table-column
                                prop="adress"
                                label="家庭住址"
                        ></el-table-column>
                        <el-table-column
                                prop="fileCard"
                                label="建档立卡"
                        ></el-table-column>
                    </el-table>
                </div>
            </FormPanel>
            <FormPanel name="导出Excel" align="left"></FormPanel>
            <VButton @click="exportExcel">导出</VButton>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    import Config from '../Config'
    export default {
        components:{VButton,FormPanel,DataTable},
        data(){
            return{
                findWord:'',
                studentInformationData:[],
            }
        },
        mounted(){
          this.getStudentInformationData();
        },
        methods:{

            /**
             * @description获取学生基本信息
             * **/
            getStudentInformationData:function(){
                this.$http.get(Config.studentInfo+ '/findFuzzy').then(response=>{
                    if (response.data.code == '200'){
                        this.studentInformationData = response.data.data;
                    }else{
                        this.studentInformationData = response.data.data;
                    }
                })
            },

            /**
             * @description搜索学生信息
             * **/
            searchStudentInformation:function () {
                const parms = {
                    findWord: this.findWord,
                };
                const p = JSON.parse(JSON.stringify(parms));
                this.$http.get(Config.studentInfo + '/findFuzzy',{params:p}).then(response=>{
                        if (response.data.code =='200'){
                            this.studentInformationData = response.data.data;
                        } else {
                            this.studentInformationData = response.data.data;
                        }
                })
            },

            /**
             * @description导出学生信息Excel
             * **/
            exportExcel:function () {

            },

        },
    }
</script>

<style scoped>

</style>