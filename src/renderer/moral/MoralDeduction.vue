<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育减分" align="left">
                    <!--表格-->
                    <div>
                        <el-table :data="personalMoralDeductionData"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  size="mini"
                                    height="246px"
                        >
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="德育减分类型"
                                    align="center"
                                    prop="moralDeductionType"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分年度"
                                    align="center"
                                    prop="moralDeductionYear"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分次数"
                                    align="center"
                                    prop="moralDeductionNumber"
                                    width="100px"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分分数"
                                    align="center"
                                    prop="moralDeductionScore"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    label="描述"
                                    align="center"
                                    prop="description"
                            ></el-table-column>
                            <el-table-column
                                    label="上传人"
                                    align="center"
                                    prop="applyPersonName"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    prop="states"
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='MD001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='MD002' ">无异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MD003' ">有异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MD004' ">被驳回
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary"
                                               @click="applyMoralDeduction(scope.row)"
                                               :disabled="moralDeductionButton(scope.row)"
                                    >无异议
                                    </el-button>
                                    <el-button size="mini" type="danger"
                                               @click="refuseMoralDeduction(scope.row)"
                                               :disabled="moralDeductionButton(scope.row)"
                                    >有异议
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
                                @size-change="personalMoralDeductionPageChange"
                                @current-change="personalMoralDeductionPageCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="personalMoralDeductionPage.currentPage"
                                :page-size="personalMoralDeductionPage.size"
                                :total="personalMoralDeductionPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
                <FormPanel name="班级德育减分" align="left">
                    <!--搜索-->
                    <div>

                    </div>
                    <div>
                        <el-table :data="moralDeductionClassData"
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
                                    prop="studentName"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="学号"
                                    prop="studentNumber"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="德育减分年度"
                                    align="center"
                                    prop="year"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育减分分数"
                                    align="center"
                                    prop="studentMoralDeductionScoreTotal"
                            ></el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="searchPersonalData(scope.row)">详情
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
                                @size-change="moralDeductionClassPageChange"
                                @current-change="moralDeductionClassPageCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralDeductionClassPage.currentPage"
                                :page-size="moralDeductionClassPage.size"
                                :total="moralDeductionClassPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>


        <div>
            <el-dialog
                    title="德育减分详情"
                    :visible.sync="moralDeductionDialogVisible"
                    width="30%">
                <!--表格-->
                <div>
                    <el-table :data="personalMoralDeduction"
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
                                label="德育减分年度"
                                align="center"
                                prop="moralDeductionYear"
                                width="100px"
                        >
                        </el-table-column>
                        <el-table-column
                                label="德育减分类型"
                                align="center"
                                prop="moralDeductionType"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                label="德育减分分数"
                                align="center"
                                prop="moralDeductionScore"
                                width="120px"
                        ></el-table-column>
                        <el-table-column
                                label="描述"
                                align="center"
                                prop="description"
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
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='MD001' ">未查看
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='MD002' ">无异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='MD003' ">有异议
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='MD004' ">被驳回
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
        name: "MoralDeduction",
        data() {
            return {
                moralDeductionDialogVisible: false,
                personalMoralDeduction: [],
                personalMoralDeductionData: [],
                moralDeductionClassData: [],
                personalMoralDeductionPage: {
                    total: 1,
                    size: 5,
                    currentPage: 1,
                },
                moralDeductionClassPage:{
                    total: 1,
                    size: 10,
                    currentPage: 1,
                },
                studentData: [],

            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },


        methods: {

            init() {
                this.getPersonalMoralDeductionData();
                this.getMoralDeductionClassData();
            },

            /**
             * @description获取个人德育减分数据
             * **/
            getPersonalMoralDeductionData: function () {
                const params = {
                    major: this.studentData.major,
                    studentClass: this.studentData.studentClass,
                    studentName: this.studentData.studentName,
                    size:this.personalMoralDeductionPage.size,
                    page:this.personalMoralDeductionPage.currentPage - 1,
                }
                this.$http.get(Config.StudentMoralDeduction + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralDeductionData = response.data.data.content;
                            this.personalMoralDeductionPage.total = response.data.data.totalElements;
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
             * @description个人德育减分pagesize事件
             * **/
            personalMoralDeductionPageChange: function (value) {
                this.personalMoralDeductionPage.size = value;
                this.personalMoralDeductionPage.currentPage = 1;
                this.getPersonalMoralDeductionData();
            },

            /**
             * @description个人德育减分pagecurrent事件
             * **/
            personalMoralDeductionPageCurrentChange: function (value) {
                this.personalMoralDeductionPage.currentPage = value;
                this.getPersonalMoralDeductionData();
            },

            /**
             * @description无异议
             * **/
            applyMoralDeduction: function (value) {
                const states = 'MD002'
                this.$http.get(`${Config.StudentMoralDeduction}/update/${value.id}/${states}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.init();
                    })
            },
            /**
             * @description有异议
             * **/
            refuseMoralDeduction: function (value) {
                const states = 'MD003'
                this.$http.get(`${Config.StudentMoralDeduction}/update/${value.id}/${states}`)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.init();
                    })
            },

            /**
             * @description有异议按钮禁用事件
             * **/
            moralDeductionButton: function (value) {
                if (value.states == 'MD002') {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @description获取班级德育减分数据
             * **/
            getMoralDeductionClassData: function () {
                const params = {
                    grade: this.studentData.grade,
                    studentClass: this.studentData.studentClass,
                    size:this.moralDeductionClassPage.size,
                    page:this.moralDeductionClassPage.currentPage - 1,
                }
                this.$http.get(Config.StudentMoralDeduction + '/findFuzzyTotal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralDeductionClassData = response.data.data.content;
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
             * @description查找个人详情
             * **/
            searchPersonalData: function (value) {
                const params = {
                    major: value.major,
                    studentClass: value.studentClass,
                    studentName: value.studentName,
                    moralDeductionYear: value.moralDeductionYear,
                }
                this.$http.get(Config.StudentMoralDeduction + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralDeduction = response.data.data.content;
                        }else {
                            this.$message({
                                message:'查找数据失败',
                                type:'warning',
                                center:true,
                            })
                        }
                    })
                this.moralDeductionDialogVisible = true;
            },

            /**
             * @description班级数据分页事件
             * **/
            moralDeductionClassPageChange:function (value) {
                this.moralDeductionClassPage.size = value;
                this.moralDeductionClassPage.currentPage = 1;
                this.getMoralDeductionClassData();
            },

            /**
             * @description班级数据分页事件
             * **/
            moralDeductionClassPageCurrentChange:function (value) {
                this.moralDeductionClassPage.currentPage = value;
                this.getPersonalMoralDeductionData();
            },



        },
    }
</script>

<style scoped>

</style>