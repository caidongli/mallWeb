<template>
    <div id="printCons">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>基本信息</span>
        <el-button
          class="btn-add"
          @click="goPrint()"
          v-if="routeParams.readonly"
          size="mini">
          打印
        </el-button>
      </el-card>
      <el-form
        :disabled="routeParams.readonly"
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
                v-model.trim="dataForm.customer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="订货日期:" prop="orderDate" required>
              <el-date-picker type="datetime" v-model="dataForm.orderDate" :value-format="valueFormat"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6" :offset="2">
            <el-form-item label="电话：" prop="telephone">
              <el-input
                v-model.trim="dataForm.telephone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="预交货时间:" prop="preDeliveryData" required>
              <el-date-picker type="datetime" v-model="dataForm.preDeliveryData" :value-format="valueFormat"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
          <el-col :span="6" :offset="2">
            <el-form-item label="设计师：" prop="designer">
              <el-input
                v-model.trim="dataForm.designer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="销售人员：" prop="salesman">
              <el-input
                v-model.trim="dataForm.salesman"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
          <el-col :span="6" :offset="2">
            <el-form-item label="支付方式：" prop="payWay">
              <el-input
                v-model.trim="dataForm.payWay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="合计金额：" prop="totalAmount">
              <el-input
                v-model.trim="dataForm.totalAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="6" :offset="2">
              <el-form-item label="折扣：">
                <el-input
                  v-model.trim="dataForm.discount" @input="clateReceivableAmount()"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="3">
              <el-form-item label="应收金额：" prop="receivableAmount">
                <el-input
                  v-model.trim="dataForm.receivableAmount" @input="clateDiscount()"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="6" :offset="2">
              <el-form-item label="预收金额：" prop="preReceivableAmount">
                <el-input
                  v-model.trim="dataForm.preReceivableAmount" @input="clatepreReceivableAmount()"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="3">
              <el-form-item label="预收款比例(%)：" prop="preReceivableRatio">
                <el-input
                  v-model.trim="dataForm.preReceivableRatio"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="6" :offset="2">
              <el-form-item label="补交金额：" prop="repayAmount">
                <el-input
                  v-model.trim="dataForm.repayAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
              <el-form-item label="门牌号：" prop="building">
                <el-input v-model="dataForm.building"  placeholder="楼号">
                  <template slot="append" >栋</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-input v-model="dataForm.houseNumber" placeholder="门牌号"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" v-if="!routeParams.addressId">
            <el-col :span="6" :offset="2">
              <el-form-item label="开发商：" prop="developers">
                <el-input v-model="dataForm.developers" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" v-if="!routeParams.addressId" >
            <el-col :span="5" :offset="2">
              <el-form-item label="地址：" prop="province">
                <el-select v-model="dataForm.province" clearable
                           placeholder="省份"
                           @change="handleProvinceChange">
                  <el-option
                    v-for="item in provinceOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1">
                <el-select v-model="dataForm.city" clearable placeholder="市" @change="handleCityChange">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="3" :offset="1">
                <el-select v-model="dataForm.area" clearable placeholder="区" @change="handleAreaChange">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="3" :offset="1">
                <el-select v-model="dataForm.town" clearable placeholder="街道"
                           @change="$forceUpdate()">
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
                <el-input v-model="dataForm.address">
                  <el-button slot="append" @click="createAddress()">生成地址信息</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="15" :offset="2">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="dataForm.remark"></el-input>
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
    import { saveOrUpdateOrder,getOrderInfo,getAddress } from '@/api/order'
    import orderGoodsList from './components/order-goods-list'
    import { getOrderAddress } from '@/api/orderAddress'
    import {isPhone, isMobile} from '@/utils/validate'
    import {current_page_params} from '@/utils/constant'
    import print from 'print-js'
    export default {
        name: 'orderDetail',
      components: {orderGoodsList},
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
                provinceOptions:[],
                cityOptions:[],
                areaOptions:[],
                townOptions:[],
              params:{
                orderId:'',
                reload:'',
              },
                dataForm: {
                    id:'',
                    customer:'',
                    orderDate:'',
                    province:'',
                    city:'',
                    area:'',
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
                    preReceivableRatio: [{required: true, message: '预收款比例不能为空'}],
                    totalAmount: [{required: true, message: '合计金额不能为空'}],
                    receivableAmount: [{required: true, message: '应收金额不能为空'}],
                    preReceivableAmount: [{required: true, message: '预收金额不能为空'}],
                    repayAmount: [{required: true, message: '补交金额不能为空'}],
                  province: [{required: true, message: '省不能为空'}],
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
                                let str = res.data.houseNumber.split("-")
                                this.dataForm.building = str[0];
                                this.dataForm.houseNumber = str[1];
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
                                this.dataForm.developers = res.data.companyName
                                this.dataForm.town = res.data.town
                            }else {
                                this.$message.error(res.msg);
                            }
                        })
                    }
                }
            },
            loadAddress(){
                getAddress({type:'province'}).then(res => {
                    if (res.code === 0) {
                        this.provinceOptions = res.data;
                    }else {
                        this.$message.error(res.msg);
                    }
                })
            },
            clateReceivableAmount(){
                if(this.dataForm.totalAmount && this.dataForm.totalAmount != ''){
                    let num = this.dataForm.discount * this.dataForm.totalAmount;
                    this.dataForm.receivableAmount =  num.toFixed(2)
                }
            },
            clateDiscount(){
                if(this.dataForm.totalAmount && this.dataForm.totalAmount != '') {
                    let num2 = this.dataForm.receivableAmount / this.dataForm.totalAmount;
                    this.dataForm.discount = num2.toFixed(2)
                }
            },
            clatepreReceivableAmount(){
                if(this.dataForm.receivableAmount && this.dataForm.receivableAmount != ''){
                    let num = this.dataForm.receivableAmount - this.dataForm.preReceivableAmount;
                    this.dataForm.repayAmount =  num.toFixed(2)
                    let num2 = this.dataForm.preReceivableAmount / this.dataForm.receivableAmount ;
                    this.dataForm.preReceivableRatio =  num2.toFixed(2)
                }
            },
            resetForm() {
            },
            saveOrUpdateOrder(){
                this.$refs[this.formName].validate(async valid => {
                    if (valid) {
                            if(this.dataForm.city == '' || this.dataForm.area == ''){
                                this.$notify.error('请选择市或区!!');
                            }
                            if(this.townOptions && this.townOptions.length > 0 && this.dataForm.town == ''){
                                this.$notify.error('请选择街道!!');
                            }
                        if(this.dataForm.houseNumber == ''){
                            this.$notify.error('门牌号不能为空!!');
                        }
                        this.dataForm.houseNumber =  this.dataForm.building+"-"+this.dataForm.houseNumber
                        saveOrUpdateOrder(this.dataForm).then(res => {
                            if (res.code === 0) {
                                this.dataForm = res.data
                                if(res.data.houseNumber != null && res.data.houseNumber !=''){
                                    let str = res.data.houseNumber.split("-")
                                    this.dataForm.building = str[0];
                                    this.dataForm.houseNumber = str[1];
                                }
                                this.$message.success(res.msg);
                                this.$emit('nextStep',this.dataForm.id);
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
                let code = this.provinceOptions.find((item)=> {
                    return item.name === value;
                }).code
                getAddress({type:'city',code:code}).then(res => {
                    if (res.code === 0) {
                        this.cityOptions = res.data;
                        this.areaOptions = [];
                        this.townOptions = [];
                    }else {
                        this.cityOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.city = '';
                    this.dataForm.area = '';
                    this.dataForm.town = '';
                })
            },
            handleCityChange(value){
              if(value == null || value == ''){
                return;
              }
                let code = this.cityOptions.find((item)=> {
                    return item.name === value;
                }).code
                getAddress({type:'area',code:code}).then(res => {
                    if (res.code === 0) {
                        this.areaOptions = res.data;
                        this.townOptions = [];
                    }else {
                        this.areaOptions = [];
                        this.townOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.area = '';
                    this.dataForm.town = '';
                })
            },
            handleAreaChange(value){
              if(value == null || value == ''){
                return;
              }
                let code = this.areaOptions.find((item)=> {
                    return item.name === value;
                }).code
                getAddress({type:'town',code:code}).then(res => {
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
            goPrint(){
                printJS({
                    printable: 'printCons',
                    type: 'html',
                    //properties: [
                    //    { field: 'name', displayName: '姓名', columnSize:`50%`},
                    //    { field: 'sex', displayName: '性别',columnSize:`50%`},
                    //],
                    // header: `<p class="custom-p"> 名单 </p>`,
                    // style: '#printCons {width: 600px;} .no-print{width: 0px} .itemText1 { width: 200px } .itemText2 { width: 200px } .itemText3 { width: 200px } .itemText4 { width: 200px }',
                    // gridHeaderStyle:'font-size:12px; padding:3px; border:1px solid; font-weight: 100; text-align:left;',
                    // gridStyle:'font-size:12px; padding:3px; border:1px solid; text-align:left;',
                    // repeatTableHeader: true,
                    // scanStyles:true,
                    targetStyles: ['*'],
                    // ignoreElements:['no-print','bc','gb']
                })
            },
            async mounted() {
              if(this.routeObj){
                this.routeParams = this.routeObj;
              }else {
                this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
              }
                this.loadData();
                this.loadAddress();
            },
        },
        watch: {
            'dataForm.totalAmount': function (newVal, oldVal) {
                if (newVal) {
                    if(this.dataForm.discount && this.dataForm.discount != ''){
                        let num = this.dataForm.discount * this.dataForm.totalAmount;
                        this.dataForm.receivableAmount =  num.toFixed(2)
                    }
                    if(this.dataForm.receivableAmount && this.dataForm.receivableAmount != ''){
                        let num = this.dataForm.receivableAmount - this.dataForm.preReceivableAmount;
                        this.dataForm.repayAmount =  num.toFixed(2)
                        let num2 = this.dataForm.preReceivableAmount / this.dataForm.receivableAmount ;
                        this.dataForm.preReceivableRatio =  num2.toFixed(2)
                    }
                }
            },
        },
      props: {
        routeObj: {
          type: Object,
        },
        valueFormat: {
          type: String,
          default: "yyyy-MM-dd HH:mm:ss"
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
