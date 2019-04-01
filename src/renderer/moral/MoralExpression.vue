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
                                    label="上传人"
                                    align="center"
                                    prop="applyPersonName"
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
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="德育表现详情"
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

            <el-dialog
                    title="操作"
                    :visible.sync="dialogVisible"
                    width="10%">
                <el-form :model="PersonalMoralExpressionFormData">
                    <el-form-item label="是否有异议：" :label-width="moralExpressionFormWidth">
                        <el-select size="mini" style="width: 200px"
                                   v-model="PersonalMoralExpressionFormData.value">
                            <el-option
                                    v-for="item in moralExpressionValue"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
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
            this.getMoralExpressionData();
            this.getMoralExpressionClassData();
        },

        methods: {


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
                    year: value.year,
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
                            this.getMoralExpressionData();
                        } else {
                            this.$message({
                                message: '长传失败',
                                type: 'warning',
                                center: true,
                            })
                            this.getMoralExpressionData();
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
                            this.getMoralExpressionData();
                        } else {
                            this.$message({
                                message: '长传失败',
                                type: 'warning',
                                center: true,
                            })
                            this.getMoralExpressionData();
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
                        } else {
                            this.$message({
                                message:'获取班级德育表现失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            }
        },
    }
</script>

<style scoped>

</style>