<template>
  <el-dialog
    :title="'菜单信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo('close')"
    width="650px"
  >
  <div>
    <h1 style="text-align:center;">菜单信息</h1>
    <el-form
      :disabled="routeParams.readonly"
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="160px"
    >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8" :offset="3">
          <el-form-item label="名称：" prop="name">
            <el-input
              v-model.trim="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="路由：" prop="url">
            <el-input
              v-model.trim="dataForm.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8" :offset="3">
          <el-form-item label="排序：" prop="orderBy">
            <el-input
              v-model.trim="dataForm.orderBy"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="状态：" prop="status" required>
            <el-radio-group v-model="dataForm.status">
              <el-radio :label='"1"'>启用</el-radio>
              <el-radio :label='"0"'>禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8" :offset="3">
          <el-form-item label="是否启用：" prop="isUser" required>
            <el-radio-group v-model="dataForm.isUser">
              <el-radio :label='"1"'>启用</el-radio>
              <el-radio :label='"0"'>禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="是否隐藏：" prop="isHidden" required>
            <el-radio-group v-model="dataForm.isHidden">
              <el-radio :label='"1"'>隐藏</el-radio>
              <el-radio :label='"0"'>不隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="备注：">
            <el-input
              v-model.trim="dataForm.remark"></el-input>
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
  </el-dialog>
</template>

<script>
    import { queryMenuList,queryMenuInfo,addMenu,updateMenu,deleteMenu } from '@/api/menu'

    export default {
        name: 'menuEdit',
        data() {
            return {
                routeParams:{
                    readonly:true,
                    id:'',
                },
                formName: 'dataForm',
                dataForm: {
                    name: '', //名称
                    status: '', //状态
                    url: '', //路由
                    isUser: '', //是否启用
                    isHidden: '', //是否隐藏
                    remark:'',//备注
                    orderBy:''//排序
                },
                rules: {
                    status: [{required: true, message: '请选择状态'}],
                    isHidden: [{required: true, message: '请选择隐藏状态'}],
                    isUser: [{required: true, message: '请选择启用状态'}],
                    name: [{required: true, message: '名称不能为空'}],
                    url: [{required: true, message: '路由不能为空'}],
                    orderBy: [{required: true, message: '排序不能为空'}],
                }
            };
        },
        methods: {
            loadData() {
                if(this.routeParams.id != null && this.routeParams.id != ''){
                }
            },
            closeDialogInfo(opt) {
                let id = this.id;
                this.$emit('closeDialogInfo', {opt,id});
            },
            resetForm() {
                this.$refs[this.formName].resetFields();
            },
            updateUserBySuper(){

            },
            goBack() {
                this.$router.go(-1);
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.selection = true;
                    this.loadData(true);
                }
            },
        },
        //与 上级组件通信
        props: {
            openDialogInfo: {
                type: Boolean,
                default: false
            },
            id: {
                type: Number,
                default: "",
            },
            reload: {
                type: String,
                default: "",
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
