<template>
    <div style="height: 100%">
        <el-card>
            <div>
                <FormPanel name="素拓分数据字典" align="left">
                    <el-table
                            :data="sketchData"
                            size="mini"
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
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
                                min-width="100"
                        ></el-table-column>
                        <el-table-column
                                prop="description"
                                label="描述"
                                align="center"
                                min-width="200"
                        ></el-table-column>
                        <el-table-column
                                prop="participant"
                                align="center"
                                label="参与者"
                        ></el-table-column>
                        <el-table-column
                                prop="organizer"
                                align="center"
                                label="组织者"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerOne"
                                label="获奖者1"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerTwo"
                                align="center"
                                label="获奖者2"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerThree"
                                align="center"
                                label="获奖者3"
                        ></el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="page_handleSizeChange"
                                @current-change="page_handleCurrentChange"
                                layout="prev, pager, next,total"
                                :current-page="page.currentPage"
                                :page-size="page.size"
                                :total="page.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="德育加分数据字典" align="left">
                    <!--搜索框-->
                    <div>
                        <el-input style="width: 90%" size="small" v-model="moralPlusKeyWord"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                    </div>
                    <!--德育加分数据字典表格-->
                    <div>
                        <el-table
                                :data="moralPlusData"
                                size="mini"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
                                style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
                        >
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    align="center"
                                    width="60px"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusName"
                                    label="德育加分名称"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusType"
                                    label="德育加分类型"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusScore"
                                    label="德育加分分数"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <!--德育加分数据字典表格分页-->
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
                <FormPanel name="课外加分数据字典" align="left" isNone="false" collapsible>
                    <!--搜索框-->
                    <div>
                        <el-input style="width: 90%" size="small" v-model="moralOutKeyWord"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton @click="searchMoralOut" style="float: right">搜索</VButton>
                    </div>
                    <!--课外加分数据字典表格-->
                    <div>
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
                                    width="60px"
                            ></el-table-column>
                            <el-table-column
                                    label="课外加分名称"
                                    prop="moralOutName"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="课外加分类型"
                                    prop="moralOutType"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="课外加分分数"
                                    prop="moralOutScore"
                                    align="center"
                            ></el-table-column>
                        </el-table>
                    </div>
                    <!--课外加分数据字典分页-->
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
                </FormPanel>
            </div>
            <div>
                <FormPanel name="德育减分数据字典" align="left" isNone="false" collapsible>
                    <div>
                        <el-input style="width: 90%" size="small" v-model="moralDeductionFindWord"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton @click="searchMoralDeduction" style="float: right">搜索</VButton>
                    </div>
                    <div>
                        <el-table
                                :data="moralDeductionData"
                                size="mini"
                                :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                :cell-style="function({row, column, rowIndex, columnIndex}) {
                            if (columnIndex === 4) {
                            return 'text-align: left'
                            } else {
                                return 'text-align: center'
                            }
                                }"
                                style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
                        >
                            <el-table-column
                                    label="序号"
                                    type="index"
                                    align="center"
                                    width="60px"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionName"
                                    label="德育减分名称"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionType"
                                    label="德育减分类型"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralDeductionScore"
                                    label="德育减分分数"
                            ></el-table-column>
                        </el-table>
                    </div>
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
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel, DataTable},
        name: "DataDictionary",
        data() {
            return {
                sketchData: [],
                moralPlusData: [],
                moralOutData: [],
                moralOutKeyWord:'',
                moralPlusKeyWord:'',
                moralDeductionFindWord:'',
                moralDeductionData: [],
                page: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                pageMoralPlus: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                pageMoralOut: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                pageMoralDeduction: {
                    currentPage: 1,
                    total: 1,
                    size: 10
                },
                keyword: '',
                findword: '',
            }
        },
        created() {
            this.getSketchData();
            this.getMoralPlusData();
            this.getMoralDeductionData();
            this.getMoralOutData();
        },
        methods: {
            /**
             * @description获取素拓分数据字典
             * **/
            getSketchData: function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.page.size,
                    page: that.page.currentPage - 1,
                };
                this.$http.get(Config.sketchScore + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.sketchData = response.data.data.content;
                        that.page.total = response.data.data.totalElements;
                    } else {
                        that.sketchData = response.data.data.content;
                    }
                })
            },

            /**
             * @description获取德育加分数据字典
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
                        that.moralPlusData = response.data.data;
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
                this.$http.get(Config.moralOut + '/findFuzzy',{params:parmams})
                    .then(response=>{
                        if (response.data.code == '200') {
                            this.moralOutData = response.data.data.content;
                            this.pageMoralOut.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            /**
             * @description获取德育减分数据字典
             * **/
            getMoralDeductionData: function () {
                const that = this;
                let params = {
                    sort: 'id,desc',
                    size: that.pageMoralDeduction.size,
                    page: that.pageMoralDeduction.currentPage - 1,
                };
                this.$http.get(Config.moralDeduction + '/findFuzzy', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        that.moralDeductionData = response.data.data.content;
                        that.pageMoralDeduction.total = response.data.data.totalElements;
                    } else {
                        that.moralDeductionData = response.data.data;
                    }
                })
            },

            /**
             * @description模糊查询德育加分数据字典
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
             * @description模糊查询德育减分数据字典
             * **/
            searchMoralDeduction: function () {
                const params = {
                    keyWord: this.moralDeductionFindWord,
                };
                const p = JSON.parse(JSON.stringify(params));
                this.$http.get(Config.moralDeduction + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        this.moralDeductionData = response.data.data.content
                    } else {
                        this.moralDeductionData = response.data.data.content
                    }
                })
            },

            /**
             * @description模糊查询课外加分
             * **/
            searchMoralOut:function(){
                let params = {
                    keyWord: this.moralOutKeyWord,
                }
                this.$http.get(Config.moralOut + '/findFuzzy',{params:params})
                    .then( response =>{
                        if (response.data.code == '200'){
                            this.moralOutData = response.data.data.content;
                            this.pageMoralOut.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },


            page_handleSizeChange(value) {
                this.page.size = value;
                this.page.currentPage = 1;
                this.getSketchData();
            },


            page_handleCurrentChange(value) {
                this.page.currentPage = value;
                this.getSketchData();
            },

            /**
             * @description 德育加分分页大小变化
             * **/
            page_handleMoralPlusSizeChange(value) {
                this.pageMoralPlus.size = value;
                this.pageMoralPlus.currentPage = 1;
                this.getMoralPlusData();
            },

            /**
             * @description 德育加分分页页码变化
             * **/
            page_handleMoralPlusCurrentChange(value) {
                this.pageMoralPlus.currentPage = value;
                this.getMoralPlusData();
            },

            /**
             * @description课外加分分页大小变化
             * **/
            page_handleMoralOutSizeChange(value) {
                this.pageMoralOut.size = value;
                this.pageMoralOut.currentPage = 1;
                this.getMoralOutData();
            },
            /**
             * @description课外加分分页page事件
             * **/
            page_handleMoralOutCurrentChange(value) {
                this.pageMoralOut.currentPage = value;
                this.getMoralOutData();
            },
            /**
             * @description 德育减分分页size变化
             * **/
            page_handleMoralDeductionSizeChange(value) {
                this.pageMoralDeduction.size = value;
                this.pageMoralDeduction.currentPage = 1;
            },

            /**
             * @description 德育减分分页页码变化
             * **/
            page_handleMoralDeductionCurrentChange(value) {
                this.pageMoralDeduction.currentPage = value;
            },
        }
    }
</script>

<style scoped>

</style>