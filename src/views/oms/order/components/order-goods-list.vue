<template>
  <div>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="add(false)"
        size="mini">
        添加
      </el-button>
      <el-button
        style="float: right;margin-right: 15px"
        @click="handleResetSearch()"
        size="small">
        重置
      </el-button>
      <el-button
        style="float: right"
        @click="loadData()"
        type="primary"
        size="small">
        查询结果
      </el-button>
      <el-input clearable placeholder="商品名称" style="float: right;width: 200px"
                v-model.trim="searchFormData.goodsName" size="mini"></el-input>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="goodsCode" label="商品编码" ></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" ></el-table-column>
        <el-table-column prop="colorCode" label="颜色编码" ></el-table-column>
        <el-table-column prop="colorName" label="颜色名称" ></el-table-column>
        <el-table-column prop="goodsType" label="商品类别" :formatter="formatterType"></el-table-column>
        <el-table-column prop="price" label="单价" ></el-table-column>
        <el-table-column prop="number" label="数量" ></el-table-column>
        <el-table-column prop="totalAmount" label="金额" ></el-table-column>
        <el-table-column label="操作" width="360" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="orderUpdate(scope.$index, scope.row,false)">修改
              </el-button>
              <el-button
                size="mini"
                @click="orderShow(scope.$index, scope.row,true)">查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="goodsDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <goodsUpdate
      :reload="this.params.reload"
      :id="this.params.id"
      :orderId="this.orderId"
      :readonly="this.params.readonly"
      :openDialogInfo="this.params.openDialogInfo"
      @closeDialogInfo="closeDialogInfo"
    ></goodsUpdate>
  </div>
</template>
<script>
  import { queryOrderGoodsList,delGoods } from '@/api/order'
  import goodsUpdate from './order-goods-update'

    export default {
        name: 'choose-goods-list',
      components: {goodsUpdate},
        data() {
            return {
                tableData: [], //表格数据
                searchFormData: {
                  goodsName: '',
                  orderId:'',
                },
              totalAmount:'',
              params:{
                reload:'',
                id:'',
                readonly:true,
                openDialogInfo:false,
              },
            }
        },
        methods: {
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            loadData() {
              this.searchFormData.orderId = this.orderId;
              queryOrderGoodsList(this.searchFormData).then(res => {
                if (res.code === 0) {
                  this.tableData = res.data;
                }
              }).catch(() => {
                this.$message.error('请求错误!');
                this.loading = false
              })
            },
          formatterType:function(row, column) {
            if (row.goodsType === 'cp') {
              return "成品";
            }else if (row.goodsType === 'dz') {
              return "定制";
            }else {
              return "";
            }
          },
          add(readonly){
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
            this.params.openDialogInfo = true;
          },
          orderUpdate(index,row,readonly){
            this.params.id = row.id;
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
              this.params.openDialogInfo = true;
            },
          orderShow(index,row,readonly){
            this.params.id = row.id;
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
            this.params.openDialogInfo = true;
          },
      goodsDelete(index,row){
        this.$confirm('确认删除？', '警告', {type: "warning"})
          .then(async () => {
            delGoods({id:row.id}).then(res => {
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
          closeDialogInfo(){
            this.params.openDialogInfo = false;
          },
          handleResetSearch(){
            this.searchFormData.goodsName = '';
          },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.loadData(true);
                }
            },
        },
        //与 上级组件通信
        props: {
            reload: {
                type: String,
                default: "",
            },
          orderId: {
            type: String,
            default: "",
          },
        }

    }
</script>

