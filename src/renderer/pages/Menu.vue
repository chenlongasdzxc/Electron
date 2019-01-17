<template>
    <div style="height: 100%">
        <el-container>
            <el-header
                    style="-webkit-app-region: drag;padding: 0px 0px 0px 0px;height: 40px;position: fixed;top: 0;left: 0;width: 100vw;z-index: 5">
                <div>
                    <el-card shadow="always"
                             style="background-color: #f0f0f0;height: 40px">
                        <div class="button_el" style="-webkit-app-region: no-drag">
                            <el-button type="text" class="iconfont icon-jianhao" @click="windowMin"
                                       style="color: black"></el-button>
                            <el-button type="text" class="iconfont icon-chuangkou" @click="windowMax"
                                       style="color: black"></el-button>
                            <el-button type="text" class="iconfont icon-guanbi" @click="windowClose"
                                       style="color: black"></el-button>
                        </div>
                        <div class="button_menu">
                            <el-button type="text" class="el-icon-menu" @click="menuShow != menuShow"></el-button>
                        </div>
                    </el-card>
                </div>
            </el-header>
            <div style="height: 40px">
            </div>
            <el-container style="height: calc( 100vh - 40px)">
                <transition name="el-zoom-in-top">
                    <el-aside style="width: 150px" v-show="menuShow" class="transition-box">
                        <el-menu :default-active="defaultActive" :router="true">
                            <el-submenu index="1">
                                <template slot="title" style="padding: 0px 0px 0px 0px"><i></i>素拓分管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Sketch" style="min-width: 50px">我的素拓分</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="/SketchAudit" style="min-width: 50px">素拓分审核</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title" style="padding: 0px 0px 0px 0px"><i></i>德育分管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Moral" style="min-width: 50px">我的德育分</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="MoralAudit" style="min-width: 50px">德育分审核</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title" style="padding: 0px 0px 0px 0px">德育加分</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/MoralPlus" style="min-width: 50px">我的德育加分</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="" style="min-width: 50px">德育加分审核</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title" style="padding: 0px 0px 0px 0px;">学分管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="" style="min-width: 50px">我的学分</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="" style="min-width: 50px">重修选课</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="5">
                                <template slot="title" style="padding: 0px 0px 0px 0px">考勤管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="" style="min-width: 50px">通勤信息</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="/" style="min-width: 50px">考勤管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="6">
                                <template slot="title" style="padding: 0px 0px 0px 0px">个人中心</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/UserInformation" style="min-width: 50px">个人信息
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="7">
                                <template slot="title" style="padding: 0px 0px 0px 0px">学生管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/StudentInformation" style="min-width: 50px">学生信息
                                    </el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="/StudentFileCard" style="min-width: 50px">建档立卡</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="8">
                                <template slot="title" style="padding: 0 0 0 0 ">数据字典</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/DataDictionary" style="min-width: 50px">查看数据字典</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="/DataDictionaryEdit" style="min-width: 50px">设置数据字典</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                </transition>
                <el-container>
                    <el-main style="padding: 0 0 0 0">
                        <router-view></router-view>
                    </el-main>
                    <el-footer
                            style="background: #fff; color: #999; font-size: 12px; text-align: right; vertical-align: center;height: 20px">
                        @Silence
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'

    export default {
        components: {VButton, FormPanel, DataTable},
        data() {
            return {
                path: '',
                defaultActive: '/Index',
                menu: [
                    {id: '1', name: '素拓', path: '/pages/Sketch'},
                ],
                items: {
                    name: '',
                },
                menuShow: true,
            }
        },
        created() {
        },
        methods: {
            goTo: function () {
                this.$router.push({path: '/Sketch'})
            },
            studentInfo: function () {
                this.$router.push({path: '/StudentInfo'})
            },
            index: function () {
                this.$router.push({path: '/Index'})
            },
            windowMax: function () {
                ipc.send('max')
            },
            windowClose: function () {
                ipc.send('close')
            },
            windowMin: function () {
                ipc.send('min')
            },

        }
    }
</script>

<style>
    .button_el {
        position: relative;
        margin-top: -30px;
        margin-left: 0px;
        float: right;
        float: top;
    }

    .button_menu {
        position: relative;
        margin-top: -25px;
        margin-right: 0px;
        float: left;
    }


</style>