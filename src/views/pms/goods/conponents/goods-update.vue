<template>
  <el-dialog
    :title="'产品信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo()"
    width="750px"
  >
    <div>
      <el-form
        :disabled="readonly"
        :model="dataForm"
        :ref="formName"
        :rules="rules"
        label-width="160px"
      >
        <el-row type="flex">
          <el-col :span="20">
            <el-form-item label="商品名称：" prop="goodName">
              <el-input
                v-model="dataForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="商品编码：" prop="goodCode">
            <el-input
              v-model.trim="dataForm.goodsCode"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="颜色：" >
            <el-input
              v-model.trim="dataForm.colorName"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
            <el-form-item label="规格：">
              <el-input
                      v-model.trim="dataForm.specificationType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" prop="price">
          <el-col :span="20">
            <el-form-item label="价格：">
              <el-input
                      v-model.trim="dataForm.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="备注：">
            <el-input type="textarea"
                      v-model.trim="dataForm.remark"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--底部操作按钮-->
      <el-row justify="right">
        <el-col :offset="18" :span="6">
          <el-button @click="confirmInfo()" v-show="!readonly">
            保存
          </el-button>
          <el-button @click="closeDialogInfo()" >
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import { getGoods,saveOrUpdateGoods } from '@/api/goods'
  export default {
    name: 'goodsUpdate',
    data() {
      return {
        formName: 'dataForm',
        dataForm: {
          id:'',
          goodsCode: '',
          goodsName:'',
          colorName:'',
          specificationType:'',
          price:'',
          remark:'',
        },
        rules: {
          goodsName: [{required: true, message: '商品名称不能为空'}],
          goodsCode: [{required: true, message: '商品编码不能为空'}],
          price: [{required: true, message: '开发商不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
        if(this.id && this.id != null && this.id != ''){
          getGoods({id:this.id}).then(res => {
            if (res.code === 0) {
              this.dataForm = res.data
            }else {
              this.$message.error(res.msg);
            }
          })
        }
      },
      closeDialogInfo() {
        this.$emit('closeDialogInfo',null);
      },
      resetForm() {
        this.$nextTick(()=>{
          this.$refs[this.formName].resetFields();
        })
      },
      confirmInfo(){
        this.$refs[this.formName].validate(async valid => {
          if (valid) {
            saveOrUpdateGoods(this.dataForm).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg);
                this.$emit('closeDialogInfo','reload');
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            this.$notify.error('请输入正确内容!!');
          }
        })
      },
    },
    watch: {
      reload: function (newVal, oldVal) {
        if (newVal) {
          this.dataForm = {}
          this.resetForm();
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
      reload: {
        type: String,
        default: "",
      },
      id: {
        type: Number,
        default: null,
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
