<template>
    <el-dialog
            :title="'商品图片'"
            :visible.sync="openDialogAttach"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog(false)"
            width="1000px"
    >
          <common-upload
                         :belong-id="id"
                         :objType="objType"
                         :disabled="readonly"
                         ref="common-upload"
          ></common-upload>
    </el-dialog>
</template>
<script>
    import commonUpload from '@/views/upload/common-upload'
    export default {
        name: 'goods-attachment',
        components: {commonUpload},
        data() {
            return {
              objType:'1',
            };
        },
        methods: {
            closeDialog() {
                this.$emit('closeAttachDialog', null);
            },
            loadData() {
            },
        },
        watch: {
            reload: function (newVal, oldVal) {
                if (newVal) {
                    this.loadData(true);
                }
            },
        },
        //与 上级组件通信
        props: {
            openDialogAttach: {
                type: Boolean,
                default: false
            },
            reload: {
                type: String,
                default: "",
            },
          readonly:{
            type: Boolean,
            default: true
          },
          id: {
                type: String,
                default: "",
            },
        }

    }
</script>

