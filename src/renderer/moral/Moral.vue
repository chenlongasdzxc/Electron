<template>
    <div>
        <div>
        <form-panel align="left" name="我的德育分">

        </form-panel>
        </div>
        <div>
            <form-panel align="left" name="新增德育分">
                <div style="width: 80%;margin-left: 10%">
                    <div class="form-title">
                        <span>德育分信息</span>
                    </div>
                    <div>
                        <el-form ref="form" :model="moral" label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="德育分名称:">
                                        <el-input v-model="sketch.sketchName" size="small"
                                                  style="width: 200px"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="素拓分类型:">
                                        <el-select v-model="sketch.type" size="small" style="width: 200px">
                                            <el-option
                                                    v-for="item in sketchTypeData"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div>
                                <el-form-item label="参与角色:">
                                    <el-select v-model="sketch.sketchPart" size="small" style="width: 200px">
                                        <el-option
                                                v-for="item in sketchPart"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <div style="float: right">
                                    <el-button size="small" type="danger">取消</el-button>
                                    <el-button size="small" type="primary" @click="savePersonalSketch">保存
                                    </el-button>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </form-panel>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    export default {
        components:{VButton,FormPanel},
        name: "Moral",
        data(){
            return{
                moral:{

                },
            }
        }
    }
</script>

<style scoped>

</style>