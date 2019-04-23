<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的综合素质详情" align="left">
                    <div>
                        <el-row>
                            <el-col :span="12">
                                <el-form :model="personalComprehensive" size="small" ref="personalComprehensive">
                                    <el-form-item label="综合素质年度：" :label-width="width">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="personalComprehensive.year"
                                        >
                                            <el-option
                                                    v-for="item in year"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="12">
                                <div style="float: right">
                                    <el-button size="mini" type="danger" @click="restForm('personalComprehensive')">重置
                                    </el-button>
                                    <el-button size="mini" type="primary" @click="search">搜索
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <div class="form-title">
                            <span>德育表现</span>
                        </div>
                        <el-table :data="personalMoralExpression"
                                  :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                  style="font-size: 11.5px"
                                  border
                                  size="mini">
                            <el-table-column
                                    type="index"
                                    label="序号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralExpressionName"
                                    label="名称"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralExpressionScore"
                                    label="分数"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralExpressionYear"
                                    label="学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="states"
                                    label="申请综合素质状态"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini"
                                            v-if="scope.row.states =='ME001' ">未查看
                                    </el-tag>
                                    <el-tag type="success" size="mini"
                                            v-if="scope.row.states =='ME002' ">无异议
                                    </el-tag>
                                    <el-tag type="danger" size="mini"
                                            v-if="scope.row.states =='ME003' ">有异议
                                    </el-tag>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="form-title">
                            <span>德育加分</span>
                        </div>
                        <div>
                            <el-table :data="personalMoralPlus"
                                      :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                                      style="font-size: 11.5px"
                                      border
                                      size="mini">
                                <el-table-column
                                        type="index"
                                        label="序号"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralPlusName"
                                        label="名称"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralPlusType"
                                        label="类型"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralPlusScore"
                                        label="分数"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="year"
                                        label="学年"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="comprehensiveQualityStates"
                                        label="申请综合素质状态"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-tag type="warning" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMP001' ">未审核
                                        </el-tag>
                                        <el-tag type="success" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMP002' ">审核通过
                                        </el-tag>
                                        <el-tag type="danger" size="mini"
                                                v-if="scope.row.comprehensiveQualityStates =='CQMP003' ">审核未通过
                                        </el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="form-title">
                            <span>课外加分</span>
                        </div>
                        <div>
                            <el-table :data="personalMoralOut"
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
                                        label="名称"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutType"
                                        label="类型"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutScore"
                                        label="分数"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="year"
                                        label="学年"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="comprehensiveQualityStates"
                                        label="申请综合素质状态"
                                        align="center"
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
                            </el-table>
                        </div>
                        <div class="form-title">
                            <span>德育减分</span>
                        </div>
                        <div>
                            <el-table :data="personalMoralDeduction"
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
                                        label="名称"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutType"
                                        label="类型"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="moralOutScore"
                                        label="分数"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="year"
                                        label="学年"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="comprehensiveQualityStates"
                                        label="申请综合素质状态"
                                        align="center"
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
                            </el-table>
                        </div>
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
        name: "PersonalMoralPlus",
        data() {
            return {
                width: '120px',
                personalMoralPlus: [],
                personalMoralOut: [],
                personalMoralExpression: [],
                personalMoralDeduction: [],
                studentData: [],
                personalMoralPlusPage: {
                    size: 5,
                    total: 1,
                    currentPage: 1
                },
                personalComprehensive: {
                    year: '',
                },
                year: [{
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
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
        },

        methods: {


            init: function () {
                this.getPersonalMoralPlus();
                this.getPersonalMoralOut();
                this.getPersonalMoralExpression();
            },

            search:function(){
                const value = this.personalComprehensive.year;
                this.getPersonalMoralPlus(value);
                this.getPersonalMoralOut(value);
                this.getPersonalMoralExpression(value);
            },

            restForm:function(formName){
                this.$refs[formName].resetFields();
                this.personalComprehensive.year = '';
            },

            /**
             * @description获取我的德育加分
             * **/
            getPersonalMoralPlus: function (value) {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    states: 'MP002',
                    comprehensiveQualityStates: 'CQMP002',
                    sort: 'id,desc',
                    year:value
                }
                this.$http.get(Config.StudentMoral + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralPlus = response.data.data.content;
                        } else {

                        }
                    })
            },

            getPersonalMoralOut: function (value) {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    states: 'MO002',
                    comprehensiveQualityStates: 'CQMO002',
                    sort: 'id,desc',
                    year:value
                }
                this.$http.get(Config.StudentMoralOut + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralOut = response.data.data.content;
                        } else {

                        }
                    })
            },

            getPersonalMoralExpression: function (value) {
                const params = {
                    studentNumber: this.studentData.studentNumber,
                    states: 'ME002',
                    moralExpressionYear:value,
                }
                this.$http.get(Config.StudentMoralExpression + '/findPersonal', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.personalMoralExpression = response.data.data;
                        } else {

                        }
                    })
            },

        }
    }
</script>

<style scoped>

</style>