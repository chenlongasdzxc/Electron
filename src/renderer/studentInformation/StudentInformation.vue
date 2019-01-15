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
                        border
                        height="300"
                        style="width: 100%;text-align: center;font-size: 13px"
                    >

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

        methods:{

            /**
             * @description搜索学生信息
             * **/
            searchStudentInformation:function () {
                this.$http.get(Config.studentInfo + '/findFuzzy',this.findWord).then(response=>{

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