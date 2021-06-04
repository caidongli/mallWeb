<template>
  <div>
    <el-dialog
      :title="'薪资信息'"
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
            <el-col :span="9">
              <el-form-item label="员工姓名：" >
                <el-input
                  v-model="dataForm.staffName" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="员工编号：">
                <el-input
                  v-model="dataForm.staffNo" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="9">
              <el-form-item label="岗位工资：">
                <el-input
                  v-model="dataForm.postSalary" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="岗位成本：">
                <el-input
                  v-model="dataForm.postCost" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="9">
              <el-form-item label="薪资日期：">
                <el-input
                  v-model="dataForm.salaryDate" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="个人订单总额：">
                <el-input
                  v-model="dataForm.orderCount" :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="9">
              <el-form-item label="本月薪资："  prop="salary">
                <el-input
                  v-model="dataForm.salary">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="奖金："  prop="bonus">
                <el-input
                  v-model="dataForm.bonus">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="9">
              <el-form-item label="个人提成："  prop="postDeduction">
                <el-input
                  v-model="dataForm.postDeduction">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-form-item label="总提成："  prop="postAllDeduction">
                <el-input
                  v-model="dataForm.postAllDeduction">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="20">
              <el-form-item label="提成构成：" prop="deductionInfo">
                <el-input type="textarea" v-model="dataForm.deductionInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="20">
              <el-form-item label="业绩构成：" prop="countInfo">
                <el-input type="textarea" v-model="dataForm.countInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" >
            <el-col :span="20">
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="dataForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
  </div>
</template>

<script>
    import { getSalary,saveOrUpdateSalary } from '@/api/salary'
    export default {
        name: 'salaryUpdate',
        data() {
            return {
                formName: 'dataForm',
                dataForm: {
                    id:'',
                    staffName:'',
                    staffNo:'',
                    salary:'',
                    salaryDate:'',
                    postSalary:'',
                    postCost:'',
                    postAllDeduction:'',
                    postDeduction:'',
                    deductionInfo:'',
                    countInfo:'',
                    bonus:'',
                    orderCount:'',
                    remark:'',
                },
                rules: {
                    salary: [{required: true, message: '薪资不能为空'}],
                    postAllDeduction: [{required: true, message: '岗位总提不能为空'}],
                    postDeduction: [{required: true, message: '个人提成不能为空'}],
                    deductionInfo: [{required: true, message: '提成构成不能为空'}],
                    countInfo: [{required: true, message: '业绩构成不能为空'}],
                    bonus: [{required: true, message: '奖金不能为空'}],
                }
            };
        },
        methods: {
            loadData() {
                getSalary({id:this.id}).then(res => {
                    if (res.code === 0) {
                        this.dataForm = res.data
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
            confirmInfo(){
                this.$refs[this.formName].validate(async valid => {
                    if (valid) {
                        this.dataForm.status = this.status;
                        saveOrUpdateSalary(this.dataForm).then(res => {
                            if (res.code === 0) {
                                this.$message.success(res.msg);
                                this.$emit('closeDialogInfo','reload');
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    } else {
                        this.$notify.error('请输入正确内容!!');
                    }
                })
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.dataForm = {}
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
                type: String,
                default: "",
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
