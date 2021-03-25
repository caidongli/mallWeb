<template>
  <el-dialog
    :title="'打印机列表'"
    :visible.sync="openDialogPrint"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogPrint('close')"
    width="1000px"
  >
  <div>
    <div class="table-container">
      <el-table :data="tableData" border stripe >
        <el-table-column prop="name" label="打印机" >
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="print(scope.row)">打印
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
  import { getPrintService} from '@/api/order'

    export default {
        name: 'choose-print-list',
        data() {
            return {
                tableData: [], //表格数据
            }
        },
        methods: {
            loadData() {
              getPrintService().then(res => {
                if (res.code === 0) {
                  this.tableData = res.data;
                }
              })
            },
            print(row){
              this.$emit('goPrint',row.name);
            },
          closeDialogPrint(opt) {
                this.$emit('closeDialogPrint',opt);
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.loadData();
                }
            },
        },
        //与 上级组件通信
        props: {
            reload: {
                type: String,
                default: "",
            },
          openDialogPrint: {
                type: Boolean,
                default: false
            },
        }

    }
</script>

