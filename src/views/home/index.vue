<template>
  <div class="app-container">
    <div class="total-layout">
      <el-row  style="margin-bottom: 20px">
        <el-col :span="4" :offset="18" style="margin-right: 5px">
          <el-input
            size="small"
            clearable placeholder="销售人员"
            v-model.trim="query.salesman"></el-input>
        </el-col>
        <el-col :span="1" >
          <el-button
            class="btn-add"
            @click="queryData()"
            size="small">
            查询
          </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">{{dataForm.todaySum}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥{{dataForm.todayAmount}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">本月销售总额</div>
            <div class="total-value">￥{{dataForm.monthAmount}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
   <!-- <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">

        </el-row>
      </div>
    </div>-->
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{dataForm.monthSum}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="dataForm.monthSumPCT < 0">{{dataForm.monthSumPCT}}%</span>
                <span class="color-danger" style="font-size: 14px" v-if="dataForm.monthSumPCT > 0">{{dataForm.monthSumPCT}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{dataForm.weekDaySum}}</div>
              <div>
                <span class="color-danger" style="font-size: 14px"  v-if="dataForm.weekSumPCT > 0">{{dataForm.weekSumPCT}}%</span>
                <span class="color-success" style="font-size: 14px"  v-if="dataForm.weekSumPCT < 0">{{dataForm.weekSumPCT}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{dataForm.monthAmount}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="dataForm.monthAmountPCT < 0">{{dataForm.monthAmountPCT}}%</span>
                <span class="color-danger" style="font-size: 14px"  v-if="dataForm.monthAmountPCT > 0">{{dataForm.monthAmountPCT}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{dataForm.weekDayAmount}}</div>
              <div>
                <span class="color-danger" style="font-size: 14px" v-if="dataForm.weekDayAmountPCT > 0">{{dataForm.weekDayAmountPCT}}%</span>
                <span class="color-success" style="font-size: 14px" v-if="dataForm.weekDayAmountPCT < 0">{{dataForm.weekDayAmountPCT}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">color-success</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              :value-format="valueFormat"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import { orderInfo,orderInfoByDay } from '@/api/order'
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  export default {
    name: 'home',
      props:{
          valueFormat: {
              type: String,
              default: "yyyy-MM-dd HH:mm:ss"
          },
      },
    data() {
      return {
          dataForm:{
              todaySum:'',
              todayAmount:'',
              monthAmount:'',
              monthSum:'',
              yesterdayAmount:'',
              weekDaySum:'',
              weekDayAmount:'',
              monthAmountPCT:0,
              monthSumPCT:0,
              weekDayAmountPCT:0,
              weekSumPCT:0,
          },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
              const end = new Date();
              let start = new Date();
              start.setFullYear(2018);
              start.setMonth(10);
              start.setDate(1);
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          axisSite: { right: ['orderAmount']},
        labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}},
        chartData: {
          columns: [],
          rows: []
        },
          query:{
              startTime:null,
              endTime:null,
              salesman:'',
          },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount
      }
    },
    created(){
      this.getData();
      this.loadData();
    },
    methods:{
        queryData(){
            this.getData();
            this.loadData();
        },
      handleDateChange(){
        this.getData();
      },
        loadData(){
            orderInfo(this.query).then(res => {
                if (res.code === 0) {
                    this.dataForm = res.data
                }
            }).catch(() => {
                this.$message.error('请求错误!');
                this.loading = false
            })
        },
      getData(){
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          if(this.orderCountDate != null && this.orderCountDate != ''){
              this.query.startTime=this.orderCountDate[0];
              this.query.endTime=this.orderCountDate[1];
          }
            orderInfoByDay(this.query).then(res => {
                if (res.code === 0) {
                    this.chartData.rows = res.data
                }
            }).catch(() => {
                this.$message.error('请求错误!');
                this.loading = false
            })
          this.dataEmpty = false;
          this.loading = false
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
