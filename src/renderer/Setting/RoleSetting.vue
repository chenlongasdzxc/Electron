<template>
    <div>
        <el-card>
            <FormPanel name="用户权限设置" align="left">
                <!--搜索-->
                <div>
                    <el-input style="width: 80%" size="mini" v-model="userKeyword"
                              class="value-search-box"
                              placeholder="请输入用户名"><i slot="prefix"
                                                      class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <div style="float: right">
                        <el-button size="mini" type="danger" @click="addNewUser">新增</el-button>
                        <el-button @click="searchUserData" size="mini" type="primary">搜索
                        </el-button>
                    </div>
                </div>
                <!--表格-->
                <div>
                    <el-table
                            :data="userData"
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            style="font-size: 12px"
                            border
                            size="mini">
                        <el-table-column
                                label="序号"
                                align="center"
                                type="index"
                        ></el-table-column>
                        <el-table-column
                                label="用户名"
                                prop="userName"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="学号"
                                prop="studentNumber"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="描述"
                                prop="value"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
                                <el-button size="mini" type="danger" @click="distributionUserRole(scope.row)">
                                    分配角色
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--分页-->
                <div>
                    <el-pagination
                            style="display: flex;justify-content: center"
                            background
                            @size-change="userDataPageSize"
                            @current-change="userDataPageCurrent"
                            layout="prev, pager, next,total"
                            :current-page="userDataPage.currentPage"
                            :page-size="userDataPage.size"
                            :total="userDataPage.total"
                    >
                    </el-pagination>
                </div>
            </FormPanel>
            <FormPanel name="角色设置" align="left">
                <div style="float: right">
                    <el-button size="mini" type="primary" @click="addNewRole">新增</el-button>
                </div>
                <!--表格-->
                <div>
                    <el-table
                            :data="roleData"
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            style="font-size: 12px"
                            border
                            size="mini">
                        <el-table-column
                                label="序号"
                                align="center"
                                type="index"
                        ></el-table-column>
                        <el-table-column
                                label="角色名称"
                                prop="roleName"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="角色代码"
                                prop="roleCode"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="描述"
                                prop="value"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deletedRole(scope.row)">删除</el-button>
                                <el-button size="mini" type="success" @click="distributionRolePermission(scope.row)">
                                    分配权限
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="rolePageSize"
                                @current-change="rolePageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="rolePage.currentPage"
                                :page-size="rolePage.size"
                                :total="rolePage.total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </FormPanel>
            <FormPanel name="权限设置" align="left">
                <div style="float: right">
                    <el-button type="primary" size="mini" @click="addNewPermission">新增</el-button>
                </div>
                <!--表格-->
                <div>
                    <el-table
                            :data="permissionData"
                            :header-cell-style="{background:'#f0f0f0','text-align':'center'}"
                            style="font-size: 12px"
                            border
                            size="mini">
                        <el-table-column
                                label="序号"
                                align="center"
                                type="index"
                        ></el-table-column>
                        <el-table-column
                                label="权限名称"
                                prop="permissionName"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="权限代码"
                                prop="permissionCode"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="描述"
                                prop="value"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="deletedPermission(scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination
                                style="display: flex;justify-content: center"
                                background
                                @size-change="permissionPageSize"
                                @current-change="permissionPageCurrent"
                                layout="prev, pager, next,total"
                                :current-page="permissionPage.currentPage"
                                :page-size="permissionPage.size"
                                :total="permissionPage.total"
                        >
                        </el-pagination>
                    </div>
                </div>
            </FormPanel>
        </el-card>
        <!--用户弹窗-->
        <div>
            <el-dialog title="新增用户" :visible.sync="addNewUserFormVisible">
                <el-form :model="addNewUserForm" size="small" style="font-size: 12px;text-align: left" :rules="rules"
                         ref="addNewUserForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="userName">
                                <el-input v-model="addNewUserForm.roleName" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="初始密码:" :label-width="formLabelWidth" prop="userPassword">
                                <el-input v-model="addNewUserForm.roleCode" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述:" :label-width="formLabelWidth" prop="userNumber">
                        <el-input v-model="addNewUserForm.studentNumber" autocomplete="off"
                                  style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addNewUserFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="saveNewUser">保存</el-button>
                </div>
            </el-dialog>
        </div>
        <!--角色弹窗-->
        <div>
            <el-dialog title="新增角色" :visible.sync="addNewRoleFormVisible">
                <el-form :model="addNewRoleForm" size="small" style="font-size: 12px;text-align: left"
                         :rules="roleRules" ref="addNewRoleForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="角色名:" :label-width="formLabelWidth" prop="userName">
                                <el-input v-model="addNewRoleForm.roleName" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="角色代码:" :label-width="formLabelWidth" prop="userPassword">
                                <el-input v-model="addNewRoleForm.roleCode" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述:" :label-width="formLabelWidth" prop="userNumber">
                        <el-input v-model="addNewRoleForm.value" autocomplete="off"
                                  style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addNewRoleFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="saveNewRole">保存</el-button>
                </div>
            </el-dialog>
        </div>
        <!--权限弹窗-->
        <div>
            <el-dialog title="新增权限" :visible.sync="addNewPermissionFormVisible">
                <el-form :model="addNewPermissionForm" size="small" style="font-size: 12px;text-align: left"
                         :rules="roleRules" ref="addNewUserForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="权限名称:" :label-width="formLabelWidth" prop="userName">
                                <el-input v-model="addNewPermissionForm.permissionName" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="权限代码:" :label-width="formLabelWidth" prop="userPassword">
                                <el-input v-model="addNewPermissionForm.permissionCode" autocomplete="off"
                                          style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述:" :label-width="formLabelWidth" prop="userNumber">
                        <el-input v-model="addNewPermissionForm.value" autocomplete="off"
                                  style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addNewPermissionFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="savePermission">保存</el-button>
                </div>
            </el-dialog>
        </div>
        <!--分配角色弹窗-->
        <div>
            <el-dialog title="分配角色" :visible.sync="userRoleFormVisible">
                <div style="margin-left: 12%">
                    <el-transfer :titles="['未分配的角色', '已分配的角色']" v-model="value1" :data="data"></el-transfer>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="userRoleFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="saveNewUserRole">保存</el-button>
                </div>
            </el-dialog>
        </div>
        <!--分配权限弹窗-->
        <div>
            <el-dialog title="分配权限" :visible.sync="rolePermissionFormVisible">
                <div style="margin-left: 12%">
                    <el-transfer :titles="['未分配的权限', '已分配的权限']" v-model="value2"
                                 :data="rolePermissionData"></el-transfer>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="rolePermissionFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" size="mini" @click="saveRolePermission">保存</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import FormPanel from '../components/FormPanel'
    import Config from '../Config'

    export default {
        components: {FormPanel},
        name: "RoleSetting",
        data() {
            return {
                addNewUserFormVisible: false,
                addNewRoleFormVisible: false,
                addNewPermissionFormVisible: false,
                userRoleFormVisible: false,
                rolePermissionFormVisible: false,
                roleUserName: '',
                roleStudentNumber: '',
                formLabelWidth: '100px',
                studentData: [],
                userName: '',
                tempData: [],
                rolePermissionTempData: [],
                rolePermissionCode: '',
                rolePermissionName: '',
                roleData: [],
                value1: [],
                value2: [],
                data: [],
                deval:[],
                rolePermissionDeval:[],
                rolePermissionData: [],
                userKeyword: '',
                addNewUserForm: {
                    userName: '',
                    userPassword: '',
                    studentNumber: '',
                },
                addNewRoleForm: {
                    roleName: '',
                    roleCode: '',
                    value: '',
                },
                addNewPermissionForm: {
                    permissionName: '',
                    permissionCode: '',
                    value: '',
                },
                roleFormData: {
                    roleName: '',
                    roleCode: '',
                },
                userDataPage: {
                    size: 10,
                    total: 1,
                    currentPage: 1
                },
                roleForm: {},
                userData: [],
                permissionData: [],
                permissionFormData: {
                    permissionName: '',
                    permissionCode: '',
                },
                rolePage: {
                    size: 5,
                    total: 1,
                    currentPage: 1
                },
                permissionPage: {
                    size: 5,
                    total: 1,
                    currentPage: 1
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入初始密码', trigger: 'blur'}
                    ],
                    userNumber: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                        {message: '学号必须为数字', type: 'number'}
                    ],

                },
                roleRules: {
                    roleName: [
                        {required: true, message: '请输入角色名', trigger: 'blur'}
                    ],
                    roleCode: [
                        {required: true, message: '请输入角色代码', trigger: 'blur'}
                    ],
                },
            }
        },

        mounted() {
            this.studentData = JSON.parse(sessionStorage.getItem("user"));
            this.userName = JSON.parse(sessionStorage.getItem("userName"));
            this.init();
        },

        methods: {

            init: function () {
                this.getRoleData();
                this.getPermissionData();
                this.getUserData();
                this.getUserRoleData();
                this.getRolePermissionData();
            },


            /**
             * @description获取角色信息
             * **/
            getRoleData: function () {
                const params = {
                    size: this.rolePage.size,
                    page: this.rolePage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.Role + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.roleData = response.data.data.content;
                            this.rolePage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '角色信息获取失败',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })

            },


            /**
             * @description保存角色
             * **/
            saveNewRole: function () {
                this.$http.post(Config.Role + '/add', this.addNewRoleForm)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                            this.getRoleData();
                            this.addNewRoleFormVisible = false;
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                            this.addNewRoleFormVisible = false;
                        }
                    })
            },


            /**
             * @description角色分页size事件
             * **/
            rolePageSize: function (value) {
                this.rolePage.size = value;
                this.rolePage.currentPage = 1;
                this.getRoleData();
            },


            /**
             * @description权限分页size事件
             * **/
            permissionPageSize: function (value) {
                this.permissionPage.size = value;
                this.permissionPage.currentPage = 1;
                this.getPermissionData();
            },

            /**
             * @description权限分页current事件
             * **/
            permissionPageCurrent: function (value) {
                this.permissionPage.currentPage = value;
                this.getPermissionData();
            },


            /**
             * @description获取权限数据
             * **/
            getPermissionData: function () {
                const params = {
                    size: this.permissionPage.size,
                    page: this.permissionPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.Permission + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.permissionData = response.data.data.content;
                            this.permissionPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })


            },
            /**
             * @description角色分页current事件
             * **/
            rolePageCurrent: function (value) {
                this.rolePage.currentPage = value;
                this.getRoleData();
            },

            /**
             * @description保存新增权限
             * **/
            savePermission: function () {
                this.$http.post(Config.Permission + '/add', this.addNewPermissionForm)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.getPermissionData();
                        this.addNewPermissionFormVisible = false;
                    })
            },

            /**
             * @description获取用户信息
             * **/
            getUserData: function () {
                const params = {
                    size: this.userDataPage.size,
                    page: this.userDataPage.currentPage - 1,
                    sort: 'id,desc',
                }
                this.$http.get(Config.userInfo + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.userData = response.data.data.content;
                            this.userDataPage.total = response.data.data.totalElements;
                        } else {

                        }
                    })
            },

            /**
             * @description搜索用户
             * **/
            searchUserData: function () {
                const params = {
                    size: this.userDataPage.size,
                    page: this.userDataPage.currentPage - 1,
                    sort: 'id,desc',
                    userName: this.userKeyword,
                }
                this.$http.get(Config.userInfo + '/findFuzzy', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.userData = response.data.data.content;
                            this.userDataPage.total = response.data.data.totalElements;
                        } else {
                            this.$message({
                                message: '查询失败',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })
            },

            userDataPageSize: function (value) {
                this.userDataPage.size = value;
                this.userDataPage.currentPage = 1;
                this.getUserData();
            },


            userDataPageCurrent: function (value) {
                this.userDataPage.currentPage = value;
                this.getUserData();
            },

            /**
             * @description新增用户
             * **/
            addNewUser: function () {
                this.addNewUserFormVisible = true;
            },

            /**
             * @description保存新用户
             * **/
            saveNewUser: function () {
                this.$http.post(Config.userInfo + '/add', this.addNewUserForm)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '新增成功',
                                type: 'success',
                                center: true,
                            })
                            this.addNewUserFormVisible = false;
                        } else if (response.data.code == '401') {
                            this.$message({
                                message: '已存在该学号',
                                type: 'danger',
                                center: true,
                            })
                        }
                    })
            },

            /**
             * @description新增角色
             * **/
            addNewRole: function () {
                this.addNewRoleFormVisible = true;
            },

            /**
             * @description新增权限
             * **/
            addNewPermission: function () {
                this.addNewPermissionFormVisible = true;
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            /**
             * @description删除角色
             * **/
            deletedRole: function (value) {
                this.$http.get(Config.Role + '/delete', {params: {id: value.id}})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true
                            })
                            this.getRoleData();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning',
                                center: true
                            })
                            this.getRoleData();
                        }
                    })
            },

            /**
             * @description删除权限
             * **/
            deletedPermission: function (value) {
                this.$http.get(Config.Permission + '/delete', {params: {id: value.id}})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true,
                            })
                            this.getPermissionData();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning',
                                center: true,
                            })
                            this.getPermissionData();
                        }
                    })
            },

            /**
             * @description删除用户
             * **/
            deleteUser: function (value) {
                this.$http.get(Config.userInfo + '/delete', {params: {id: value.id}})
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                center: true,
                            })
                            this.getUserData();
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'warning',
                                center: true,
                            })
                            this.getUserData();
                        }
                    })
            },


            /**
             * @description分配角色
             * **/
            distributionUserRole: function (value) {
                this.value1 = [];
                this.roleUserName = value.userName;
                this.roleStudentNumber = value.studentNumber;
                this.getDistributionedRoleData();
                this.userRoleFormVisible = true;
            },

            /**
             * @description获取分配角色数据
             * **/
            getUserRoleData: function () {
                this.$http.get(Config.Role + '/findAll').then(response => {
                    if (response.data.code == '200') {
                        this.tempData = response.data.data;
                        this.data = [];
                        for (var i = 0; i < this.tempData.length; i++) {
                            this.data.push({
                                key: this.tempData[i].roleCode,
                                label: this.tempData[i].roleName,
                            });
                        }
                    }
                })
            },

            /**
             * @description获取已分配角色数据
             * **/
            getDistributionedRoleData: function () {
                const params = {
                    studentNumber: this.roleStudentNumber,
                    userName: this.roleUserName,
                }
                this.$http.get(Config.UserRole + '/findByStudentNumber', {params: params})
                    .then(response => {
                        if (response.data.code == '200') {
                            const tempData = response.data.data;
                            this.value1 = [];
                            for (let i = 0; i < tempData.length; i++) {
                                this.value1.push(tempData[i].roleCode);
                            }
                            this.deval = [].concat(this.value1);
                        }
                    })
            },


            /**
             * @description保存
             * **/
            saveNewUserRole: function () {
                const params = [];
                for (const roleCode of this.value1) {
                    params.push({
                        roleCode: roleCode,
                    })
                }
                this.$http.post(`${Config.UserRole}/add/${this.roleStudentNumber}/${this.roleUserName}`, params)
                    .then(response => {
                        if (response.data.code == '200') {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.userRoleFormVisible = false;
                    })
            },

            /**
             * @description给角色分配权限按钮
             * **/
            distributionRolePermission: function (value) {
                this.value2 = [];
                this.rolePermissionName = value.roleName;
                this.rolePermissionCode = value.roleCode;
                this.getDistributionedRolePermission();
                this.rolePermissionFormVisible = true;

            },


            /**
             * @description保存角色权限数据
             * **/
            saveRolePermission: function () {
                const params = [];
                for (const permissionCode of this.value2){
                    params.push({
                        permissionCode:permissionCode,
                    })
                }
                console.log(params);
                this.$http.post(`${Config.RolePermission}/add/${this.rolePermissionCode}/${this.rolePermissionName}`,params)
                    .then(response=>{
                        if (response.data.code == '200'){
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true,
                            })
                        } else {
                            this.$message({
                                message: '保存失败',
                                type: 'warning',
                                center: true,
                            })
                        }
                        this.rolePermissionFormVisible = false;
                    })
            },


            /**
             * @description获取权限数据
             * **/
            getRolePermissionData: function () {
                this.$http.get(Config.Permission + '/findAll')
                    .then(response => {
                        if (response.data.code == '200') {
                            this.rolePermissionTempData = response.data.data;
                            this.rolePermissionData = [];
                            for (var i = 0; i < this.rolePermissionTempData.length; i++) {
                                this.rolePermissionData.push({
                                    key: this.rolePermissionTempData[i].permissionCode,
                                    label: this.rolePermissionTempData[i].permissionName,
                                });
                            }
                        }
                    })
                console.log(this.rolePermissionData)
            },

            /**
             * @description获取已分配角色权限数据
             * **/
            getDistributionedRolePermission: function () {
               this.$http.get(`${Config.RolePermission}/findByRoleCode/${this.rolePermissionCode}`)
                   .then(response=>{
                       if (response.data.code == '200'){
                           const tempData = response.data.data;
                           this.value2 = [];
                           for (let i = 0; i < tempData.length; i++) {
                               this.value2.push(tempData[i].permissionCode);
                           }
                           this.rolePermissionDeval = [].concat(this.value2);
                       }
                   })
            },


        },
    }
</script>

<style scoped>

</style>