<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="新增德育表现" align="left">
                    <div>
                        <el-form :model="moralExpressionForm" size="small" ref="morelExpressionForm">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="德育表现年度：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="moralExpressionForm.year"
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
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="moralExpressionForm.name"
                                        >
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
                                        <el-button size="mini" type="danger" @click="resetForm('morelExpressionForm')">
                                            重置
                                        </el-button>
                                        <el-button size="mini" type="success" @click="saveMoralExpressionForm">确认
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="saveStudentMoralExpression">保存
                                        </el-button>
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
                                  height="452px"
                                  @select="tableSelection"
                                  ref="multipleTable"
                                  size="mini">
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    width="40px"
                            ></el-table-column>
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    width="60px"
                            >
                                <template slot-scope="scope">
                                    {{moralExpressionPage.size*(moralExpressionPage.currentPage-1)+scope.$index+1}}
                                </template>
                            </el-table-column>
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
                                    width="180px"
                            >
                                <template slot-scope="scope">
                                    <el-input-number :precision="2" :step="0.1" :max="10" size="mini"
                                                     style="width: 140px;text-align: center"
                                                     v-model="scope.row.moralExpressionScore"></el-input-number>
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
                <FormPanel name="编辑德育表现" align="left">
                    <!--搜索-->
                    <div>
                        <el-form :model="searchMoralExpressionForm" size="small" ref="morelExpressionForm">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item label="德育表现年度：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 140px"
                                                   v-model="searchMoralExpressionForm.year"
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
                                <el-col :span="6">
                                    <el-form-item label="德育表现名称：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 140px"
                                                   v-model="searchMoralExpressionForm.name"
                                        >
                                            <el-option
                                                    v-for="item in moralExpressionName"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.label"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="搜索信息：" :label-width="moralExpressionFormWidth">
                                        <el-input size="mini" style="width: 140px" placeholder="请输入学生姓名" v-model="searchMoralExpressionForm.keyWord"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <div style="float: right">
                                        <el-button size="mini" type="danger">重置</el-button>
                                        <el-button size="mini" type="success" @click="searchMoralExpressionEdit">搜索</el-button>
                                        <el-button size="mini" type="primary" @click="saveEditMoralExpression">保存</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>
                    </div>
                    <div style="margin-top: 10px">
                        <el-table :data="moralExpressionEdit"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  height="452px"
                                  @select="editSelection"
                                  size="mini">
                            <el-table-column
                                    type="selection"
                                    align="center"
                                    width="40px"
                            ></el-table-column>
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    type="index"
                                    width="60px">
                            </el-table-column>
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
                                    prop="moralExpressionYear">
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
                                    width="180px"
                            >
                                <template slot-scope="scope">
                                    <el-input-number :precision="2" :step="0.1" :max="10" size="mini"
                                                     style="width: 140px;text-align: center"
                                                     v-model="scope.row.moralExpressionScore"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    prop="states"
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
                                    <el-button size="mini" type="danger" @click="deleteMoralExpression(scope.row)">删除
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="rejectMoralExpression(scope.row)">驳回
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
                                @size-change="moralExpressionEditSizeChange"
                                @current-change="moralExpressionEditCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralExpressionEditPage.currentPage"
                                :page-size="moralExpressionEditPage.size"
                                :total="moralExpressionEditPage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="已上传德育表现" align="left">
                    <div>
                        <el-form :model="moralExpressionFormUpdated" size="small" ref="moralExpressionFormUpdated">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="德育表现年度：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="moralExpressionFormUpdated.year"
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
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="moralExpressionFormUpdated.name"
                                        >
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
                                        <el-button size="mini" type="danger"
                                                   @click="resetUpdateForm('moralExpressionFormUpdated')">重置
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="searchMoralExpression">查询
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>
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
                            <el-table-column
                                    label="上传人"
                                    align="center"
                                    prop="applyPersonName"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    align="center"
                                    prop="states"
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
                    <!--分页-->
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="moralExpressionUpdatedSizeChange"
                                @current-change="moralExpressionUpdatedCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="moralExpressionUpdatedPage.currentPage"
                                :page-size="moralExpressionUpdatedPage.size"
                                :total="moralExpressionUpdatedPage.total"
                        ></el-pagination>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog
                    title="驳回"
                    :visible.sync="moralExpressionUpdateDialogVisible"
                    width="30%">
                <div>
                    <el-form :model="applyFormData" style="font-size: 12px;text-align: left" size="small">
                        <el-form-item label="理由:" :label-width="formLabelWidth">
                            <el-input v-model="applyFormData.value" style="width: 400px" type="textarea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer">
                    <el-button size="small" type="primary" @click="rejectApply">保存</el-button>
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
        name: "MoralAudit",
        data() {
            return {
                formLabelWidth:'120px',
                moralExpressionFormWidth: '120px',
                moralExpressionUpdateDialogVisible: false,
                studentMoralExpressionUpdated: [],
                studentMoralExpressionData: [],
                studentData: [],
                list: [],
                applyFormData: {
                    id: '',
                    value: '',
                },
                searchMoralExpressionForm:{
                    year: '',
                    name: '',
                    keyWord:'',
                },
                moralExpressionUpdatedPage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                moralExpressionEditPage: {
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                moralExpressionEdit: [],
                moralExpressionForm: {
                    year: '',
                    name: '',
                },
                moralExpressionFormUpdated: {
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
                selectList: [],
                editList: [],
            }

        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.init();
        },

        methods: {


            init: function () {
                this.getStudentMoralExpressionData();
                this.getMoralExpressionName();
                this.getStudentMoralExpressionUpdated();
                this.getMoralExpressionEdit();
            },

            /**
             * @description表格选中事件
             * **/
            tableSelection: function (value) {
                console.log(value)
                this.selectList = JSON.parse(JSON.stringify(value));
            },

            editSelection:function (value) {
                console.log(value)
                this.editList = JSON.parse(JSON.stringify(value));
            },


            /**
             * @description获取本班学生基本信息
             * **/
            getStudentMoralExpressionData: function () {
                const params = {
                    studentClass: this.studentData.studentClass,
                    grade: this.studentData.grade,
                }
                this.$http.get(Config.studentInfo + '/findStudentList', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.list = response.data.data;
                            this.moralExpressionPage.total = this.list.length;
                            this.getPageData();
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
             * @description页面分页
             * **/
            getPageData: function () {
                let size = this.moralExpressionPage.size;
                let page = this.moralExpressionPage.currentPage;
                if (!size) {
                    size = 10;
                }
                if (!page) {
                    page = 1;
                }
                this.moralExpressionPage.total = this.list.length;
                this.studentMoralExpressionData = []
                let nextCount = this.list.length - (page - 1) * size;
                let max = size > nextCount ? nextCount : size
                for (let i = (page - 1) * size; i < max + (page - 1) * size; i++) {
                    this.studentMoralExpressionData.push(this.list[i])
                }
            },

            /**
             * @description德育表现分页size改变事件
             * **/
            moralExpressionSizeChange: function (value) {
                this.moralExpressionPage.size = value;
                this.moralExpressionPage.currentPage = 1;
                this.getPageData();
            },

            /**
             * @description德育表现分页current改变事件
             * **/
            moralExpressionCurrentChange: function (value) {
                this.moralExpressionPage.currentPage = value;
                this.getPageData();
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
             * @description保存德育表现年度和名称
             * **/
            saveMoralExpressionForm: function () {
                for (const item of this.list) {
                    item.moralExpressionName = this.moralExpressionForm.name;
                    item.moralExpressionYear = this.moralExpressionForm.year;
                    item.applyPersonNumber = this.studentData.studentNumber;
                    item.applyPersonName = this.studentData.studentName;
                }
                this.studentMoralExpressionData.push({});
                this.studentMoralExpressionData.pop();
            },

            /**
             * @description保存德育表现
             * **/
            saveStudentMoralExpression: function () {
                var saveList = [];
                var saveSelectList = [];
                if (this.selectList.length == 0) {
                    this.$message({
                        message: '请选择要保持的数据',
                        type: 'warning',
                        center: true,
                    });
                } else {
                    saveSelectList = this.selectList;
                }
                for (var i = 0; i < saveSelectList.length; i++) {
                    saveList.push(saveSelectList[i]);
                }
                this.updateStudentMoralExpression(saveList);
            },

            /**
             * @description上传保存
             * **/
            updateStudentMoralExpression: function (list) {
                this.$http.post(Config.StudentMoralExpression + '/update', list)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                            this.clearSelection();
                        } else if (response.data.code == '401') {
                            this.$message({
                                message: '保存失败,已存在该学年德育表现数据',
                                type: 'warning',
                                center: true,
                            })
                            this.clearSelection();
                        } else {
                            this.$message({
                                message: '错误',
                                type: 'warning',
                                center: true,
                            })
                            this.clearSelection();
                        }

                    })
            },


            /**
             * @description获取已上传德育表现信息
             * **/
            getStudentMoralExpressionUpdated: function () {
                const params = {
                    moralExpressionYear: this.moralExpressionFormUpdated.year,
                    moralExpressionName: this.moralExpressionFormUpdated.name,
                    grade: this.studentData.grade,
                    studentClass: this.studentData.studentClass,
                    size: this.moralExpressionUpdatedPage.size,
                    page: this.moralExpressionUpdatedPage.currentPage - 1,
                }
                this.$http.get(Config.StudentMoralExpression + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.studentMoralExpressionUpdated = response.data.data.content;
                            this.moralExpressionUpdatedPage.total = response.data.data.totalElements;
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
             * @description清除选中
             * **/
            clearSelection: function (rows) {
                debugger
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            /**
             * @description搜索数据
             * **/
            searchMoralExpression: function () {
                const params = {
                    moralExpressionYear: this.moralExpressionFormUpdated.year,
                    moralExpressionName: this.moralExpressionFormUpdated.name,
                    grade: this.studentData.grade,
                    studentClass: this.studentData.studentClass,
                    size: this.moralExpressionUpdatedPage.size,
                    page: this.moralExpressionUpdatedPage.currentPage - 1,
                }
                this.$http.get(Config.StudentMoralExpression + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.studentMoralExpressionUpdated = response.data.data.content;
                            this.moralExpressionUpdatedPage.total = response.data.data.totalElements;
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
             * @description已上传德育表现分页事件
             * **/
            moralExpressionUpdatedSizeChange: function (value) {
                this.moralExpressionUpdatedPage.size = value;
                this.moralExpressionUpdatedPage.currentPage = 1;
                this.getStudentMoralExpressionUpdated();
            },

            /**
             * @description已上传德育表现分页事件
             * **/
            moralExpressionUpdatedCurrentChange: function (value) {
                this.moralExpressionUpdatedPage.currentPage = value;
                this.getStudentMoralExpressionUpdated();
            },

            /**
             * @description重置按钮
             * **/
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
                this.moralExpressionForm.year = '';
                this.moralExpressionForm.name = '';

            },

            /**
             * @description获取有异议德育表现
             * **/
            getMoralExpressionEdit: function () {
                const params = {
                    states: 'ME003',
                    studentClass: this.studentData.studentClass,
                    grade: this.studentData.grade,
                }
                this.$http.get(Config.StudentMoralExpression + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralExpressionEdit = response.data.data.content;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description删除德育表现
             * **/
            deleteMoralExpression: function (value) {
                const params = {
                    id: value.id,
                }
                this.$http.get(Config.StudentMoralExpression + '/deleteMoralExpression', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true,
                            })
                            this.init();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description德育表现编辑size分页事件
             * **/
            moralExpressionEditSizeChange: function (value) {
                this.moralExpressionEditPage.size = value;
                this.moralExpressionEditPage.currentPage = 1;
                this.getMoralExpressionEdit();
            },

            /**
             * @description德育表现编辑current分页事件
             * **/
            moralExpressionEditCurrentChange: function (value) {
                this.moralExpressionEditPage.currentPage = value;
                this.getMoralExpressionEdit();
            },

            resetUpdateForm: function (formName) {
                this.$refs[formName].resetFields();
                this.moralExpressionFormUpdated.year = '';
                this.moralExpressionFormUpdated.name = '';
            },

            rejectMoralExpression: function (value) {
                this.applyFormData.id = value.id;
                this.moralExpressionUpdateDialogVisible = true;
            },


            /**
             * @description驳回德育表现
             * **/
            rejectApply: function () {
                const params = {
                    id: this.applyFormData.id,
                    value: this.applyFormData.value,
                    states: 'ME001'
                }
                this.$http.get(Config.StudentMoralExpression + '/checkMoralExpression',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'驳回成功',
                                type:'success',
                                center:true,
                            })
                            this.moralExpressionUpdateDialogVisible = false;
                            this.getMoralExpressionEdit();
                        }else {
                            this.$message({
                                message:'驳回失败',
                                type:'danger',
                                center:true,
                            })
                            this.moralExpressionUpdateDialogVisible = false;
                            this.getMoralExpressionEdit();
                        }
                    })
            },

            /**
             * @description搜索德育表现编辑数据
             * **/
            searchMoralExpressionEdit:function () {
                const params = {
                    grade: this.studentData.grade,
                    studentClass:this.studentData.studentClass,
                    studentName:this.searchMoralExpressionForm.keyWord,
                    states: 'ME003'
                }
                 this.$http.get(Config.StudentMoralExpression + '/findFuzzy',{params:params})
                     .then(response=>{
                         if (response.data.code == '200'){
                             this.moralExpressionEdit = response.data.data.content;
                         } else {
                             this.$message({
                                 message:'查询失败',
                                 type:'danger',
                             })
                         }
                     })
            },



            /**
             * @description保存德育表现编辑数据
             * **/
            saveMoralExpressionEdit:function (list) {
               this.$http.post(Config.StudentMoralExpression + '/saveMoralExpressionEdit',list)
                   .then(response=>{
                       if (response.data.code == '200'){
                            this.$message({
                                message:'保存成功',
                                type:'success',
                                center:true,
                            })
                           this.getMoralExpressionEdit();
                       }else {
                           this.$message({
                               message:'保存失败',
                               type:'danger',
                               center:true
                           })
                           this.getMoralExpressionEdit();
                       }
                   })
            },

            /**
             * @description保存编辑德育表现数据
             * **/
            saveEditMoralExpression:function () {
                var saveList = [];
                var saveSelectList = [];
                if (this.editList.length == 0) {
                    this.$message({
                        message: '请选择要保持的数据',
                        type: 'warning',
                        center: true,
                    });
                } else {
                    saveSelectList = this.editList;
                }
                for (var i = 0; i < saveSelectList.length; i++) {
                    saveList.push(saveSelectList[i]);
                }
                this.saveMoralExpressionEdit(saveList);
            },
        },
    }
</script>

<style scoped>

</style>