<template>
    <el-dialog
            :title="'订单列表'"
            :visible.sync="openDialogChoose"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog(false)"
            width="1000px"
    >
      <el-row >
        <el-form :inline="true" class="demo-form-inline" align="right">
          <el-form-item label="订单号：">
            <el-input clearable placeholder="订单号"
                      v-model.trim="searchFormData.orderNumber"></el-input>
          </el-form-item>
          <el-form-item label="客户名称：">
            <el-input clearable placeholder="客户名称"
                      v-model.trim="searchFormData.customer"></el-input>
          </el-form-item>
          <el-form-item class="input-bottom">
            <el-button type="primary" size="mini" @click="loadData(true)">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
        <el-row>
            <el-table :data="tableData"
                      ref="multipleTable"
                      :row-class-name="rowIndex" stripe>
              <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
              <el-table-column prop="orderNumber" label="订单号" ></el-table-column>
              <el-table-column prop="customer" label="客户名称" ></el-table-column>
              <el-table-column prop="developers" label="开发商" ></el-table-column>
              <el-table-column prop="houseNumber" label="房号"></el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button
                      size="mini"
                      @click="choose(scope.row)">选择
                    </el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
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
        </el-row>
    </el-dialog>
</template>
<script>
    import { queryOrderList } from '@/api/order'

    export default {
        name: 'choose-order',
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData: [], //表格数据
                searchFormData: {
                  developers:'',
                  houseNumber:'',
                  orderNumber:'',
                  customer: '',
                    pageNum:1,
                    pageSize: 10,
                },
            }
        },
        methods: {
            //分页大小，重新加载
            handleSizeChange: function(size) {
                this.pageSize = size;
                if (size > this.total) {
                    this.pageNum = 1
                }
                this.loadData(true)
            },
            //选择页数，重新加载
            handleCurrentChange: function(pageNum) {
                this.pageNum = pageNum;
                this.loadData(true)
            },
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            closeDialog() {
                this.$emit('closeOpenDialog', null);
            },
            loadData() {
                this.searchFormData.pageNum = this.pageNum;
                this.searchFormData.pageSize = this.pageSize;
              queryOrderList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                })
            },
            choose(row){
                this.$emit('chooseOrder', row);
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
            openDialogChoose: {
                type: Boolean,
                default: false
            },
            reload: {
                type: String,
                default: "",
            },
        }

    }
</script>

