<template>
    <div>
        <el-card>
            <div>
                <div>
                    <FormPanel name="德育减分数据字典编辑" align="left">
                        <div>
                            <el-input style="width: 80%" size="mini" v-model="moralDeductionKeyword"
                                      class="value-search-box"
                                      placeholder="请输入查询条件"><i slot="prefix"
                                                               class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <VButton @click="searchMoralDeduction" style="float: right">搜索</VButton>
                        </div>
                        <el-table
                                :data="moralDeductionData"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                style="font-size: 12px"
                                border
                                size="mini"
                        >
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionName"
                                    label="项目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionType"
                                    label="项目类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionScore"
                                    label="分数"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="description"
                                    label="描述"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="操 作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="updateMoralDeduction(scope.row)">
                                        编辑
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="deleteMoralDeduction(scope.row)">
                                        删除
                                    </el-button>
                                </template>

                            </el-table-column>
                        </el-table>
                        <div>
                            <el-pagination
                                    style="display: flex;justify-content: center"
                                    background
                                    @size-change="page_handleMoralDeductionSizeChange"
                                    @current-change="page_handleMoralDeductionCurrentChange"
                                    layout="prev, pager, next,total"
                                    :current-page="pageMoralDeduction.currentPage"
                                    :page-size="pageMoralDeduction.size"
                                    :total="pageMoralDeduction.total"
                            >
                            </el-pagination>
                        </div>
                    </FormPanel>
                </div>
                <div>
                    <FormPanel name="德育减分数据字典新增" align="left">
                        <div class="moralDeductionAddClass">
                            <el-form :model="moralDeductionAddForm" size="small"
                                     style="font-size: 12px;text-align: left">

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="名称" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.moralDeductionName"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.moralDeductionType"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.moralDeductionScore"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="描述" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.description"
                                                      type="textarea" style="width: 600px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="float: right;margin-top: 20px">
                                            <el-button size="small" type="danger">取消</el-button>
                                            <el-button size="small" type="primary" @click="saveMoralDeductionAdd">保存
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </FormPanel>
                </div>
            </div>
        </el-card>

        <el-dialog title="德育减分数据字典编辑" :visible.sync="moralDeductionFormVisible">
            <el-form :model="moralDeductionEditForm" size="small" style="font-size: 12px;text-align: left">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="moralDeductionEditForm.moralDeductionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-input v-model="moralDeductionEditForm.moralDeductionType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分数" :label-width="formLabelWidth">
                            <el-input v-model="moralDeductionEditForm.moralDeductionScore"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="moralDeductionEditForm.description" autocomplete="off"
                              type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moralDeductionFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveMoralDeductionEdit" size="mini">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "MoralDeductionDataDicitionary",
        data() {
            return {
                formLabelWidth: '60px',
                moralDeductionFormVisible: false,
                moralDeductionKeyword: '',
                moralDeductionData: [],
                pageMoralDeduction: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                moralDeductionEditForm: {
                    id: '',
                    moralDeductionName: '',
                    moralDeductionScore: '',
                    moralDeductionType: '',
                    description: '',

                },
                moralDeductionAddForm: {
                    id: '',
                    moralDeductionName: '',
                    moralDeductionScore: '',
                    moralDeductionType: '',
                    description: '',
                },
            }
        },

        mounted() {
            this.getMoralDeductionData();
        },

        methods: {
            /**
             * @description德育减分数据字典数据获取
             * **/
            updateMoralDeduction: function (moralDeductionInfo) {
                this.moralDeductionFormVisible = true;
                this.moralDeductionEditForm.id = moralDeductionInfo.id;
                this.moralDeductionEditForm.moralDeductionName = moralDeductionInfo.moralDeductionName;
                this.moralDeductionEditForm.moralDeductionType = moralDeductionInfo.moralDeductionType;
                this.moralDeductionEditForm.moralDeductionScore = moralDeductionInfo.moralDeductionScore;
                this.moralDeductionEditForm.description = moralDeductionInfo.description;
            },


            /**
             * @description 删除德育减分数据字典
             * **/
            deleteMoralDeduction: function (moralDeduction) {
                this.$http.post(Config.moralDeduction + '/delete', moralDeduction).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '删除德育减分数据字典成功',
                            type: 'success'
                        });
                        this.getMoralDeductionData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '删除德育减分数据字典失败',
                            type: 'error'
                        });
                    }
                })
            },

            /**
             * @description 获取德育减分数据字典
             * **/
            getMoralDeductionData: function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageMoralDeduction.size,
                    page: that.pageMoralDeduction.currentPage - 1,
                }
                this.$http.get(Config.moralDeduction + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.moralDeductionData = response.data.data.content;
                        that.pageMoralDeduction.total = response.data.data.totalElements;
                    } else {
                        that.moralDeductionData = response.data.data.content;
                    }
                })
            },

            /**
             * @description德育减分数据字典分页size事件
             * **/
            page_handleMoralDeductionSizeChange(value) {
                this.pageMoralDeduction.size = value;
                this.pageMoralDeduction.currentPage = 1;
                this.getMoralDeductionData();
            },

            /**
             * @description德育减分数据字典分页page事件
             * **/
            page_handleMoralDeductionCurrentChange(value) {
                this.pageMoralDeduction.currentPage = value;
                this.getMoralDeductionData();
            },


            /**
             * @description编辑德育减分数据字典
             * **/
            saveMoralDeductionEdit: function () {
                this.$http.post(Config.moralDeduction + '/add', this.moralDeductionEditForm)
                    .then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            message:'保存成功',
                            type:'success'
                        })
                            this.moralDeductionFormVisible = false;
                            this.getMoralDeductionData();
                    } else {
                        this.$message({
                            message:'保存失败',
                            type:'danger'
                        })
                        this.moralDeductionFormVisible = false;
                        this.getMoralDeductionData();
                    }
                })
            },

            /**
             * @description德育减分数据字典数据获取
             * **/
            updateMoralDeduction: function (moralDeductionInfo) {
                this.moralDeductionFormVisible = true;
                this.moralDeductionEditForm.id = moralDeductionInfo.id;
                this.moralDeductionEditForm.moralDeductionName = moralDeductionInfo.moralDeductionName;
                this.moralDeductionEditForm.moralDeductionType = moralDeductionInfo.moralDeductionType;
                this.moralDeductionEditForm.moralDeductionScore = moralDeductionInfo.moralDeductionScore;
                this.moralDeductionEditForm.description = moralDeductionInfo.description;
            },

            /**
             * @description模糊查询
             * **/
            searchMoralDeduction: function () {

            },


            /**
             * @description保存新增德育减分数据字典
             * **/
            saveMoralDeductionAdd: function () {
                this.$http.post(Config.moralDeduction + '/add', this.moralDeductionAddForm).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '新增成功',
                            type: 'success'
                        });
                        this.getMoralDeductionData()
                    } else {
                        this.$message({
                            showClose: true,
                            message: '新增失败',
                            type: 'danger'
                        });
                    }
                })
            }

        },
    }
</script>

<style scoped>
    .moralDeductionAddClass {
        width: 80%;
        margin-left: 10%;

    }
</style>