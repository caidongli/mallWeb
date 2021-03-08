<template>
  <el-dialog
    :title="'操作'"
    :visible.sync="openDialogOpt"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialog('close')"
    width="650px"
  >
    <el-row >
      <el-col :offset="3" >
      <el-button type="primary" @click="closeDialog('add')">新增菜单</el-button>
      <el-button type="primary" @click="closeDialog('update')">修改菜单</el-button>
      <el-button type="primary" @click="closeDialog('view')">查看菜单</el-button>
      <el-button type="danger" @click="closeDialog('del')">删除菜单</el-button>
      </el-col>
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
          let id = this.id;
        this.$emit('closeOptDialog', {opt,id});
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
        type: Number,
        default: "",
      },
    }
  }
</script>

