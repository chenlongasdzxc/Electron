<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育表现详情" align="left">
                    <div>
                        <el-table :data="moralExpression"
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
                                    label="德育表现年度"
                                    align="center"
                                    prop="moralExpressionYear"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育表现名称"
                                    align="center"
                                    prop="moralExpressionName"
                            ></el-table-column>
                            <el-table-column
                                    label="德育表现分数"
                                    align="center"
                                    prop="moralExpressionScore"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='ME001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='ME002' ">无异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='ME003' ">有异议
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary">是否有异议</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </FormPanel>

                <FormPanel name="班级德育表现详情" align="left">
                    <div>
                        <el-table :data="moralExpression"
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
                                    align="center"
                                    prop="studentName"
                            ></el-table-column>
                            <el-table-column
                                    label="学号"
                                    align="center"
                                    prop="studentNumber"
                            ></el-table-column>
                            <el-table-column
                                    label="德育表现年度"
                                    align="center"
                                    prop="moralExpressionYear"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育表现分数"
                                    align="center"
                                    prop="moralExpressionScore"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='ME001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='ME002' ">无异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='ME003' ">有异议
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="详情"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="checkParticular(scope.row)">查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="详情"
                    :visible.sync="moralExpressionDialogVisible"
                    width="30%">
                <div>
                    <el-table :data="personalMoralExpression"
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
                                label="德育表现年度"
                                align="center"
                                prop="moralExpressionYear"
                        >
                        </el-table-column>
                        <el-table-column
                                label="德育表现名称"
                                align="center"
                                prop="moralExpressionName"
                        ></el-table-column>
                        <el-table-column
                                label="德育表现分数"
                                align="center"
                                prop="moralExpressionScore"
                        ></el-table-column>
                        <el-table-column
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='ME001' ">未查看
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='ME002' ">无异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='ME003' ">有异议
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div slot="footer">

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    export default {
        components:{FormPanel},
        name: "MoralExpression",
        data(){
            return{
                moralExpression:[],
                studentData:[],
                personalMoralExpression:[],
                moralExpressionDialogVisible:false,
                studentNumber:'',
                year:'',
            }
        },

        mounted(){
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralExpressionData();
        },

        methods:{


            /**
             * @description获取个人德育表现
             * **/
            getMoralExpressionData:function () {
                const params = {
                    studentNumber:this.studentData.studentNumber,
                }
                this.$http.get(Config.StudentMoralExpression + '/findPersonal',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.moralExpression = response.data.data
                        }else {
                            this.$message({
                                message:'获取数据失败',
                                type:'warning',
                                center:true,
                            })
                        }
                    })
            },

            /**
             * @description查看详情
             * **/
            checkParticular:function (value) {
                this.studentNumber = value.studentNumber;
                this.year = value.year;
                this.getPersonalMoralExpression();
                this.moralExpressionDialogVisible = true;

            },

            getPersonalMoralExpression:function () {
                const that = this;
                const params = {
                    studentNumber:that.studentNumber,
                    year:that.year,
                }
                this.$http.get(Config.StudentMoralExpression + '/')
            }
        },
    }
</script>

<style scoped>

</style>