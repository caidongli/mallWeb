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
          <el-row>
            <el-col :span="15">
              <el-form-item label="用户名：" prop="username">
                <el-input
                          v-model.trim="dataForm.username"></el-input>
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
          <el-row>
            <el-col :span="15">
              <el-form-item label="邮箱：" prop="email">
                <el-input
                          v-model.trim="dataForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="姓名：" prop="nickName">
                <el-input
                          v-model.trim="dataForm.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="备注：" prop="note">
                <el-input
                          v-model.trim="dataForm.note"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <el-form-item label="状态：" prop="status" required>
                <el-radio-group v-model="dataForm.status">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
    <!--底部操作按钮-->
    <el-footer class="operation-button-div">
      <el-row>
        <el-col :span="16">
          <el-button @click="saveForm" v-show="!routeParams.readonly">
            保存
          </el-button>
          <el-button @click="goBack" >
            返回
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>

  export default {
    name: 'userEdit',
    data() {
      return {
        routeParams:{
          readonly:true,
          userId:'',
        },
        formName: 'dataForm',
        dataForm: {
          username: '', //用户名
          email: '', //邮箱
          phone: '', //手机号码
          nickName: '', //名称
          note: '', //备注
          status:''//账号状态
        },
        rules: {
          status: [{type: 'boolean', required: true, message: '请选择状态'}],
          username: [{required: true, message: '用户名不能为空'}],
          phone: [{required: true, message: '手机号不能为空'}],
          nickName: [{required: true, message: '名称不能为空'}],
        }
      };
    },
    computed: {
    },
    methods: {
      loadData() {
      },
      resetForm() {
        this.$refs[this.formName].resetFields();
      },
      goBack() {
        this.$router.go(-1);
      },
      beforeCreate() {
        this.commonJs.parseCurrentPageParams(this);
      },
      async mounted() {
        this.routeParams = JSON.parse(getStore(gz_current_page_params));
        this.loadData();
      },
    }
  }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
