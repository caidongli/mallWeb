<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
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
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input clearable placeholder="角色名"
                      v-model.trim="searchFormData.queryName"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addRole(false)"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名" >
          <template slot-scope="scope">
            <span class="span-text" @click="show(scope.$index, scope.row,true)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" ></el-table-column>
        <el-table-column label="有效状态" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       @change="handleStatusChange(scope.$index, scope.row)"
                       :active-value='"1"'
                       :inactive-value='"0"'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="360" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="update(scope.$index, scope.row,false)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="chooseRolePermission(scope.row)">权限
              </el-button>
              <el-button
                size="mini"
                @click="chooseRoleMenu(scope.row)">菜单
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="roleDelete(scope.$index, scope.row)">删除
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
    <choosePermission
      :openDialogChoose="openDialogChoose"
      :reload="this.params.reload"
      :roleId="this.params.roleId"
      @closeOpenDialog="closeOpenDialog"
    ></choosePermission>
    <chooseMenu
      :openDialogMenu="openDialogMenu"
      :reloadMenu="this.params.reloadMenu"
      :roleId="this.params.roleId"
      @closeOpenMenu="closeOpenMenu"
    ></chooseMenu>
  </div>
</template>
<script>
    import choosePermission from './conponents/choose-permission'
    import chooseMenu from './conponents/choose-menu'
    import { queryRoleByPage,deleteRole,updateRole } from '@/api/role'
    export default {
        name: "roleList",
        components: {choosePermission,chooseMenu},
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData: [], //表格数据
                searchFormData: {
                    queryName: '',
                },
                openDialogChoose: false,
                openDialogMenu:false,
                params:{
                    roleId:'',
                    reload:'',
                    reloadMenu:'',
                }
            }
        },
        created() {
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
                let param = {
                    name: this.searchFormData.queryName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                };
                queryRoleByPage(param).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            addRole(readonly){
                this.$router.push({name:'roleEdit',params:{readonly: readonly}});
            },
            show(index,row,readonly){
                this.$router.push({name:'roleEdit',params:{id:row.id,readonly: readonly}});
            },
            update(index,row,readonly){
                this.$router.push({name:'roleEdit',params:{id:row.id,readonly: readonly}});
            },
            chooseRolePermission(row){
                this.params.roleId = row.id;
                this.params.reload = new Date().toLocaleString();
                this.openDialogChoose = true
            },
            chooseRoleMenu(row){
                this.params.roleId = row.id;
                this.params.reloadMenu = new Date().toLocaleString();
                this.openDialogMenu = true
            },
            roleDelete(index,row){
                deleteRole({id:row.id}).then(res => {
                    if (res.code === 0) {
                        this.loadData();
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleStatusChange(index, row){
                let param = {
                    id: row.id,
                    status: row.status,
                };
                updateRole(param).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }else {
                        this.loadData();
                        this.$message.error('请求错误!');
                    }
                }).catch(() => {
                    this.loadData();
                    this.$message.error('请求错误!');
                });
            },
            handleResetSearch(){
                this.searchFormData.queryName = '';
            },
            closeOpenDialog(){
                this.openDialogChoose = false
            },
            closeOpenMenu(){
                this.openDialogMenu = false
            }
        }
    }
</script>
<style></style>


