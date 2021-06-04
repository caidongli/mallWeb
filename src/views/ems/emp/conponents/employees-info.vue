<template>
    <el-dialog
            :title="'详情'"
            :visible.sync="openDialogChoose"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog()"
            width="750px"
    >
      <el-form
        :disabled="readonly"
        :model="dataForm"
        :ref="formName"
        label-width="160px"
      >
        <el-row type="flex" v-for="(items, index) in dataForm.data" :key="items.key">
          <el-col :span="20">
            <el-form-item :label="items.keyName" >
              <el-input
                v-model="items.value">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row justify="right">
        <el-col :offset="18" :span="6">
          <el-button @click="confirm()" v-show="!readonly">
            保存
          </el-button>
          <el-button @click="closeDialog()" >
            返回
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
</template>
<script>
    export default {
        name: 'employees-info',
        data() {
            return {
                formName: 'dataForm',
                dataForm: {
                    data: [], //表格数据
                }, //表格数据
            }
        },
        methods: {
            closeDialog() {
                this.$emit('closeOpenDialog', null);
            },
            confirm() {
                let data = JSON.parse(JSON.stringify(this.dataForm.data))
                this.$emit('confirm', {data:data,type:this.type});
                this.closeDialog();
            },
            loadData() {
                this.dataForm.data = JSON.parse(JSON.stringify(this.propData))
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
            openDialogChoose: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: true
            },
            propData: {
                type: Array,
            },
            reload:{
                type: String,
                default: ''
            },
            type:{
                type: String,
                default: ''
            },
        }

    }
</script>

