<template>
    <div style="height: 100%">
        <el-card>
            <div>
                <FormPanel name="素拓分数据字典" align="left">
                    <el-table
                            :data="sketchData"
                            border
                            height="250"
                            style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
                    >
                        <el-table-column
                                prop="type"
                                label="素拓分类型"
                                min-width="200"
                        ></el-table-column>
                        <el-table-column
                                prop="participant"
                                label="参与者"
                        ></el-table-column>
                        <el-table-column
                                prop="organizer"
                                label="组织者"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerOne"
                                label="获奖者1"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerTwo"
                                label="获奖者2"
                        ></el-table-column>
                        <el-table-column
                                prop="winnerThree"
                                label="获奖者3"
                        ></el-table-column>
                    </el-table>
                </FormPanel>
            </div>
            <div>
                <FormPanel name="德育加分数据字典" align="left">
                    <div>
                        <el-input style="width: 90%" size="small" v-model="keyword"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton @click="searchMoralPlus" style="float: right">搜索</VButton>
                    </div>
                    <div>
                        <el-table
                                :data="moralPlusData"
                                border
                                height="250"
                                style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
                        >
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
                </FormPanel>
            </div>
            <div>
                <FormPanel name="德育减分数据字典" align="left">
                    <div>
                        <el-input style="width: 90%" size="small" v-model="findword"
                                  class="value-search-box"
                                  placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <VButton @click="searchMoralDeduction" style="float: right">搜索</VButton>
                    </div>
                    <div>
                        <el-table
                                :data="moralDeductionData"
                                border
                                height="250"
                                style="font-size: 12px;font-family: 'Script MT Bold';text-align: center"
                        >
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
                moralDeductionData: [],
                keyword: '',
                findword: '',
            }
        },
        created() {
            this.getSketchData();
            this.getMoralPlusData();
            this.getMoralDeductionData();
        },
        methods: {
            /**
             * @description获取素拓分数据字典
             * **/
            getSketchData: function () {
                this.$http.get(Config.sketchScore + '/findFuzzy').then(response => {
                    if (response.data.code == '200') {
                        this.sketchData = response.data.data;
                    } else {
                        this.sketchData = response.data.data;
                    }
                })
            },

            /**
             * @description获取德育加分数据字典
             * **/
            getMoralPlusData: function () {
                this.$http.get(Config.moralPlus + '/findAll').then(response => {
                    if (response.data.code == '200') {
                        this.moralPlusData = response.data.data;
                    } else {
                        this.moralPlusData = response.data.data;
                    }
                })
            },

            /**
             * @description获取德育减分数据字典
             * **/
            getMoralDeductionData:function(){
                this.$http.get(Config.moralDeduction + '/findAll').then(response=>{
                    if (response.data.code == '200'){
                        this.moralDeductionData = response.data.data;
                    } else{
                        this.moralDeductionData = response.data.data;
                    }
                })
            },

            /**
             * @description模糊查询德育加分数据字典
             * **/
            searchMoralPlus: function () {
                const parms = {
                    keyWord: this.keyword,
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
                    keyWord: this.findword,
                };
                const p = JSON.parse(JSON.stringify(parms));
                this.$http.get().then(response => {

                })
            },

        }
    }
</script>

<style scoped>

</style>