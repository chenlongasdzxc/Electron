<template>
    <div>
        <el-card>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="素拓分数据字典编辑" align="left">
                            <el-table
                                :data="sketchScoreData"
                                height="200"
                                style="font-size: 12px"
                                size="small"
                            >
                                <el-table-column
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
                                        <el-button size="mini" type="primary" @click="dialogFormVisible = true">编辑</el-button>
                                        <el-button size="mini" type="danger">删除</el-button>
                                    </template>

                                </el-table-column>
                            </el-table>
                        </FormPanel>
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="素拓分数据字典新增" align="left">
                            <div slot="header" style="height: 36px;margin-top: 0">
                                <el-button type="primary" size="mini" @click="addSKetchScoreRow">增行</el-button>
                                <el-button type="danger" size="mini" @click="deleteSketchScore">移除</el-button>
                            </div>
                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                <FormPanel name="德育加分数据字典编辑" align="left">

                </FormPanel>
                    </el-col>
                    <el-col :span="12">
                        <FormPanel name="德育加分数据字典新增" align="left">

                        </FormPanel>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <FormPanel name="德育减分数据字典编辑" align="left">

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
                sketchScoreData:[],
                form:{
                    name:'',
                    description:'',
                },
                formLabelWidth: '130px'
            }
        },
        mounted(){

            this.getSketchScoreData();
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
            deleteSketchScore: function () {

            },

            /**
             * @description获取素拓分数据字典
             * **/
            getSketchScoreData:function () {
                this.$http.get(Config.sketchScore +'/findFuzzy').then(response=>{
                    if (response.data.code == '200'){
                        this.sketchScoreData = response.data.data;
                    } else {
                        this.sketchScoreData = response.data.data;
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>