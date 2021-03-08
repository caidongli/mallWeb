<template>
  <el-dialog
    :title="'操作'"
    :visible.sync="openDialogOpt"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialog('close')"
    width="750px"
  >
    <el-row >
      <el-button type="primary" @click="closeDialog('add')">新增</el-button>
      <el-button type="primary" @click="closeDialog('update')">修改</el-button>
      <el-button type="primary" @click="closeDialog('view')">查看</el-button>
      <el-button type="danger" @click="closeDialog('del')">删除</el-button>
    </el-row>
  </el-dialog>
</template>
<script>

  export default {
    name: 'menu-opt',
    data() {
      return {
      }
    },
    methods: {
      closeDialog(opt) {
        this.$emit('closeOptDialog', opt,this.id);
      },
    },
    watch: {
    },
    //与 上级组件通信
    props: {
      openDialogOpt: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        default: "",
      },
    }
  }
</script>

