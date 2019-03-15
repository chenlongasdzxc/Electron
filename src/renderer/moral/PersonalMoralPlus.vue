<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的德育加分详情" align="left">
                    <div>
                        <el-table :data="personalMoralPlus"
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
                        </el-table>
                    </div>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="pageSize"
                                @current-change="pageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="personalMoralPlusPage.currentPage"
                                :page-size="personalMoralPlusPage.size"
                                :total="personalMoralPlusPage.total"
                        >
                        </el-pagination>
                    </div>
                </FormPanel>
            </div>

            <div>
                <FormPanel name="我的德育减分详情" align="left">

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
                personalMoralPlus: [],
                studentData:[],
                personalMoralPlusPage:{
                    size: 5,
                    total: 1,
                    currentPage: 1
                },
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.getPersonalMoralPlus();
        },

        methods: {

            /**
             * @description获取我的德育加分
             * **/
            getPersonalMoralPlus:function () {
               const params = {
                   /*studentNumber: this.studentData.studentNumber,*/
                   states: 'MP002',
                   size: this.personalMoralPlusPage.size,
                   page: this.personalMoralPlusPage.currentPage - 1,
                   sort: 'id,desc',
               }
                this.$http.get(Config.StudentMoral +'/findPersonal',{params:params})
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.personalMoralPlus = response.data.data.content;
                            this.personalMoralPlusPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            pageSize: function (value) {
                this.personalMoralPlusPage.size = value;
                this.personalMoralPlusPage.currentPage = 1;
                this.getPersonalMoralPlus();
            },

            /**
             * @description分页current事件
             * **/
            pageCurrent: function (value) {
                this.personalMoralPlusPage.currentPage = value;
                this.getPersonalMoralPlus();
            },

        }
    }
</script>

<style scoped>

</style>