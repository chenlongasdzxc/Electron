<template>
    <div>
        <div>
            <el-card>
                <form-panel name="上传素拓分" align="left" isNone="false" collapsible>
                    <div slot="header" style="margin-top: 0">
                        <VButton @click="addSketch">增行</VButton>
                        <VButton @click="deleteSketch">移除</VButton>
                        <VButton @click="savePersonSketch">保存</VButton>
                    </div>
                    <div>
                        <el-table
                            :data="sketchData"
                            border
                        >
                            <el-table-column
                                type="selection"
                                width="40"
                            ></el-table-column>
                            <el-table-column
                                label="活动名称"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <el-autocomplete
                                            class="inline-input"
                                            @select="handleSelect"
                                            :disabled="scope.row.isEditable"
                                            v-model="scope.row.transfer"
                                            placeholder="请输入名称"
                                        ></el-autocomplete>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="活动类型"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <el-select
                                            v-model="scope.row.payment"
                                            @change="changePaySelect(scope.$index)"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                    v-for="item in sketchList"
                                                    :key="item.skethName"
                                                    :label="item.sketchName"
                                                    :value="item.sketchName">
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="参与角色"
                                min-width="100"
                            >
                                <template slot-scope="scope">
                                    <div>
                                        <el-select
                                        ></el-select>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </form-panel>
                <form-panel name="我的素拓分" align="left" isNone="false" collapsible>
                    <div style="font-family: 黑体;font-size: 16px">
                    <el-table
                            :data="tableData"
                            border
                            size="small"
                            style="width: 100%"
                            >
                        <el-table-column
                                fixed
                                prop="id"
                                label="序号"
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
                                prop="type"
                                label="活动类型"
                                width="150"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                prop="createDate"
                                label="日期"
                                width="100"
                        >
                        </el-table-column>
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
                                width="80"
                        ></el-table-column>
                        <el-table-column
                                fixed
                                label="操作"
                        ></el-table-column>
                    </el-table>
                    </div>
                </form-panel>
                <form-panel name="班级素拓分" align="left" isNone="false" collapsible>
                    <DataTable
                            ref="notBorrowingMoney"
                            :height="table.height"
                            :url.sync=findBorrowUrl
                            operational_width="20px"
                    >
                        <el-table-column prop="studentNumber" label="学号" sortable="custom"/>
                        <el-table-column prop="type"label="类型" sortable="custom"/>
                        <el-table-column prop="sketchScore" label="素拓分" sortable="custom"/>
                        <el-table-column prop="sketchName" label="素拓分名称" sortable="custom"/>
                        <el-table-column prop="creatDate" label="创建时间" sortable="custom"/>
                    </DataTable>
                </form-panel>
                <form-panel name="素拓分审核" align="left" isNone="false" collapsible>
                    <div style="font-family: 黑体;font-size: 16px">
                        <el-table
                                :data="tableData"
                                border
                                size="small"
                                style="width: 100%"
                                height="250"
                                @selection-change="handleSelectionChange"
                        >
                            <el-table-column
                                    fixed
                                    prop="id"
                                    label="序号"
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
                                    prop="type"
                                    label="活动类型"
                                    width="150"
                            ></el-table-column>
                            <el-table-column
                                    fixed
                                    prop="createDate"
                                    label="日期"
                                    width="100"
                            >
                            </el-table-column>
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
                                    width="80"
                            ></el-table-column>
                            <el-table-column
                                    fixed
                                    label="操作"
                            >
                                <template slot-scope="scope">
                                    <VButton>审核</VButton>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </form-panel>
            </el-card>
        </div>
        <div>
            <VButton @click="backTo">返回</VButton>
        </div>
    </div>
</template>

<script>
    import VButton from '../components/Button'
    import FormPanel from '../components/FormPanel'
    import DataTable from '../components/DataTable'
    export default {
        components:{VButton,FormPanel,DataTable},
        data(){
            return{
                personalSketch:[],
                sketchList:[],
                tableData:[],
                sketchData:[],
                userName:'',
                sketchScore:'',
                sketchStates:'',
                createDate:'',
                type:'',
                table:{
                    height:250,
                    data: null,
                },
                findBorrowUrl:'',

            }
        },
        created(){
            this.getPersonalSketchList();
        },
        methods:{
            backTo:function(){
              this.$router.push({path:'/Menu'});
            },
            getPersonalSketchList:function () {
                var studentNum = sessionStorage.getItem("number");
                let url1  = 'http://localhost:8083'
                let url = 'http://localhost:8083/Sketch/findByStudentNumber';
                this.$http.get(url,{params:{studentNumber:studentNum}}).then((response)=>{
                    if (response.data.code==200){
                        this.tableData = response.data.data;
                    }
            })
        },
            handleSelectionChange:function(){

            },
            handleSelect:function (val) {

            },
            changePaySelect:function(){

            },

            selectSketchList:function(){
                let url = 'http://localhost:8083/SketchScore/findFuzzy';

            },

            /**
             * 新增行
             * **/
            addSketch:function () {
                this.sketchData.push({
                    transfer:'',
                    payment:'',
                    index: this.sketchData.length
                })

            },
            /**
             * 删除行
             * **/
            deleteSketch:function () {

            },
            /**
             * 批量保存
             * **/
            savePersonSketch:function () {

            }
        }
    }
</script>

<style>

</style>