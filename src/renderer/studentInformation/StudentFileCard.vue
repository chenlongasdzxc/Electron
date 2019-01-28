<template>
    <div>
        <el-card>
            <FormPanel name="已建档立卡" align="left">
                <el-table
                        :data="studentFileCardData"
                        border
                        height="200"
                        size="small"
                        style="width: 100%;text-align: center;font-size: 13px">
                    <el-table-column
                            fixed
                            prop="xuhao"
                            label="序号"
                            min-width="50"
                    ></el-table-column>
                    <el-table-column
                            fixed
                            prop="studentNumber"
                            min-width="100"
                            label="学号"
                    ></el-table-column>
                    <el-table-column
                            fixed
                            prop="studentName"
                            min-width="80"
                            label="学生姓名"
                    ></el-table-column>
                    <el-table-column
                            fixed
                            prop="studentClass"
                            min-width="100"
                            label="学生班级"
                    ></el-table-column>
                    <el-table-column
                            fixed
                            prop="idCard"
                            label="身份证号码"
                            min-width="130"
                    ></el-table-column>
                </el-table>
            </FormPanel>
            <FormPanel name="设置建档立卡" align="left" isNone="false" collapsible>
                <div>
                    <el-input style="width: 90%" size="small" v-model="findWord"
                              class="value-search-box"
                              placeholder="请输入学号或姓名或身份证号码"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <VButton @click="searchSetFileCardStudent" style="float: right">搜索</VButton>
                </div>
                <div>
                    <el-table
                            :data="setFileCardData"
                            border
                            height="200"
                            size="small"
                            style="width: 100%;text-align: center;font-size: 13px">
                        >
                        <el-table-column
                                fixed
                                prop="studentName"
                                label="姓名"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentNumber"
                                label="学号"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="fileCard"
                                label="是否建档立卡"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed
                                label="设置"
                        >
                            <template slot-scope="scope">
                                <VButton @click="setFileCard(scope.row)">设置</VButton>
                                <VButton @click="cancelFileCard(scope.row)">取消</VButton>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </FormPanel>
        </el-card>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        data() {
            return {
                studentFileCardData: [],
                findWord: '',
                setFileCardData: [],
            }
        },
        created() {
            this.getFileCardData();
        },
        methods: {

            /**
             * @description获取已建档立卡人员信息
             * **/
            getFileCardData: function () {
                const that = this;
                this.$http.get(Config.studentInfo + '/getFileCard').then(response => {
                    if (response.data.code == '200') {
                        that.studentFileCardData = response.data.data;
                    }else {
                        that.studentFileCardData = response.data.data;
                    }

                })
            },

            /**
             * @description查找设置建档立卡的学生信息
             * **/
            searchSetFileCardStudent: function () {
                const parms = {
                    findWord: this.findWord,
                };
                const p = JSON.parse(JSON.stringify(parms));
                this.$http.get(Config.studentInfo + '/findFuzzy', {params: p}).then(response => {
                    if (response.data.code == '200') {
                        this.setFileCardData = response.data.data;
                    }
                })
            },

            /**
             * @description取消建档立卡
             * **/
            cancelFileCard: function (fileCardData) {
                fileCardData.fileCard=false;
                this.$http.post(Config.studentInfo + '/update',fileCardData).then(response=>{
                    if (response.data.code=='200'){
                        this.getFileCardData();
                        this.$notify({
                            title: '提示',
                            message: '取消建档立卡成功'
                        })
                    }
                })
            },
            /**
             * 设置建档立卡
             * **/
            setFileCard:function (fileCardData) {
                fileCardData.fileCard=true;
                this.$http.post(Config.studentInfo + '/update',fileCardData).then(response=>{
                    if (response.data.code=='200'){
                        this.getFileCardData();
                        this.$notify({
                            title: '提示',
                            message: '设置建档立卡成功'
                        })
                    }
                })
            },
        }
    }
</script>

<style>
    .value-search-box .el-input__inner:focus {
        border-color: #DCDCDC;
    }

    .value-search-box .el-input__inner {
        background: #EEEEEE;
        color: #666666;
    }

    .value-search-box ::-webkit-input-placeholder {
        color: #666666;
    }

    /* 使用webkit内核的浏览器 */
    .value-search-box :-moz-placeholder {
        color: #666666;
    }

    /* Firefox版本4-18 */
    .value-search-box ::-moz-placeholder {
        color: #666666;
    }

    /* Firefox版本19+ */
    .value-search-box :-ms-input-placeholder {
        color: #666666;
    }
</style>