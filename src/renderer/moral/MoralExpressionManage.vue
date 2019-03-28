<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="德育表现" align="left">
                    <div>
                        <el-form :model="moralExpressionForm" size="small">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="德育表现年度：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="moralExpressionForm.year"
                                                   @change="moralExpressionYearChange"
                                        >
                                            <el-option
                                                    v-for="item in moralExpressionYear"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="德育表现名称：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 120px" v-model="moralExpressionForm.name">
                                            <el-option
                                                    v-for="item in moralExpressionName"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.label"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <div style="float: right">
                                        <el-button size="mini" type="danger">重置</el-button>
                                        <el-button size="mini" type="success" @click="saveMoralExpressionForm">确认
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="saveStudentMoralExpression">保存</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div>
                        <el-table :data="studentMoralExpressionData"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  @select="tableSelection"
                                  size="mini">
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    width="40px"
                            ></el-table-column>
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentName"
                                    label="姓名"
                                    align="center"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentNumber"
                                    label="学号"
                                    align="center"
                                    width="120px"
                            ></el-table-column>
                            <el-table-column
                                    label="德育表现年度"
                                    align="center"
                                    prop="moralExpressionYear"
                                    :formatter="moralExpressionYearFunction"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="德育表现名称"
                                    align="center"
                                    :formatter="moralExpressionNameFunction"
                                    prop="moralExpressionName"
                            ></el-table-column>
                            <el-table-column
                                    label="德育表现分数"
                                    align="center"
                                    width="140px"
                                    prop="moralExpressionScore"
                            >
                                <template slot-scope="scope">
                                    <el-input size="mini" style="width: 100px"></el-input>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralExpressionSizeChange"
                                @current-change="moralExpressionCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralExpressionPage.currentPage"
                                :page-size="moralExpressionPage.size"
                                :total="moralExpressionPage.total"
                        ></el-pagination>

                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="已上传德育表现" align="left">
                    <div>

                    </div>
                    <div>
                        <el-table :data="studentMoralExpressionUpdated"
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
                                    label="姓名"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentNumber"
                                    label="学号"
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

                        </el-table>
                    </div>
                </FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "MoralAudit",
        data() {
            return {
                moralExpressionFormWidth: '120px',
                studentMoralExpressionUpdated: [],
                studentMoralExpressionData: [],
                studentData: [],
                moralExpressionForm: {
                    year: '',
                    name: '',
                },
                moralExpressionPage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                moralExpressionYear: [{
                    value: '第一学年',
                    label: '第一学年'
                }, {
                    value: '第二学年',
                    label: '第二学年'
                }, {
                    value: '第三学年',
                    label: '第三学年'
                }, {
                    value: '第四学年',
                    label: '第四学年'
                }],
                moralExpressionName: [],
            }

        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getStudentMoralExpressionData();
            this.getMoralExpressionName();
            this.getStudentMoralExpressionUpdated();
        },

        methods: {

            tableSelection: function (value) {
                console.log(value);
            },

            /**
             * @description获取本班学生基本信息
             * **/
            getStudentMoralExpressionData: function () {
                const params = {
                    findWord: this.studentData.studentClass,
                    page: this.moralExpressionPage.currentPage - 1,
                    size: this.moralExpressionPage.size,
                }
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.studentMoralExpressionData = response.data.data.content;
                            this.moralExpressionPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'warning',
                                center: true
                            })
                        }
                    })
            },

            /**
             * @description德育表现分页size改变事件
             * **/
            moralExpressionSizeChange: function (value) {
                this.moralExpressionPage.size = value;
                this.moralExpressionPage.currentPage = 1;
                this.getStudentMoralExpressionData();
            },

            /**
             * @description德育表现分页current改变事件
             * **/
            moralExpressionCurrentChange: function (value) {
                this.moralExpressionPage.currentPage = value;
                this.getStudentMoralExpressionData();
            },

            /**
             * @description获取德育表现名称
             * **/
            getMoralExpressionName: function () {
                this.$http.get(Config.moralExpression + '/findMoralExpressionName')
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralExpressionName.push(option);
                                }
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: '获取失败！',
                                type: 'error'
                            });
                        }
                    })
            },

            /**
             * @description年度下拉框change事件
             * **/
            moralExpressionYearChange: function (value) {
                console.log(value)
                this.studentMoralExpressionData.moralExpressionYear = value;
            },

            moralExpressionYearFunction: function (row, column, cellValue, index) {
                return this.moralExpressionForm.year;
            },


            moralExpressionNameFunction: function (row, column, cellValue, index) {
                return this.moralExpressionForm.name;
            },

            /**
             * @description保存德育表现年度和名称
             * **/
            saveMoralExpressionForm: function () {

            },

            /**
             * @description保存德育表现
             * **/
            saveStudentMoralExpression:function () {

            },

            /**
             * @description获取已上传德育表现信息
             * **/
            getStudentMoralExpressionUpdated:function () {
                const params = {
                    grade: this.studentData.grade,
                    studentClass:this.studentData.studentClass,
                }
                this.$http.get(Config.StudentMoralExpression + '/findFuzzy',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.studentMoralExpressionUpdated = response.data.data.content;
                        } else {
                            this.$message({
                                message:'获取数据失败',
                                type:'warning',
                                center:true,
                            })
                        }
                    })
            }
        },
    }
</script>

<style scoped>

</style>