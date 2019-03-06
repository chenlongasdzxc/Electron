<template>
    <div>
        <el-card>
            <div>
                <div>
                    <FormPanel name="素拓分数据字典编辑" align="left">
                        <el-table
                                :data="sketchScoreData"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                style="font-size: 12px"
                                border
                                size="mini"
                        >
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    align="center"
                                    width="60px"
                            ></el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="素拓分类型"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="participant"
                                    label="参与者"
                                    width="60px"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="organizer"
                                    label="组织者"
                                    width="60px"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="winnerOne"
                                    label="获奖者1"
                                    width="80px"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="winnerTwo"
                                    label="获奖者2"
                                    width="80px"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="winnerThree"
                                    label="获奖者3"
                                    width="80px"
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
                                    <el-button size="mini" type="primary" @click="updateSketchScore(scope.row)">编辑
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="deleteSketchScore(scope.row)">删除
                                    </el-button>
                                </template>

                            </el-table-column>
                        </el-table>
                        <div>
                            <el-pagination
                                    style="display: flex;justify-content: center"
                                    background
                                    @size-change="page_handleSketchScoreSizeChange"
                                    @current-change="page_handleSketchScoreCurrentChange"
                                    layout="prev, pager, next,total"
                                    :current-page="pageSketchScore.currentPage"
                                    :page-size="pageSketchScore.size"
                                    :total="pageSketchScore.total"
                            >
                            </el-pagination>
                        </div>
                    </FormPanel>
                </div>
                <div>
                    <FormPanel name="素拓分数据字典新增" align="left">
                        <div class="sketchAddClass">
                            <el-form :model="sketchScoreAddForm" size="small" style="font-size: 12px;text-align: left">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="类型" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.type" autocomplete="off"
                                                      style="width: 150px" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="参与者" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.participant" autocomplete="off"
                                                      style="width: 150px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="组织者" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.organizer" autocomplete="off"
                                                      style="width:150px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="获奖者1" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.winnerOne" autocomplete="off"
                                                      style="width: 150px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="获奖者2" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.winnerTwo" autocomplete="off"
                                                      style="width: 150px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="获奖者3" :label-width="formLabelWidth">
                                            <el-input v-model="sketchScoreAddForm.winnerThree" autocomplete="off"
                                                      style="width: 150px"
                                                      size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                    <el-form-item label="类型描述" :label-width="formLabelWidth">
                                        <el-input v-model="sketchScoreAddForm.description" autocomplete="off"
                                                  type="textarea" style="width: 540px"></el-input>
                                    </el-form-item>
                                    </el-col>>
                                    <el-col :span="12">
                                        <div style="float: right">
                                        <el-button size="small" type="danger">取消</el-button>
                                        <el-button size="small" type="primary" @click="saveSketchScore">保存</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </FormPanel>
                </div>
            </div>
        </el-card>

        <!--素拓分数据字典编辑弹窗-->
        <el-dialog title="素拓分数据字典编辑" :visible.sync="dialogFormVisible">
            <el-form :model="sketchScoreEditForm" size="small" style="font-size: 12px;text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="类型" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.type" autocomplete="off" style="width: 150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="参与者" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.participant" autocomplete="off" style="width: 150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="组织者" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.organizer" autocomplete="off" style="width:150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="获奖者1" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.winnerOne" autocomplete="off" style="width: 150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="获奖者2" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.winnerTwo" autocomplete="off" style="width: 150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="获奖者3" :label-width="formLabelWidth">
                            <el-input v-model="sketchScoreEditForm.winnerThree" autocomplete="off" style="width: 150px"
                                      size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="类型描述" :label-width="formLabelWidth">
                    <el-input v-model="sketchScoreEditForm.description" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveSketchScoreEdit" size="mini">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel, VButton},
        name: "SketchDataDictionary",
        data() {
            return {
                formLabelWidth: '80px',
                dialogFormVisible: false,
                sketchScoreData: [],
                pageSketchScore: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                sketchScoreAddForm: {
                    type: '',
                    description: '',
                    participant: '',
                    organizer: '',
                    winnerOne: '',
                    winnerTwo: '',
                    winnerThree: '',
                },
                sketchScoreEditForm: {
                    id: '',
                    name: '',
                    description: '',
                    type: '',
                    participant: '',
                    organizer: '',
                    winnerOne: '',
                    winnerTwo: '',
                    winnerThree: '',
                },
            }
        },
        mounted() {
            this.getSketchScoreData();
        },
        methods: {
            /**
             * @description编辑素拓分数据字典
             * **/
            saveSketchScoreEdit: function () {
                this.$http.post(Config.sketchScore + '/update', this.sketchScoreEditForm).then(response => {
                    if (response.data.code == '200') {
                        this.dialogFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.getSketchScoreData();
                    } else {
                        this.dialogFormVisible = false;
                        this.$message({
                            showClose: true,
                            message: '编辑失败',
                            type: 'error'
                        });
                    }
                })
            },

            /**
             * @description移除新增的素拓分数据字典
             * **/
            deleteSketchScore: function (SketchScoreDeletedata) {
                this.$http.post(Config.sketchScore + '/delete', SketchScoreDeletedata).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getSketchScoreData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            },

            /**
             * @description获取素拓分数据字典
             * **/
            getSketchScoreData: function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageSketchScore.size,
                    page: that.pageSketchScore.currentPage - 1,
                };
                this.$http.get(Config.sketchScore + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.sketchScoreData = response.data.data.content;
                        that.pageSketchScore.total = response.data.data.totalElements;
                    } else {
                        that.sketchScoreData = response.data.data;
                    }
                })
            },
            /**
             * @description新增保存素拓分数据字典
             * **/
            saveSketchScore: function () {
                this.$http.post(Config.sketchScore + '/update', this.sketchScoreAddForm).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            showClose: true,
                            message: '保存成功',
                            type: 'success'
                        });
                        this.getSketchScoreData();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '新增失败',
                            type: 'error'
                        });
                    }
                })
            },

            /**
             * @description 素拓分数据字典size事件
             * **/
            page_handleSketchScoreSizeChange(value) {
                this.pageSketchScore.size = value;
                this.pageSketchScore.currentPage = 1;
                this.getSketchScoreData();
            },

            /**
             * @description 素拓分数据字典page事件
             * **/
            page_handleSketchScoreCurrentChange(value) {
                this.pageSketchScore.currentPage = value;
                this.getSketchScoreData();
            },


            /**
             * @description素拓分数据字典编辑
             * **/
            updateSketchScore: function (sketchScore) {
                this.sketchScoreEditForm.type = sketchScore.type;
                this.sketchScoreEditForm.id = sketchScore.id;
                this.sketchScoreEditForm.description = sketchScore.description;
                this.sketchScoreEditForm.organizer = sketchScore.organizer;
                this.sketchScoreEditForm.winnerOne = sketchScore.winnerOne;
                this.sketchScoreEditForm.winnerTwo = sketchScore.winnerTwo;
                this.sketchScoreEditForm.winnerThree = sketchScore.winnerThree;
                this.sketchScoreEditForm.participant = sketchScore.participant;
                this.dialogFormVisible = true;
            },
        }
    }
</script>

<style scoped>
    .sketchAddClass {
        width: 80%;
        margin-left: 10%;

    }
</style>