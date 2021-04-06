<template>
  <el-dialog
    :title="'类目信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo()"
    width="1000px"
  >
    <div>
      <el-form
        :disabled="readonly"
        :model="dataForm"
        :ref="formName"
        :rules="rules"
        label-width="160px"
      >
        <el-row type="flex">
          <el-col :span="20">
            <el-form-item label="类目名称：" prop="dataName">
              <el-input
                v-model="dataForm.dataName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button
          class="btn-add"
          @click="add()"
          v-if="!readonly"
          size="mini">
          添加
        </el-button>
        <!--<el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
        <el-button
          style="float: right"
          @click="loadTable()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-input clearable placeholder="商品名称" style="float: right;width: 200px"
                  v-model.trim="searchFormData.dataName" size="mini"></el-input>-->
      </el-card>
      <div class="table-container">
        <el-table :data="tableData" border stripe>
          <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
          <el-table-column prop="dataName" label="类目名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.dataName" :disabled="readonly"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <p>
                <el-button
                  size="mini"
                  v-if="!readonly && hasAdd"
                  @click="save(scope.row)">保存
                </el-button>
                <el-button
                  v-if="!readonly"
                  size="mini"
                  type="danger"
                  @click="del(scope.$index,scope.row)">删除
                </el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--底部操作按钮-->
      <el-row justify="right">
        <el-col :offset="18" :span="6">
          <el-button @click="confirmInfo()" v-show="!readonly">
            保存
          </el-button>
          <el-button @click="closeDialogInfo()" >
            返回
          </el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import { getCostType,queryCostTypeList,saveOrUBatchCostType,delCostType,saveOrUpdateCostType } from '@/api/cost'
  export default {
    name: 'costTypeUpdate',
    data() {
      return {
        formName: 'dataForm',
        dataForm: {
          id:'',
          parentId:'',
          dataName:'',
        },
        searchFormData:{
          dataName:'',
        },
        hasAdd:false,
        rowData: {
          id:'',
          parentId:'',
          dataName:'',
        },
        tableData:[],
        rules: {
          dataName: [{required: true, message: '类目名称不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
        this.hasAdd = false;
        if(this.id && this.id != null && this.id != ''){
          getCostType({id:this.id}).then(res => {
            if (res.code === 0) {
              this.dataForm = res.data
              this.hasAdd = true;
              this.loadTable(res.data.id);
            }else {
              this.$message.error(res.msg);
            }
          })
        }
      },
      loadTable(id){
        queryCostTypeList({parentId:id,dataName:this.searchFormData.dataName}).then(res => {
          if (res.code === 0) {
            this.tableData = res.data
          }else {
            this.$message.error(res.msg);
          }
        })
      },
      closeDialogInfo() {
        this.$emit('closeDialogInfo',null);
      },
      resetForm() {
        this.$nextTick(()=>{
          this.$refs[this.formName].resetFields();
        })
      },
      add(){
        let obj = JSON.parse(JSON.stringify(this.rowData));
        obj.parentId = this.dataForm.id;
        this.tableData.push(obj)
      },
      save(row){
        saveOrUpdateCostType(row).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg);
            if(!row.id || row.id == null){
              this.$set(row,'id',res.data.id)
            }
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      confirmInfo(){
        this.$refs[this.formName].validate(async valid => {
          if (valid) {
            if(!this.dataForm.parentId || this.dataForm.parentId == null){
              this.dataForm.parentId = '0';
            }
            saveOrUpdateCostType(this.dataForm).then(res => {
              if (res.code === 0) {
                if(!this.dataForm.id ||  this.dataForm.id == null){
                  this.tableData.forEach(data=>{
                    data.parentId = res.data.id;
                  })
                }
                saveOrUBatchCostType(this.tableData).then(res => {
                  console.log(this.tableData)
                  if (res.code === 0) {
                    this.$message.success(res.msg);
                    this.$emit('closeDialogInfo','reload');
                  }else {
                    this.$message.error(res.msg);
                  }
                })
              } else {
                this.$message.error(res.msg);
              }
            })
          } else {
            this.$notify.error('请输入正确内容!!');
          }
        })
      },
      del(index,row){
        this.$confirm('确认删除？', '警告', {type: "warning"})
          .then(async () => {
            if(row.id != null && row.id != ''){
              delCostType({id:row.id,parentId:row.parentId}).then(res => {
                if (res.code === 0) {
                  this.tableData.splice(index, 1);
                }
              })
            }else {
              this.tableData.splice(index,1)
            }

          })
          .catch(() => {
          })
      },
      handleResetSearch(){
        this.searchFormData.dataName = '';
      },
    },
    watch: {
      reload: function (newVal, oldVal) {
        if (newVal) {
          this.dataForm = {}
          this.tableData = []
          this.resetForm();
          this.loadData();
        }
      },
    },
    //与 上级组件通信
    props: {
      openDialogInfo: {
        type: Boolean,
        default: false
      },
      reload: {
        type: String,
        default: "",
      },
      id: {
        type: Number,
        default: null,
      },
      readonly:{
        type: Boolean,
        default: false
      },
    }
  }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
