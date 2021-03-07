<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{this.passwordForm.username}}
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item divided>
            <span @click="updatePwd" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog
      title="修改密码"
      align="left"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="450px"
    >
      <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="passwordForm.username" placeholder="用户名" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="password">
          <el-input v-model="passwordForm.password" type="password" placeholder="旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="modifyPassword()">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
    import { logout } from '@/api/login'
    import { updatePassword } from '@/api/user'
    import {removeStore} from '@/utils/common'
    import {removeToken } from '@/utils/auth'
    import { mapGetters } from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        data() {
            return {
                dialogVisible: false,
                passwordForm: {
                    id:'',
                    username: '',
                    password: '',
                    newPassword: '',
                    confirmPassword:'',
                },
                loginOutInfo: {
                    username: ''
                },
                rules: {
                    password: [
                        {
                            required: true,
                            message: '请输入原始密码',
                            trigger: 'blur'
                        }
                    ],
                    newPassword: [
                        {
                            required: true,
                            message: '请输入新密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '请至少输入6位密码',
                            trigger: 'blur'
                        },
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: '请确认密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            message: '请至少输入6位密码',
                            trigger: 'blur'
                        },
                    ],
                }
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            modifyPassword(){
                if(this.passwordForm.newPassword != this.passwordForm.confirmPassword){
                    this.$message.error('两次填写密码不一致!');
                    return;
                }
                updatePassword(this.passwordForm).then(res => {
                    if(res.code === 0){
                        this.$message.success(res.msg);
                        this.dialogVisible = false
                        this.passwordForm = [];
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            updatePwd(){
                this.dialogVisible = true;
            },
            logout() {
                let param = JSON.parse(this.commonJs.getStore(this.constants.userInfo));
                this.loginOutInfo.username = param.username
                logout(this.loginOutInfo).then(res => {
                    removeToken()
                    removeStore(this.constants.userInfo);
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            }
        },
        async mounted() {
            let param = JSON.parse(this.commonJs.getStore(this.constants.userInfo));
            this.passwordForm.id = param.id;
            this.passwordForm.username = param.username;
        },
        beforeCreate() {
            this.commonJs.parseCurrentPageParams(this);
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

