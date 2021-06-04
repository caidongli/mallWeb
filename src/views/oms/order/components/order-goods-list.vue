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
            <el-select v-model="scope.row.goodsType"
                       placeholder="商品类别"
                       :disabled="readonly"
                       @change="v => selectGoodType(v,scope.row)">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="goodsCode" label="商品编码" width="220px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsCode" :disabled="readonly">
              <el-button slot="append" icon="el-icon-search" @click="choose(scope.row)"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" width="130px">
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
        <el-table-column label="操作" width="300" align="center">
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
                @click="orderShow(scope.$index, scope.row)">图片
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
      <el-card class="operate-container" shadow="never">
        <span
          style="float: right;margin-right: 15px">
          商品合计金额：{{this.totalAmount}}
        </span>
        <span
          style="float: right;margin-right: 30px">
          订单合计金额：{{this.amount}}
        </span>
      </el-card>
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
    <chooseGoods
      :openDialogChoose="this.chooseGoodsParams.openDialogChoose"
      :reload="this.chooseGoodsParams.reload"
      :targetId="this.chooseGoodsParams.targetId"
      @closeOpenDialog="closeOpenDialog"
      @chooseGoods="chooseGoods"
    ></chooseGoods>
    <goodsAttachment
      :openDialogAttach="this.attachmentParams.openDialogAttach"
      :reload="this.attachmentParams.reload"
      :id="this.attachmentParams.id"
      :readonly="this.attachmentParams.readonly"
      @closeAttachDialog="closeAttachDialog"
    ></goodsAttachment>
  </div>
</template>
<script>
  import { queryOrderGoodsList,delGoods,saveOrUpdateGoods,saveOrUBatchGoods } from '@/api/order'
  import { queryGoodsList } from '@/api/goods'
  import goodsUpdate from './order-goods-update'
  import chooseGoods from './choose-goods'
  import goodsAttachment from './goods-attachment'

    export default {
        name: 'choose-goods-list',
      components: {goodsUpdate,chooseGoods,goodsAttachment},
        data() {
            return {
                tableData: [], //表格数据
                goodsCodeData:[], //商品编号数据
                searchFormData: {
                  goodsName: '',
                  orderId:'',
                },
              searchGoodsData:{
                goodCode: '',
              },
              totalAmount:0,
                options: [{
                    value: 'CP',
                    label: '成品'
                }, {
                    value: 'DZ',
                    label: '定制'
                },{
                    value: 'HQB',
                    label: '护墙板'
                },{
                    value: 'RZ',
                    label: '软装'
                },{
                    value: 'PT',
                    label: '配套'
                }],
                dataForm: {
                    id:'',
                    orderId: '',
                  targetId:0,
                    goodsCode: '',
                    goodsName: '',
                    colorCode: '',
                    colorName: '',
                    specificationType: '',
                    number: '',
                    price: '',
                    totalAmount: '',
                    goodsType: '',
                    goodsTypeValue:'',
                  unit:'',
                },
                chooseGoodsParams:{
                    reload:'',
                    openDialogChoose:false,
                  targetId:0,
                },
                attachmentParams:{
                    reload:'',
                    readonly:true,
                    openDialogAttach:false,
                    id:'',
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
                  this.totalAmount = 0;
                  this.tableData.forEach(item=>{
                    if(item.totalAmount != null && item.totalAmount != ''){
                      this.totalAmount = this.totalAmount+ item.totalAmount;
                    }
                  })
                }
              })
            },
          loadGoodsCodeData(){
            queryGoodsList(this.searchGoodsData).then(res => {
              if (res.code === 0) {
                this.goodsCodeData = res.data;
              }
            })
          },
          add(readonly){
            let obj = JSON.parse(JSON.stringify(this.dataForm));
            obj.orderId = this.orderId;
            obj.targetId = new Date().getTime();
            this.tableData.push(obj)
          },
            save(row){
                saveOrUpdateGoods(row).then(res => {
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
            selectGoodType(value,row){
                row.goodsTypeValue = this.options.find(val => val.label == value).value
            },
          orderUpdate(index,row,readonly){
            this.params.id = row.id;
            this.params.readonly = readonly;
            this.params.reload = new Date().toLocaleString();
              this.params.openDialogInfo = true;
            },
          orderShow(index,row){
            this.attachmentParams.id = row.id;
            this.attachmentParams.readonly = this.readonly;
            this.attachmentParams.reload = new Date().toLocaleString();
            this.attachmentParams.openDialogAttach = true;
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
              if(row.id != null && row.id != ''){
                  delGoods({id:row.id}).then(res => {
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
          closeDialogInfo(obj){
            this.params.openDialogInfo = false;
            if(obj != null && obj == 'reload'){
                this.loadData();
            }
          },
            choose(row){
                this.chooseGoodsParams.openDialogChoose = true;
                this.chooseGoodsParams.targetId = row.targetId;
                this.chooseGoodsParams.reload = new Date().toLocaleString();
            },
            closeOpenDialog(obj){
                this.chooseGoodsParams.openDialogChoose = false;
            },
            closeAttachDialog(obj){
                this.attachmentParams.openDialogAttach = false;
            },
            chooseGoods(obj){
                this.tableData.filter(item => {
                  if(item.targetId == obj.targetId){
                    item.goodsName= obj.goodsName
                    item.goodsCode= obj.goodsCode
                    item.colorName= obj.colorName
                    item.specificationType= obj.specificationType
                    item.price= obj.price
                    this.$forceUpdate()
                  }
                })
                this.closeOpenDialog();
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
                    this.loadGoodsCodeData();
                }
            },
          tableData:{
            handler: function (newVal) {
              this.totalAmount = 0;
                  this.tableData.forEach(item=>{
                    if(item.totalAmount != null && item.totalAmount != ''){
                      this.totalAmount = this.totalAmount+ parseFloat(item.totalAmount);
                    }
                  })
            },
            deep: true    //深度监听
          }
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
          amount: {
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

