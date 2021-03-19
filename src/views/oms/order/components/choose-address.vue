<template>
    <el-dialog
            :title="'开发商列表'"
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
              v-model.trim="searchFormData.companyName"
              placeholder="开发商名称"
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
                      :row-class-name="rowIndex" stripe>
                <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
              <el-table-column prop="companyName" label="开发商名称" ></el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button
                      size="mini"
                      @click="add(scope.$index, scope.row,false)">选择
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
    import { queryOrderAddressList } from '@/api/orderAddress'

    export default {
        name: 'choose-address',
        data() {
            return {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                activeNames: [],
                tableData: [], //表格数据
                searchFormData: {
                    companyName: '',
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
                queryOrderAddressList(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            add(index,row,readonly){
                this.$router.push({name:'orderUpdate',params:{addressId:row.id,readonly: readonly,isAdd: false}});
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.selection = true;
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

