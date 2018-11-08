<template>
    <div>
        <div>
        <el-card shadow="always" style="margin: -10px -10px 0 -10px;background-color: whitesmoke;height: 40px">
            <el-button type="text" class="iconfont icon-caidan" style="margin-top:-20px;pxpadding-top: -40px" aria-label="主菜单" @click="back"></el-button>
        </el-card>
        </div>
        <div>
            <el-tabs  style="margin-left: 200px;">
                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务">定时任务</el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
    import IconBtn from "./../components/IconButton";
    export default {
        name:'App',
        components:{IconBtn},
        data(){
            return{

            }
        },
        methods:{
            back:function () {
                this.$router.push({path:'/'})
            },
            handleOpen:function (key,keyPath) {
                console.log(key,keyPath)
            },
            handleClose:function (key,keyPath) {
                console.log(key,keyPath)
            },
        }
    }
</script>

<style>
    .iconfontclass{
        margin: -30px;
    }
</style>