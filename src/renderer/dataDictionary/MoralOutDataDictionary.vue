<template>
    <div style="background-color: #c3d9ff">
        <el-card>
            <div>
                <div>
                    <FormPanel name="课外加分数据字典编辑" align="left">
                        <div>
                            <el-input style="width: 90%" size="mini" v-model="moralOutKeyword"
                                      class="value-search-box"
                                      placeholder="请输入查询条件"><i slot="prefix"
                                                               class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <el-button @click="searchMoralOut" style="float: right" size="mini" type="primary">搜索</el-button>
                        </div>
                        <el-table
                                :data="moralOutData"
                                border
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                size="mini"
                                style="width: 100%">
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="名称"
                                    prop="moralOutName"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="类型"
                                    prop="moralOutType"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="分数"
                                    prop="moralOutScore"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="描述"
                                    prop="value"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="操作"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button size="mini" type="primary" @click="updateMoralOut(scope.row)">编辑
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="deleteMoralOut(scope.row)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div>
                            <div>
                                <el-pagination
                                        style="display: flex;justify-content: center"
                                        background
                                        @size-change="page_handleMoralOutSizeChange"
                                        @current-change="page_handleMoralOutCurrentChange"
                                        layout="prev, pager, next,total"
                                        :current-page="pageMoralOut.currentPage"
                                        :page-size="pageMoralOut.size"
                                        :total="pageMoralOut.total"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </FormPanel>
                </div>
                <div>
                    <FormPanel name="课外加分数据字典新增" align="left">
                        <div class="moralOutAddClass">
                            <el-form :model="moralOutAddForm" size="small" style="font-size: 12px;text-align: left">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="名称" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutName"
                                                      style="width: 240px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutType"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutScore"
                                                      style="width: 200px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="描述" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.value" type="textarea"
                                                      style="width: 640px;"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="float: right;margin-top: 14px">
                                            <el-button size="small" type="danger">取消</el-button>
                                            <el-button size="small" type="primary" @click="saveMoralOut">保存</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </FormPanel>
                </div>
            </div>
        </el-card>

        <div>
            <el-dialog title="课外加分数据字典编辑" :visible.sync="moralOutFormVisible">
                <el-form :model="moralOutEditForm" size="small" style="font-size: 12px;text-align: left">

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="名称" :label-width="formLabelWidth">
                                <el-input v-model="moralOutEditForm.moralOutName" autocomplete="off"
                                          size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类型" :label-width="formLabelWidth">
                                <el-input v-model="moralOutEditForm.moralOutType" autocomplete="off"
                                          size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="分数" :label-width="formLabelWidth">
                                <el-input v-model="moralOutEditForm.moralOutScore" autocomplete="off"
                                          size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                        <el-input v-model="moralOutEditForm.value" autocomplete="off" type="textarea"
                                  size="mini"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="moralOutFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="saveMoralOutEditForm" size="mini">保存</el-button>
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
        name: "MoralOutDataDictionary",
        data() {
            return {
                moralOutFormVisible: false,
                formLabelWidth: '80px',
                moralOutKeyword: '',
                moralOutData: [],
                pageMoralOut: {
                    currentPage: 1,
                    total: 1,
                    size: 6
                },
                moralOutAddForm: {
                    moralOutName: '',
                    moralOutType: '',
                    moralOutScore: '',
                    states: '',
                    value: '',
                },
                moralOutEditForm: {
                    id: '',
                    moralOutName: '',
                    moralOutType: '',
                    moralOutScore: '',
                    states: '',
                    value: '',
                },

            }
        },

        mounted() {
            this.getMoralOutData();
        },

        methods: {
            /**
             * @description获取课外加分数据字典
             * **/
            getMoralOutData: function () {
                const that = this;
                let parmams = {
                    sort: 'id,desc',
                    size: that.pageMoralOut.size,
                    page: that.pageMoralOut.currentPage - 1,
                }
                this.$http.get(Config.moralOut + '/findFuzzy', {params: parmams})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralOutData = response.data.data.content;
                            this.pageMoralOut.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            /**
             * @description课外加分size事件
             * **/
            page_handleMoralOutSizeChange: function (value) {
                this.pageMoralOut.size = value;
                this.pageMoralOut.currentPage = 1;
                this.getMoralOutData();
            },

            /**
             * @description课外加分page事件
             * **/
            page_handleMoralOutCurrentChange: function (value) {
                this.pageMoralOut.currentPage = value;
                this.getMoralOutData();
            },

            /**
             * @description编辑课外加分数据字典
             * **/
            updateMoralOut: function (value) {
                this.moralOutEditForm.id = value.id;
                this.moralOutEditForm.moralOutName = value.moralOutName;
                this.moralOutEditForm.moralOutType = value.moralOutType;
                this.moralOutEditForm.moralOutScore = value.moralOutScore;
                this.moralOutEditForm.value = value.value;
                this.moralOutFormVisible = true;
            },

            /**
             * @description删除课外加分数据字典
             * **/
            deleteMoralOut: function (value) {
                const params = {
                    id: value.id,
                }
                this.$http.get(Config.moralOut + '/delete', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true,
                            })
                            this.getMoralOutData();
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
             * @description保存新增课外加分数据字典
             * **/
            saveMoralOut: function () {
                this.$http.post(Config.moralOut + '/update', this.moralOutAddForm)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                            this.getMoralOutData();
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description搜索课外加分
             * **/
            searchMoralOut: function () {
                const params = {
                    keyWord: this.moralOutKeyword,
                    sort: 'id,desc',
                    size: this.pageMoralOut.size,
                    page: this.pageMoralOut.currentPage - 1,
                }
                this.$http.get(Config.moralOut + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.moralOutData = response.data.data.content;
                            this.pageMoralOut.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },


            saveMoralOutEditForm: function () {

            },
        },
    }
</script>

<style scoped>
    .moralOutAddClass {
        width: 80%;
        margin-left: 10%;

    }
</style>