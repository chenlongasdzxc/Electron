<template>
    <div style="height: 100%">
        <div>
            <el-card shadow="always" style="margin: -7px -10px 0 -10px;background-color: whitesmoke;height: 30px">
                <div class="button_el">
                    <el-button type="text" class="iconfont icon-jianhao" @click="windowMin"></el-button>
                    <el-button type="text" class="iconfont icon-chuangkou" @click="windowMax"></el-button>
                    <el-button type="text" class="iconfont icon-guanbi" @click="windowClose"></el-button>
                </div>
            </el-card>
        </div>
        <div>Welcome{{items.name}}</div>
        <div>
            <el-row>
                <el-col>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 60%">
                        <el-table-column
                                fixed
                                prop="id"
                                label="序号"
                                width="50"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="userName"
                                label="姓名"
                                min-width="50"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="sketchName"
                                label="活动名称"
                                width="100"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="type"
                                label="活动类型"
                                min-width="150"
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
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipc} = require('electron');
    export default {
        data() {
            return {
                items: {
                    name: '',
                },
                tableData: [],
                sketchName: '',
                sketchScore: '',
                sketchStates: '',
                sketchType: '',
            }
        },
        created() {
            this.getSketchList();
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

            /**
             * 获取素拓分
             * **/
            getSketchList: function () {
                let url = 'http://localhost:8083/Sketch/findAll';
                this.$http.get(url).then((response) => {
                    if (response.data.code == 200) {
                        this.tableData = response.data.data;
                    }
                })
            }

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
</style>