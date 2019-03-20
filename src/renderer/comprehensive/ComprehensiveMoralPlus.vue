<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="申请综合素质德育加分审核" align="left">
                    <div>
                        <el-table :data="comprehensiveMoralPlus"
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
                                    prop="studentName"
                                    label="学生姓名"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentNumber"
                                    label="学生学号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusName"
                                    label="加分名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusType"
                                    label="加分类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusScore"
                                    label="加分分数"
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
                                    <el-button size="mini" type="primary">审核</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </FormPanel>
            </div>

            <div>
                <FormPanel name="不知道" align="left"></FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    export default {
        components: {FormPanel},
        name: "ComprehensiveMoralPlus",
        data(){
          return{
              comprehensiveMoralPlus:[],
              studentData:[],
          }
        },
        
        mounted(){
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getComprehensiveMoralPlusData();
        },
        
        
        methods:{

            /**
             * @description获取申请综合素质德育加分数据
             * **/
            getComprehensiveMoralPlusData:function () {
                const params = {
                    studentClass:this.studentData.studentClass,
                    grade:this.studentData.grade,
                    states:'MP002',
                    comprehensiveQualityStates:'MPCQS001',
                }
                this.$http.get(Config.Apply + '/findFuzzy',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.comprehensiveMoralPlus = response.data.data.content;
                        } else {
                            this.$message({
                                message:'查询失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            },
        }
    }
</script>

<style scoped>

</style>