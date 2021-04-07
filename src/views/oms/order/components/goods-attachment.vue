<template>
    <el-dialog
            :title="'商品图片'"
            :visible.sync="openDialogAttach"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="()=>closeDialog(false)"
            width="750px"
    >
      <el-row type="flex" align="middle">
        <el-col :span="12" :offset="6">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        </el-col>
      </el-row>
    </el-dialog>
</template>
<script>

    export default {
        name: 'goods-attachment',
        data() {
            return {

            }
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

