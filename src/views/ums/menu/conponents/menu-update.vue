<template>
  <el-dialog
    :title="'菜单信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo('close')"
    width="1000px"
  >
  <div>
    <el-form
      :disabled="params.readonly"
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="160px"
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item label="组件名称：" prop="name">
            <el-input
              v-model.trim="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="组件路由：" prop="path">
            <el-input
              v-model.trim="dataForm.path"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item label="菜单名称：" prop="title">
            <el-input
              v-model.trim="dataForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="系统：" prop="platForm">
            <el-input
              v-model.trim="dataForm.platForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="8">
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
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item label="是否启用：" prop="isUsed" required>
            <el-radio-group v-model="dataForm.isUsed">
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
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item label="URL">
            <el-input
              v-model.trim="dataForm.url"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="菜单图片：">
            <el-input
              v-model.trim="dataForm.icon"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="19">
          <el-form-item label="备注：">
            <el-input
              v-model.trim="dataForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--底部操作按钮-->
    <el-row justify="right">
      <el-col :offset="18" :span="6">
        <el-button @click="updateUserBySuper" v-show="!params.readonly">
          保存
        </el-button>
        <el-button @click="closeDialogInfo('close')" >
          返回
        </el-button>
      </el-col>
    </el-row>
  </div>
  </el-dialog>
</template>

<script>
    import { queryMenuInfo,addMenu,updateMenu } from '@/api/menu'

    export default {
        name: 'menuEdit',
        data() {
            return {
                formName: 'dataForm',
                params:{
                    readonly:true,
                },
                dataForm: {
                    id:'',
                    name: '', //名称
                    status: '', //状态
                     path:'', //路由
                    url: '', //url
                  icon:'', //菜单图片
                    isUsed: '', //是否启用
                    isHidden: '', //是否隐藏
                    remark:'',//备注
                    orderBy:'',//排序
                    platForm:'',//系统
                  title:'', //菜单名称
                    parentId:'',//父ID
                },
                rules: {
                    status: [{required: true, message: '请选择状态'}],
                    isHidden: [{required: true, message: '请选择隐藏状态'}],
                    isUsed: [{required: true, message: '请选择启用状态'}],
                    name: [{required: true, message: '组件名称不能为空'}],
                    path: [{required: true, message: '组件路由不能为空'}],
                   title: [{required: true, message: '菜单名称不能为空'}],
                    platForm: [{required: true, message: '系统不能为空'}],
                    orderBy: [{required: true, message: '排序不能为空'}],
                }
            };
        },
        methods: {
            loadData() {
                if(this.opt != 'add'){
                    queryMenuInfo({id:this.id}).then(res => {
                        if (res.code === 0) {
                            console.log(this.dataForm)
                            this.dataForm = res.data;
                        }else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            closeDialogInfo(opt) {
                this.$emit('closeDialogInfo', opt);
            },
            resetForm() {
                this.$refs[this.formName].resetFields();
            },
            updateUserBySuper(){
                if(this.opt != 'add'){
                    this.dataForm.parentId = '';
                    updateMenu(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.closeDialogInfo(this.opt);
                        }else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }else{
                    this.dataForm.parentId = this.id;
                    addMenu(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.closeDialogInfo(this.opt);
                        }else {
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
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.dataForm = {};
                    this.params.readonly = this.readonly;
                    this.loadData();
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
            opt: {
                type: String,
                default: "",
            },
            readonly:{
                type: Boolean,
                default: false
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
