<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的课外加分" align="left">
                    <!--查询-->
                    <div>

                    </div>
                    <!--表格-->
                    <div>
                        <el-table
                                :data="moralOut"
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
                                    prop="moralOutName"
                                    label="项目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutType"
                                    label="项目类型"
                                    align="center"
                                    width="100px"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralOutScore"
                                    label="项目分数"
                                    align="center"
                                    width="80px"
                            ></el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="申报学年"
                                    align="center"
                                    width="80px"
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
                                    width="100px"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='MO001' ">未审核
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='MO002' ">审核通过
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MO003' ">审核未通过
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
                                    <el-button size="mini" type="danger" @click="deleteMoralOut(scope.row)">删除
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="editMoralOut(scope.row)"
                                               :disabled="buttonDisable(scope.row)">编辑
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
            <div>
                <FormPanel name="新增课外加分" align="left">
                    <el-form :model="moralOutAddForm" size="small"
                             style="font-size: 12px;text-align: left">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="课外加分类型" :label-width="formLabelWidth">
                                    <el-select v-model="moralOutAddForm.moralOutType" size="small"
                                               style="width: 120px"
                                               @change="moralTypechange"
                                    >
                                        <el-option
                                                v-for="item in moralOutTypeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="课外加分名称" :label-width="formLabelWidth">
                                    <el-select v-model="moralOutAddForm.moralOutName" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralOutNameList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="课外加分年度" :label-width="formLabelWidth">
                                    <el-select v-model="moralOutAddForm.year" size="small"
                                               style="width: 120px">
                                        <el-option
                                                v-for="item in moralOutYear"
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
                            <el-button size="mini" type="primary" @click="saveMoralOut">保存</el-button>
                        </div>
                    </el-form>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="申请综合素质课外加分" align="left">
                    <div>
                        <div>
                            <el-table
                                    :data="comprehensiveMoralOut"
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
                                        prop="moralOutName"
                                        label="项目名称"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutType"
                                        label="项目类型"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutScore"
                                        label="项目分数"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="year"
                                        label="申报学年"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="applyComprehensiveName"
                                        label="审核人"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="applyValue"
                                        label="审核理由"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="comprehensiveQualityStates"
                                        label="状态"
                                        align="center"
                                        width="120px"
                                >
                                    <template slot-scope="scope">
                                        <el-tag type="warning" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMO001' ">未审核
                                        </el-tag>
                                        <el-tag type="success" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMO002' ">审核通过
                                        </el-tag>
                                        <el-tag type="danger" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMO003' ">审核未通过
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center"
                                        width="100px"
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary"
                                                   @click="applyComprehensiveMoralOut(scope.row)"
                                                   v-if="scope.row.comprehensiveQualityStates !='CQMO001'
                                                   && scope.row.comprehensiveQualityStates !='CQMO002'"
                                        >申请
                                        </el-button>
                                        <el-button size="mini" type="danger"
                                                   @click="cancelComprehensiveQualityMoralOut(scope.row)"
                                                   v-if="scope.row.comprehensiveQualityStates =='CQMO001'
                                                    || scope.row.comprehensiveQualityStates =='CQMO002'"
                                        >取消申请
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </FormPanel>
            </div>
        </el-card>

        <div>
            <el-dialog title="课外加分编辑"
                       :visible.sync="dialogVisible"
                       width="30%">
                <el-form :model="moralOutDialog" size="small" style="font-size: 12px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="类型" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralOutDialog.moralOutType" size="small"
                                           style="width: 120px"
                                           @change="dialogChange"
                                >
                                    <el-option
                                            v-for="item in moralOutTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="名称" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralOutDialog.moralOutName" size="small" style="width: 120px">
                                    <el-option
                                            v-for="item in dialogMoralOutNameList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年度" :label-width="dialogFormLabelWidth">
                                <el-select v-model="moralOutDialog.year" size="small" style="width: 120px">
                                    <el-option
                                            v-for="item in moralOutYear"
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
                    <el-button type="primary" size="mini" @click="saveMoralOutEdit">保存</el-button>
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
        name: "MoralOut",
        data() {
            return {
                dialogVisible: false,
                dialogFormLabelWidth: '80px',
                formLabelWidth: '120px',
                moralOut: [],
                moralOutTypeList: [],
                moralOutNameList: [],
                studentData: [],
                comprehensiveMoralOut: [],
                dialogMoralOutTypeList: [],
                dialogMoralOutNameList: [],
                moralOutAddForm: {
                    moralOutName: '',
                    moralOutType: '',
                    year: '',
                },
                moralOutDialog: {
                    id: '',
                    moralOutType: '',
                    moralOutName: '',
                    year: '',
                },
                moralOutYear: [{
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
                moralOutPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getMoralOut();
            this.getMoralOutTypeList();
            this.getComprehensiveMoralOut();

        },

        methods: {

            /**
             * @description获取课外加分类型下拉数据
             * **/
            getMoralOutTypeList: function () {
                this.$http.get(Config.moralOut + '/findMoralOutType')
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralOutTypeList.push(option);
                                    this.dialogMoralOutTypeList.push(option);
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
             * @description获取课外加分名称下拉数据
             * **/
            getMoralOutNameList: function (value) {
                const params = {
                    moralOutType: value
                }
                this.$http.get(Config.moralOut + '/findMoralOutName', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.moralOutNameList.push(option);
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
             * @description课外加分类型下拉框change事件
             * **/
            moralTypechange: function (value) {
                this.moralOutAddForm.moralOutName = '';
                this.moralOutNameList = [];
                console.log(value)
                this.getMoralOutNameList(value);
            },

            /**
             * @description新增课外加分项目
             * **/
            saveMoralOut: function () {
                const params = {...this.studentData, ...this.moralOutAddForm};
                this.$http.post(Config.StudentMoralOut + '/add', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                                center: true
                            })
                            this.getMoralOut();
                        } else {
                            this.$message({
                                message: '上传失败',
                                type: 'danger',
                                center: true
                            })
                            this.getMoralOut();
                        }
                    })
            },

            /**
             * @description获取课外加分数据
             * **/
            getMoralOut: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    page: this.moralOutPage.currentPage - 1,
                    size: this.moralOutPage.size,
                }
                this.$http.get(Config.StudentMoralOut + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralOut = response.data.data.content;
                            this.moralOutPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            /**
             * @description获取个人申请课外加分数据
             * **/
            getComprehensiveMoralOut: function () {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    states: 'MO002',
                }
                this.$http.get(Config.StudentMoralOut + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.comprehensiveMoralOut = response.data.data.content;
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
             * @description分页size事件
             * **/
            moralOutSizeChange: function (value) {
                this.moralOutPage.size = value;
                this.moralOutPage.currentPage = 1;
                this.getMoralOut();
            },

            /**
             * @description分页current事件
             * **/
            moralOutCurrentChange: function (value) {
                this.moralOutPage.currentPage = value;
                this.getMoralOut();
            },

            /**
             * @description删除德育加分弹窗
             * **/
            deleteMoralOut: function () {

            },

            /**
             * @description按钮disable事件
             * **/
            buttonDisable: function (value) {
                if (value.states == 'MO002') {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * @description编辑课外加分信息
             * **/
            editMoralOut: function (value) {
                this.moralOutDialog.id = value.id;
                this.moralOutDialog.moralOutName = value.moralOutName;
                this.moralOutDialog.moralOutType = value.moralOutType;
                this.moralOutDialog.year = value.year;
                this.dialogVisible = true;
            },
            /**
             * @description弹出窗口类型改变事件
             * **/
            dialogChange: function (value) {
                console.log(value)
                this.moralOutDialog.moralOutName = '';
                this.dialogMoralOutNameList = [];
                const params = {
                    moralOutType: value
                }
                this.$http.get(Config.moralOut + '/findMoralOutName', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            const list = response.data.data;
                            if (list) {
                                for (let i = 0; i < list.length; i++) {
                                    const option = {
                                        label: list[i],
                                        value: list[i],
                                    }
                                    this.dialogMoralOutNameList.push(option);
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
             * @description保存编辑课外加分信息
             * **/
            saveMoralOutEdit: function () {
                const params = {
                    id: this.moralOutDialog.id,
                    year: this.moralOutDialog.year,
                    moralOutType: this.moralOutDialog.moralOutType,
                    moralOutName: this.moralOutDialog.moralOutName,
                }
                this.$http.post(Config.StudentMoralOut + '/update', params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.dialogVisible = false;
                            this.$message({
                                message: '编辑成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '编辑失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                    })
            },
            /**
             * @description申请综合素质课外加分
             * **/
            applyComprehensiveMoralOut: function (value) {
                const params = {
                    id: value.id,
                    comprehensiveQualityStates: 'CQMO001',
                }
                this.$http.get(Config.Apply + '/updateMoralOut', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '申请成功',
                                type: 'success',
                                center: true,
                            })

                        } else {
                            this.$message({
                                message: '申请失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.getComprehensiveMoralOut();
                    })
            },

            /**
             * @description取消综合素质课外加分申请
             * **/
            cancelComprehensiveQualityMoralOut:function (value) {
                const params = {
                    id: value.id,
                    comprehensiveQualityStates: '',
                }
                this.$http.get(Config.Apply + '/updateMoralOut',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message:'取消申请成功',
                                type:'success',
                                center:true
                            })
                            this.getComprehensiveMoralOut();
                        }else {
                            this.$message({
                                message:'取消申请失败',
                                type:'danger',
                                center:true
                            })
                        }
                    })
            },


        },


    }
</script>

<style scoped>

</style>