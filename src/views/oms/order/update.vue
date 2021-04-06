<template> 
  <div>
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写订单信息"></el-step>
      <el-step title="填写商品信息"></el-step>
    </el-steps>
    <OrderDetail
      :routeObj = "this.routeParams "
      :reload = "this.routeParams.reload"
      v-show="showStatus[0]"
      @nextStep="nextStep">
    </OrderDetail>
    <OrderGoodsList
      v-show="showStatus[1]"
      :reload="this.params.reload"
      :orderId="this.params.orderId"
      :amount="this.params.totalAmount"
      @prevStep="prevStep">
    </OrderGoodsList>
  </div>
</template>
<script>
  import OrderDetail from './orderDetail';
  import OrderGoodsList from './components/order-goods-list';
  import {current_page_params} from '@/utils/constant'

  export default {
    name: 'OrderUpdate',
    components: {OrderDetail, OrderGoodsList},
    data() {
      return {
        active: 0,
        routeParams:{
          readonly:true,
          isAdd:false,
          id:'',
          addressId:'',
            reload:'',
        },
        params:{
          orderId:'',
          reload:'',
          totalAmount:'',
        },
        showStatus: [true, false]
      }
    },
    created(){
      this.mounted();
    },
    beforeCreate() {
      this.commonJs.parseCurrentPageParams(this)
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.routeParams.reload = new Date().toLocaleString();
          this.showStatus[this.active] = true;
        }
      },
      nextStep(obj) {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.params.reload = new Date().toLocaleString();
          this.params.orderId = obj.id;
          this.params.totalAmount = obj.totalAmount.toString();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        })
      },
      async mounted() {
        this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
      },
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


