<template>
  <div>
    <el-form
      :disabled="routeParams.readonly"
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="130px"
    >
      <el-card class="filter-container" shadow="never">
        <div>
          <span>基本信息</span>
        </div>
        <el-row type="flex" class="row-bg">
          <el-col :span="15" :offset="2">
            <el-form-item label="开发商名称：" prop="companyName">
              <el-input
                v-model.trim="dataForm.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
          <el-col :span="5" :offset="2">
            <el-form-item label="地址：" prop="provinceInfo">
              <el-select v-model="dataForm.provinceInfo" clearable
                         placeholder="省份"
                         @change="handleProvinceChange">
                <el-option
                  v-for="item in provinceOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code+':'+item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="dataForm.cityInfo" clearable placeholder="市" @change="handleCityChange" >
              <el-option
                v-for="item in cityOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code+':'+item.name">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="dataForm.areaInfo" clearable placeholder="区" @change="handleAreaChange" >
              <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code+':'+item.name">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-select v-model="dataForm.town" clearable placeholder="街道"
                       @change="$forceUpdate()" >
              <el-option
                v-for="item in townOptions"
                :key="item.code"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" >
          <el-col :span="15" :offset="2">
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="dataForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>

    <!--底部操作按钮-->
    <el-row justify="right">
      <el-col :offset="18" :span="6">
        <el-button @click="saveOrUpdate" v-show="!routeParams.readonly">
          保存
        </el-button>
        <el-button @click="goBack()" >
          返回
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import { getOrderAddress,saveOrUpdateAddress } from '@/api/orderAddress'
    import { getAddress } from '@/api/order'
    import {isPhone, isMobile} from '@/utils/validate'
    import {current_page_params} from '@/utils/constant'
    export default {
        name: 'orderAddressEdit',
        data() {
            return {
                formName: 'dataForm',
                routeParams:{
                    readonly:true,
                    id:'',
                },
                tableData:[],
                provinceOptions:[],
                cityOptions:[],
                areaOptions:[],
                townOptions:[],
                dataForm: {
                    id:'',
                    companyName:'',
                    address:'',
                  provinceInfo:'',
                    province:'',
                    provinceCode:'',
                  cityInfo:'',
                    city:'',
                    cityCode:'',
                  areaInfo:'',
                    area:'',
                    areaCode:'',
                    town:'',
                },
                rules: {
                    companyName: [{required: true, message: '客户名不能为空'}],
                    address: [{required: true, message: '地址不能为空'}],
                  provinceInfo: [{required: true, message: '省不能为空'}],
                }
            };
        },
        created() {
            this.mounted();
        },
        beforeCreate() {
            this.commonJs.parseCurrentPageParams(this)
        },
        methods: {
            loadData() {
                if(this.routeParams.id && this.routeParams.id != null && this.routeParams.id != ''){
                    getOrderAddress({id:this.routeParams.id}).then(res => {
                        if (res.code === 0) {
                            this.dataForm = res.data;
                            this.dataForm.provinceInfo = res.data.provinceCode+':'+res.data.province
                          this.dataForm.cityInfo = res.data.cityCode+':'+res.data.city
                          this.dataForm.areaInfo = res.data.areaCode+':'+res.data.area
                          this.loadAddress(res.data);
                        }else {
                            this.$message.error(res.msg);
                        }
                    })
                }else{
                  this.loadAddress(this.dataForm);
                }
            },
            loadAddress(data){
                getAddress({type:'province'}).then(res => {
                    if (res.code === 0) {
                        this.provinceOptions = res.data;
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                });
                if(data.provinceCode != null && data.provinceCode != ''){
                  getAddress({type:'city',code:data.provinceCode}).then(res => {
                    if (res.code === 0) {
                      this.cityOptions = res.data;
                    }
                  });
                }
              if(data.cityCode != null && data.cityCode != ''){
                getAddress({type:'area',code:data.cityCode}).then(res => {
                  if (res.code === 0) {
                    this.areaOptions = res.data;
                  }
                });
              }
              if(data.areaCode != null && data.areaCode != ''){
                getAddress({type:'town',code:data.areaCode}).then(res => {
                  if (res.code === 0) {
                    this.townOptions = res.data;
                  }
                });
              }
            },
            saveOrUpdate(){
                this.$refs[this.formName].validate(async valid => {
                    if (valid) {
                        if(this.dataForm.cityInfo == '' || this.dataForm.areaInfo == ''){
                            this.$notify.error('请选择市或区!!');
                            return ;
                        }
                        if(this.townOptions && this.townOptions.length > 0 && this.dataForm.town == ''){
                            this.$notify.error('请选择街道!!');
                          return ;
                        }
                      this.dataForm.provinceCode = this.dataForm.provinceInfo.split(":")[0]
                      this.dataForm.province = this.dataForm.provinceInfo.split(":")[1]
                      this.dataForm.areaCode = this.dataForm.areaInfo.split(":")[0]
                      this.dataForm.area = this.dataForm.areaInfo.split(":")[1]
                      this.dataForm.cityCode = this.dataForm.cityInfo.split(":")[0]
                      this.dataForm.city = this.dataForm.cityInfo.split(":")[1]
                        saveOrUpdateAddress(this.dataForm).then(res => {
                            if (res.code === 0) {
                                this.loadData();
                                this.$message.success(res.msg);
                            } else {
                                this.$message.error(res.msg);
                            }
                        }).catch(() => {
                            this.$message.error('请求错误!');
                            this.loading = false
                        })
                    } else {
                        this.$notify.error('请输入正确内容!!');
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            },
            handleProvinceChange(value){
                if(value == null || value == ''){
                    return;
                }
                getAddress({type:'city',code:value.split(":")[0]}).then(res => {
                    if (res.code === 0) {
                        this.cityOptions = res.data;
                        this.areaOptions = [];
                        this.townOptions = [];
                    }else {
                        this.cityOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.cityInfo = '';
                    this.dataForm.areaInfo = '';
                    this.dataForm.town = '';
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleCityChange(value){
                if(value == null || value == ''){
                    return;
                }
                getAddress({type:'area',code:value.split(":")[0]}).then(res => {
                    if (res.code === 0) {
                        this.areaOptions = res.data;
                        this.townOptions = [];
                    }else {
                        this.areaOptions = [];
                        this.townOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.areaInfo = '';
                    this.dataForm.town = '';
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleAreaChange(value){
                if(value == null || value == ''){
                    return;
                }
                getAddress({type:'town',code:value.split(":")[0]}).then(res => {
                    if (res.code === 0) {
                        this.townOptions = res.data;
                    }else {
                        this.townOptions = [];
                        this.$message.error(res.msg);
                    }
                    this.dataForm.town = '';
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            async mounted() {
                this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
                this.loadData();
            },
        },
        watch: {
        },
    }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
