<template>
  <el-row>
    <el-col :offset="18" :span="6">
      <el-button @click="closeDialog">
        保存
      </el-button>
      <el-button @click="closeDialog" >
        返回
      </el-button>
    </el-col>
  </el-row>
</template>
<script>
  import { queryPermissionTree,updatePermissionRelationBatch } from '@/api/role'

  export default {
    name: 'menu-tree',
    data() {
      return {
        data: [],
      }
    },
    methods: {
      closeDialog() {
        alert("1")
      },
    },
  }
</script>

