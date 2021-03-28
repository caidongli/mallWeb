<template>
  <div>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="add(false)"
        v-if="!readonly"
        size="mini">
        添加
      </el-button>
      <el-button
        style="float: right;margin-right: 15px"
        @click="handleResetSearch()"
        size="small">
        重置
      </el-button>
      <el-button
        style="float: right"
        @click="loadData()"
        type="primary"
        size="small">
        查询结果
      </el-button>
      <el-input clearable placeholder="商品名称" style="float: right;width: 200px"
                v-model.trim="searchFormData.goodsName" size="mini"></el-input>
    </el-card>
    <div class="table-container">
      <el-table :data="tableData" border stripe >
        <el-table-column prop="goodsType" label="商品类别" >
          <template slot-scope="scope">
            <el-select v-model="scope.row.goodsType" placeholder="商品类别" :disabled="readonly">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="goodsCode" label="商品编码" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsCode" :disabled="readonly"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsName" :disabled="readonly"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="规格" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.specificationType" :disabled="readonly"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="colorName" label="颜色" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.colorName" :disabled="readonly"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" :disabled="readonly" @input="clateReceivableAmount(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单位" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" :disabled="readonly" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.number" :disabled="readonly" @input="clateReceivableAmount(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="金额" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.totalAmount" :disabled="readonly"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="480" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                v-if="!readonly"
                size="mini"
                @click="save(scope.row)">保存
              </el-button>
              <el-button
                v-if="!readonly"
                size="mini"
                @click="orderUpdate(scope.$index, scope.row,false)">修改
              </el-button>
              <el-button
                size="mini"
                @click="orderShow(scope.$index, scope.row,true)">查看
              </el-button>
              <el-button
                v-if="!readonly"
                size="mini"
                type="danger"
                @click="goodsDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" style="margin-top: 15px" v-if="!readonly">
        <el-col :span="8" :offset="9">
          <el-button type="primary" size="medium" @click="prevStep()" >上一步</el-button>
          <el-button type="primary" size="medium" @click="goBack()" >完成</el-button>
        </el-col>
      </el-row>
    </div>
    <goodsUpdate
      :reload="this.params.reload"
      :id="this.params.id"
      :orderId="this.orderId"
      :readonly="this.params.readonly"
      :openDialogInfo="this.params.openDialogInfo"
      @closeDialogInfo="closeDialogInfo"
    ></goodsUpdate>
  </div>
</template>
<script>
  import { queryOrderGoodsList,delGoods,saveOrUpdateGoods,saveOrUBatchGoods } from '@/api/order'
  import goodsUpdate from './order-goods-update'

    export default {
        name: 'choose-goods-list',
      components: {goodsUpdate},
        data() {
            return {
                tableData: [], //表格数据
                searchFormData: {
                  goodsName: '',
                  orderId:'',
                },
              totalAmount:'',
                options: [{
                    value: 'cp',
                    label: '成品'
                }, {
                    value: 'dz',
                    label: '定制'
                }],
                dataForm: {
                    id:'',
                    orderId: '',
                    goodsCode: '',
                    goodsName: '',
                    colorCode: '',
                    colorName: '',
                    specificationType: '',
                    number: '',
                    price: '',
                    totalAmount: '',
                    goodsType: '',
                },
              params:{
                reload:'',
                id:'',
                readonly:true,
                openDialogInfo:false,
              },
            }
        },
        methods: {
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            clateReceivableAmount(row){
                if(row.price && row.number ){
                    row.totalAmount = (row.price * row.number).toFixed(2);
                }
            },
            loadData() {
                let data = [];
                this.tableData.forEach(item=> {
                    if(item.id == null || item.id == ''){
                        data.push(item)
                    }
                })
              this.searchFormData.orderId = this.orderId;
              queryOrderGoodsList(this.searchFormData).then(res => {
                if (res.code === 0) {
                  this.tableData = res.data;
                  if(data.length > 0){
                      data.forEach(item=>{
                          this.tableData.push(item)
                      })
                  }
                }
              })
            },
          formatterType:function(row, column) {
            if (row.goodsType === 'cp') {
              return "成品";
            }else if (row.goodsType === 'dz') {
              return "定制";
            }else {
              return "";
            }
          },
          add(readonly){
                let obj = {};
                this.$set(obj,'orderId',this.orderId);
                this.tableData.push(obj)
          },
            save(row){
                saveOrUpdateGoods(row).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                        if(!row.id || row.id == null){
                            this.$set(row,'id',res.data.id)
                        }
                        this.loadData();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
          orderUpdate(index,row,readonly){
            this.params.id = row.id;
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
              this.params.openDialogInfo = true;
            },
          orderShow(index,row,readonly){
            this.params.id = row.id;
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
            this.params.openDialogInfo = true;
          },
            prevStep(){
                this.$emit('prevStep');
            },
            goBack(){
                saveOrUBatchGoods(this.tableData).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                        this.$router.push({name:'orderDetail',params:{id:this.orderId,readonly: true,isAdd: false}});
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
      goodsDelete(index,row){
        this.$confirm('确认删除？', '警告', {type: "warning"})
          .then(async () => {
              if(row.id != null){
                  delGoods({id:row.id}).then(res => {
                      if (res.code === 0) {
                          this.loadData();
                      }
                  })
              }else {
                  this.tableData.splice(index,1)
              }

          })
          .catch(() => {
          })
          },
          closeDialogInfo(obj){
            this.params.openDialogInfo = false;
            if(obj != null && obj == 'reload'){
                this.loadData();
            }
          },
          handleResetSearch(){
            this.searchFormData.goodsName = '';
          },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.tableData = [];
                    this.loadData(true);
                }
            },
        },
        //与 上级组件通信
        props: {
            reload: {
                type: String,
                default: "",
            },
          orderId: {
            type: String,
            default: "",
          },
            readonly: {
                type: Boolean,
                default: false,
            },
        }

    }
</script>

