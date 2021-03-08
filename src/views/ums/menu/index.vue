<template>
  <div>
    <el-row :span="6">
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        @node-contextmenu="handleContextmenu"
        @node-drop="handleDrop"
        draggable
        >
      </el-tree>
    </el-row>
    <el-row>
      <menuOpt
        :openDialogOpt="openDialogOpt"
        :id="id"
        @closeOptDialog="closeOptDialog"></menuOpt>
      <menuEdit
        :openDialogInfo="openDialogInfo"
        :id="id"
        @closeOptDialog="closeOptDialog"></menuEdit>
    </el-row>
  </div>
</template>

<script>
  import { queryMenuList,queryMenuInfo,addMenu,updateMenu,deleteMenu } from '@/api/menu'
  import menuOpt from './conponents/menu-opt'
  import menuEdit from './conponents/menu-update'
  export default {
    name: "roleList",
    components: {menuOpt,menuEdit},
    data() {
      return {
        id:0,
        openDialogOpt:false,
          openDialogInfo:false,
        data: [],
        defaultProps: {
          children: 'childList',
          label: 'name'
        }
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        queryMenuList().then(res => {
          if (res.code === 0) {
            this.data = res.data
          }
        }).catch(() => {
          this.$message.error('请求错误!');
          this.loading = false
        })
      },
      closeOptDialog(obj){
          console.log(obj)
          this.openDialogOpt = false;
      },
        closeDialogInfo(obj){
            this.openDialogInfo = false;
        },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('draggingNode drop: ', draggingNode.label);
        console.log('tree drop: ', dropNode.label, dropType);
      },
      handleContextmenu(ev,node){
        this.id = node.id
        this.openDialogOpt = true;
      },
    },
  };
</script>
