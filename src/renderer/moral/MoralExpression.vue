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
                                    label="分数"
                                    align="center"
                                    prop="moralExpressionScore"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    label="上传人"
                                    align="center"
                                    prop="applyPersonName"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    width="100px"
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
                                    <el-button size="mini" type="danger"
                                               @click="refuseMoralExpression(scope.row)"
                                               :disabled="checkMoralExpressionButton(scope.row)"
                                    >有异议
                                    </el-button>
                                    <el-button size="mini" type="primary"
                                               @click="applyMoralExpression(scope.row)"
                                               :disabled="applyMoralExpressionButton(scope.row)"
                                    >无异议</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </FormPanel>

                <FormPanel name="班级德育表现详情" align="left">
                    <!--搜索-->
                    <div>

                    </div>
                    <!--表格-->
                    <div>
                        <el-table :data="moralExpressionClassData"
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
                                    label="班级"
                                    align="center"
                                    prop="studentClass"
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
                                    prop="moralExpressionTotalScore"
                            ></el-table-column>
                            <el-table-column
                                    label="详情"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="checkParticular(scope.row)">查看详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--分页-->
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralExpressionClassDataSizeChange"
                                @current-change="moralExpressionClassDataCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralExpressionClassDataPage.currentPage"
                                :page-size="moralExpressionClassDataPage.size"
                                :total="moralExpressionClassDataPage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="德育表现详情"
                    :visible.sync="moralExpressionDialogVisible"
                    width="30%">
                <!--表格-->
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
                                width="120px"
                        ></el-table-column>
                        <el-table-column
                                label="上传人"
                                align="center"
                                prop="applyPersonName"
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
            </el-dialog>


        </div>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel},
        name: "MoralExpression",
        data() {
            return {
                moralExpression: [],
                studentData: [],
                personalMoralExpression: [],
                moralExpressionClassData:[],
                moralExpressionDialogVisible: false,
                dialogVisible: false,
                studentNumber: '',
                year: '',
                moralExpressionFormWidth: '100px',
                PersonalMoralExpressionFormData: {
                    id: '',
                    value: '',
                },
                moralExpressionClassDataPage:{
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                moralExpressionValue: [
                    {
                        value: '无异议',
                        label: '无异议',
                    }, {
                        value: '有异议',
                        label: '有异议',
                    }
                ],
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },

        methods: {

            init:function(){
                this.getMoralExpressionData();
                this.getMoralExpressionClassData();
            },

            /**
             * @description获取个人德育表现
             * **/
            getMoralExpressionData: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    grade: this.studentData.grade,
                    studentClass: this.studentData.studentClass,
                }
                this.$http.get(Config.StudentMoralExpression + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralExpression = response.data.data
                        } else {
                            this.$message({
                                message: '获取数据失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description查看详情
             * **/
            checkParticular: function (value) {
                this.getPersonalMoralExpression(value);
                this.moralExpressionDialogVisible = true;
            },

            /**
             * @description查看详情
             * **/
            getPersonalMoralExpression: function (value) {
                const params = {
                    studentNumber: value.studentNumber,
                    moralExpressionYear: value.moralExpressionYear,
                    grade: value.grade,
                    studentClass: value.studentClass,
                }
                this.$http.get(Config.StudentMoralExpression + '/findPersonal',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.personalMoralExpression = response.data.data;
                        } else {
                            this.$message({
                                message:'查询失败',
                                type:'danger',
                                center:true,
                            })
                        }
                    })
            },


            /**
             * @description按钮禁用事件
             * **/
            checkMoralExpressionButton: function (value) {
                if (value.states != 'ME001') {
                    return true;
                } else {
                    return false;
                }
            },

            applyMoralExpressionButton:function(value){
                if (value.states == 'ME002') {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @description无异议
             * **/
            applyMoralExpression: function (value) {
                const params = {
                    id: value.id,
                    states: 'ME002',
                }
                this.$http.get(Config.StudentMoralExpression + '/checkMoralExpression', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                                center: true,
                            })
                            this.init();
                        } else {
                            this.$message({
                                message: '长传失败',
                                type: 'warning',
                                center: true,
                            })
                            this.init();
                        }
                    })

            },

            /**
             * @description有异议
             * **/
            refuseMoralExpression: function (value) {
                const params = {
                    id: value.id,
                    states: 'ME003',
                }
                this.$http.get(Config.StudentMoralExpression + '/checkMoralExpression', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                                center: true,
                            })
                            this.init();
                        } else {
                            this.$message({
                                message: '长传失败',
                                type: 'warning',
                                center: true,
                            })
                            this.init();
                        }
                    })

            },

            /**
             * @description获取班级德育表现
             * **/
            getMoralExpressionClassData:function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    grade:this.studentData.grade,
                    major:this.studentData.major,
                }
                this.$http.get(Config.StudentMoralExpression + '/findMoralExpressionTotal',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.moralExpressionClassData = response.data.data.content;
                            this.moralExpressionClassDataPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message:'获取班级德育表现失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            },

            /**
             * @description获取班级德育表现分页size事件
             * **/
            moralExpressionClassDataSizeChange:function (value) {
                this.moralExpressionClassDataPage.size = value;
                this.moralExpressionClassDataPage.currentPage = 1;
                this.getMoralExpressionClassData();
            },


            /**
             * @description获取班级德育表现分页current事件
             * **/
            moralExpressionClassDataCurrentChange:function (value) {
                this.moralExpressionClassDataPage.currentPage = value;
                this.getMoralExpressionClassData();
            },

        },
    }
</script>

<style scoped>

</style>