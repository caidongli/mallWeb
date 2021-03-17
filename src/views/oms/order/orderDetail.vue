<template>
    <div>
      <el-form
        :disabled="routeParams.readonly"
        :model="dataForm"
        :ref="formName"
        :rules="rules"
        label-position="right"
        label-width="130px"
      >
        <el-card class="filter-container" shadow="never">
          <div>
            <span>基本信息</span>
          </div>
        <el-row type="flex" class="row-bg">
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
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="4" :offset="2">
              <el-form-item label="省：" prop="repayAmount">
                <el-select v-model="dataForm.province" clearable placeholder="请选择" @change="handleProvinceChange">
                  <el-option
                    v-for="item in provinceOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" >
              <el-form-item label="市：" prop="repayAmount">
                <el-select v-model="dataForm.city" clearable placeholder="请选择" @change="handleCityChange">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" >
              <el-form-item label="区：" prop="repayAmount">
                <el-select v-model="dataForm.area" clearable placeholder="请选择" @change="handleAreaChange">
                  <el-option
                    v-for="item in areaOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" >
              <el-form-item label="街道：" prop="repayAmount">
                <el-select v-model="dataForm.town" clearable placeholder="请选择" @change="$forceUpdate()">
                  <el-option
                    v-for="item in townOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="15" :offset="2">
              <el-form-item label="详细地址：" prop="address">
                <el-input type="textarea" v-model="dataForm.address"></el-input>
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
        </el-card>


      </el-form>
      <el-card class="filter-container" shadow="never">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="查询" name="1">

          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button
          class="btn-add"
          @click="addOrder(false,true)"
          size="mini">
          添加
        </el-button>
      </el-card>
      <div class="table-container">
        <el-table :data="tableData" border stripe>
          <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.goodsName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="360" align="center">
            <template slot-scope="scope">
              <p>
                <el-button
                  size="mini"
                  @click="orderUpdate(scope.$index, scope.row,false)">保存
                </el-button>
                <el-button
                  size="mini"
                  @click="orderShow(scope.$index, scope.row,true)">查看
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="orderDelete(scope.$index, scope.row)">删除
                </el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--底部操作按钮-->
      <el-row justify="right">
        <el-col :offset="18" :span="6">
          <el-button @click="saveOrUpdateOrder" v-show="!routeParams.readonly">
            保存
          </el-button>
          <el-button @click="goBack()" >
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import { delGoods,updateGoods,saveOrUpdateOrder,queryOrderGoodsList,delGoodsBatch,getOrderInfo,queryOrderGoods,getAddress } from '@/api/order'
    import {isPhone, isMobile} from '@/utils/validate'
    import {current_page_params} from '@/utils/constant'
    export default {
        name: 'orderDetail',
        props:{
            valueFormat: {
                type: String,
                default: "yyyy-MM-dd HH:mm:ss"
            },
        },
        data() {
            var validatePhoneNumber = async (rule, value, callback) => {
                if (!isMobile(value) && !isPhone(value)) {
                    callback(new Error('请输入正确的手机号或者电话号'));
                    return
                }
            };
            return {
                formName: 'dataForm',
                activeNames:[],
                routeParams:{
                    readonly:true,
                    isAdd:false,
                    id:'',
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
                dataForm: {
                    id:'',
                    customer:'',
                    orderDate:'',
                    province:'',
                    city:'',
                    area:'',
                    town:'',
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
                            this.dataForm = res.data;
                            this.loadTableData(res.data.id);
                        }else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            loadAddress(){
                getAddress({type:'province'}).then(res => {
                    if (res.code === 0) {
                        this.provinceOptions = res.data;
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            loadTableData(id){
                this.searchFormData.orderId = id;
                queryOrderGoodsList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data;
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
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
                saveOrUpdateOrder(this.dataForm).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            handleProvinceChange(value){
                getAddress({type:'city',code:value}).then(res => {
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
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
                /*let label = this.provinceOptions.find((item)=> {
                    return item.code === value;
                })
                console.log(label)*/
            },
            handleCityChange(value){
                getAddress({type:'area',code:value}).then(res => {
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
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleAreaChange(value){
                getAddress({type:'town',code:value}).then(res => {
                    if (res.code === 0) {
                        this.townOptions = res.data;
                    }else {
                        this.townOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.town = '';
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            async mounted() {
                this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
                console.log(this.routeParams)
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
    }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
