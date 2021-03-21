<template>
  <el-dialog
    :title="'商品信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo()"
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
        <el-col :span="10" >
          <el-form-item label="商品编码：" >
            <el-input
              v-model="dataForm.goodsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="商品名称：" prop="goodsName">
            <el-input
              v-model.trim="dataForm.goodsName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="10" >
          <el-form-item label="颜色编码：">
            <el-input
              v-model.trim="dataForm.colorCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="颜色名称：" prop="colorName">
            <el-input
              v-model.trim="dataForm.colorName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="规格型号：">
            <el-input
              v-model.trim="dataForm.specificationType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="数量：" prop="number">
            <el-input
              v-model.trim="dataForm.number" @input="calculate()"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="10" >
          <el-form-item label="单价：" prop="price">
            <el-input
              v-model.trim="dataForm.price" @input="calculate()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="金额：" prop="totalAmount">
            <el-input
              v-model.trim="dataForm.totalAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="厂家：">
            <el-input
              v-model.trim="dataForm.factory"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form-item label="商品类别：" prop="goodsType">
            <el-select v-model="dataForm.goodsType" placeholder="商品类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="22">
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
        <el-button @click="confirmInfo()" v-show="!params.readonly">
          确定
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
  import { saveOrUpdateGoods,queryOrderGoods } from '@/api/order'
    export default {
        name: 'orderGoodsUpdate',
        data() {
            return {
                formName: 'dataForm',
                params:{
                    readonly:true,
                },
                dataForm: {
                    id:'',
                  orderId: '',
                  index:'',
                  goodsCode: '',
                  goodsName: '',
                  colorCode: '',
                  colorName: '',
                  remark: '',
                  specificationType: '',
                  number: '',
                  price: '',
                  totalAmount: '',
                  goodsType: '',
                  factory: '',
                },
              options: [{
                value: 'cp',
                label: '成品'
              }, {
                value: 'dz',
                label: '定制'
              }],
                rules: {
                  goodsName: [{required: true, message: '商品名称不能为空'}],
                  colorName: [{required: true, message: '颜色名称不能为空'}],
                  number: [{required: true, message: '数量不能为空'}],
                  price: [{required: true, message: '单价不能为空'}],
                  totalAmount: [{required: true, message: '金额不能为空'}],
                  goodsType: [{required: true, message: '请选择商品类别'}],
                }
            };
        },
        methods: {
          loadData() {
            if(this.id && this.id != null && this.id != ''){
              queryOrderGoods({id:this.id}).then(res => {
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
                this.$refs[this.formName].resetFields();
            },
          confirmInfo(){
            this.$refs[this.formName].validate(async valid => {
              if (valid) {
                this.dataForm.orderId = this.orderId;
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
          calculate(){
            if(this.dataForm.number && this.dataForm.number != '' && this.dataForm.price && this.dataForm.price != '' ){
              let num = this.dataForm.price * this.dataForm.number;
              this.dataForm.totalAmount =  num.toFixed(2)
            }
          },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
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
            reload: {
                type: String,
                default: "",
            },
          id: {
            type: String,
            default: "",
          },
          orderId: {
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
