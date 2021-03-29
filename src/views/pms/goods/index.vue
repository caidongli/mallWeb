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
            <el-form-item label="商品名称：">
              <el-input clearable placeholder="商品名称"
                        v-model.trim="searchFormData.goodName"></el-input>
            </el-form-item>
            <el-form-item label="商品编码：">
              <el-input clearable placeholder="商品编码"
                        v-model.trim="searchFormData.goodCode"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <el-upload
        style="float: right;margin-left: 10px"
        action="#"
        :http-request="uploadExcel"
        accept=".xls,.xlsx"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :show-file-list="false"
      >
        <el-button class="btn-add"  size="mini">导入数据</el-button>
      </el-upload>
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
        <el-table-column prop="goodName" label="商品名称" ></el-table-column>
        <el-table-column prop="goodCode" label="商品编码" ></el-table-column>
        <el-table-column prop="colorName" label="颜色" ></el-table-column>
        <el-table-column prop="specificationType" label="规格"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
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
    <goodsUpdate
      :openDialogInfo="this.params.openDialogInfo"
      :id="this.params.id"
      :readonly = "this.params.readonly"
      :reload="this.params.reload"
      @closeDialogInfo="closeDialogInfo"
    ></goodsUpdate>
  </div>
</template>
<script>
    import goodsUpdate from './conponents/goods-update'
    import { importExcelData,queryGoodsPage,delGoods } from '@/api/goods'
    export default {
        name: "goodsList",
        components: {goodsUpdate},
        data() {
            return {
                total: 0,
                tableData: [], //表格数据
                fileList: [], // 上传的文件列表
              activeNames: [],
                searchFormData: {
                  pageNum: 1,
                  pageSize: 10,
                    goodName: '',
                    goodCode:'',
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
              queryGoodsPage(this.searchFormData).then(res => {
                    if (res.code === 0) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },

            // 限制上传的数量
            handleExceed() {
                this.$message({
                    type: 'error',
                    message: '当前限制选择 1 个文件'
                })
            },
            // 上传excel文件
            uploadExcel(item){
                let formData = new FormData()
                formData.append('file', item.file)
                importExcelData(formData).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            type: 'success',
                            message: "导入成功"
                        })
                    }else{

                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                    this.fileList = []; // 清空文件列表
                })
            },
            // 校验上传的文件
            beforeUpload(file){
                let fileSuffix = file.name.split(".");
                if(fileSuffix[1] === 'xls'||fileSuffix[1] === 'xlsx'){
                    return file
                }else {
                    this.$message({
                        type: 'error',
                        message: '上传文件只能是xls和xlsx格式'
                    })
                    return false
                }
            },
            // 上传成功后的回调函数
            uploadSuccess(){
                this.fileList = []; // 清空文件列表
            },
            // 上传失败后的回调函数
            uploadError(){
                this.fileList = []; // 清空文件列表
                this.$message({
                    type: 'error',
                    message: '上传失败'
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
              delGoods({id:row.id}).then(res => {
                    if (res.code === 0) {
                        this.loadData();
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleResetSearch(){
                this.searchFormData.goodName = '';
              this.searchFormData.goodCode = '';
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


