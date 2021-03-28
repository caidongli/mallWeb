<template> 
  <div class="app-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="查询" name="1">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="loadData()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="100px">
          <el-form-item label="客户名称：">
            <el-input clearable placeholder="客户名称"
                      v-model.trim="searchFormData.customer"></el-input>
          </el-form-item>
          <el-form-item label="设计师：">
            <el-input clearable placeholder="设计师"
                      v-model.trim="searchFormData.designer"></el-input>
          </el-form-item>
          <el-form-item label="销售人员：">
            <el-input clearable placeholder="销售人员"
                      v-model.trim="searchFormData.salesman"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：">
            <el-input clearable placeholder="电话号码"
                      v-model.trim="searchFormData.telephone"></el-input>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input clearable placeholder="地址"
                      v-model.trim="searchFormData.address"></el-input>
          </el-form-item>
          <el-form-item label="订货时间：">
            <el-date-picker
              v-model="searchFormData.orderDateInfo"
              type="datetimerange"
              :value-format="valueFormat"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预交货时间：">
            <el-date-picker
              v-model="searchFormData.preDeliveryDataInfo"
              :value-format="valueFormat"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="searchFormData.orderStatus" @change="loadData()" placeholder="订单状态" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      </el-collapse-item>
    </el-collapse>
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
        <el-table-column prop="customer" label="客户名称" ></el-table-column>
        <el-table-column prop="orderDate" label="订货日期" ></el-table-column>
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="preDeliveryData" label="预交货时间"></el-table-column>
        <el-table-column prop="designer" label="设计师"></el-table-column>
        <el-table-column prop="salesman" label="销售人员"></el-table-column>
        <el-table-column prop="payWay" label="支付方式"></el-table-column>
        <el-table-column label="操作" width="360" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                v-if="isSuper == '1' || username ==  scope.row.userName"
                @click="orderUpdate(scope.$index, scope.row,false)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="orderShow(scope.$index, scope.row,true)">查看
              </el-button>
              <el-button
                size="mini"
                v-if="isSuper == '1' || username ==  scope.row.userName"
                type="danger"
                @click="updateOrderStatus(scope.$index, scope.row)">作废
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
    <chooseAddress
      :openDialogChoose="openDialogChoose"
      :reload="this.reload"
      @closeOpenDialog="closeOpenDialog"
    ></chooseAddress>
  </div>
</template>
<script>
    import chooseAddress from './components/choose-address'
    import { delOrder,queryOrderList,updateOrderStatus } from '@/api/order'
    export default {
        name: "orderList",
        components: {chooseAddress},
        props:{
            valueFormat: {
                type: String,
                default: "yyyy-MM-dd HH:mm:ss"
            },
        },
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                isSuper:'0',
                username:'0',
                activeNames: [],
                tableData: [], //表格数据
                openDialogChoose: false,
                reload:'',
                options: [{
                    value: '1',
                    label: '已关闭'
                }, {
                    value: '0',
                    label: '未关闭'
                }],
                searchFormData: {
                    customer: '',
                    designer:'',
                    salesman:'',
                    payWay:'',
                    address:'',
                    orderStatus:'',
                    telephone:'',
                    orderDateInfo:[],
                    orderStartDate:'',
                    orderEndDate:'',
                    preDeliveryStartData:'',
                    preDeliveryEndData:'',
                    preDeliveryDataInfo:[],
                    pageNum:1,
                    pageSize: 10,
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        created() {
            let param = JSON.parse(this.commonJs.getStore(this.constants.userInfo));
            this.isSuper = param.isSuper
            this.username = param.username
            this.loadData();
        },
        methods: {
            //分页大小，重新加载
            handleSizeChange: function(size) {
                this.pageSize = size;
                if (size > this.total) {
                    this.pageNum = 1
                }
                this.loadData()
            },
            //选择页数，重新加载
            handleCurrentChange: function(pageNum) {
                this.pageNum = pageNum;
                this.loadData()
            },
            loadData() {
                this.searchFormData.pageNum = this.pageNum;
                this.searchFormData.pageSize = this.pageSize;
                if(this.searchFormData.orderDateInfo && this.searchFormData.orderDateInfo.length > 0){
                    this.searchFormData.orderStartDate = this.searchFormData.orderDateInfo[0];
                    this.searchFormData.orderEndDate = this.searchFormData.orderDateInfo[1];
                }
                if(this.searchFormData.preDeliveryDataInfo && this.searchFormData.preDeliveryDataInfo.length > 0){
                    this.searchFormData.preDeliveryStartData = this.searchFormData.preDeliveryDataInfo[0];
                    this.searchFormData.preDeliveryEndData = this.searchFormData.preDeliveryDataInfo[1];
                }
                queryOrderList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            addOrder(readonly,isAdd){
                this.$confirm('是否选择开发商？', '选择信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '是',
                    cancelButtonText: '否'
                })
                    .then(() => {
                        this.reload = new Date().toLocaleString();
                        this.openDialogChoose = true
                    })
                    .catch(action => {
                        this.$router.push({name:'orderUpdate',params:{readonly: readonly,isAdd:isAdd}});
                    });
            },
            orderShow(index,row,readonly){
                this.$router.push({name:'orderDetail',params:{id:row.id,readonly: readonly,isAdd: false}});
            },
            orderUpdate(index,row,readonly){
                this.$router.push({name:'orderUpdate',params:{id:row.id,readonly: readonly,isAdd: false}});
            },
            updateOrderStatus(index,row){
                this.$confirm('确认作废？', '警告', {type: "warning"})
                    .then(async () => {
                        updateOrderStatus({id:row.id,status:"0"}).then(res => {
                            if (res.code === 0) {
                                this.loadData();
                            }
                        }).catch(() => {
                            this.$message.error('请求错误!');
                            this.loading = false
                        })
                    })
                    .catch(() => {
                    })
            },
            closeOpenDialog(){
                this.openDialogChoose = false
            },
            handleResetSearch(){
                this.searchFormData.customer = '';
                this.searchFormData.designer = '';
                this.searchFormData.salesman = '';
                this.searchFormData.payWay = '';
                this.searchFormData.orderDateInfo = [];
                this.searchFormData.orderStartDate = '';
                this.searchFormData.orderEndDate = '';
                this.searchFormData.preDeliveryStartData = '';
                this.searchFormData.preDeliveryEndData = '';
                this.searchFormData.preDeliveryDataInfo = [];
            },
        }
    }
</script>
<style></style>


