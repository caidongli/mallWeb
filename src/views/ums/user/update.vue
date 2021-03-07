<template>
  <div>
    <h1 style="text-align:center;">用户信息</h1>
    <el-form
      :disabled="routeParams.readonly"
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="160px"
    >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="用户名：" prop="username">
            <el-input
              v-model.trim="dataForm.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="routeParams.isAdd" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="密码：" prop="password" required>
            <el-input
              v-model.trim="dataForm.password" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="routeParams.isAdd" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="确认密码：" prop="newPassword" required>
            <el-input
              v-model.trim="dataForm.newPassword" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="手机号码：" prop="phone">
            <el-input
              v-model.trim="dataForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="邮箱：" prop="email">
            <el-input
              v-model.trim="dataForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="姓名：" prop="nickName">
            <el-input
              v-model.trim="dataForm.nickName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="备注：" prop="note">
            <el-input
              v-model.trim="dataForm.note"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="状态：" prop="status" required>
            <el-radio-group v-model="dataForm.status">
              <el-radio :label='"1"'>启用</el-radio>
              <el-radio :label='"0"'>禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--底部操作按钮-->
      <el-row>
        <el-col :offset="18" :span="6">
          <el-button @click="updateUserBySuper" v-show="!routeParams.readonly">
            保存
          </el-button>
          <el-button @click="goBack" >
            返回
          </el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
    import { register } from '@/api/login'
    import { updateUserBySuper } from '@/api/user'
    import { queryUser } from '@/api/user'
    import {current_page_params} from '@/utils/constant'

    export default {
        name: 'userEdit',
        data() {
            return {
                routeParams:{
                    readonly:true,
                    isAdd:false,
                    id:'',
                },
                formName: 'dataForm',
                dataForm: {
                    username: '', //用户名
                    email: '', //邮箱
                    phone: '', //手机号码
                    nickName: '', //名称
                    note: '', //备注
                    status:'',//账号状态
                    password:'',
                    newPassword:'',
                },
                rules: {
                    status: [{required: true, message: '请选择状态'}],
                    username: [{required: true, message: '用户名不能为空'}],
                    phone: [{required: true, message: '手机号不能为空'}],
                    nickName: [{required: true, message: '名称不能为空'}],
                }
            };
        },
        computed: {
        },
        created() {
            this.mounted();
        },
        beforeCreate() {
            this.commonJs.parseCurrentPageParams(this)
        },
        methods: {
            loadData() {
                if(this.routeParams.id != null && this.routeParams.id != ''){
                    let param = {
                        id: this.routeParams.id,
                    };
                    queryUser(param).then(res => {
                        if (res.code === 0) {
                            this.dataForm = res.data;
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            resetForm() {
                this.$refs[this.formName].resetFields();
            },
            updateUserBySuper(){
                if(this.routeParams.id != null && this.routeParams.id != '') {
                    updateUserBySuper(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.$router.push({name: 'userList'});
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }else{
                    if(this.dataForm.password.length < 6){
                        this.$message.error('密码不得小于六位数!');
                        return;
                    }
                    if(this.dataForm.password != this.dataForm.newPassword){
                        this.$message.error('两次填写密码不一致!');
                        return;
                    }
                    register(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.$router.push({name: 'userList'});
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            async mounted() {
                this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
                this.loadData();
            },
        },
    }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
