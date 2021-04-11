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
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
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
        <el-table-column prop="staffName" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" label="性别" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="formatter"  show-overflow-tooltip></el-table-column>
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
    <employeesUpdate
      :openDialogInfo="this.params.openDialogInfo"
      :id="this.params.id"
      :readonly = "this.params.readonly"
      :reload="this.params.reload"
      @closeDialogInfo="closeDialogInfo"
    ></employeesUpdate>
  </div>
</template>
<script>
    import employeesUpdate from './conponents/employees-update'
    import { queryEmployeesList,delEmployees } from '@/api/employees'
    export default {
        name: "employeesList",
        components: {employeesUpdate},
        data() {
            return {
                total: 0,
                tableData: [], //表格数据
                fileList: [], // 上传的文件列表
              activeNames: [],
                searchFormData: {
                  pageNum: 1,
                  pageSize: 10,
                    staffName:'',
                },
                params:{
                  readonly:true,
                  openDialogInfo: false,
                    id:null,
                    reload:'',
                }
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
                queryEmployeesList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            add(readonly){
              this.params.readonly = readonly;
              this.params.id = null;
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
              this.$confirm('确认删除？', '警告', {type: "warning"})
                .then(async () => {
                    delEmployees({id:row.id}).then(res => {
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
            handleResetSearch(){
              this.searchFormData.staffName = '';
            },
          closeDialogInfo(obj){
              if(obj == 'reload'){
                this.loadData();
              }
              this.params.openDialogInfo = false
            },
            formatter:function(row, column) {
                if (row.status === '1') {
                    return "在职";
                }else if (row.status === '0') {
                    return "离职";
                }else {
                    return "";
                }
            },
        }
    }
</script>
<style></style>


