<template>
    <div>
        <el-card>
            <!--综合素质德育加分-->
            <div>
                <FormPanel name="申请综合素质德育加分审核" align="left">
                    <div>
                        <el-table :data="comprehensiveMoralPlus"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  height="256px"
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
            <!--综合素质课外加分-->
            <div>
                <FormPanel name="申请综合素质课外加分审核" align="left">
                    <div>
                        <el-table :data="comprehensiveMoralOut"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  height="256px"
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
                                    <el-button size="mini" type="primary"
                                               @click="comprehensiveMoralOutButton(scope.row)">审核
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
        <!--审核申请综合素质德育加分弹窗-->
        <div>
            <el-dialog
                    title="审核综合素质德育加分"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-table :data="personalApplyMoralPlusComprehensive"
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
                                prop="comprehensiveQualityStates"
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini"
                                        v-if="scope.row.comprehensiveQualityStates =='CQMP001' ">未审核
                                </el-tag>
                                <el-tag type="success" size="mini"
                                        v-if="scope.row.comprehensiveQualityStates =='CQMP002' ">同意申请
                                </el-tag>
                                <el-tag type="danger" size="mini"
                                        v-if="scope.row.comprehensiveQualityStates =='CQMP003' ">被驳回
                                </el-tag>
                                <el-tag type="success" size="mini"
                                        v-if="scope.row.comprehensiveQualityStates =='' ">未申请
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div>
                    <el-form :model="applyFormData" style="font-size: 12px;text-align: left" size="small">
                        <el-form-item label="审核理由:" :label-width="formLabelWidth">
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
        <!--审核申请综合素质课外加分弹窗-->
        <div>
            <el-dialog
                    title="审核综合素质课外加分"
                    :visible.sync="moralOutDialogVisible"
                    width="30%">
                <div>
                    <div>
                        <el-table :data="personalApplyMoralOutComprehensive"
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
                                    prop="comprehensiveQualityStates"
                                    label="状态"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini"
                                            v-if="scope.row.comprehensiveQualityStates =='CQMO001' ">未审核
                                    </el-tag>
                                    <el-tag type="success" size="mini"
                                            v-if="scope.row.comprehensiveQualityStates =='CQMO002' ">同意申请
                                    </el-tag>
                                    <el-tag type="danger" size="mini"
                                            v-if="scope.row.comprehensiveQualityStates =='CQMO003' ">被驳回
                                    </el-tag>
                                    <el-tag type="success" size="mini"
                                            v-if="scope.row.comprehensiveQualityStates =='' ">未申请
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <el-form :model="moralOutFormData" style="font-size: 12px;text-align: left" size="small">
                            <el-form-item label="审核理由:" :label-width="formLabelWidth">
                                <el-input v-model="moralOutFormData.value"
                                          type="textarea"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
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
                personalApplyMoralOutComprehensive: [],
                moralOutDialogVisible: false,
                comprehensiveMoralPlus: [],
                personalApplyMoralPlusComprehensive: [],
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
            this.init();
        },


        methods: {

            init: function () {
                this.getComprehensiveMoralPlusData();
                this.getComprehensiveMoralOutData();
            },

            /**
             * @description获取申请综合素质课外加分数据
             * **/
            getComprehensiveMoralOutData: function () {
                const params = {
                    grade: this.studentData.grade,
                    major: this.studentData.major,
                    studentClass: this.studentData.studentClass,
                    comprehensiveQualityStates: 'CQMO001'
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
                    comprehensiveQualityStates: 'CQMP001',
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
                this.getComprehensiveMoralPlus(value);
                this.dialogVisible = true;
            },

            /**
             * @description同意申请
             * **/
            passApply: function () {
                const value = 'CQMP002'
                this.moralPlusApply(value);
            },

            /**
             * @description审核不通过
             * **/
            rejectApply: function () {
                const value = 'CQMP003'
                this.moralPlusApply(value);
            },

            /**
             * @description审核综合素质课外加分申请弹窗
             * **/
            comprehensiveMoralOutButton: function (value) {
                this.moralOutFormData.id = value.id;
                const params = {
                    studentNumber: value.studentNumber,
                    moralOutType: value.moralOutType,
                    year: value.year,
                    states: 'MO002'

                }
                this.$http.get(Config.StudentMoralOut + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalApplyMoralOutComprehensive = response.data.data.content;
                        } else {
                            this.$message({
                                message: "获取个人数据失败",
                                type: 'success',
                                center: true,
                            })
                        }
                    })
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

            /**
             * @description同意申请综合素质课外加分申请
             * **/
            passMoralOutApply: function () {
                const value = 'CQMO002'
                this.moralOutApply(value);
            },
            /**
             * @description驳回申请综合素质课外加分申请
             * **/
            rejectMoralOutApply: function () {
                const value = 'CQMO003';
                this.moralOutApply(value);
            },

            /**
             * @description审核申请综合素质课外加分
             * **/
            moralOutApply: function (value) {
                const params = {
                    id: this.moralOutFormData.id,
                    applyValue: this.moralOutFormData.value,
                    comprehensiveQualityStates: value,
                    applyComprehensiveNumber: this.studentData.studentNumber,
                    applyComprehensiveName: this.studentData.studentName,
                }
                this.$http.get(Config.Apply + '/updateMoralOut', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '审核成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '审核失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.getComprehensiveMoralOutData();
                        this.moralOutDialogVisible = false;
                    })
            },

            /**
             * @description审核申请综合素质德育加分
             * **/
            moralPlusApply: function (value) {
                const params = {
                    id: this.applyFormData.id,
                    applyValue: this.applyFormData.value,
                    comprehensiveQualityStates: value,
                    applyComprehensiveNumber: this.studentData.studentNumber,
                    applyComprehensiveName: this.studentData.studentName,
                }
                this.$http.get(Config.Apply + '/updateMoralPlus', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '审核成功',
                                type: 'success',
                                center: true,
                            })
                        } else if (response.data.code == '403') {
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.dialogVisible = false;
                        this.getComprehensiveMoralPlusData();
                    })
            },


            /**
             * @description获取个人申请综合素质德育加分数据
             * **/
            getComprehensiveMoralPlus: function (value) {
                console.log(value);
                debugger
                const params = {
                    studentNumber: value.studentNumber,
                    year: value.year,
                    moralPlusType: value.moralPlusType,
                    states: value.states,
                }
                this.$http.get(Config.Apply + "/findFuzzy", {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalApplyMoralPlusComprehensive = response.data.data.content;
                        } else {
                            this.$message({
                                message: '获取个人申请综合素质德育加分数据失败',
                                type: 'success',
                                center: true,
                            })
                        }
                    })
            }

        }
    }
</script>

<style scoped>

</style>