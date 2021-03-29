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
            <el-form-item label="手机号：">
              <el-input clearable placeholder="手机号"
                        v-model.trim="searchFormData.tel"></el-input>
            </el-form-item>
            <el-form-item label="微信：">
              <el-input clearable placeholder="微信"
                        v-model.trim="searchFormData.weChat"></el-input>
            </el-form-item>
            <el-form-item label="开发商：">
              <el-select v-model="searchFormData.developers" placeholder="开发商" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.companyName"
                  :label="item.companyName"
                  :value="item.companyName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房号：">
              <el-input clearable placeholder="房号"
                        v-model.trim="searchFormData.houseNumber"></el-input>
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
        @click="add(false)"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="customer" label="客户名" >
        </el-table-column>
        <el-table-column prop="tel" label="手机号" ></el-table-column>
        <el-table-column prop="we_chat" label="微信" ></el-table-column>
        <el-table-column prop="developers" label="开发商"></el-table-column>
        <el-table-column prop="houseNumber" label="房号"></el-table-column>
        <el-table-column label="操作" width="360" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="opt(scope.row,false)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="opt(scope.row,true)">查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="del(scope.row)">删除
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
        :current-page="searchFormData.pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="searchFormData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
    <customerUpdate
      :openDialogInfo="this.params.openDialogInfo"
      :id="this.params.id"
      :readonly = "this.params.readonly"
      :reload="this.params.reload"
      @closeDialogInfo="closeDialogInfo"
    ></customerUpdate>
  </div>
</template>
<script>
    import customerUpdate from './conponents/customer-update'
    import { queryCustomerList, delCustomer } from '@/api/customer'
    import { queryAddressList } from '@/api/orderAddress'
    export default {
        name: "customerList",
        components: {customerUpdate},
        data() {
            return {
                total: 0,
                tableData: [], //表格数据
              activeNames: [],
                searchFormData: {
                  pageNum: 1,
                  pageSize: 10,
                  developers: '',
                  houseNumber:'',
                  weChat:'',
                  tel:'',
                  customer:'',
                },
              options: [],
                params:{
                  readonly:true,
                  openDialogInfo: false,
                    id:'',
                    reload:'',
                }
            }
        },
        created() {
            this.loadData();
            this.loadOptionsData()
        },
        methods: {
            //分页大小，重新加载
            handleSizeChange: function(size) {
                this.searchFormData.pageSize = size;
                if (size > this.total) {
                    this.searchFormData.pageNum = 1
                }
                this.loadData()
            },
            //选择页数，重新加载
            handleCurrentChange: function(pageNum) {
                this.searchFormData.pageNum = pageNum;
                this.loadData()
            },
            loadData() {
              queryCustomerList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
          loadOptionsData() {
            queryAddressList().then(res => {
              if (res.code === 0) {
                this.options = res.data
              }else {
                this.$message.error(res.msg);
              }
            })
          },
            add(readonly){
              this.params.readonly = readonly;
              this.params.id = '';
              this.params.reload = new Date().toLocaleString();
              this.params.openDialogInfo = true
            },
          opt(row,readonly){
            this.params.readonly = readonly;
            this.params.id = row.id
            this.params.reload = new Date().toLocaleString();
            this.params.openDialogInfo = true
            },
            del(row){
              delCustomer({id:row.id}).then(res => {
                    if (res.code === 0) {
                        this.loadData();
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleResetSearch(){
                this.searchFormData.developers = '';
              this.searchFormData.houseNumber = '';
              this.searchFormData.weChat = '';
              this.searchFormData.tel = '';
              this.searchFormData.customer = '';
            },
          closeDialogInfo(obj){
              if(obj == 'reload'){
                this.loadData();
              }
              this.params.openDialogInfo = false
            }
        }
    }
</script>
<style></style>


