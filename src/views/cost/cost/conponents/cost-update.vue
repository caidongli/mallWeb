<template>
  <div>
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
            <el-form-item label="订单号：" >
              <el-input
                v-model="dataForm.orderNumber">
                <el-button slot="append" icon="el-icon-search" @click="choose"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="一级科目：" prop="firstCostId">
            <el-select v-model="dataForm.firstCostId" @change="loadSecondOptions">
              <el-option
                v-for="item in firstOptions"
                :key="item.id"
                :label="item.dataName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="二级科目：" prop="secondCostId">
            <el-select v-model="dataForm.secondCostId" @change="reloadData" clearable>
              <el-option
                v-for="item in secondOptions"
                :key="item.id"
                :label="item.dataName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
            <el-form-item label="账目明细：" prop="accountDetail">
              <el-input type="textarea"
                      v-model.trim="dataForm.accountDetail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" prop="price">
          <el-col :span="20">
            <el-form-item label="金额：" prop="amount">
              <el-input
                      v-model.trim="dataForm.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" prop="price">
          <el-col :span="20">
            <el-form-item label="借(资金出处)：" prop="payWay">
              <el-select v-model="dataForm.payWay"
                         clearable @change="reloadData">
                <el-option
                  v-for="item in payWayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" prop="price">
          <el-col :span="20">
            <el-form-item label="经手人：" prop="entryName">
              <el-input
                v-model.trim="dataForm.entryName"></el-input>
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
    <chooseOrder
      :openDialogChoose="this.chooseParams.openDialogChoose"
      :reload="this.chooseParams.reload"
      @closeOpenDialog="closeOpenDialog"
      @chooseOrder="chooseOrder"
    ></chooseOrder>
  </div>
</template>

<script>
  import { getCost,saveOrUpdateCost,queryCostTypeList } from '@/api/cost'
  import chooseOrder from './choose-order'
  export default {
    name: 'goodsUpdate',
    components: {chooseOrder},
    data() {
      return {
        formName: 'dataForm',
        firstOptions: [],
        secondOptions: [],
        dataForm: {
          id:'',
          orderId:'',
          orderNumber:'',
          firstCostId:'',
          secondCostId:'',
          firstCostType:'',
          secondCostType:'',
          accountDetail:'',
          amount:'',
          payWay:'',
          entryName:'',
          remark:'',
        },
        chooseParams:{
          reload:'',
          openDialogChoose:false,
        },
        payWayOptions: [
          {
            value: 'sdns',
            label: '银行存款--顺德农商'
          },{
            value: 'nyyh',
            label: '银行存款--农业银行'
          },{
            value: 'jsyh',
            label: '银行存款--建设银行'
          },{
            value: 'zfb',
            label: '网银-支付宝'
          },{
            value: 'wxqb',
            label: '微信钱包'
          },{
            value: 'qt',
            label: '其他'
          }
        ],
        rules: {
          secondCostId: [{required: true, message: '一级科目不能为空'}],
          secondCostId: [{required: true, message: '二级科目不能为空'}],
          amount: [{required: true, message: '金额不能为空'}],
          payWay: [{required: true, message: '借(资金出处)不能为空'}],
          entryName: [{required: true, message: '经手人不能为空'}],
          accountDetail: [{required: true, message: '账目明细不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
        queryCostTypeList({parentId:'0'}).then(res => {
          if (res.code === 0) {
            this.firstOptions = res.data;
            if(this.id && this.id != null && this.id != ''){
              getCost({id:this.id}).then(res => {
                if (res.code === 0) {
                  this.dataForm = res.data
                  this.loadSecondOptions(res.data.firstCostId)
                }else {
                  this.$message.error(res.msg);
                }
              })
            }
          }
        }).catch(() => {
          this.$message.error('请求错误!');
        })
      },
      loadSecondOptions(pid){
        queryCostTypeList({parentId:pid}).then(res => {
          if (res.code === 0) {
            this.secondOptions = res.data;
          }
        }).catch(() => {
          this.$message.error('请求错误!');
        })
      },
      closeDialogInfo() {
        this.$emit('closeDialogInfo',null);
      },
      resetForm() {
        this.$nextTick(()=>{
          this.$refs[this.formName].resetFields();
        })
      },
      choose(){
        this.chooseParams.openDialogChoose = true;
        this.chooseParams.reload = new Date().toLocaleString();
      },
      closeOpenDialog(){
        this.chooseParams.openDialogChoose = false;
      },
      chooseOrder(obj){
        this.dataForm.orderNumber= obj.orderNumber
        this.dataForm.orderId= obj.id
        this.closeOpenDialog();
      },
      loadSecondOptions(value){
        if(value == null || value == ''){
          return;
        }
        queryCostTypeList({parentId:value}).then(res => {
          if (res.code === 0) {
            this.secondOptions = res.data;
          }
        }).catch(() => {
          this.$message.error('请求错误!');
        })
      },
      reloadData(){
        this.$forceUpdate()
      },
      confirmInfo(){
        this.$refs[this.formName].validate(async valid => {
          if (valid) {
            this.dataForm.firstCostType = this.firstOptions.find(val=>val.id==this.dataForm.firstCostId).dataName
            this.dataForm.secondCostType = this.secondOptions.find(val=>val.id==this.dataForm.secondCostId).dataName
            saveOrUpdateCost(this.dataForm).then(res => {
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
