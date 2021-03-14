<template>
  <div>
    <el-row :span="6">
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        @node-contextmenu="handleContextmenu"
        @node-drop="handleDrop"
        :default-expanded-keys="expandedData"
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
        :readonly = "readonly"
        :reload="reload"
        :opt = "opt"
        @closeDialogInfo="closeDialogInfo"></menuEdit>
    </el-row>
  </div>
</template>

<script>
    import { queryMenuList,deleteMenu,updateMenu } from '@/api/menu'
    import menuOpt from './conponents/menu-opt'
    import menuEdit from './conponents/menu-update'
    export default {
        name: "roleList",
        components: {menuOpt,menuEdit},
        data() {
            return {
                id:0,
                readonly:true,
                openDialogOpt:false,
                opt:'',
                reload:'',
                openDialogInfo:false,
                data: [],
                expandedData:[],//默认展开的数据
                defaultProps: {
                    children: 'childList',
                    label: 'title'
                },
                dataForm: {
                    id:'',
                    orderBy:'',//排序
                    parentId:'',//父ID
                },
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
                        this.dealData(this.data)
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
                        // 如果数组中有childList则继续递归
                        if (list[i].childList) {
                            this.dealData(list[i].childList);
                        }
                    }
                }
            },
            closeOptDialog(obj){
                if(obj.opt != 'close'){
                    this.dealOpt(obj);
                }
                this.openDialogOpt = false;
            },
            dealOpt(obj){
                if(obj.opt === 'del'){
                    deleteMenu({id:obj.id}).then(res => {
                        if (res.code === 0) {
                            this.$message.success(res.msg);
                            this.loadData();
                        }else{
                            this.$message.error(res.msg);
                        }
                    }).catch(() => {
                        this.$message.error('请求错误!');
                        this.loading = false
                    })
                    return;
                }
                this.openDialogInfo = true;
                this.reload = new Date().toLocaleString();
                this.opt = obj.opt
                if(obj.opt === 'add' || obj.opt === 'update'){
                    this.readonly = false;
                }
                if(obj.opt === 'update'){
                    this.id = obj.id;
                }
                if(obj.opt === 'view'){
                    this.readonly = true;
                }
            },
            closeDialogInfo(opt){
                if(opt == 'add'){
                    this.loadData();
                }
                this.openDialogInfo = false;
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                this.dataForm.id = draggingNode.data.id
                if(dropType == 'inner'){
                    this.dataForm.parentId = dropNode.data.id
                }else if(dropType == 'before'){
                    this.dataForm.parentId = dropNode.data.parentId
                    this.dataForm.orderBy = dropNode.data.orderBy*1-"0.1"*1
                }else if(dropType == 'after'){
                    this.dataForm.parentId = dropNode.data.parentId
                    this.dataForm.orderBy = dropNode.data.orderBy*1+"0.1"*1
                }
                updateMenu(this.dataForm).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg);
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(() => {
                    this.$message.error('请求错误!');
                    this.loading = false
                })
            },
            handleContextmenu(ev,node){
                this.id = node.id
                this.openDialogOpt = true;
            },
        },
    };
</script>
