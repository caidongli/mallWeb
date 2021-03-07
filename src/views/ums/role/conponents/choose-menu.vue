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
          :data="data"
          node-key="id"
          @node-contextmenu="handleContextmenu"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
        </el-tree>
      </el-row>
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
    </el-dialog>
</template>
<script>
    import { queryPermissionTree,updatePermissionRelationBatch } from '@/api/role'

    export default {
        name: 'choose-menu',
        data() {
            return {
                data: [{
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
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            closeDialog() {
                this.$emit('closeOpenMenu', null);
            },
            loadData(reload) {
                /*let param = {
                    roleId:this.roleId,
                };
                queryPermissionTree(param).then(res => {
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
                })*/
            },
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleContextmenu(ev,node){
                console.log('tree drag leave: ', node);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('draggingNode drop: ', draggingNode);
                console.log('tree drop: ', dropNode.label, dropType);
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

