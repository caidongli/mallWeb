<template>
  <el-dialog
    :title="'收款明细'"
    :visible.sync="openDialogAmount"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialog('close')"
    width="1000px"
  >
  <div>
    <el-row>
      <el-col :offset="22">
      <el-button
        class="btn-add"
        @click="add(false)"
        v-if="!readonly"
        size="mini">
        添加
      </el-button>
        </el-col>
    </el-row>
    <div class="table-container">
      <el-table :data="tableData" border stripe >
        <el-table-column label="序号" type="index" header-align="center" align="center"></el-table-column>
        <el-table-column prop="amount" label="金额" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" :disabled="readonly || (scope.row.id != null && scope.row.id != '')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" :disabled="readonly || (scope.row.id != null && scope.row.id != '')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTime" label="付款时间" v-if="type == '0'">
          <template slot-scope="scope">
            <el-date-picker type="date" v-model="scope.row.paymentTime" :value-format="valueFormat" :disabled="readonly || (scope.row.id != null && scope.row.id != '')"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTime" label="变更时间" v-if="type == '1'">
          <template slot-scope="scope">
            <el-date-picker type="date" v-model="scope.row.paymentTime" :value-format="valueFormat" :disabled="readonly || (scope.row.id != null && scope.row.id != '')"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="记录时间" >
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                v-if="!readonly && (scope.row.id == null || scope.row.id == '')"
                size="mini"
                @click="save(scope.row)">保存
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </el-dialog>
</template>
<script>
  import { saveOrderAmount,queryOrderAmount} from '@/api/order'

    export default {
        name: 'choose-amount-list',
        data() {
            return {
                tableData: [], //表格数据
                dataForm: {
                    orderId: '',
                    amount: '',
                    type:'',
                    remark: '',
                },
            }
        },
        methods: {
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            loadData() {
              this.dataForm.orderId = this.orderId;
                this.dataForm.type = this.type;
                queryOrderAmount(this.dataForm).then(res => {
                if (res.code === 0) {
                  this.tableData = res.data;
                }
              })
            },
            add(readonly){
                let obj = {};
                this.$set(obj,'orderId',this.orderId);
                this.$set(obj,'type',this.type);
                this.tableData.push(obj)
            },
            save(row){
                saveOrderAmount(row).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                        this.closeDialog('reload');
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            closeDialog(opt) {
                this.$emit('closeDialogAmount',opt);
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.tableData = [];
                    this.loadData();
                }
            },
        },
        //与 上级组件通信
        props: {
            valueFormat: {
                type: String,
                default: "yyyy-MM-dd"
            },
            reload: {
                type: String,
                default: "",
            },
          orderId: {
            type: String,
            default: "",
          },
            type: {
                type: String,
                default: "",
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            openDialogAmount: {
                type: Boolean,
                default: false
            },
        }

    }
</script>

