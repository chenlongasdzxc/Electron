<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育加分" align="left">
                    <el-table :data="personalMoralPlus"
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
                                prop="moralPlusName"
                                label="项目名称"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="moralPlusScore"
                                label="项目分数"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="year"
                                label="申报学年"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="applyPersonName"
                                label="审核人"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="states"
                                label="状态"
                                align="center"
                                width="120px"
                        >
                            <template slot-scope="scope">
                                <el-tag type="warning" size="mini" v-if="scope.row.states =='MP001' ">未审核
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.states =='MP002' ">审核通过
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.states =='MP003' ">审核未通过
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="审核理由"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deleteMoralPlus(scope.row)">删除</el-button>
                                <el-button size="mini" type="primary" @click="editMoralPlus(scope.row)"
                                           :disabled="buttonDisable(scope.row)">编辑
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="PageSize"
                                @current-change="PageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalMoralPlusPage.currentPage"
                                :page-size="personalMoralPlusPage.size"
                                :total="personalMoralPlusPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="新增德育加分" align="left">
                    <el-form :model="personalMoralPlusAddForm" size="small"
                             style="font-size: 12px;text-align: left">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="德育加分类型" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.moralPlusType" size="small"
                                               style="width: 120px"
                                               @change="Typechanged"
                                    >
                                        <el-option
                                                v-for="item in moralPlusTypeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="德育加分名称" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.moralPlusName" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralPlusNameList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="德育加分年度" :label-width="formLabelWidth">
                                    <el-select v-model="personalMoralPlusAddForm.year" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralYear"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div style="float: right">
                            <el-button size="mini">重置
                            </el-button>
                            <el-button size="mini" type="primary" @click="savePersonalMoralPlus">保存</el-button>
                        </div>
                    </el-form>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="班级德育加分" align="left">
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog title="德育加分编辑"
                       :visible.sync="dialogVisible"
                       width="30%">
                <el-form :model="moralPlusDialog" size="small" style="font-size: 12px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="类型" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralPlusDialog.moralPlusType" size="small"
                                           style="width: 120px"
                                           @change="dialogChange"
                                >
                                    <el-option
                                            v-for="item in moralPlusTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="名称" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralPlusDialog.moralPlusName" size="small" style="width: 120px">
                                    <el-option
                                            v-for="item in moralPlusSelectList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年度" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralPlusDialog.year" size="small" style="width: 120px">
                                    <el-option
                                            v-for="item in moralYear"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="sketchFormVisible = false" size="mini" type="danger">取 消</el-button>
                    <el-button type="primary" @click="saveUpdateMoralPlus" size="mini">保存</el-button>
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
        name: "MoralPlus",
        data() {
            return {
                dialogVisible: false,
                dialogFormLabelWidth: '60px',
                formLabelWidth: '120px',
                moralPlusTypeList: [],
                personalMoralPlus: [],
                moralPlusNameList: [],
                personalMoralPlusAddForm: {
                    studentName: '',
                    studentClass: '',
                    studentNumber: '',
                    grade: '',
                    major: '',
                    moralPlusName: '',
                    moralPlusType: '',
                    moralPlusScore: '',
                    year: '',
                },
                personalMoralPlusPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                moralYear: [{
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
                moralPlusList: [],
                studentData: [],
                moralPlusSelectList: [],
                moralPlusDialog: {
                    moralPlusType: '',
                    moralPlusName: '',
                    year: '',
                    id: '',
                    states: '',
                },
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralPlusTypeList();
            this.getPersonalMoralPlus();
        },

        methods: {

            /**
             * @description 获取个人德育加分详情
             * **/
            getPersonalMoralPlus: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    size: this.personalMoralPlusPage.size,
                    page: this.personalMoralPlusPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.StudentMoral + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralPlus = response.data.data.content;
                            this.personalMoralPlusPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            /**
             * @description获取德育加分下拉框数据
             * **/
            getMoralPlusTypeList: function () {
                this.$http.get(Config.moralPlus + '/findType')
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralPlusTypeList.push(option);
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
             * @description获取德育加分名称
             * **/
            getMoralPlusNameList: function (type) {
                this.$http.get(Config.moralPlus + '/findNameList', {params: {moralPlusType: type}})
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i].moralPlusName,
                                        value: list[i].moralPlusName,
                                    }
                                    this.moralPlusNameList.push(option);
                                }
                            }
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '获取失败！',
                                type: 'error'
                            });
                        }
                    })
            },

            /**
             * @description获取德育加分名称下拉框
             * **/
            getDialogSelectList: function (type) {
                this.$http.get(Config.moralPlus + '/findNameList', {params: {moralPlusType: type}})
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i].moralPlusName,
                                        value: list[i].moralPlusName,
                                    }
                                    this.moralPlusSelectList.push(option);
                                }
                            }
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '获取失败！',
                                type: 'error'
                            });
                        }
                    })
            },


            /**
             * @description德育加分类型更改事件
             * **/
            Typechanged: function (value) {
                this.personalMoralPlusAddForm.moralPlusName = '';
                this.moralPlusNameList = [];
                this.getMoralPlusNameList(value);
            },


            /**
             * @descriptions上传个人德育加分
             * **/
            savePersonalMoralPlus: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    studentName: this.studentData.studentName,
                    studentNumber: this.studentData.studentNumber,
                    major: this.studentData.major,
                    grade: this.studentData.grade,
                    moralPlusName: this.personalMoralPlusAddForm.moralPlusName,
                    moralPlusType: this.personalMoralPlusAddForm.moralPlusType,
                    year: this.personalMoralPlusAddForm.year,
                }
                this.$http.post(Config.StudentMoral + '/add', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                            this.getPersonalMoralPlus();
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'danger'
                            })
                            this.getPersonalMoralPlus();
                        }
                    })
            },

            /**
             * @description分页size事件
             * **/
            PageSize: function (value) {
                this.personalMoralPlusPage.size = value;
                this.personalMoralPlusPage.currentPage = 1;
                this.getPersonalMoralPlus();
            },

            /**
             * @description分页current事件
             * **/
            PageCurrent: function (value) {
                this.personalMoralPlusPage.currentPage = value;
                this.getPersonalMoralPlus();
            },


            /**
             * @descriptionDialogChange事件
             * **/
            dialogChange: function (value) {
                this.moralPlusDialog.moralPlusName = '';
                this.moralPlusSelectList = [];
                this.getDialogSelectList(value);
                console.log(value)
            },

            /**
             * @description编辑按钮
             * **/
            editMoralPlus: function (value) {
                this.moralPlusDialog.moralPlusName = value.moralPlusName;
                this.moralPlusDialog.moralPlusType = value.moralPlusType;
                this.moralPlusDialog.year = value.year;
                this.moralPlusDialog.id = value.id;
                this.moralPlusDialog.states = value.states;
                this.dialogVisible = true;
            },

            /**
             * @description删除德育加分
             * **/
            deleteMoralPlus: function (value) {
                this.$http.get(Config.StudentMoral + '/delete', {params: {id: value.id}})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                            })
                            this.getPersonalMoralPlus()
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'danger',
                            })
                        }
                    })
            },

            /**
             * @description保存编辑德育加分
             * **/
            saveUpdateMoralPlus: function () {
                const that = this;
                console.log(this.moralPlusDialog)
                const params = {
                    id: that.moralPlusDialog.id,
                    moralPlusName: that.moralPlusDialog.moralPlusName,
                    moralPlusType: that.moralPlusDialog.moralPlusType,
                    year: that.moralPlusDialog.year,
                    states: that.moralPlusDialog.states,
                }
                this.$http.post(Config.StudentMoral + '/update', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '修改成功',
                                type: 'success',
                                center: true
                            })
                            this.dialogVisible = false;
                            this.getPersonalMoralPlus();
                        } else {
                            this.$message({
                                message: '修改失败',
                                type: 'danger',
                                center: true
                            })
                            this.dialogVisible = false;
                            this.getPersonalMoralPlus();
                        }
                    })
            },

            /**
             * @description编辑按钮禁用事件
             * **/
            buttonDisable: function (value) {
                if (value.states == 'MP002') {
                    return true
                } else {
                    return false
                }
            }

        },
    }
</script>

<style scoped>

</style>