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
            <el-form-item label="姓名：">
              <el-input clearable placeholder="姓名"
                        v-model.trim="searchFormData.staffName"></el-input>
            </el-form-item>
            <el-form-item label="编号：">
              <el-input clearable placeholder="编号"
                        v-model.trim="searchFormData.staffNo"></el-input>
            </el-form-item>
            <el-form-item label="月份：">
              <el-date-picker
                v-model="searchFormData.salaryDate"
                class="timePicker"
                type="month"
                format="yyyy-MM"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <el-button
        class="btn-add"
        @click="createSalary()"
        size="mini">
        生成
      </el-button>
      <el-button
        class="btn-add"
        @click="ymqh()"
        size="mini">
        疫苗
      </el-button>
      <el-button
        class="btn-add"
        @click="addOrderTaget()"
        size="mini">
        疫苗2
      </el-button>
      <el-button
        class="btn-add"
        @click="ksym()"
        size="mini">
        打开
      </el-button>
      <el-button
        class="btn-add"
        @click="zzym()"
        size="mini">
        关闭
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="staffName" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="staffNo" label="编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="salaryDate" label="月份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="salary" label="薪资" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300" align="center">
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
    <salaryUpdate
      :openDialogInfo="this.params.openDialogInfo"
      :id="this.params.id"
      :readonly = "this.params.readonly"
      :reload="this.params.reload"
      @closeDialogInfo="closeDialogInfo"
    ></salaryUpdate>
  </div>
</template>
<script>
    import salaryUpdate from './conponents/salary-update'
    import { querySalaryList,createSalary,ym,sdym,addOrder,addOrderTaget } from '@/api/salary'
    export default {
        name: "salaryList",
        components: {salaryUpdate},
        props: {
        },
        data() {
            return {
                ymStatus:false,
                total: 0,
                tableData: [], //表格数据
                activeNames: [],
                searchFormData: {
                    pageNum: 1,
                    pageSize: 10,
                    staffName:'',
                    staffNo:'',
                    salaryDate:'',
                },
                params:{
                    readonly:true,
                    openDialogInfo: false,
                    id:'',
                    reload:'',
                },
            }
        },
        created() {
            this.loadData();
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
                querySalaryList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            createSalary(){
                createSalary(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.loadData()
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            opt(row,readonly){
                this.params.readonly = readonly;
                this.params.id = row.id
                this.params.reload = new Date().toLocaleString();
                this.params.openDialogInfo = true
            },
            handleResetSearch(){
                this.searchFormData.staffName = '';
                this.searchFormData.staffNo = '';
                this.searchFormData.salaryDate = '';
            },
            closeDialogInfo(obj){
                if(obj == 'reload'){
                    this.loadData();
                }
                this.params.openDialogInfo = false
            },
            ymqh(){
                if(this.ymStatus){
                    const that = this;
                    setTimeout(function () {
                        addOrder().then(res => {
                            console.log(res.msg)
                            if (res.code === 0) {
                            }else {
                                that.ymqh();
                            }
                        })
                    }, 2000);
                }
            },
            addOrderTaget(){
                if(this.ymStatus){
                    const that = this;
                    setTimeout(function () {
                        addOrderTaget().then(res => {
                            console.log(res.msg)
                            if (res.code === 0) {
                            }else {
                                that.ymqh();
                            }
                        })
                    }, 2000);
                }
            },
            ksym(){
                this.ymStatus = true;
            },
            zzym(){
                this.ymStatus = false;
            },
        }
    }
</script>
<style></style>


