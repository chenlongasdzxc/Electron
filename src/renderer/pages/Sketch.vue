<template>
    <div>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-carousel-item title="素拓分" name="1">
        <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 60%">
                <el-table-column
                        fixed
                        prop="studentName"
                        label="姓名"
                        width="50"
                ></el-table-column>
                <el-table-column
                        fixed
                        prop="sketchName"
                        label="活动名称"
                        width="100"
                ></el-table-column>
                <el-table-column
                        fixed
                        prop="sketchType"
                        label="活动类型"
                        width="150"
                ></el-table-column>
                <el-table-column
                        fixed
                        prop="sketchScore"
                        label="素拓分"
                        width="80"
                ></el-table-column>
                <el-table-column
                        fixed
                        prop="sketchStates"
                        label="状态"
                        width="50"
                ></el-table-column>
                <el-table-column
                        fixed
                        label="操作"
                ></el-table-column>
            </el-table>
        </div>
            </el-carousel-item>
        </el-collapse>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData:[],
                sketchName:'',
                sketchScore:'',
                sketchStates:'',
                sketchType:'',
            }
        },
        created(){
          this.getSketchList();
          alert("ssss")
        },
        mounted:{
            getSketchList:function () {
                let url = 'http://localhost:8083/Sketch/findAll';
                this.$http.get(url).then((response)=>{
                    if (response.data.code==200){
                        debugger
                        this.tableData = response.data.data;
                        debugger
                    }
                })
            }
        },

    }
</script>

<style>

</style>