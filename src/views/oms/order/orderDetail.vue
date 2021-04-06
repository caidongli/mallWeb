<template>
  <div>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>基本信息</span>
      <el-button
        class="btn-add"
        v-if="this.dataForm.id.length > 0 && routeParams.readonly"
        @click="print()"
        size="mini">
        打印订单
      </el-button>
      <el-button
        class="btn-add"
        style="margin-right: 15px"
        v-if="this.params.orderId.length > 0"
        @click="openAmount('0')"
        size="mini">
        预收款
      </el-button>
      <el-button
        class="btn-add"
        v-if="this.params.orderId.length > 0"
        style="margin-right: 15px"
        @click="openAmount('1')"
        size="mini">
        成交金额
      </el-button>
    </el-card>
    <el-form
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="150px"
    >
      <el-row type="flex" class="row-bg" style="margin-top: 15px">
        <el-col :span="6" :offset="2">
          <el-form-item label="客户名称：" prop="customer">
            <el-input
              v-model.trim="dataForm.customer" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="合计原价：" prop="totalAmount">
            <el-input
              v-model.trim="dataForm.totalAmount" @input="clateReceivableAmount()" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="2">
          <el-form-item label="电话：" prop="telephone">
            <el-input
              v-model.trim="dataForm.telephone" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="成交金额：" prop="receivableAmount">
            <el-input
              v-model.trim="dataForm.receivableAmount" @input="clateDiscount()" :disabled="this.params.orderId.length > 0"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="2">
          <el-form-item label="设计师：" prop="designer">
            <el-input
              v-model.trim="dataForm.designer" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="折扣：">
            <el-input
              v-model.trim="dataForm.discount" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="6" :offset="2">
          <el-form-item label="销售人员：" prop="salesman">
            <el-input
              v-model.trim="dataForm.salesman" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="预收金额：" prop="preReceivableAmount">
            <el-input
              v-model.trim="dataForm.preReceivableAmount" @input="clatepreReceivableAmount()" :disabled="this.params.orderId.length > 0"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="6" :offset="2">
          <el-form-item label="订货日期:" prop="orderDate" required>
            <el-date-picker type="date" v-model="dataForm.orderDate" :value-format="valueFormat" :disabled="routeParams.readonly"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="预收款比例(%)：" prop="preReceivableRatio">
            <el-input
              v-model.trim="dataForm.preReceivableRatio" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="2">
          <el-form-item label="预交货时间:" prop="preDeliveryData" required>
            <el-date-picker type="date" v-model="dataForm.preDeliveryData" :value-format="valueFormat" :disabled="routeParams.readonly"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="尾款：" prop="repayAmount">
            <el-input
              v-model.trim="dataForm.repayAmount" :disabled="this.params.orderId.length > 0"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="2">
          <el-form-item label="订单号：" prop="orderNumber">
            <el-input
              v-model.trim="dataForm.orderNumber" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="支付方式：" prop="payWay">
            <el-select v-model="dataForm.payWay" clearable
                       placeholder="支付方式"
                       :disabled="routeParams.readonly">
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
      <el-row type="flex" class="row-bg">
        <el-col :span="6" :offset="2">
          <el-form-item label="收据号：" prop="receipt">
            <el-input
              v-model.trim="dataForm.receipt" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="3">
          <el-form-item label="凭根：">
            <el-input
              v-model.trim="dataForm.credentials" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="6" :offset="2" >
          <el-form-item label="开发商：" prop="developers" >
            <el-input v-model="dataForm.developers" :disabled="routeParams.readonly ||
                (routeParams.addressId != null && routeParams.addressId.length > 0) " ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="2">
          <el-form-item label="门牌号：" prop="building">
            <el-input v-model="dataForm.building"  placeholder="楼号" :disabled="routeParams.readonly">
              <template slot="append" >栋</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-input v-model="dataForm.houseNumber" placeholder="门牌号" :disabled="routeParams.readonly"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" v-if="!routeParams.addressId" >
        <el-col :span="5" :offset="2">
          <el-form-item label="地址：" prop="provinceInfo">
            <el-select v-model="dataForm.provinceInfo" clearable
                       placeholder="省份"
                       @change="handleProvinceChange"
                       :disabled="routeParams.readonly">
              <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code+':'+item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="dataForm.cityInfo" clearable placeholder="市"
                     :disabled="routeParams.readonly"
                     @change="handleCityChange">
            <el-option
              v-for="item in cityOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code+':'+item.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="dataForm.areaInfo" clearable placeholder="区"
                     :disabled="routeParams.readonly"
                     @change="handleAreaChange">
            <el-option
              v-for="item in areaOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code+':'+item.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-select v-model="dataForm.town" clearable placeholder="街道"
                     @change="$forceUpdate()" :disabled="routeParams.readonly">
            <el-option
              v-for="item in townOptions"
              :key="item.code"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="15" :offset="2">
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="dataForm.address" :disabled="routeParams.readonly">
              <el-button slot="append" @click="createAddress()" :disabled="routeParams.readonly">生成地址信息</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="15" :offset="2">
          <el-form-item label="备注：" :disabled="routeParams.readonly">
            <el-input type="textarea" v-model="dataForm.remark" :disabled="routeParams.readonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" >
        <el-col :span="15" :offset="2">
          <el-form-item style="text-align: center" v-show="!routeParams.readonly">
            <el-button type="primary" size="medium" @click="saveOrUpdateOrder" >下一步</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <orderGoodsList
      v-if="routeParams.readonly"
      ref="goodsList"
      :readonly = routeParams.readonly
      :reload="this.params.reload"
      :orderId="this.params.orderId"
    ></orderGoodsList>
    <orderAmountList
      :openDialogAmount="this.params.openDialogAmount"
      :type="this.params.type"
      ref="AmountList"
      :readonly = routeParams.readonly
      :reload="this.params.reload"
      :orderId="this.params.orderId"
      @closeDialogAmount="closeDialogAmount"
    ></orderAmountList>
    <!--底部操作按钮-->
    <!-- <el-row justify="right">
       <el-col :offset="18" :span="6">
         <el-button @click="saveOrUpdateOrder" v-show="!routeParams.readonly">
           保存
         </el-button>
         <el-button @click="goBack()" >
           返回
         </el-button>
       </el-col>
     </el-row>-->
  </div>
