<template>
  <el-dialog
    :title="'菜单树'"
    :visible.sync="openDialogMenu"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="()=>closeDialog(false)"
    width="1000px"
  >
    <el-row>
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedData"
        :default-checked-keys="checkedData"
        :props="defaultProps">
      </el-tree>
    </el-row>
    <el-row>
      <el-col :offset="18" :span="6">
        <el-button @click="updateMenuRelationBatch">
          保存
        </el-button>
        <el-button @click="closeDialog" >
          返回
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
  import { queryMenuTree } from '@/api/menu'
  import {updateMenuRelationBatch } from '@/api/role'
  export default {
    name: 'choose-menu',
    data() {
      return {
        data: [],
        expandedData:[],//默认展开的数据
        checkedData:[],//默认选中的数据
        chooseData:[],//选中的数据
        chooseIds:[],//选中的数据ID
        defaultProps: {
          children: 'childList',
          label: 'title'
        }
      }
    },
    methods: {
      closeDialog() {
        this.$emit('closeOpenMenu', null);
      },
      loadData(reload) {
        let param = {
          roleId:this.roleId,
        };
        queryMenuTree(param).then(res => {
          if (res.code === 0) {
            this.data = res.data;
            this.checkedData = [];
            this.dealData(this.data)
          }else {
            this.$message.error(res.msg);
          }
        }).catch(() => {
          this.$message.error('请求错误!');
          this.loading = false
        })
      },
      dealData(list){
        if (list && list.length > 0) {
          // 循环遍历
          for (let i = 0; i < list.length; i++) {
            if(list[i].parentId == '0' || list[i].parentId == '-1'){
              this.expandedData.push(list[i].id);
            }
            if(list[i].status == '1' && list[i].parentId != '0' && list[i].parentId != '-1'){
              this.checkedData.push(list[i].id);
            }
            // 如果数组中有childList则继续递归
            if (list[i].childList) {
              this.dealData(list[i].childList);
            }
          }
        }
      },
      updateMenuRelationBatch(id){
        this.chooseIds = [];
        this.chooseData = this.$refs.tree.getCheckedNodes();
        this.chooseData.forEach(data => {
          this.chooseIds.push(data.id);
        })
        this.$refs.tree.getHalfCheckedKeys().forEach(data => {
          this.chooseIds.push(data);
        })
        let param = {
          id:this.roleId,
          menuIds: this.chooseIds,
        };
        updateMenuRelationBatch(param).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg);
          }else {
            this.$message.error(res.msg);
          }
          this.loadData()
        })
      },
    },
    watch: {
      reloadMenu: function (newVal, oldVal) {
        if (newVal) {
          this.loadData(true);
        }
      },
    },
    //与 上级组件通信
    props: {
      openDialogMenu: {
        type: Boolean,
        default: false
      },
      roleId: {
        type: String,
        default: "",
      },
      reloadMenu: {
        type: String,
        default: "",
      },
    }
  }
</script>

