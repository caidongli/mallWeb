<template>
    <div class="row-title-box">
        <el-row class="row-title">
            <el-col :span="8" class="col-filename-title">文件名称</el-col>
            <el-col :span="4" class="col-normal-title">上传时间</el-col>
            <el-col :span="4" class="col-normal-title">文件大小</el-col>
            <!--内容为空el-col的span无效，所以在后面增加一个空的div-->
            <el-col :span="4" class="col-operation-title">操作</el-col>
        </el-row>
        <upload
                :config="config"
                :belong-id="belongId"
                :disabled="disabled"
                :show-file-filters="showFileFilters"
                :before-upload="beforeUpload"
                :after-upload="afterUpload"
                :before-delete-file="beforeDeleteFile"
                :after-delete-file="afterDeleteFile"
                :before-download="beforeDownload"
                :show-row-num="showRowNum"
                ref="upload"
                @initData="initData"
        ></upload>
    </div>
</template>

<script>
import axios from 'axios'
import Upload from './component/upload'

export default {
  name: 'CommonUpload',
  data () {
    return {
        config: {
            maxSize:20,
            maxUploadCount:10,
            files:[],
            fileFilters:'jpg,png',
        },
    }
  },
  props: {
    /* 业务对象ID */
    belongId: {
      type: String,
      default: ''
    },
      objType: {
          type: String,
          default: ''
      },
    /* 是否只读 */
    disabled: {
      type: Boolean,
      default: false
    },
    /* 文件类型过滤函数 */
    configFilter: {
      type: Function,
      default: null
    },
    beforeUpload: {
      type: Function,
      default: null
    },
    afterUpload: {
      type: Function,
      default: null
    },
    beforeDeleteFile: {
      type: Function,
      default: null
    },
    afterDeleteFile: {
      type: Function,
      default: null
    },
    beforeDownload: {
      type: Function,
      default: null
    },
    /* 是否显示文件过滤类型 */
    showFileFilters:{
      type: Boolean,
      default: true
    },
    /*是否显示序号*/
    showRowNum: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Upload
  },
  methods: {
    initData: async function () {
      //模块编码和附件所属业务对象id都为空择直接跳过
      if (!this.belongId) {
        return;
      }
      const url = this.commonJs.getFileAccessDomain() + '/admin/file/selectAttachmentByObjId'
      let formData = new FormData()
      formData.append('objId', this.belongId)
      formData.append('objType', this.objType)
      const headers = { 'Cache-Control': 'no-cache', 'If-Modified-Since': '0' }
      // post方法的 表单格式
      const res = await axios.post(url, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', ...headers } })
      // const res = await axios.post(url, formData, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
      const { code, msg, data } = res.data
      if (code === 200) {
          //本次是通过belongId查询或者还没有通过belongId查询过
          this.config.files = data
      } else {
        this.$notify.error({
          title: '错误',
          message: msg
        })
      }
    },
    validate: function () {
      let result = true
      const uploads = this.$refs.upload
      uploads.forEach(function (upload) {
        const uploadResult = upload.validate()
        if (!uploadResult) {
          result = false
        }
      })
      return result
    },
    clearValidate: function () {
      const uploads = this.$refs.upload
      uploads.forEach(function (upload) {
        upload.clearValidate()
      })
    },
  },
  mounted () {
    this.initData()
  },
  watch: {
    belongId: function () {
      this.initData()
    },
  },
  computed: {
  }
}
</script>

<style scoped="scoped">
    .row-title {
        background: #ebebeb;
        padding: 10px 20px;
        margin-bottom: 8px!important;
            border-radius: 6px
    }

    .col-filename-title {
        text-align: left;
    }

    .col-normal-title {
        text-align: center;
    }

    .col-operation-title {
        text-align: right;
        padding-right: 50px;
    }
    .row-title-box .el-row{
        margin:0px;
    }
</style>
