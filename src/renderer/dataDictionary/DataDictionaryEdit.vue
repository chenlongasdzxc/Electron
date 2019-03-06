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
                                    :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                    :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
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
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="素拓分数据字典新增" align="left">
                            <el-form ref="form" :model="sketchScoreAddForm" size="small" label-width="70px"
                                     style="padding: 0 0 0 0 ">
                                <el-form-item label="类型名称">
                                    <el-input v-model="sketchScoreAddForm.type" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="类型描述">
                                    <el-input v-model="sketchScoreAddForm.description" type="textarea"></el-input>
                                </el-form-item>
                                <el-row :gutter="180">
                                    <el-col :span="12">
                                        <el-form-item label="参与者">
                                            <el-input v-model="sketchScoreAddForm.participant"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="组织者">
                                            <el-input v-model="sketchScoreAddForm.organizer"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="2">
                                    <el-col :span="8">
                                        <el-form-item label="获奖者1">
                                            <el-input v-model="sketchScoreAddForm.winnerOne"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="获奖者2">
                                            <el-input v-model="sketchScoreAddForm.winnerTwo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="获奖者3">
                                            <el-input v-model="sketchScoreAddForm.winnerThree"></el-input>
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
                                          placeholder="请输入查询条件"><i slot="prefix"
                                                                   class="el-input__icon el-icon-search"></i>
                                </el-input>
                                <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                            </div>
                            <el-table
                                    :data="moralPlusData"
                                    :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                    :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
                                    style="font-size: 12px"
                                    size="mini"
                            >
                                <el-table-column
                                        prop="moralPlusName"
                                        label="项目名称"
                                        width="110"
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
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="德育加分数据字典新增" align="left">
                            <el-form :model="moralPlusAddForm" size="small" style="font-size: 12px;text-align: left">
                                <el-form-item label="德育加分名称" :label-width="formLabelWidth">
                                    <el-input v-model="moralPlusAddForm.moralPlusName"></el-input>
                                </el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="德育加分类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.moralPlusType"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="德育加分分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralPlusAddForm.moralPlusScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="德育加分描述" :label-width="formLabelWidth">
                                    <el-input v-model="moralPlusAddForm.description" type="textarea"></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="float: right">
                                <el-button size="small" type="danger">取消</el-button>
                                <el-button size="small" type="primary" @click="saveMoralPlus">保存</el-button>
                            </div>
                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
            <!--课外加分数据字典操作-->
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="课外加分数据字典编辑" align="left">
                            <div>
                                <el-input style="width: 80%" size="mini" v-model="moralOutKeyword"
                                          class="value-search-box"
                                          placeholder="请输入查询条件"><i slot="prefix"
                                                                   class="el-input__icon el-icon-search"></i>
                                </el-input>
                                <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                            </div>
                            <el-table
                                    :data="moralOutData"
                                    border
                                    :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                    size="mini"
                                    style="width: 100%">
                                <el-table-column
                                        label="名称"
                                        prop="moralOutName"
                                        align="center"
                                        width="100px"
                                ></el-table-column>
                                <el-table-column
                                        label="类型"
                                        prop="moralOutType"
                                        align="center"
                                        width="80px"
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
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="课外加分数据字典新增" align="left">
                            <el-form :model="moralOutAddForm" size="small" style="font-size: 12px;text-align: left">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="课外加分名称" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutName"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="课外加分类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutType"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="课外加分级别" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.states"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="课外加分分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralOutAddForm.moralOutScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="课外加分描述" :label-width="formLabelWidth">
                                    <el-input v-model="moralPlusAddForm.value" type="textarea"></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="float: right">
                                <el-button size="small" type="danger">取消</el-button>
                                <el-button size="small" type="primary" @click="saveMoralOut">保存</el-button>
                            </div>
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
                                          placeholder="请输入查询条件"><i slot="prefix"
                                                                   class="el-input__icon el-icon-search"></i>
                                </el-input>
                                <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                            </div>
                            <el-table
                                    :data="moralDeductionData"
                                    :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                    :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
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
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="德育减分数据字典新增" align="left">
                            <el-form :model="moralDeductionAddForm" size="small"
                                     style="font-size: 12px;text-align: left">
                                <el-form-item label="德育减分名称" :label-width="formLabelWidth">
                                    <el-input v-model="moralDeductionAddForm.moralDeductionName"></el-input>
                                </el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="德育减分类型" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.moralDeductionType"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="德育减分分数" :label-width="formLabelWidth">
                                            <el-input v-model="moralDeductionAddForm.moralDeductionScore"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="德育减分描述" :label-width="formLabelWidth">
                                    <el-input v-model="moralDeductionAddForm.description" type="textarea"></el-input>
                                </el-form-item>
                            </el-form>
                            <div style="float: right">
                                <el-button size="small" type="danger">取消</el-button>
                                <el-button size="small" type="primary" @click="saveMoralDeductionAdd">保存</el-button>
                            </div>
                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <!--素拓分数据字典编辑弹窗-->
        <el-dialog title="素拓分数据字典编辑" :visible.sync="dialogFormVisible">
            <el-form :model="sketchScoreEditForm" size="small" style="font-size: 12px;text-align: left">
                <el-form-item label="素拓分类型" :label-width="formLabelWidth">
                    <el-input v-model="sketchScoreEditForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型描述" :label-width="formLabelWidth">
                    <el-input v-model="sketchScoreEditForm.description" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="参与者" :label-width="formWidth">
                            <el-input v-model="sketchScoreEditForm.participant" autocomplete="off" style="width: 80px"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组织者" :label-width="formWidth">
                            <el-input v-model="sketchScoreEditForm.organizer" autocomplete="off" style="width: 80px"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="获奖者1" :label-width="formWidth">
                            <el-input v-model="sketchScoreEditForm.winnerOne" autocomplete="off" style="width: 80px"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="获奖者2" :label-width="formWidth">
                            <el-input v-model="sketchScoreEditForm.winnerTwo" autocomplete="off" style="width: 80px"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="获奖者3" :label-width="formWidth">
                            <el-input v-model="sketchScoreEditForm.winnerThree" autocomplete="off" style="width: 80px"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSketchScoreEdit">保存</el-button>
            </div>
        </el-dialog>

        <!--德育加分数据字典编辑弹窗-->
        <el-dialog title="德育加分数据字典编辑" :visible.sync="moralPlusFormVisible">
            <el-form :model="sketchScoreEditForm" size="small" style="font-size: 12px;text-align: left">
                <el-form-item label="德育加分名称" :label-width="formLabelWidth">
                    <el-input v-model="moralPlusEditForm.moralPlusName" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="德育加分类型" :label-width="formLabelWidth">
                            <el-input v-model="moralPlusEditForm.moralPlusType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="德育加分分数" :label-width="formLabelWidth">
                            <el-input v-model="moralPlusEditForm.moralPlusScore" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="德育加分描述" :label-width="formLabelWidth">
                    <el-input v-model="moralPlusEditForm.description" autocomplete="off" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moralPlusFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMoralPlusEditForm">保存</el-button>
            </div>
        </el-dialog>

        <!--课外加分数据字典编辑弹窗-->
        <!--德育减分数据字典编辑弹窗-->
        <el-dialog title="德育减分数据字典编辑" :visible.sync="moralDeductionFormVisible">
            <el-form :model="moralDeductionEditForm" size="small" style="font-size: 12px;text-align: left">
                <el-form-item label="德育减分名称" :label-width="formLabelWidth">
                    <el-input v-model="moralDeductionEditForm.moralDeductionName" autocomplete="off"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="德育减分类型" :label-width="formLabelWidth">
                            <el-input v-model="moralDeductionEditForm.moralDeductionType" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="德育减分分数" :label-width="formLabelWidth">
                            <el-input v-model="moralDeductionEditForm.moralDeductionScore"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="德育减分描述" :label-width="formLabelWidth">
                    <el-input v-model="moralDeductionEditForm.description" autocomplete="off"
                              type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moralDeductionFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMoralDeductionEdit">保存</el-button>
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
                moralPlusFormVisible: false,
                moralDeductionFormVisible: false,
                sketchScoreData: [],
                moralOutData: [],
                moralPlusData: [],
                moralDeductionData: [],
                pageSketchScore: {
                    currentPage: 1,
                    total: 1,
                    size: 4
                },
                pageMoralPlus: {
                    currentPage: 1,
                    total: 1,
                    size: 4
                },
                pageMoralDeduction: {
                    currentPage: 1,
                    total: 1,
                    size: 4
                },
                pageMoralOut: {
                    currentPage: 1,
                    total: 1,
                    size: 4
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
                moralOutAddForm: {
                    moralOutName: '',
                    moralOutType: '',
                    moralOutScore: '',
                    states:'',
                    value: '',

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
                formLabelWidth: '100px',
                formWidth: '80px',
                moralPlusKeyword: '',
                moralOutKeyword: '',
            }
        },
        mounted() {
            this.getSketchScoreData();
            this.getMoralPlusData();
            this.getMoralDeductionData();
            this.getMoralOutData();
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
            saveMoralOut:function(){
                this.$http.post(Config.moralOut + '/update',this.moralOutAddForm)
                    .then(response=>{
                        if(response.data.code =='200'){
                            this.$message({
                              message:'保存成功',
                              type:'success',
                              center:true,
                            })
                            this.getMoralOutData();
                        }else {
                            this.$message({
                                message:'保存失败',
                                type:'danger',
                                center:true,
                            })
                        }
                    })
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
             * @description素拓分数据字典编辑
             * **/
            updateSketchScore: function (sketchScore) {
                this.dialogFormVisible = true;
                this.sketchScoreEditForm.type = sketchScore.type;
                this.sketchScoreEditForm.id = sketchScore.id;
                this.sketchScoreEditForm.description = sketchScore.description;
                this.sketchScoreEditForm.organizer = sketchScore.organizer;
                this.sketchScoreEditForm.winnerOne = sketchScore.winnerOne;
                this.sketchScoreEditForm.winnerTwo = sketchScore.winnerTwo;
                this.sketchScoreEditForm.winnerThree = sketchScore.winnerThree;
                this.sketchScoreEditForm.participant = sketchScore.participant;
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
             * @description编辑德育减分数据字典
             * **/
            saveMoralDeductionEdit: function () {
                this.$http.post(Config.moralDeduction + '/add', this.moralDeductionEditForm).then(response => {
                    if (response.data.code == '200') {

                    } else {

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
        }
    }
</script>

<style scoped>
    .dataCardInput {

    }
</style>