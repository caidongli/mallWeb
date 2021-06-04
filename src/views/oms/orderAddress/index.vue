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
          <el-form-item label="开发商名称：">
            <el-input clearable placeholder="开发商名称"
                      v-model.trim="searchFormData.companyName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      </el-collapse-item>
    </el-collapse><el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>数据列表</span>
    <el-button
      class="btn-add"
      @click="add(false,true)"
      size="mini">
      添加
    </el-button>
  </el-card>

    <div class="table-container">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="companyName" label="开发商名称" ></el-table-column>
        <el-table-column prop="province" label="省份" ></el-table-column>
        <el-table-column prop="city" label="城市" ></el-table-column>
        <el-table-column prop="area" label="区域"></el-table-column>
        <el-table-column prop="address" label="详细地址"></el-table-column>
        <el-table-column label="操作" width="360" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="update(scope.$index, scope.row,false)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="show(scope.$index, scope.row,true)">查看
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteInfo(scope.$index, scope.row)">删除
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
  </div>
</template>
<script>
    import { queryOrderAddressList,delOrderAddress } from '@/api/orderAddress'
    export default {
        name: "orderAddress",
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
            add(readonly,isAdd){
                this.$router.push({name:'orderAddressEdit',params:{readonly: readonly,isAdd:isAdd}});
            },
            show(index,row,readonly){
                this.$router.push({name:'orderAddressEdit',params:{id:row.id,provinceCode:row.provinceCode,cityCode:row.cityCode,areaCode:row.areaCode,readonly: readonly,isAdd: false}});
            },
            update(index,row,readonly){
                this.$router.push({name:'orderAddressEdit',params:{id:row.id,provinceCode:row.provinceCode,cityCode:row.cityCode,areaCode:row.areaCode,readonly: readonly,isAdd: false}});
            },
            deleteInfo(index,row){
                this.$confirm('确认删除？', '警告', {type: "warning"})
                    .then(async () => {
                        delOrderAddress({id:row.id}).then(res => {
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
                this.searchFormData.companyName = '';
            },
        }
    }
</script>
<style></style>


