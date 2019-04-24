<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的成绩" align="left">
                    <!--搜索-->
                    <div>
                        <el-form :model="personalGrade" size="small" ref="personalGrade">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="年度：" label-width="60px">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="personalGrade.year"
                                        >
                                            <el-option
                                                    v-for="item in year"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="科目：" label-width="60px">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="personalGrade.gradeName"
                                        >
                                            <el-option
                                                    v-for="item in gradeName"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div style="float: right">
                                <el-button size="mini" type="danger">重置</el-button>
                                <el-button size="mini" type="primary">搜索</el-button>
                            </div>
                        </el-form>
                    </div>
                    <!--表格-->
                    <div>
                        <el-table
                                :data="personalGradeData"
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
                                    prop="gradeYear"
                                    label="学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeName"
                                    label="科目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gradeScore"
                                    label="科目成绩"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="score"
                                    label="学分"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="gpa"
                                    label="绩点"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="states"
                                    label="状态"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini"
                                            v-if="scope.row.states =='GS001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini"
                                            v-if="scope.row.states =='GS002' ">正确
                                    </el-tag>
                                    <el-tag type="danger" size="mini"
                                            v-if="scope.row.states =='GS003' ">不正确
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                                    min-width="80px"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger"
                                               @click="deleteGpa(scope.row)">删除
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
                                @size-change="personalGradePageSize"
                                @current-change="personalGradePageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalGradePage.currentPage"
                                :page-size="personalGradePage.size"
                                :total="personalGradePage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel},
        name: "GradeManage",
        data() {
            return {
                personalGrade: {
                    year: '',
                    gradeName: '',
                },
                gradeName:[],
                personalGradeData: [],
                personalGradePage:{
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                year: [{
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
            }
        },


        mounted() {

        },

        methods: {

            personalGradePageSize:function () {

            },

            personalGradePageCurrent:function () {

            },
        }
    }
</script>

<style scoped>

</style>