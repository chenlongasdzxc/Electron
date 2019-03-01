<!--todo 编辑未审核素拓分-->

<template>
    <div>
        <div>
            <el-card>
                <form-panel name="我的素拓分" align="left">
                    <!--表格数据-->
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
                        <el-table-column
                                label="状态"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.sketchStates =='SK001' ">未审核
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.sketchStates =='SK002' ">审核通过
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.sketchStates =='SK003' ">审核未通过
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger"
                                           @click="updatePersonalSketch(scope.row)"
                                           :disabled="buttonDisable(scope.row)"
                                >编辑
                                </el-button>
                                <el-button size="mini" type="warning"
                                           @click="deletePersonalSketch(scope.row)"
                                           :disabled="buttonDisable(scope.row)"
                                >删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="personalSketchPageSize"
                                @current-change="personalSketchPageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalSketchPage.currentPage"
                                :page-size="personalSketchPage.size"
                                :total="personalSketchPage.total"
                        >
                        </el-pagination>
                    </div>
                </form-panel>


                <form-panel name="新增素拓分" align="left">
                    <div style="width: 80%;margin-left: 10%">
                        <div class="form-title">
                            <span>素拓分信息</span>
                        </div>
                        <div>
                            <el-form ref="form" :model="sketch" label-width="100px">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="素拓分名称:">
                                            <el-input v-model="sketch.sketchName" size="small"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="素拓分类型:">
                                            <el-select v-model="sketch.type" size="small" style="width: 200px">
                                                <el-option
                                                        v-for="item in sketchTypeData"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div>
                                    <el-form-item label="参与角色:">
                                        <el-select v-model="sketch.sketchPart" size="small" style="width: 200px">
                                            <el-option
                                                    v-for="item in sketchPart"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div style="float: right">
                                        <el-button size="small" type="danger">取消</el-button>
                                        <el-button size="small" type="primary" @click="savePersonalSketch">保存
                                        </el-button>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </form-panel>


            </el-card>
        </div>

        <div>
            <el-dialog title="个人素拓分编辑" :visible.sync="sketchFormVisible">
                <el-form :model="sketchDialogForm" size="small" style="font-size: 12px;text-align: left">
                    <el-form-item label="素拓分名称" :label-width="formLabelWidth">
                        <el-input v-model="sketchDialogForm.sketchName" size="small" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label="素拓分类型" :label-width="formLabelWidth">
                        <el-select v-model="sketchDialogForm.type" size="small" style="width: 200px">
                            <el-option
                                    v-for="item in sketchTypeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参与角色" :label-width="formLabelWidth">
                        <el-select v-model="sketchDialogForm.sketchPart" size="small" style="width: 200px">
                            <el-option
                                    v-for="item in sketchPart"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="sketchFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUpdateSketch">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel, DataTable},
        data() {
            return {
                formLabelWidth: '100px',
                personalSketchData: [],
                personalData: '',
                sketchFormVisible: false,
                personalSketchPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                sketchDialogForm: {
                    id: '',
                    sketchName: '',
                    type: '',
                    sketchPart: '',
                },
                sketch: {
                    sketchName: '',
                    type: '',
                    sketchPart: '',
                    getDate: '',
                },
                sketchPart: [{
                    value: '参与者',
                    label: '参与者'
                }, {
                    value: '组织者',
                    label: '组织者'
                }, {
                    value: '获奖者1',
                    label: '获奖者1'
                }, {
                    value: '获奖者2',
                    label: '获奖者2'
                }, {
                    value: '获奖者3',
                    label: '获奖者3'
                },
                ],
                sketchTypeData: [],
            }
        },
        mounted() {
            this.personalData = JSON.parse(sessionStorage.getItem("user"));
            this.getPersonalSketchData();
            this.getSketchTypeData();
        },
        methods: {

            /**
             * @description 获取学生素拓list
             * **/
            getPersonalSketchData: function () {
                const that = this;
                const params = {
                    studentNumber: that.personalData.studentNumber,
                    size: this.personalSketchPage.size,
                    page: this.personalSketchPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.sketch + '/personal', {params: params})
                    .then((response) => {
                        if (response.data.code == '200') {
                            this.personalSketchData = response.data.data.content;
                            this.personalSketchPage.total = response.data.data.totalElements;
                        } else {
                            this.personalSketchData = response.data.data.content;
                        }
                    })
            },

            /**
             * @description个人素拓分分页page事件
             * **/
            personalSketchPageSize: function (value) {
                this.personalSketchPage.size = value;
                this.personalSketchPage.currentPage = 1;
                this.getPersonalSketchData();
            },

            /**
             * @description个人素拓分页current事件
             * **/
            personalSketchPageCurrent: function (value) {
                this.personalSketchPage.currentPage = value;
                this.getPersonalSketchData();
            },

            /**
             * @description 获取素拓分类型
             * **/
            getSketchTypeData: function () {
                this.$http.get(Config.sketchScore + '/find').then(response => {
                    if (response.data.code == '200') {
                        var list = response.data.data;
                        if (list) {
                            for (var i = 0; i < list.length; i++) {
                                var option = {
                                    label: list[i],
                                    value: list[i],
                                }
                                this.sketchTypeData.push(option);
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
             * @description 保存新增个人素拓分
             * **/
            savePersonalSketch: function () {
                const params = {
                    studentNumber: this.personalData.studentNumber,
                    studentName: this.personalData.studentName,
                    grade: this.personalData.grade,
                    studentClass: this.personalData.studentClass,
                    major: this.personalData.major,
                    sketchName: this.sketch.sketchName,
                    type: this.sketch.type,
                    sketchPart: this.sketch.sketchPart,

                }
                console.log(params)
                this.$http.post(Config.sketch + '/update', params).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            message: '上传成功',
                            type: 'success',
                            center: true
                        })
                        this.getPersonalSketchData();
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'warning',
                            center: true
                        });
                        this.getPersonalSketchData();
                    }
                })
            },

            /**
             *@description 删除个人素拓分
             * **/
            deletePersonalSketch: function (value) {
                this.$http.get(Config.sketch + '/delete', {params: {id: value.id}})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                center: true,
                                type: 'success'
                            })
                            this.getPersonalSketchData();
                        } else {
                            this.$message({
                                message: '删除失败',
                                center: true,
                                type: 'warning'
                            })
                        }
                        this.getPersonalSketchData();
                    })
            },

            /**
             * @description 编辑个人素拓分
             * **/
            updatePersonalSketch: function (value) {
                this.sketchFormVisible = true;
                this.sketchDialogForm.sketchName = value.sketchName;
                this.sketchDialogForm.id = value.id;
                this.sketchDialogForm.sketchPart = value.sketchPart;
                this.sketchDialogForm.type = value.type;
            },


            buttonDisable: function (value) {
                if (value.sketchStates == 'SK002') {
                    return true;
                } else {
                    return false;
                }
            },

            /**
             * @保存编辑的素拓分详情
             * **/
            saveUpdateSketch: function () {
                const params = {
                    studentNumber: this.personalData.studentNumber,
                    studentName: this.personalData.studentName,
                    grade: this.personalData.grade,
                    studentClass: this.personalData.studentClass,
                    major: this.personalData.major,
                    sketchName: this.sketchDialogForm.sketchName,
                    type: this.sketchDialogForm.type,
                    sketchPart: this.sketchDialogForm.sketchPart,
                    id:this.sketchDialogForm.id,
                }
                console.log(params)
                this.$http.post(Config.sketch + '/update', params).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            message: '上传成功',
                            type: 'success',
                            center: true
                        })
                        this.getPersonalSketchData();
                        this.sketchFormVisible=false;
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'warning',
                            center: true
                        });
                        this.getPersonalSketchData();
                        this.sketchFormVisible=false;
                    }
                })
            }

        }
    }
</script>

<style>

</style>