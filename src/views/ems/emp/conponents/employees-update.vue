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
            <el-form-item label="员工编号：" prop="staffNo">
              <el-input
                v-model="dataForm.staffNo">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="9">
            <el-form-item label="手机号码：" prop="phone">
              <el-input
                v-model="dataForm.phone">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="身份证：">
              <el-input
                v-model="dataForm.idCard">
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
              <el-radio-group v-model="dataForm.sex">
                <el-radio :label='"1"'>男</el-radio>
                <el-radio :label='"0"'>女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="入职时间:" prop="entryTime">
              <el-date-picker type="date"
                              @input="datetimeChange"
                              v-model="dataForm.entryTime"
                              :value-format="valueFormat"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="岗位：">
              <el-select v-model="dataForm.post" clearable >
                <el-option
                  v-for="item in postOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="薪资总额：" prop="postSalary">
              <el-input
                v-model="dataForm.postSalary">
                <el-button slot="append" icon="el-icon-search" @click="openInfo('salary')" ></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="成本总额：" prop="postCost">
              <el-input
                v-model="dataForm.postCost">
                <el-button slot="append" icon="el-icon-search" @click="openInfo('cost')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
            <el-form-item label="岗位总提成：" prop="postAllDeduction">
              <el-input
                v-model="dataForm.postAllDeduction">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="2">
            <el-form-item label="岗位个人提成：">
              <el-input
                v-model="postDeductions"  :disabled="true">
                <el-button slot="append" icon="el-icon-search" @click="openInfo('deduction')"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="9">
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
        <el-row type="flex" class="row-bg" >
          <el-col :span="20">
            <el-form-item label="住址：">
              <el-input type="textarea" v-model="dataForm.address" ></el-input>
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
    <employeesInfo
      :openDialogChoose="this.infoParams.openDialogChoose"
      :reload="this.infoParams.reload"
      :type="this.infoParams.type"
      :propData="this.infoParams.propData"
      :readonly="this.infoParams.readonly"
      @closeOpenDialog="closeOpenDialog"
      @confirm="confirm"
    ></employeesInfo>
  </div>
</template>

<script>
  import { saveOrUpdateEmployees,getEmployees } from '@/api/employees'
  import {isPhone, isMobile,isIdCard} from '@/utils/validate'
  import employeesInfo from './employees-info'
  export default {
    name: 'employeesUpdate',
      components: {employeesInfo},
    data() {
        var validatePhoneNumber = async (rule, value, callback) => {
            if (!isMobile(value) && !isPhone(value)) {
                callback(new Error('请输入正确的手机号或者电话号'));
                return
            }
        };
        var idCard = async (rule, value, callback) => {
            if (!isIdCard(value)) {
                callback(new Error('请输入正确的身份证号码'));
                return
            }
        };
      return {
        formName: 'dataForm',
          status:'1',
        postDeductions:'查看详情',
        dataForm: {
          id:'',
            staffName:'',
            staffNo:'',
            idCard:'',
            phone:'',
            age:'',
            sex:'',
            address:'',
            entryTime:'',
            post:'',
            deductions:[],
            postAllDeduction:'',
            postCost:'',
            costInfos:[],
            status:'',
            leavingTime:'',
            leavingReason:'',
            postSalary:'',
            salaryInfos:[],
          remark:'',
        },
          infoParams:{
              openDialogChoose:false,
              reload:'',
              type:'',
              propData:[],
              readonly:true,
          },
          postOptions: [
              {
                  value: 'SJS',
                  label: '设计师'
              },{
                  value: 'SJZG',
                  label: '定制主管'
              },{
                  value: 'FZR',
                  label: '项目负责人'
              },{
                  value: 'JL',
                  label: '项目监理'
              },{
                  value: 'XS',
                  label: '销售'
              }
          ],
        rules: {
            staffName: [{required: true, message: '员工姓名不能为空'}],
            staffNo: [{required: true, message: '员工编号不能为空'}],
            phone: [{required: true, message: '手机号码不能为空'},
                {
                    validator: validatePhoneNumber,
                    trigger: 'blur'
                }],
            idCard: [
                {
                    validator: idCard,
                    trigger: 'blur'
                }],
            postSalary: [{required: true, message: '岗位薪资不能为空'}],
            postCost: [{required: true, message: '岗位成本不能为空'}],
            postAllDeduction: [{required: true, message: '岗位总提不能为空'}],
            post: [{required: true, message: '岗位不能为空'}],
            entryTime: [{required: true, message: '入职时间不能为空'}],
            status: [{required: true, message: '员工状态不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
          getEmployees({id:this.id}).then(res => {
              if (res.code === 0) {
                  this.dataForm = res.data
                  this.status = this.dataForm.status;
              }else {
                  this.$message.error(res.msg);
              }
          })
      },
      closeDialogInfo() {
        this.$emit('closeDialogInfo',null);
      },
        openInfo(type){
            if(type == 'salary'){
                this.infoParams.propData=this.dataForm.salaryInfos;
            }else if(type == 'cost'){
                this.infoParams.propData=this.dataForm.costInfos;
            }else if (type == 'deduction'){
              this.infoParams.propData=this.dataForm.deductions;
            }
            this.infoParams.reload = new Date().toLocaleString();
            this.infoParams.type = type;
            this.infoParams.readonly = this.readonly;
            this.infoParams.openDialogChoose = true;
        },
        closeOpenDialog(){
            this.infoParams.openDialogChoose = false;
        },
        confirm(obj){
          if(obj.type =='salary'){
              let count = 0;
              this.dataForm.salaryInfos = obj.data;
              obj.data.forEach((item) => {
                  count = count + (item.value - 0)
              })
              this.dataForm.postSalary = count;
          }else if(obj.type == 'cost'){
              let count = 0;
              this.dataForm.costInfos = obj.data;
              obj.data.forEach((item) => {
                  count = count + (item.value - 0)
              })
              this.dataForm.postCost = count;
          }
          else if(obj.type == 'deduction'){
            this.dataForm.deductions = obj.data;
          }
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
        datetimeChange(time){
            //强制刷新
            this.$forceUpdate();
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
