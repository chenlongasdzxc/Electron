<!--素拓分查看页面-->

<template>
    <div>
        <div>
            <FormPanel align="left" name="我的素拓分详情">
                <div>
                    <el-table
                            :data="personalSketchCount"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                align="center"
                                label="序号"
                                width="80px"
                                type="index"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchTypeName"
                                align="center"
                                label="素拓分类型名称"
                        ></el-table-column>
                        <el-table-column
                                prop="scoreCount"
                                align="center"
                                label="分数"
                        ></el-table-column>
                    </el-table>
                </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel align="left" name="数据图">
                <div id="myChartTwo" style="width: 400px;height: 200px"></div>
            </FormPanel>
        </div>
        <div>
            <FormPanel align="left" name="班级素拓分">
                <div>
                    <el-table
                            :data="classSketchScore"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                align="center"
                                label="序号"
                                width="80px"
                                type="index"
                        ></el-table-column>
                        <el-table-column
                                prop="studentName"
                                align="center"
                                label="学生姓名"
                        ></el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                align="center"
                                label="学号"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchScore"
                                align="center"
                                label="素拓分总分"
                        ></el-table-column>
                        <el-table-column
                                align="center"
                                label="操作"
                        >
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click="checkInfo(scope.row)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </FormPanel>
        </div>

        <div>
            <el-dialog title="个人素拓分" :visible.sync="personalSketchFormVisible">
                <div>
                    <el-table
                            :data="personalSketchData"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                align="center"
                                type="index"
                                label="序号"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="sketchName"
                                align="center"
                                label="素拓分名称"
                        ></el-table-column>
                        <el-table-column
                                prop="type"
                                align="center"
                                label="素拓分类型"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchScore"
                                align="center"
                                label="素拓分分数"
                        ></el-table-column>
                        <el-table-column
                                prop="sketchPart"
                                align="center"
                                label="参与角色"
                                width="80px"
                        ></el-table-column>
                        <el-table-column
                                prop="createDate"
                                align="center"
                                label="上传日期"
                        ></el-table-column>
                        <el-table-column
                                prop="applyStudentName"
                                align="center"
                                label="审核人"
                        ></el-table-column>
                    </el-table>
                    <!--分页-->
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="SketchPageSize"
                                @current-change="SketchPageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="SketchPage.currentPage"
                                :page-size="SketchPage.size"
                                :total="SketchPage.total"
                        >
                        </el-pagination>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="personalSketchFormVisible = false" size="mini" type="primary">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "SketchView",
        data() {
            return {
                personalSketchCount: [],
                personalSketchData: [],
                personalData: [],
                sketchTypeData: [],
                sketchData: [],
                classSketchScore: [],
                SketchPage: {
                    size: 5,
                    currentPage: 1,
                    total: 1,
                },
                studentData: {
                    studentNumber: '',
                },
                personalSketchFormVisible: false,
            }
        },

        mounted() {
            this.personalData = JSON.parse(sessionStorage.getItem("user"));
            this.getPersonalSketchCount();
            this.getClassSketchCountData();
        },


        methods: {

            /**
             *@description获取个人素拓分总和
             * **/
            getPersonalSketchCount: function () {
                let params = {
                    studentNumber: this.personalData.studentNumber,
                }
                this.$http.get(Config.SketchAnalysis + '/getPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalSketchCount = response.data.data;
                            setTimeout(this.text, 10);
                        } else {

                        }
                    })
            },


            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                const that = this;
                this.$http.get(Config.sketchScore + '/findType').then(response => {
                    if (response.data.code == '200') {
                        that.sketchTypeData = response.data.data;
                        myChart.setOption({
                            title: {text: '个人素拓分数据'}, //标题
                            tooltip: {},
                            xAxis: {
                                data: that.sketchTypeData
                            }, //X轴
                            yAxis: {},
                            series: [{
                                name: '销量',
                                type: 'bar',
                                data: [5, 20, 36, 10, 10, 20]
                            }]
                        });
                    }
                })
            },

            text() {
                let myChart = this.$echarts.init(document.getElementById('myChartTwo'))
                const that = this;
                let data = [];
                let list = that.personalSketchCount;
                if (list) {
                    for (let i = 0; i < list.length; i++) {
                        let object = {};
                        object.value = that.personalSketchCount[i].scoreCount;
                        object.name = that.personalSketchCount[i].sketchTypeName;
                        data.push(object);
                    }
                }
                myChart.setOption({
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '30%',
                            data: data
                        }
                    ]
                })
            },

            /**
             * @description获取班级素拓总分
             * **/
            getClassSketchCountData: function () {
                this.$http.get(Config.SketchCount + '/getCountData')
                    .then(response => {
                        if (response.data.code == '200') {
                            this.classSketchScore = response.data.data.content;
                        } else {

                        }
                    })
            },


            SketchPageSize: function (value) {
                this.SketchPageSize = value;
                this.SketchPage.currentPage = 1;
                this.getPersonalSketchData();
            },

            SketchPageCurrent: function (value) {
                this.SketchPage.currentPage = value;
                this.getPersonalSketchData();
            },

            /**
             * @description详情按钮事件
             * **/
            checkInfo: function (value) {
                this.personalSketchFormVisible = true;
                this.studentData.studentNumber = value.studentNumber;
                this.getPersonalSketchData();
            },

            /**
             * @description获取指定人素拓分详情弹窗
             * **/
            getPersonalSketchData: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    page: this.SketchPage.currentPage - 1,
                    size: this.SketchPage.size,
                }
                this.$http.get(Config.sketch + '/personal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalSketchData = response.data.data.content;
                            this.SketchPage.total = response.data.data.totalElements;
                        }
                    })
            }
        },
    }
</script>

<style scoped>

</style>