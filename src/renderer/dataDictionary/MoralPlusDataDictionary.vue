<template>
    <div>
        <el-card>
            <div>
                <div>
                    <FormPanel name="德育加分数据字典编辑" align="left">
                        <div>
                            <el-input style="width: 80%" size="mini" v-model="moralPlusKeyword"
                                      class="value-search-box"
                                      placeholder="请输入查询条件"><i slot="prefix"
                                                               class="el-input__icon el-icon-search"></i>
                            </el-input>
                            <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                        </div>
                        <el-table
                                :data="moralPlusData"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                style="font-size: 12px"
                                border
                                size="mini"
                        >
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    type="index"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusName"
                                    label="项目名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusType"
                                    label="项目类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusScore"
                                    label="项目分数"
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
                                    <el-button size="mini" type="primary" @click="updateMoralPlus(scope.row)">编辑
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="deleteMoralScore(scope.row)">删除
                                    </el-button>
                                </template>

                            </el-table-column>
                        </el-table>
                        <div>
                            <el-pagination
                                    style="display: flex;justify-content: center"
                                    background
                                    @size-change="page_handleMoralPlusSizeChange"
                                    @current-change="page_handleMoralPlusCurrentChange"
                                    layout="prev, pager, next,total"
                                    :current-page="pageMoralPlus.currentPage"
                                    :page-size="pageMoralPlus.size"
                                    :total="pageMoralPlus.total"
                            >
                            </el-pagination>
                        </div>
                    </FormPanel>
                </div>

                <div>
                    <FormPanel name="德育加分数据字典新增" align="left">
                        <div class="moralAddClass">
                            <el-form :model="moralPlusAddForm" size="small" style="font-size: 12px;text-align: left">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="名称" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.moralPlusName" style="width: 200px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.moralPlusType" style="width: 200px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.moralPlusScore" style="width: 200px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="描述" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.description" type="textarea" size="mini"
                                                      style="width:600px"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <div style="float: right">
                                            <el-button size="small" type="danger">取消</el-button>
                                            <el-button size="small" type="primary" @click="saveMoralPlus">保存</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>

                        </div>
                    </FormPanel>
                </div>
            </div>

        </el-card>

        <!--德育加分数据字典编辑弹窗-->
        <el-dialog title="德育加分数据字典编辑" :visible.sync="moralPlusFormVisible">
            <el-form :model="moralPlusEditForm" size="small" style="font-size: 12px;text-align: left">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="名称" :label-width="formLabelWidth">
                            <el-input v-model="moralPlusEditForm.moralPlusName" autocomplete="off"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-input v-model="moralPlusEditForm.moralPlusType" autocomplete="off"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分数" :label-width="formLabelWidth">
                            <el-input v-model="moralPlusEditForm.moralPlusScore" autocomplete="off"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="moralPlusEditForm.description" autocomplete="off" type="textarea"
                              size="mini"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moralPlusFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveMoralPlusEditForm" size="mini">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import Config from '../Config'
    import FormPanel from '../components/FormPanel'

    export default {
        components: {VButton, FormPanel},
        name: "moralPlusDataDictionary",
        data() {
            return {
                formLabelWidth: '80px',
                moralPlusFormVisible: false,
                moralPlusKeyword: '',
                moralPlusData: [],
                pageMoralPlus: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                moralPlusAddForm: {
                    moralPlusName: '',
                    moralPlusType: '',
                    moralPlusScore: '',
                    description: '',
                },
                moralPlusEditForm: {
                    id: '',
                    moralPlusName: '',
                    moralPlusType: '',
                    moralPlusScore: '',
                    description: '',

                },
            }
        },


        mounted() {
            this.getMoralPlusData();
        },

        methods: {

            /**
             * @description 获取德育加分数据字典
             * **/
            getMoralPlusData: function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageMoralPlus.size,
                    page: that.pageMoralPlus.currentPage - 1,
                };
                this.$http.get(Config.moralPlus + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.moralPlusData = response.data.data.content;
                        that.pageMoralPlus.total = response.data.data.totalElements;
                    } else {
                        that.moralPlusData = response.data.data.content;
                    }
                })
            },

            /**
             * @description保存编辑德育加分数据字典数据
             * **/
            saveMoralPlusEditForm: function () {
                this.$http.post(Config.moralPlus + '/add', this.moralPlusEditForm).then(response => {
                    if (response.data.code == '200') {
                        this.moralPlusFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.getMoralPlusData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '编辑失败',
                            type: 'danger'
                        });
                    }
                })
            },

            /**
             * @description 删除德育加分数据字典
             * **/
            deleteMoralScore: function (moralPlus) {
                this.$http.post(Config.moralPlus + '/delete', moralPlus).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '删除德育加分数据字典成功',
                            type: 'success'
                        });
                        this.getMoralPlusData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '删除德育加分数据字典失败',
                            type: 'error'
                        });
                    }
                })
            },
            /**
             * @description德育加分数据字典编辑
             * **/
            updateMoralPlus: function (moralPlusInfo) {
                this.moralPlusFormVisible = true;
                this.moralPlusEditForm.id = moralPlusInfo.id;
                this.moralPlusEditForm.moralPlusName = moralPlusInfo.moralPlusName;
                this.moralPlusEditForm.moralPlusScore = moralPlusInfo.moralPlusScore;
                this.moralPlusEditForm.moralPlusType = moralPlusInfo.moralPlusType;
                this.moralPlusEditForm.description = moralPlusInfo.description;

            },

            /**
             * @description搜索德育加分数据字典
             * **/
            searchMoralPlus: function () {
                const parms = {
                    keyWord: this.moralPlusKeyword,
                };
                const p = JSON.parse(JSON.stringify(parms));
                this.$http.get(Config.moralPlus + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        this.moralPlusData = response.data.data.content;
                    } else {
                        this.$notify({
                            title: '提示',
                            message: '搜索失败'
                        })
                    }
                })
            },


            /**
             * @description保存新增德育加分数据字典
             * **/
            saveMoralPlus: function () {
                this.$http.post(Config.moralPlus + '/add', this.moralPlusAddForm).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '新增成功',
                            type: 'success'
                        });
                        this.getMoralPlusData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '新增失败',
                            type: 'danger'
                        });
                    }
                })
            },


            /**
             * @description德育加分数据字典分页size事件
             * **/

            page_handleMoralPlusSizeChange(value) {
                this.pageMoralPlus.size = value;
                this.pageMoralPlus.currentPage = 1;
                this.getMoralPlusData();
            },

            /**
             * @description德育加分数据字典分页page事件
             * **/
            page_handleMoralPlusCurrentChange(value) {
                this.pageMoralPlus.currentPage = value;
                this.getMoralPlusData();
            },

        },
    }
</script>

<style scoped>
    .moralAddClass {
        width: 80%;
        margin-left: 10%;

    }
</style>