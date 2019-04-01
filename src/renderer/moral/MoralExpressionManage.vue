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
                                        <el-button size="mini" type="danger" @click="resetForm('morelExpressionForm')" >重置</el-button>
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

                    </div>
                    <div>
                        <el-table :data="moralExpressionEdit"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 12px"
                                  border
                                  height="452px"
                                  @select="tableSelection"
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

                        </el-table>
                    </div>
                    <!--分页-->
                    <div>

                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="已上传德育表现" align="left">
                    <div>
                        <el-form :model="moralExpressionFormUpdated" size="small">
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
                                        <el-button size="mini" type="success" @click="searchMoralExpression">查询
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
                list: [],
                moralExpressionUpdatedPage:{
                    currentPage: 1,
                    size: 10,
                    total: 1,
                },
                moralExpressionEdit: [],
                moralExpressionForm: {
                    year: '',
                    name: '',
                },
                moralExpressionFormUpdated:{
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
            }

        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getStudentMoralExpressionData();
            this.getMoralExpressionName();
            this.getStudentMoralExpressionUpdated();
        },

        methods: {

            /**
             * @description表格选中事件
             * **/
            tableSelection: function (value) {
                console.log(value)
                this.selectList = JSON.parse(JSON.stringify(value));
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
                        }else if(response.data.code == '401'){
                            this.$message({
                                message:'保存失败,已存在该学年德育表现数据',
                                type:'warning',
                                center:true,
                            })
                            this.clearSelection();
                        }else {
                            this.$message({
                                message:'错误',
                                type:'warning',
                                center:true,
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
                    grade: this.studentData.grade,
                    studentClass: this.studentData.studentClass,
                    size:this.moralExpressionUpdatedPage.size,
                    page:this.moralExpressionUpdatedPage.currentPage - 1,
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
            clearSelection:function (rows) {
                debugger
                if (rows){
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
            searchMoralExpression:function () {
                const params = {
                    studentClass:this.studentData.studentClass,
                    year:this.moralExpressionFormUpdated.year,
                    name:this.moralExpressionFormUpdated.name,
                }
            },

            /**
             * @description已上传德育表现分页事件
             * **/
            moralExpressionUpdatedSizeChange:function (value) {
                this.moralExpressionUpdatedPage.size = value;
                this.moralExpressionUpdatedPage.currentPage = 1;
                this.getStudentMoralExpressionUpdated();
            },

            /**
             * @description已上传德育表现分页事件
             * **/
            moralExpressionUpdatedCurrentChange:function (value) {
                this.moralExpressionUpdatedPage.currentPage = value;
                this.getStudentMoralExpressionUpdated();
            },

            /**
             * @description重置按钮
             * **/
            resetForm:function (formName) {
                this.$refs[formName].resetFields();
                this.moralExpressionForm.year = '';
                this.moralExpressionForm.name = '';
            }
        },
    }
</script>

<style scoped>

</style>