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
            <el-input clearable placeholder="用户名"
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
        @click="addUser(false,true)"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" >
          <template slot-scope="scope">
            <span class="span-text" @click="userShow(scope.$index, scope.row,true)">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" ></el-table-column>
        <el-table-column prop="email" label="邮箱" ></el-table-column>
        <el-table-column prop="nickName" label="姓名"></el-table-column>
        <el-table-column label="有效状态" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       @change="handleChange(scope.$index, scope.row)"
                       :active-value='"1"'
                       :inactive-value='"0"'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="超级账号" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isSuper"
                       @change="handleChange(scope.$index, scope.row)"
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
                @click="userUpdate(scope.$index, scope.row,false)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="chooseUserRole(scope.row)">角色
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="userDelete(scope.$index, scope.row)">删除
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
    <chooseRole
      :openDialogChoose="openDialogChoose"
      :userId="this.params.userId"
      :reload="this.params.reload"
      @closeOpenDialog="closeOpenDialog"
    ></chooseRole>
  </div>
</template>
<script>
    import chooseRole from './conponents/choose-role'
    import { queryUserByPage,deleteUser,updateUserBySuper } from '@/api/user'
    export default {
        name: "userList",
        components: {chooseRole},
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
                params:{
                    userId:'',
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
                    username: this.searchFormData.queryName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                };
                queryUserByPage(param).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleChange(index, row){
                updateUserBySuper(row).then(res => {
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
            addUser(readonly,isAdd){
                this.$router.push({name:'userEdit',params:{readonly: readonly,isAdd:isAdd}});
            },
            userShow(index,row,readonly){
                this.$router.push({name:'userEdit',params:{id:row.id,readonly: readonly,isAdd: false}});
            },
            userUpdate(index,row,readonly){
                this.$router.push({name:'userEdit',params:{id:row.id,readonly: readonly,isAdd: false}});
            },
            chooseUserRole(row){
                this.params.userId = row.id;
                this.params.reload = new Date().toLocaleString();
                this.openDialogChoose = true
            },
            userDelete(index,row){
                deleteUser({id:row.id}).then(res => {
                    if (res.code === 0) {
                        this.loadData();
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleResetSearch(){
                this.searchFormData.queryName = '';
            },
            closeOpenDialog(){
                this.openDialogChoose = false
            }
        }
    }
</script>
<style></style>


