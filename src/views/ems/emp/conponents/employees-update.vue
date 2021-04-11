<template>
  <div>
  <el-dialog
    :title="'员工信息'"
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
            <el-form-item label="员工姓名：" prop="staffName">
              <el-input
                v-model="dataForm.staffName">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="手机号码：" prop="phone">
              <el-input
                v-model="dataForm.phone">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="9">
            <el-form-item label="身份证：">
              <el-input
                v-model="dataForm.idCard">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="住址：">
              <el-input
                v-model="dataForm.address">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="9">
            <el-form-item label="年龄：">
              <el-input
                v-model="dataForm.age">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="性别：">
              <el-input
                v-model="dataForm.sex">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="岗位薪资：" prop="postSalary">
              <el-input
                v-model="dataForm.postSalary">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="岗位成本：" prop="postCost">
              <el-input
                v-model="dataForm.postCost">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="岗位总提成：" prop="postAllDeduction">
              <el-input
                v-model="dataForm.postAllDeduction">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="岗位个人提成：" prop="postDeduction">
              <el-input
                v-model="dataForm.postDeduction">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
              <el-form-item label="入职时间:" prop="entryTime">
                <el-date-picker type="date" v-model="dataForm.entryTime" :value-format="valueFormat"></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="员工状态：">
              <el-radio-group v-model="status">
                <el-radio :label='"1"'>在职</el-radio>
                <el-radio :label='"0"'>离职</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" v-if="status == '0'">
          <el-col :span="9">
            <el-form-item label="离职时间:">
              <el-date-picker type="date" v-model="dataForm.leavingTime" :value-format="valueFormat"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="离职原因：">
              <el-input
                v-model="dataForm.leavingReason">
              </el-input>
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
  import { saveOrUpdateEmployees,getEmployees } from '@/api/employees'
  export default {
    name: 'employeesUpdate',
    data() {
      return {
        formName: 'dataForm',
          status:'',
        dataForm: {
          id:'',
            staffName:'',
            idCard:'',
            phone:'',
            age:'',
            sex:'',
            address:'',
            entryTime:'',
            postDeduction:'',
            postAllDeduction:'',
            postCost:'',
            status:'',
            leavingTime:'',
            leavingReason:'',
            postSalary:'',
          remark:'',
        },
        rules: {
            staffName: [{required: true, message: '员工姓名不能为空'}],
            phone: [{required: true, message: '手机号码不能为空'}],
            postSalary: [{required: true, message: '岗位薪资不能为空'}],
            postCost: [{required: true, message: '岗位成本不能为空'}],
            postAllDeduction: [{required: true, message: '岗位总提不能为空'}],
            postDeduction: [{required: true, message: '个人提成不能为空'}],
            entryTime: [{required: true, message: '入职时间不能为空'}],
            status: [{required: true, message: '员工状态不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
          if(this.id && this.id != null && this.id != ''){
              getEmployees({id:this.id}).then(res => {
                  if (res.code === 0) {
                      this.dataForm = res.data
                      this.status = this.dataForm.status;
                  }else {
                      this.$message.error(res.msg);
                  }
              })
          }else{
              this.status = '1';
          }
      },
      closeDialogInfo() {
        this.$emit('closeDialogInfo',null);
      },
      resetForm() {
        this.$nextTick(()=>{
          this.$refs[this.formName].resetFields();
        })
      },
      reloadData(){
        this.$forceUpdate()
      },
      confirmInfo(){
        this.$refs[this.formName].validate(async valid => {
          if (valid) {
              this.dataForm.status = this.status;
              saveOrUpdateEmployees(this.dataForm).then(res => {
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
        type: Number,
        default: null,
      },
      readonly:{
        type: Boolean,
        default: false
      },
        valueFormat: {
            type: String,
            default: "yyyy-MM-dd"
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
