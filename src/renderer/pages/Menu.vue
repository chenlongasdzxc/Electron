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
                        <el-menu
                                :default-active="defaultActive"
                                :router="true"
                                :unique-opened="true"
                        >
                            <el-submenu index="1">
                                <template slot="title" style="padding: 0px 0px 0px 0px">素拓分管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Sketch" style="min-width: 50px;margin-top: -10px">我的素拓分
                                    </el-menu-item>
                                    <el-menu-item index="/SketchManage" style="min-width: 50px">素拓分审核
                                    </el-menu-item>
                                    <el-menu-item index="/SketchView" style="min-width: 50px">素拓分详情</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title" style="padding: 0px 0px 0px 0px">德育表现</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/MoralExpression" style="min-width: 50px">我的德育表现</el-menu-item>
                                    <el-menu-item index="/MoralExpressionManage" style="min-width: 50px">德育表现管理
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title" style="padding: 0px 0px 0px 0px">德育加分</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/MoralPlus" style="min-width: 50px">我的德育加分</el-menu-item>
                                    <el-menu-item index="/MoralPlusManage" style="min-width: 50px">德育加分管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title" style="padding: 0px 0px 0px 0px">课外加分</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/MoralOut" style="min-width: 50px">我的课外加分</el-menu-item>
                                    <el-menu-item index="/MoralOutManage" style="min-width: 50px">课外加分管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="5">
                                <template slot="title" style="padding: 0px 0px 0px 0px">德育减分</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/MoralDeduction" style="min-width: 50px">我的减分</el-menu-item>
                                    <el-menu-item index="/MoralDeductionManage" style="min-width: 50px">减分管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="6">
                                <template slot="title" style="padding: 0px 0px 0px 0px;">综合素质</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/PersonalMoralPlus" style="min-width: 50px">我的综合素质</el-menu-item>
                                    <el-menu-item index="/ComprehensiveMoralPlus" style="min-width: 50px">综合素质管理
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="7">
                                <template slot="title" style="padding: 0px 0px 0px 0px;">学分管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="" style="min-width: 50px">我的学分</el-menu-item>
                                    <el-menu-item index="" style="min-width: 50px">重修选课</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="8">
                                <template slot="title" style="padding: 0px 0px 0px 0px">考勤管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/PersonalCheckingIn" style="min-width: 50px">我的考勤
                                    </el-menu-item>
                                    <el-menu-item index="/AskForLeave" style="min-width: 50px">请假申请</el-menu-item>
                                    <el-menu-item index="/CheckingInAdd" style="min-width: 50px">上传考勤</el-menu-item>
                                    <el-menu-item index="/CheckingManage" style="min-width: 50px">考勤管理</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="9">
                                <template slot="title" style="padding: 0px 0px 0px 0px">个人中心</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/UserInformation" style="min-width: 50px">个人信息
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="10">
                                <template slot="title" style="padding: 0px 0px 0px 0px">学生管理</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/StudentInformation" style="min-width: 50px">学生信息
                                    </el-menu-item>
                                    <el-menu-item index="/StudentFileCard" style="min-width: 50px">建档立卡</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="11">
                                <template slot="title" style="padding: 0 0 0 0 ">数据字典</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/DataDictionary" style="min-width: 50px">查看数据字典</el-menu-item>
                                    <el-menu-item index="/SketchDataDictionary" style="min-width: 50px">素拓分
                                    </el-menu-item>
                                    <el-menu-item index="/MoralPlusDataDictionary" style="min-width: 50px">德育加分
                                    </el-menu-item>
                                    <el-menu-item index="/MoralOutDataDictionary" style="min-width: 50px">课外加分
                                    </el-menu-item>
                                    <el-menu-item index="/MoralDeductionDataDicitionary" style="min-width: 50px">德育减分
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="12">
                                <template slot="title" style="padding: 0 0 0 0 ">设置</template>
                                <el-menu-item-group>
                                    <el-menu-item index="/RoleSetting" style="min-width: 50px">权限设置</el-menu-item>
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
                            style="background: #fff; color: #999; font-size: 12px; text-align: right; vertical-align: center;height: 20px;font-family: 'Arial Rounded MT Bold'">
                        @Everything is possible
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
                permissionCode: '',
            }
        },
        created:function() {
            this.permissionCode = JSON.parse(sessionStorage.getItem("permissionCode"));
            console.log(this.permissionCode);
        },
        methods: {
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