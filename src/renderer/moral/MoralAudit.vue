<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="德育加分" align="left">
                    <div>

                    </div>
                    <div>
                        <el-table :data="moralPlus"
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
                                    prop="studentName"
                                    label="姓名"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentNumber"
                                    label="学号"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="studentClass"
                                    label="班级"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="moralPlusName"
                                    label="总分"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="year"
                                    label="学年"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="详情"
                                    align="center"
                                    width="80px"
                            ></el-table-column>
                           <!-- <el-table-column
                                    prop="states"
                                    label="状态"
                                    align="center"
                                    width="120px"
                            >
                                <template slot-scope="scope">
                                    <el-tag type="warning" size="mini" v-if="scope.row.states =='MP001' ">未审核
                                    </el-tag>
                                    <el-tag type="success" size="mini" v-if="scope.row.states =='MP002' ">审核通过
                                    </el-tag>
                                    <el-tag type="danger" size="mini" v-if="scope.row.states =='MP003' ">审核未通过
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="value"
                                    label="审核理由"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="applyPersonName"
                                    label="审核人"
                                    align="center"
                            ></el-table-column>-->
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
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "MoralAudit",
        data() {
            return {
                moralPlus:[],
            }

        },

        mounted() {

        },

        methods: {

            /**
             * @description获取
             * **/
            getMoralPlus:function () {

            }
        },
    }
</script>

<style scoped>

</style>