</template>

<script>
  import { saveOrUpdateOrder,getOrderInfo,getAddress,printOrder } from '@/api/order'
  import orderGoodsList from './components/order-goods-list'
  import orderAmountList from './components/order-amount-list'
  import { getOrderAddress } from '@/api/orderAddress'
  import {isPhone, isMobile} from '@/utils/validate'
  import {current_page_params} from '@/utils/constant'
  import print from 'print-js'
  export default {
    name: 'orderDetail',
    components: {orderGoodsList,orderAmountList},
    data() {
      var validatePhoneNumber = async (rule, value, callback) => {
        if (!isMobile(value) && !isPhone(value)) {
          callback(new Error('请输入正确的手机号或者电话号'));
          return
        }
      };
      return {
        formName: 'dataForm',
        routeParams:{
          readonly:true,
          isAdd:false,
          id:'',
          addressId:'',
        },
        tableData:[],
        searchFormData:{
          orderId:'',
          goodsName:'',
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
        provinceOptions:[],
        cityOptions:[],
        areaOptions:[],
        townOptions:[],
        params:{
          orderId:'',
          reload:'',
          openDialogAmount:false,
          type:'',
        },
        dataForm: {
          id:'',
          orderNumber:'',
          orderName:'',
          receipt:'',
          credentials:'',
          customer:'',
          orderDate:'',
          provinceInfo:'',
          province:'',
          provinceCode:'',
          cityInfo:'',
          city:'',
          cityCode:'',
          areaInfo:'',
          area:'',
          areaCode:'',
          town:'',
          developers:'',
          building:'',
          houseNumber:'',
          address:'',
          telephone:'',
          preDeliveryData:'',
          remark:'',
          designer:'',
          salesman:'',
          payWay:'',
          preReceivableRatio:'',
          discount:'',
          totalAmount:'',
          receivableAmount:'',
          preReceivableAmount:'',
          repayAmount:'',
          goods:[],
        },
        rules: {
          orderNumber: [{required: true, message: '订单号不能为空'}],
          // orderName: [{required: true, message: '订单名称不能为空'}],
          receipt: [{required: true, message: '收据号不能为空'}],
          customer: [{required: true, message: '客户名不能为空'}],
          orderDate: [{required: true, message: '订货时间不能为空'}],
          address: [{required: true, message: '地址不能为空'}],
          telephone: [{required: true, message: '输入正确的电话！', trigger: 'change'},
            {
              validator: validatePhoneNumber,
              trigger: 'blur'
            }],
          preDeliveryData: [{required: true, message: '预交货时间不能为空'}],
          designer: [{required: true, message: '设计师不能为空'}],
          salesman: [{required: true, message: '销售员能为空'}],
          payWay: [{required: true, message: '支付方式不能为空'}],
          // preReceivableRatio: [{required: true, message: '预收款比例不能为空'}],
          totalAmount: [{required: true, message: '合计原价不能为空'}],
          receivableAmount: [{required: true, message: '应收金额不能为空'}],
          preReceivableAmount: [{required: true, message: '预收金额不能为空'}],
          repayAmount: [{required: true, message: '补交金额不能为空'}],
          provinceInfo: [{required: true, message: '省不能为空'}],
          developers: [{required: true, message: '开发商不能为空'}],
          building: [{required: true, message: '门牌号不能为空'}],


        }
      };
    },
    created() {
      this.mounted();
    },
    beforeCreate() {
      this.commonJs.parseCurrentPageParams(this)
    },
    methods: {
      loadData() {
        if(this.routeParams.id && this.routeParams.id != null && this.routeParams.id != ''){
          getOrderInfo({id:this.routeParams.id}).then(res => {
            if (res.code === 0) {
              this.dataForm = res.data
              if(res.data.houseNumber != null){
                let str = res.data.houseNumber.split("栋")
                this.dataForm.building = str[0];
                this.dataForm.houseNumber = str[1];
                this.dataForm.provinceInfo = res.data.provinceCode+':'+res.data.province;
                this.dataForm.cityInfo = res.data.cityCode+':'+res.data.city;
                this.dataForm.areaInfo = res.data.areaCode+':'+res.data.area;
                this.dataForm.preReceivableRatio = this.dataForm.preReceivableRatio * 100
                this.loadAddress(res.data);
              }
              this.params.reload = new Date().toLocaleString();
              this.params.orderId = res.data.id;
            }else {
              this.$message.error(res.msg);
            }
          })
        }else {
          if(this.routeParams.addressId && this.routeParams.addressId != null && this.routeParams.addressId != ''){
            getOrderAddress({id:this.routeParams.addressId}).then(res => {
              if (res.code === 0) {
                this.dataForm.address = res.data.province+res.data.city+res.data.area+res.data.town+res.data.address;
                this.dataForm.province = res.data.province
                this.dataForm.city = res.data.city
                this.dataForm.area = res.data.area
                this.dataForm.provinceCode = res.data.provinceCode
                this.dataForm.cityCode = res.data.cityCode
                this.dataForm.cityInfo = res.data.cityCode+":"+res.data.city;
                this.dataForm.areaInfo = res.data.areaCode+":"+res.data.area;
                this.dataForm.areaCode = res.data.areaCode
                this.dataForm.developers = res.data.companyName
                this.dataForm.town = res.data.town
              }else {
                this.$message.error(res.msg);
              }
            })
          }else {
            this.loadAddress(this.dataForm);
          }
        }
      },
      loadAddress(data){
        getAddress({type:'province'}).then(res => {
          if (res.code === 0) {
            this.provinceOptions = res.data;
          }else {
            this.$message.error(res.msg);
          }
        });
        if(data.provinceCode != null && data.provinceCode != ''){
          getAddress({type:'city',code:data.provinceCode}).then(res => {
            if (res.code === 0) {
              this.cityOptions = res.data;
            }
          });
        }
        if(data.cityCode != null && data.cityCode != ''){
          getAddress({type:'area',code:data.cityCode}).then(res => {
            if (res.code === 0) {
              this.areaOptions = res.data;
            }
          });
        }
        if(data.areaCode != null && data.areaCode != ''){
          getAddress({type:'town',code:data.areaCode}).then(res => {
            if (res.code === 0) {
              this.townOptions = res.data;
            }
          });
        }
      },
      clateReceivableAmount(){
        if(this.dataForm.receivableAmount && this.dataForm.receivableAmount != ''){
          let num2 = this.dataForm.receivableAmount / this.dataForm.totalAmount;
          this.dataForm.discount = num2.toFixed(2)
        }
      },
      clateDiscount(){
        console.log(this.dataForm.receivableAmount)
        if(this.dataForm.totalAmount && this.dataForm.totalAmount != '') {
          let num2 = this.dataForm.receivableAmount / this.dataForm.totalAmount;
          this.dataForm.discount = num2.toFixed(2)
        }
        if(this.dataForm.preReceivableAmount && this.dataForm.preReceivableAmount != ''){
          let num = this.dataForm.receivableAmount - this.dataForm.preReceivableAmount;
          this.dataForm.repayAmount =  num.toFixed(2)
          let num2 = this.dataForm.preReceivableAmount / this.dataForm.receivableAmount ;
          this.dataForm.preReceivableRatio =  num2.toFixed(2)
        }
      },
      clatepreReceivableAmount(){
        if(this.dataForm.receivableAmount && this.dataForm.receivableAmount != ''){
          let num = this.dataForm.receivableAmount - this.dataForm.preReceivableAmount;
          this.dataForm.repayAmount =  num.toFixed(2)
          let num2 = this.dataForm.preReceivableAmount / this.dataForm.receivableAmount * 100 ;
          this.dataForm.preReceivableRatio =  num2.toFixed(2)
        }
      },
      resetForm() {
      },
      saveOrUpdateOrder(){
        this.$refs[this.formName].validate(async valid => {
          if (valid) {
            if(this.dataForm.cityInfo == '' || this.dataForm.areaInfo == ''){
              this.$notify.error('请选择市或区!!');
              return ;
            }
            if(this.townOptions && this.townOptions.length > 0 && this.dataForm.town == ''){
              this.$notify.error('请选择街道!!');
              return ;
            }
            if(this.dataForm.houseNumber == ''){
              this.$notify.error('门牌号不能为空!!');
              return ;
            }
            this.dataForm.preReceivableRatio = (this.dataForm.preReceivableRatio / 100).toFixed(4);
            this.dataForm.houseNumber =  this.dataForm.building+"栋"+this.dataForm.houseNumber
            saveOrUpdateOrder(this.dataForm).then(res => {
              if (res.code === 0) {
                this.dataForm = res.data
                if(res.data.houseNumber != null && res.data.houseNumber !=''){
                  let str = res.data.houseNumber.split("栋")
                  this.dataForm.building = str[0];
                  this.dataForm.houseNumber = str[1];
                }
                this.$message.success(res.msg);
                this.$emit('nextStep',{id:this.dataForm.id,totalAmount:this.dataForm.totalAmount});
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            this.$notify.error('请输入正确内容!!');
          }
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      handleProvinceChange(value){
        if(value == null || value == ''){
          return;
        }
        this.dataForm.provinceCode = this.dataForm.provinceInfo.split(":")[0]
        this.dataForm.province = this.dataForm.provinceInfo.split(":")[1]
        getAddress({type:'city',code:value.split(":")[0]}).then(res => {
          if (res.code === 0) {
            this.cityOptions = res.data;
            this.areaOptions = [];
            this.townOptions = [];
          }else {
            this.cityOptions = [];
            this.$message.error(res.msg);
          }
          this.dataForm.cityInfo = '';
          this.dataForm.areaInfo = '';
          this.dataForm.town = '';
        })
      },
      handleCityChange(value){
        if(value == null || value == ''){
          return;
        }
        this.dataForm.cityCode = this.dataForm.cityInfo.split(":")[0]
        this.dataForm.city = this.dataForm.cityInfo.split(":")[1]
        getAddress({type:'area',code:value.split(":")[0]}).then(res => {
          if (res.code === 0) {
            this.areaOptions = res.data;
            this.townOptions = [];
          }else {
            this.areaOptions = [];
            this.townOptions = [];
            this.$message.error(res.msg);
          }
          this.dataForm.areaInfo = '';
          this.dataForm.town = '';
        })
      },
      handleAreaChange(value){
        if(value == null || value == ''){
          return;
        }
        this.dataForm.areaCode = this.dataForm.areaInfo.split(":")[0]
        this.dataForm.area = this.dataForm.areaInfo.split(":")[1]
        getAddress({type:'town',code:value.split(":")[0]}).then(res => {
          if (res.code === 0) {
            this.townOptions = res.data;
          }else {
            this.townOptions = [];
            this.$message.error(res.msg);
          }
          this.dataForm.town = '';
        })
      },
      createAddress(){
        if(this.routeParams.addressId){
          this.dataForm.address = this.dataForm.address+this.dataForm.building+"栋"+this.dataForm.houseNumber;
        }else{
          this.dataForm.address = this.dataForm.province+this.dataForm.city+this.dataForm.area+this.dataForm.town
            +this.dataForm.developers+this.dataForm.building+"栋"+this.dataForm.houseNumber;
        }
      },
      openAmount(type){
        this.params.type = type
        this.params.reload = new Date().toLocaleString();
        this.params.openDialogAmount = true;
      },
      closeDialogAmount(obj){
        if(obj == 'reload'){
          this.loadData()
        }
        this.params.openDialogAmount = false;
      },
      print(){
        let routeUrl = this.$router.resolve({
          path: "/orderPrint",
          query: {id:this.dataForm.id}
        });
        window.open(routeUrl.href, '_blank');
        // this.$router.push({name:'orderPrint',params:{id:this.dataForm.id}});
      },
      async mounted() {
        if(this.routeObj){
          this.routeParams = this.routeObj;
        }else {
          this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
        }
        this.loadData();
      },
    },
    watch: {
      reload: function (newVal, oldVal) {
        if (newVal) {
          this.tableData = [];
          this.loadData();
        }
      },
    },
    props: {
      routeObj: {
        type: Object,
      },
      reload: {
        type: String,
        default: "",
      },
      valueFormat: {
        type: String,
        default: "yyyy-MM-dd"
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
