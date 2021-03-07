<template>
  <div>
    <h1 style="text-align:center;">角色信息</h1>
    <el-form
      :disabled="routeParams.readonly"
      :model="dataForm"
      :ref="formName"
      :rules="rules"
      label-position="right"
      label-width="160px"
    >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="名称：" prop="name">
            <el-input
              v-model.trim="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="描述：" prop="description">
            <el-input
              v-model.trim="dataForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="排序：" prop="sort">
            <el-input
              v-model.trim="dataForm.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="15">
          <el-form-item label="状态：" prop="status" required>
            <el-radio-group v-model="dataForm.status">
              <el-radio :label='"1"'>启用</el-radio>
              <el-radio :label='"0"'>禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--底部操作按钮-->
      <el-row>
        <el-col :offset="18" :span="6">
          <el-button @click="updateUserBySuper" v-show="!routeParams.readonly">
            保存
          </el-button>
          <el-button @click="goBack" >
            返回
          </el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
    import { queryRole,updateRole,addRole } from '@/api/role'
    import {current_page_params} from '@/utils/constant'

    export default {
        name: 'roleEdit',
        data() {
            return {
                routeParams:{
                    readonly:true,
                    id:'',
                },
                formName: 'dataForm',
                dataForm: {
                    name: '', //名称
                    description: '', //描述
                    sort: '', //排序
                    status:''//账号状态
                },
                rules: {
                    status: [{required: true, message: '请选择状态'}],
                    name: [{required: true, message: '名称不能为空'}],
                }
            };
        },
        computed: {
        },
        created() {
            this.mounted();
        },
        beforeCreate() {
            this.commonJs.parseCurrentPageParams(this)
        },
        methods: {
            loadData() {
                if(this.routeParams.id != null && this.routeParams.id != ''){
                    let param = {
                        id: this.routeParams.id,
                    };
                    queryRole(param).then(res => {
                        if (res.code === 0) {
                            this.dataForm = res.data;
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            resetForm() {
                this.$refs[this.formName].resetFields();
            },
            updateUserBySuper(){
                if(this.routeParams.id != null && this.routeParams.id != '') {
                    updateRole(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.$router.push({name: 'roleList'});
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }else{
                    addRole(this.dataForm).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.$router.push({name: 'roleList'});
                        } else {
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            async mounted() {
                this.routeParams = JSON.parse(this.commonJs.getStore(current_page_params));
                this.loadData();
            },
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
