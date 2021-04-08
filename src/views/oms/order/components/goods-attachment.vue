<template>
    <el-dialog
            :title="'商品图片'"
            :visible.sync="openDialogAttach"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog(false)"
            width="750px"
    >

          <common-upload
                         :belong-id="11"
                         :objType="1"
                         :disabled="false"
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
          id: {
                type: String,
                default: "",
            },
        }

    }
</script>

