<template>
    <el-dialog
            :title="'角色列表'"
            :visible.sync="openDialogChoose"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog(false)"
            width="750px"
    >
      <el-row >
        <el-form :inline="true" class="demo-form-inline" align="right">
          <el-form-item  class="input-bottom">
            <el-input
              style="width:180px"
              v-model.trim="searchFormData.queryName"
              placeholder="请输入"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item class="input-bottom">
            <el-button type="primary" size="mini" @click="loadData(true)">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
        <el-row>
            <el-table :data="tableData"
                      ref="multipleTable"
                      @selection-change="handleSelectionChange"
                      :row-class-name="rowIndex" stripe>
                <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
                <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
              <el-table-column  type="selection" class="checkbox-inp" width="55"></el-table-column>
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
    import { queryUserRole,updateRoleRelation } from '@/api/user'

    export default {
        name: 'choose-role',
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData: [], //表格数据
                dataChange:'',
                selection:true,
                searchFormData: {
                    queryName: '',
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
            handleSelectionChange(val){
                if(this.selection){
                    return;
                }
                for (let i=0;i<val.length;i++) {
                    if (val[i].isRole == '0') {
                        this.updateRoleRelation(val[i].id)
                        for (let j=0;j<this.tableData.length;i++) {
                            if(val[i].id == this.tableData[j].id){
                                console.log("2")
                                this.tableData[j].isRole = '1'
                                return;
                            }
                        }
                    }
                }
                brok :for (let i=0;i<this.tableData.length;i++) {
                    if(this.tableData[i].isRole == '1'){
                        for (let j=0;j<val.length;j++) {
                            if(this.tableData[i].id == val[j].id){
                                continue brok;
                            }
                        }
                        this.updateRoleRelation(this.tableData[i].id)
                        this.tableData[i].isRole = '0'
                    }
                }
                // this.loadData(false)
            },
            closeDialog() {
                this.$emit('closeOpenDialog', null);
            },
            loadData(reload) {
                let param = {
                    id:this.userId,
                    roleName:this.searchFormData.queryName,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                };
                queryUserRole(param).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }else {
                        this.$message.error(res.msg);
                    }
                    if(reload){
                        this.dataChange = new Date().toLocaleString();
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            updateRoleRelation(id){
                let param = {
                    id:this.userId,
                    roleId: id,
                };
                updateRoleRelation(param).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                        return true;
                    }else {
                        this.$message.error(res.msg);
                        return false;
                    }
                })
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.selection = true;
                    this.loadData(true);
                }
            },
            dataChange: {
                handler(newValue, oldValue) {
                    this.$nextTick(() => {
                        this.tableData.forEach(row=>{
                            if(row.isRole == 1){
                                this.$refs.multipleTable.toggleRowSelection(row,true);
                            }else{
                                this.$refs.multipleTable.toggleRowSelection(row,false);
                            }
                        })
                        this.selection = false;
                    })
                },
            }
        },
        //与 上级组件通信
        props: {
            openDialogChoose: {
                type: Boolean,
                default: false
            },
            userId: {
                type: String,
                default: "",
            },
            reload: {
                type: String,
                default: "",
            },
        }
    }
</script>

