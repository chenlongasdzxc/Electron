<template>
    <div>
        <div>
            <FormPanel align="left" name="请假详情">
                <div>
                    <el-input style="width: 90%" size="small" v-model="leaveKeyword"
                              class="value-search-box"
                              placeholder="请输入学号或姓名或日期"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <VButton style="float: right" @click="searchLeaving">搜索</VButton>
                </div>
                <div>
                    <el-table
                            :data="leaveData"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                align="center"
                                type="index"
                                label="序号"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                align="center"
                                label="姓名"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                prop="studentClass"
                                align="center"
                                label="班级"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveName"
                                align="center"
                                label="请假科目"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveDateStart"
                                align="center"
                                label="请假开始时间"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveDateEnd"
                                align="center"
                                label="请假结束时间"
                        ></el-table-column>
                        <el-table-column
                                prop="leaveValue"
                                align="center"
                                label="请假理由"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="applyLeave(scope.row)">通过</el-button>
                                <el-button size="mini" type="danger" @click="applyFiled(scope.row)">不通过</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </FormPanel>
        </div>
        <div>
            <FormPanel name="删除考勤" align="left">
                <div>
                    <el-input style="width: 90%" size="small" v-model="keyword"
                              class="value-search-box"
                              placeholder="请输入查询条件"><i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <VButton style="float: right">搜索</VButton>
                </div>

                <div>
                    <el-table
                            :data="checkingManageData"
                            border
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            size="mini"
                            style="width: 100%"
                    >
                        <el-table-column
                                fixed
                                align="center"
                                type="index"
                                label="序号"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="studentName"
                                align="center"
                                label="姓名"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                align="center"
                                label="学号"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                prop="studentClass"
                                align="center"
                                label="班级"
                                width="100px"
                        ></el-table-column>
                        <el-table-column
                                prop="checkingName"
                                align="center"
                                label="缺勤名称"
                        ></el-table-column>
                        <el-table-column
                                prop="checkingDate"
                                align="center"
                                label="缺勤日期"
                        ></el-table-column>
                        <el-table-column
                                prop="updateStudentName"
                                align="center"
                                label="考勤人"
                                width="60px"
                        ></el-table-column>
                        <el-table-column
                                prop="deletedApplyValue"
                                label="删除理由"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deleteChecking(scope.row)">删除</el-button>
                                <el-button size="mini" type="warning" @click="rejectApply(scope.row)">驳回</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div>

                </div>

                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="deleteApplyPageSize"
                            @current-change="deleteApplyPageCurrentPage"
                            layout="prev, pager, next,total"
                            :current-page="deleteApplyPage.currentPage"
                            :page-size="deleteApplyPage.size"
                            :total="deleteApplyPage.total"
                    >
                    </el-pagination>
                </div>
            </FormPanel>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {VButton, FormPanel},
        name: "CheckingManage",
        data() {
            return {
                checkingManageData: [],
                leaveData: [],
                keyword: '',
                personalData: '',
                leaveKeyword: '',
                deleteApplyPage: {
                    size: 20,
                    total: 1,
                    currentPage: 1,
                },
            }
        },

        mounted() {
            this.personalData = JSON.parse(sessionStorage.getItem("user"));
            this.getDeleteApplyData();
            this.getLeaveData();
        },

        methods: {

            /**
             * @description获取申请删除考勤数据
             * **/
            getDeleteApplyData: function () {
                const that = this;
                let params = {
                    grade: that.personalData.grade,
                    page: that.deleteApplyPage.currentPage - 1,
                    size: that.deleteApplyPage.size,
                    keyWord: that.keyword,
                };
                this.$http.get(Config.checkingIn + '/findDeleteApplyData', {params: params})
                    .then(response => {
                    if (response.data.code == '200') {
                        this.checkingManageData = response.data.data.content;
                        this.deleteApplyPage.total = response.data.data.totalElements;
                    } else {
                        this.checkingManageData = response.data.data.content;
                    }
                })
            },

            /**
             * @description申请删除考勤数据分页size事件
             * **/
            deleteApplyPageSize: function (value) {
                this.deleteApplyPage.size = value;
                this.deleteApplyPage.currentPage = 1;
                this.getDeleteApplyData();
            },

            /**
             * @description申请删除考勤数据分页page事件
             * **/
            deleteApplyPageCurrentPage: function (value) {
                this.deleteApplyPage.currentPage = value;
                this.getDeleteApplyData();
            },


            /**
             * @description删除考勤
             * **/
            deleteChecking: function (value) {
                console.log(value);
                let params = {
                    id: value.id,
                }
                this.$http.get(Config.checkingIn + '/delete', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getDeleteApplyData();
                    } else {
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        })
                    }
                })
            },

            /**
             * @description驳回删除考勤申请
             * **/
            rejectApply: function (value) {
                console.log(value);
                let params = {
                    id: value.id,
                };
                this.$http.get(Config.checkingIn + '/rejectApply', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            message: '驳回成功',
                            type: 'success'
                        });
                        this.getDeleteApplyData();
                    } else {
                        this.$message({
                            message: '驳回失败',
                            type: 'warning'
                        });
                        this.getDeleteApplyData();
                    }
                })
            },


            /**
             * @description获取请假详情数据
             * **/
            getLeaveData: function () {
                const that = this;
                let params = {
                    grade: that.personalData.grade,
                    major: that.personalData.major,
                }
                this.$http.get(Config.Leaving + '/find', {params: params}).then(response => {
                    if (response.data.code == '200') {
                        this.leaveData = response.data.data.content;
                    } else {
                        this.leaveData = response.data.data.content;
                    }
                })
            },

            /**
             * @description审核请假数据
             * **/
            applyLeave: function (value) {
                value.applyValue = '予以通过';
                value.states = 'DO002';
                this.$http.post(Config.Leaving + '/update', value).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            type: 'success',
                            message: '保存成功',
                            center: true
                        })
                        this.getLeaveData();
                        this.getPersonalLeavingData();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '保存失败',
                            center: true
                        })
                        this.getPersonalLeavingData();
                        this.getLeaveData();
                    }

                })
            },

            /**
             * @description审核不通过
             * **/
            applyFiled: function (value) {
                value.applyValue = '理由不充分';
                value.states = 'DO003';
                this.$http.post(Config.Leaving + '/update', value).then(response => {
                    if (response.data.code == '200') {
                        this.$message({
                            type: 'success',
                            message: '保存成功',
                            center: true
                        })
                        this.getLeaveData();
                        this.getPersonalLeavingData();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '保存失败',
                            center: true
                        })
                        this.getPersonalLeavingData();
                        this.getLeaveData();
                    }

                })
            },

            /**
             * @description模糊查询请假数据
             * **/
            searchLeaving: function () {
                const that = this;
                let params = {
                    keyWord: this.leaveKeyword,
                    grade: that.personalData.grade,
                    major: that.personalData.major,
                }
                this.$http.get(Config.Leaving + '/findFuzzy',{params:params}).then(response=>{
                    if (response.data.code == '200'){
                        this.leaveData = response.data.data.content
                    } else {
                        this.leaveData = response.data.data.content
                    }
                })

            }
        },
    }
</script>

<style scoped>

</style>