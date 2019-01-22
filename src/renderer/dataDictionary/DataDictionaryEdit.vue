<template>
    <div>
        <el-card>
            <!--素拓分数据字典操作-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="素拓分数据字典编辑" align="left">
                            <el-table
                                    :data="sketchScoreData"
                                    height="200"
                                    style="font-size: 12px"
                                    size="mini"
                            >
                                <el-table-column
                                        fixed
                                        prop="type"
                                        label="类 型"
                                ></el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="描 述"
                                ></el-table-column>
                                <el-table-column
                                        label="操 作"
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="dialogFormVisible = true">编辑
                                        </el-button>
                                        <el-button size="mini" type="danger" @click="deleteSketchScore(scope.row)">删除</el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                            <div>
                                <el-pagination
                                        style="display: flex;justify-content: center"
                                        background
                                        @size-change="page_handleSketchScoreSizeChange"
                                        @current-change="page_handleSketchScoreCurrentChange"
                                        layout="prev, pager, next"
                                        :current-page="pageSketchScore.currentPage"
                                        :page-size="pageSketchScore.size"
                                        :total="pageSketchScore.total"
                                >
                                </el-pagination>
                            </div>
                        </FormPanel>
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="素拓分数据字典新增" align="left">
                            <el-form ref="form" :model="sketchScoreEditForm" size="small" label-width="70px" style="padding: 0 0 0 0 ">
                                    <el-form-item label="类型名称" style="background-color: darkgrey">
                                        <el-input v-model="sketchScoreEditForm.type" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="类型描述" style="background-color: darkgrey">
                                        <el-input v-model="sketchScoreEditForm.description"></el-input>
                                    </el-form-item>
                                <el-row :gutter="180">
                                    <el-col :span="12">
                                        <el-form-item label="参与者" style="background-color: darkgrey">
                                            <el-input v-model="sketchScoreEditForm.participant"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="组织者" style="background-color: darkgrey">
                                            <el-input v-model="sketchScoreEditForm.organizer"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="2">
                                    <el-col :span="8">
                                    <el-form-item label="获奖者1" style="background-color: darkgrey">
                                        <el-input v-model="sketchScoreEditForm.winnerOne"></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="获奖者2" style="background-color: darkgrey">
                                        <el-input v-model="sketchScoreEditForm.winnerTwo"></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                    <el-form-item label="获奖者3" style="background-color: darkgrey">
                                        <el-input v-model="sketchScoreEditForm.winnerThree"></el-input>
                                    </el-form-item>
                                    </el-col>
                                </el-row>
                                <div style="float: right">
                                <el-button size="small" type="danger">取消</el-button>
                                <el-button size="small" type="primary" @click="saveSketchScore">保存</el-button>
                                </div>
                            </el-form>
                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
            <!--德育加分数据字典操作-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="德育加分数据字典编辑" align="left">
                            <div>
                                <el-input style="width: 80%" size="mini" v-model="moralPlusKeyword"
                                          class="value-search-box"
                                          placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                                <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                            </div>
                            <el-table
                                    :data="moralPlusData"
                                    height="200"
                                    style="font-size: 12px"
                                    size="mini"
                            >
                                <el-table-column
                                        prop="moralPlusName"
                                        label="项目名称"
                                        width="100"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralPlusType"
                                        label="项目类型"
                                        width="80"
                                ></el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="描述"
                                ></el-table-column>
                                <el-table-column
                                        label="操 作"
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="dialogFormVisible = true">编辑
                                        </el-button>
                                        <el-button size="mini" type="danger" @click="deleteMoralScore(scope.row)">删除</el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                            <div>
                                <el-pagination
                                        style="display: flex;justify-content: center"
                                        background
                                        @size-change="page_handleMoralPlusSizeChange"
                                        @current-change="page_handleMoralPlusCurrentChange"
                                        layout="prev, pager, next"
                                        :current-page="pageMoralPlus.currentPage"
                                        :page-size="pageMoralPlus.size"
                                        :total="pageMoralPlus.total"
                                >
                                </el-pagination>
                            </div>
                        </FormPanel>
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="德育加分数据字典新增" align="left">

                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
            <!--德育减分数据字典操作-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="德育减分数据字典编辑" align="left">
                            <div>
                                <el-input style="width: 80%" size="mini" v-model="moralPlusKeyword"
                                          class="value-search-box"
                                          placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                                <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                            </div>
                            <el-table
                                    :data="moralDeductionData"
                                    height="200"
                                    style="font-size: 12px"
                                    size="mini"
                            >
                                <el-table-column
                                        prop="moralDeductionName"
                                        label="项目名称"
                                        width="100"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralDeductionType"
                                        label="项目类型"
                                        width="80"
                                ></el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="描述"
                                ></el-table-column>
                                <el-table-column
                                        label="操 作"
                                >
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="dialogFormVisible = true">编辑
                                        </el-button>
                                        <el-button size="mini" type="danger" @click="deleteMoralDeduction(scope.row)">删除</el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                            <div>
                                <el-pagination
                                        style="display: flex;justify-content: center"
                                        background
                                        @size-change="page_handleMoralDeductionSizeChange"
                                        @current-change="page_handleMoralDeductionCurrentChange"
                                        layout="prev, pager, next"
                                        :current-page="pageMoralDeduction.currentPage"
                                        :page-size="pageMoralDeduction.size"
                                        :total="pageMoralDeduction.total"
                                >
                                </el-pagination>
                            </div>
                        </FormPanel>
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="德育减分数据字典新增" align="left">

                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
        </el-card>


        <el-dialog title="素拓分数据字典编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="素拓分类型" :label-width="formLabelWidth">
                    <el-input v-model="form.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        name: "DataDictionaryEdit",
        data() {
            return {
                dialogFormVisible: false,
                sketchScoreData: [],
                moralPlusData:[],
                moralDeductionData:[],
                pageSketchScore:{
                    currentPage: 1,
                    total : 1,
                    size: 4
                },
                pageMoralPlus:{
                    currentPage: 1,
                    total : 1,
                    size: 4
                },
                pageMoralDeduction:{
                    currentPage: 1,
                    total : 1,
                    size: 4
                },
                sketchScoreEditForm: {
                    type: '',
                    description: '',
                    participant: '',
                    organizer: '',
                    winnerOne: '',
                    winnerTwo: '',
                    winnerThree: '',
                },
                form: {
                    name: '',
                    description: '',
                },
                formLabelWidth: '130px',
                moralPlusKeyword:'',
            }
        },
        mounted() {
            this.getSketchScoreData();
            this.getMoralPlusData();
            this.getMoralDeductionData();
        },
        methods: {

            /**
             * @description新增素拓分数据字典
             * **/
            addSKetchScoreRow: function () {

            },

            /**
             * @description移除新增的素拓分数据字典
             * **/
            deleteSketchScore: function (SketchScoreDeletedata) {
                this.$http.post(Config.sketchScore + '/delete',SketchScoreDeletedata).then(response=>{
                    if (response.data.code == '200'){
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
                this.$http.get(Config.sketchScore + '/findFuzzy',{params:params}).then(response => {
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
            saveSketchScore:function () {
                this.$http.post(Config.sketchScore + '/add',this.sketchScoreEditForm).then(response=>{
                        if(response.data.code == '200'){
                            this.$message({
                                showClose: true,
                                message: '保存成功',
                                type: 'success'
                            });
                            this.getSketchScoreData();
                        }else {
                            this.$message({
                                showClose: true,
                                message: '新增失败',
                                type: 'error'
                            });
                        }
                })
            },

            /**
             * @description搜索德育加分数据字典
             * **/
            searchMoralPlus:function(){
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
             * @description 获取德育加分数据字典
             * **/
            getMoralPlusData:function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageMoralPlus.size,
                    page: that.pageMoralPlus.currentPage - 1,
                };
                this.$http.get(Config.moralPlus + '/findFuzzy',{params:params}).then(response => {
                    if (response.data.code == '200') {
                        that.moralPlusData = response.data.data.content;
                        that.pageMoralPlus.total = response.data.data.totalElements;
                    } else {
                        that.moralPlusData = response.data.data.content;
                    }
                })
            },

            /**
             * @description 删除德育加分数据字典
             * **/
            deleteMoralScore:function (moralPlus) {
              this.$http.post(Config.moralPlus + '/delete',moralPlus).then(response=>{
                  if (response.data.code == '200'){
                      this.$message({
                          showClose: true,
                          message: '删除德育加分数据字典成功',
                          type: 'success'
                      });
                      this.getMoralPlusData();
                  }else {
                      this.$message({
                          showClose: true,
                          message: '删除德育加分数据字典失败',
                          type: 'error'
                      });
                  }
              })
            },

            /**
             * @description 删除德育减分数据字典
             * **/
            deleteMoralDeduction:function (moralDeduction) {
                this.$http.post(Config.moralDeduction + '/delete',moralDeduction).then(response=>{
                    if (response.data.code == '200'){
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
            getMoralDeductionData:function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageMoralDeduction.size,
                    page: that.pageMoralDeduction.currentPage - 1,
                }
              this.$http.get(Config.moralDeduction + '/findFuzzy',{params:params}).then(response=>{
                  if (response.data.code == '200'){
                      that.moralDeductionData = response.data.data.content;
                      that.pageMoralDeduction.total = response.data.data.totalElements;
                  } else {
                      that.moralDeductionData = response.data.data.content;
                  }
              })
            },

            /**
             * @description 素拓分数据字典size事件
             * **/
            page_handleSketchScoreSizeChange(value){
                this.pageSketchScore.size = value;
                this.pageSketchScore.currentPage = 1;
                this.getSketchScoreData();
            },

            /**
             * @description 素拓分数据字典page事件
             * **/
            page_handleSketchScoreCurrentChange(value){
                this.pageSketchScore.currentPage = value;
                this.getSketchScoreData();
            },

            /**
             * @description德育加分数据字典分页size事件
             * **/

            page_handleMoralPlusSizeChange(value){
                this.pageMoralPlus.size = value;
                this.pageMoralPlus.currentPage = 1;
                this.getMoralPlusData();
            },

            /**
             * @description德育加分数据字典分页page事件
             * **/
            page_handleMoralPlusCurrentChange(value){
              this.pageMoralPlus.currentPage = value;
              this.getMoralPlusData();
            },

            /**
             * @description德育减分数据字典分页size事件
             * **/
            page_handleMoralDeductionSizeChange(value){
              this.pageMoralDeduction.size =value;
              this.pageMoralDeduction.currentPage = 1;
              this.getMoralDeductionData();
            },

            /**
             * @description德育减分数据字典分页page事件
             * **/
            page_handleMoralDeductionCurrentChange(value){
              this.pageMoralDeduction.currentPage = value;
              this.getMoralDeductionData();
            },
        }
    }
</script>

<style scoped>

</style>