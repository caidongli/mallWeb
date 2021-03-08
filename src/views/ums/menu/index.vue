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
        :allow-drop="allowDrop"
        :allow-drag="allowDrag">
      </el-tree>
    </el-row>
    <el-row>
      <menuOpt
        :openDialogOpt="openDialogOpt"
        :id="id"
        @closeOptDialog="closeOptDialog"></menuOpt>
    </el-row>
  </div>
</template>

<script>
  import { queryMenuList } from '@/api/menu'
  import menuOpt from './conponents/menu-opt'
  export default {
    name: "roleList",
    components: {menuOpt},
    data() {
      return {
        id:'',
        openDialogOpt:false,
        data: [],
        tableData:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
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
            console.log(res.data)
          }
        }).catch(() => {
          this.$message.error('请求错误!');
          this.loading = false
        })
      },
      closeOptDialog(obj){
        console.log(obj)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('draggingNode drop: ', draggingNode.label);
        console.log('tree drop: ', dropNode.label, dropType);
      },
      handleContextmenu(ev,node){
        this.id = node.id
        this.openDialogOpt = true;
        console.log('tree drag leave: ', node);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    },
  };
</script>
