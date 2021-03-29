<template>
  <el-dialog
    :title="'客户信息'"
    :visible.sync="openDialogInfo"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialogInfo()"
    width="750px"
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
            <el-form-item label="客户姓名：" prop="customer">
              <el-input
                v-model="dataForm.customer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="手机：" >
            <el-input
              v-model.trim="dataForm.tel"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="微信号：" >
            <el-input
              v-model.trim="dataForm.weChat"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
            <el-form-item label="开发商：" prop="developers">
              <el-select v-model="dataForm.developers" placeholder="开发商">
                <el-option
                  v-for="item in options"
                  :key="item.companyName"
                  :label="item.companyName"
                  :value="item.companyName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-form-item label="门牌号："  required>
                <el-input v-model="dataForm.building"  placeholder="楼号" >
                  <template slot="append" >栋</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
              <el-input v-model="dataForm.houseNumber" placeholder="门牌号" ></el-input>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="录入时间:" prop="entryTime" required>
            <el-date-picker type="date" v-model="dataForm.entryTime" :value-format="valueFormat"></el-date-picker>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="性别：">
            <el-input
              v-model.trim="dataForm.sex"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="年龄：">
            <el-input
              v-model.trim="dataForm.age"></el-input>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="20">
          <el-form-item label="备注：">
            <el-input type="textarea"
                      v-model.trim="dataForm.remark"></el-input>
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
</template>

<script>
  import { saveOrUpdateCustomer, getCustomer } from '@/api/customer'
  import { queryAddressList } from '@/api/orderAddress'
  export default {
    name: 'customerUpdate',
    data() {
      var validatePhoneNumber = async (rule, value, callback) => {
        if (!isMobile(value) && !isPhone(value)) {
          callback(new Error('请输入正确的手机号或者电话号'));
          return
        }
      };
      return {
        formName: 'dataForm',
        dataForm: {
          id:'',
          developers: '',
          building:'',
          houseNumber:'',
          weChat:'',
          tel:'',
          customer:'',
          remark:'',
          sex:'',
          age:'',
          entryTime:'',
        },
        options: [],
        rules: {
          customer: [{required: true, message: '客户姓名不能为空'}],
          developers: [{required: true, message: '开发商不能为空'}],
          entryTime: [{required: true, message: '录入时间不能为空'}],
        }
      };
    },
    methods: {
      loadData() {
        if(this.id && this.id != null && this.id != ''){
          getCustomer({id:this.id}).then(res => {
            if (res.code === 0) {
              this.dataForm = res.data
              if(res.data.houseNumber != null){
                let str = res.data.houseNumber.split("-")
                this.dataForm.building = str[0];
                this.dataForm.houseNumber = str[1];
              }
            }else {
              this.$message.error(res.msg);
            }
          })
        }
      },
      loadOptionsData() {
        queryAddressList().then(res => {
            if (res.code === 0) {
              this.options = res.data
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
            if((this.dataForm.weChat == null && this.dataForm.tel == null) || (this.dataForm.weChat.length == 0 && this.dataForm.tel.length == 0)){
              this.$notify.error('请填写手机号或者微信号!');
              return ;
            }
            if(this.dataForm.houseNumber == '' || this.dataForm.building == ''){
              this.$notify.error('门牌号不能为空!!');
              return ;
            }
            this.dataForm.houseNumber =  this.dataForm.building+"-"+this.dataForm.houseNumber
            saveOrUpdateCustomer(this.dataForm).then(res => {
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
          this.dataForm = {};
          this.resetForm();
          this.loadData();
          this.loadOptionsData();
        }
      },
    },
    //与 上级组件通信
    props: {
      valueFormat: {
        type: String,
        default: "yyyy-MM-dd"
      },
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
