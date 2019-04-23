<template>
    <div>
        <el-card>
            <div>
                <FormPanel name="我的成绩" align="left">
                    <div>
                        <el-form :model="personalGrade" size="small" ref="personalGrade">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="年度：" :label-width="moralExpressionFormWidth">
                                        <el-select size="mini" style="width: 120px"
                                                   v-model="personalGrade.year"
                                        >
                                            <el-option
                                                    v-for="item in year"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <div style="float: right">
                                        <el-button size="mini" type="danger" @click="resetForm('moralExpressionFormWidth')">
                                            重置
                                        </el-button>
                                        <el-button size="mini" type="primary">搜索
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>
                    </div>
                </FormPanel>
            </div>
        </el-card>
    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'
    export default {
        components:{FormPanel},
        name: "GradeManage",
        data(){
            return{
                personalGrade:{

                }
            }
        },


        mounted(){

        },

        methods:{

        }
    }
</script>

<style scoped>

</style>