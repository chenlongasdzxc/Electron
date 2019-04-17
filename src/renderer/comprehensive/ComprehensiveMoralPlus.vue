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
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary"
                                               @click="comprehensiveMoralPlusButton(scope.row)">审核
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralPlusSizeChange"
                                @current-change="moralPlusCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralPlusPage.currentPage"
                                :page-size="moralPlusPage.size"
                                :total="moralPlusPage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>

            <div>
                <FormPanel name="申请综合素质课外加分审核" align="left">
                    <div>
                        <el-table :data="comprehensiveMoralOut"
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
                                    prop="moralOutName"
                                    label="加分名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutType"
                                    label="加分类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutScore"
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
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="comprehensiveMoralOutButton">审核
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralOutSizeChange"
                                @current-change="moralOutCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralOutPage.currentPage"
                                :page-size="moralOutPage.size"
                                :total="moralOutPage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="审核"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-form :model="applyFormData" style="font-size: 12px;text-align: left" size="small">
                        <el-form-item label="理由:" :label-width="formLabelWidth">
                            <el-input v-model="applyFormData.value" style="width: 400px" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer">
                    <el-button size="small" type="success" @click="passApply">通过</el-button>
                    <el-button size="small" type="danger" @click="rejectApply">驳回</el-button>
                </div>
            </el-dialog>
        </div>

        <div>
            <el-dialog
                    title="审核"
                    :visible.sync="moralOutDialogVisible"
                    width="30%">
                <div>
                    <el-form :model="moralOutFormData" style="font-size: 12px;text-align: left" size="small">
                        <el-form-item label="理由:" :label-width="formLabelWidth">
                            <el-input v-model="moralOutFormData.value" style="width: 400px" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer">
                    <el-button size="small" type="success" @click="passMoralOutApply">通过</el-button>
                    <el-button size="small" type="danger" @click="rejectMoralOutApply">驳回</el-button>
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
        name: "ComprehensiveMoralPlus",
        data() {
            return {
                moralOutDialogVisible: false,
                comprehensiveMoralPlus: [],
                comprehensiveMoralOut: [],
                studentData: [],
                moralOutPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                moralPlusPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                formLabelWidth: '100px',
                dialogVisible: false,
                applyFormData: {
                    value: '',
                    id: '',
                },
                moralOutFormData: {
                    value: '',
                    id: '',
                },
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getComprehensiveMoralPlusData();
            this.getComprehensiveMoralOutData();
        },


        methods: {

            /**
             * @description获取申请综合素质课外加分数据
             * **/
            getComprehensiveMoralOutData: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    comprehensiveQualityStates: 'MOCQS001'
                }
                this.$http.get(Config.Apply + '/findFuzzyMoralOut', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.comprehensiveMoralOut = response.data.data.content;
                            this.moralOutPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description获取申请综合素质德育加分数据
             * **/
            getComprehensiveMoralPlusData: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    grade: this.studentData.grade,
                    states: 'MP002',
                    comprehensiveQualityStates: 'MPCQS001',
                    page: this.moralPlusPage.currentPage - 1,
                    size: this.moralPlusPage.size,
                }
                this.$http.get(Config.Apply + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.comprehensiveMoralPlus = response.data.data.content;
                            this.moralPlusPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true
                            })
                        }
                    })
            },

            /**
             * @description审核综合素质德育加分
             * **/
            comprehensiveMoralPlusButton: function (value) {
                this.applyFormData.id = value.id;
                this.dialogVisible = true;
            },

            /**
             * @description同意申请
             * **/
            passApply: function () {
                const params = {
                    id: this.applyFormData.id,
                    comprehensiveQualityStates: 'MPCQS002',
                    applyComprehensiveNumber: this.studentData.studentNumber,
                    applyComprehensiveName: this.studentData.studentName,
                }
                this.$http.get(Config.Apply + '/update', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.dialogVisible = false;
                            this.$message({
                                message: '审核成功',
                                type: 'success',
                                center: true,
                            })
                        } else if (response.data.code == '403') {
                            this.dialogVisible = false;
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        } else {
                            this.dialogVisible = false;
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.getComprehensiveMoralPlusData();
                    })
            },

            /**
             * @description审核不通过
             * **/
            rejectApply: function () {
                const params = {
                    id: this.applyFormData.id,
                    comprehensiveQualityStates: 'MPCQS003',
                    applyComprehensiveNumber: this.studentData.studentNumber,
                    applyComprehensiveName: this.studentData.studentName,
                }
                this.$http.get(Config.Apply + '/update', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.dialogVisible = false;
                            this.$message({
                                message: '驳回成功',
                                type: 'success',
                                center: true,
                            })
                        } else if (response.data.code == '403') {
                            this.dialogVisible = false;
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        } else {
                            this.dialogVisible = false;
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.getComprehensiveMoralPlusData();
                    })
            },

            /**
             * @description审核综合素质课外加分申请
             * **/
            comprehensiveMoralOutButton: function (value) {
                this.moralOutFormData.id = value.id;
                this.moralOutDialogVisible = true;
            },

            /**
             * @description德育加分分页size事件
             * **/
            moralPlusSizeChange: function (value) {
                this.moralPlusPage.size = value;
                this.moralPlusPage.currentPage = 1;
                this.getComprehensiveMoralPlusData();
            },


            /**
             * @description德育加分分页current事件
             * **/
            moralPlusCurrentChange: function (value) {
                this.moralPlusPage.currentPage = value;
                this.getComprehensiveMoralPlusData();
            },

            /**
             * @description课外加分分页page事件
             * **/
            moralOutSizeChange: function (value) {
                this.moralOutPage.size = value;
                this.moralOutPage.currentPage = 1;
                this.getComprehensiveMoralOutData();
            },
            /**
             * @description课外加分分页current事件
             * **/
            moralOutCurrentChange: function (value) {
                this.moralOutPage.currentPage = value;
                this.getComprehensiveMoralOutData();
            },

            passMoralOutApply: function () {

            },

            rejectMoralOutApply: function () {

            },


        }
    }
</script>

<style scoped>

</style>