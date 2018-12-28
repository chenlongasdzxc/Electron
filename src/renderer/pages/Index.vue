<template>
    <div>
        <div>Head</div>
        <div class="a-side">
            <el-menu :default-active="defaultActive" :router="true">
                <el-submenu index="1">
                    <template slot="title"><i></i>素拓分管理</template>
                    <el-menu-item-group>
                        <el-menu-item  index="/test">test1</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <el-menu-item index="/Test222">test2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
        <VButton @click="back">Back</VButton>

    </div>
</template>

<script>
    import VButton from '../components/Button'
    export default {
        components:{VButton},
        data(){
            return{
                defaultActive:'/Index',
            }
        },
        created:function(){
          this.initPage();
        },
        methods:{
            back:function () {
                this.$router.push({path:'/Menu'});
            },
            initPage(){
              this.defaultActive = this.$route.path;
            },
        }
    }
</script>

<style scoped>
    .a-side{
        max-height: calc(100vh - 60px);
        position: absolute;
        left: 0;
        z-index: 9;
        top: 60px;
        overflow: auto;
        text-align: left;
        color: #109849;
        box-shadow: 1px 1px 10px #ccc;
        width: 100px;
        background: #eef1f6;
        padding-bottom: 999px;
        margin-bottom: -999px;
    }
</style>