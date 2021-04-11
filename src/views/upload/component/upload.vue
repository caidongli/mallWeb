<template>
  <div class="upload-list-box" >
    <el-row style="height: 36px;margin-bottom: 12px;">
      <el-col :span="24">
        <!--为了显示上传的动态效果，将show-file-list设置为true,将file-list设置为空(getFileList返回空)-->
        <el-upload
          class="el-upload-custom"
          ref="upload"
          action="/file/uploadAttachment"
          :http-request="uploadFile"
          :data="getUploadParams(config)"
          :on-preview="onPreview"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="onBeforeUpload"
          :on-exceed="onExceed"
          :on-change="onChange"
          :show-file-list="true"
          :file-list="getFileList(uploadFileList)"
          :with-credentials="true"
          :accept="getAccept(config)"
          :auto-upload="true"
          :disabled="disabled"
          list-type="picture">
          <div  style="height:36px;line-height: 36px;">
            <!--<span slot="tip" class="upload-config-name">
              <span v-if="config.required" class="upload-config-name-required">*</span>
              {{config.configName}}
              &lt;!&ndash; <span class="upload-config-name-filter">{{this.showfileFilterStr()?('('+config.fileFilters+')'):''}}</span> &ndash;&gt;
              <span v-if="uploadFileList.length == 0" class="upload-config-name-uploaded">[未上传]</span>
            </span>-->
            <div v-if="!disabled" class="upload-right">
              <span v-show="showRequiredMessage"  class="upload-required-message">请上传附件</span>
              <el-tooltip effect="dark" placement="top" popper-class="file-tooltip">
                <div slot="content"><p style="word-break: break-all;" v-if="this.showfileFilterStr()">支持格式：{{this.config.fileFilters}}</p><p>支持大小：{{config.maxSize}}MB</p></div>
                <el-button>上传</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-show="uploadStatus">
      <el-col>
        <el-progress :percentage="uploadPercent"></el-progress>
      </el-col>
    </el-row>
    <!--编辑中||全部显示||设置为公开-->
    <el-row v-for="(uploadFile, index) in uploadFileList" v-bind:key="uploadFile.id"  style="line-height: 26px;">
      <el-col :span="5" class="col-filename" :title="uploadFile.attachName" @click.native="previewPicture(uploadFile)">
        {{uploadFile.attachName}}
      </el-col>
      <el-col :span="4" class="col-normal" :title="uploadFile.createTime">{{uploadFile.createTime}}</el-col>
      <el-col :span="4" class="col-normal">{{calcFileSize(uploadFile)}}</el-col>
      <el-col :span="4" class="col-operation">
        <el-button class="handle-btn"  type="text" @click="onPreview(uploadFile)" style="font-size: 13px;margin-left: 4px;">下载</el-button>
        <!--                <el-button v-if="!disabled" class="handle-btn" :disabled="index === 0" type="text" @click="moveUp(uploadFile)" style="font-size: 13px;margin-left: 4px;">上移</el-button>-->
        <!--                <el-button v-if="!disabled" class="handle-btn" :disabled="index === (uploadFileList.length - 1)" @click="moveDown(uploadFile)" type="text" style="font-size: 13px;margin-left: 4px;">下移</el-button>-->
        <el-button v-if="!disabled" class="handle-btn"  type="text" @click="deleteFile(uploadFile)" style="font-size: 13px;margin-left: 4px;">删除</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="pt.dialogVisible"
               :append-to-body="true">
      <img width="100%" :src="pt.dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
    import axios from 'axios'
    import '../fonts/iconfont'
    import { deleteAttachment } from '@/api/attachment'

    export default {
        name: 'upload',
        data () {
            return {
                uploadFileList: [],
                showRequiredMessage: false,
                uploadStatus: false, // 是否有文件在上传中
                uploadPercent: 0, // 文件上传百分比
                fileUrl:'',
                pt:{
                    dialogVisible:false,
                    dialogImageUrl:'',
                },
            }
        },
        props: {
            config: {
                type: Object,
                default: null,
                required: false
            },
            belongId: {
                type: String,
                default: ''
            },
          objType: {
            type: String,
            default: '1'
          },
            disabled: {
                type: Boolean,
                default: false
            },
            /* 是否显示文件过滤类型 */
            showFileFilters:{
                type: Boolean,
                default: true
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
            beforeSetPublicStatus: {
                type: Function,
                default: null
            },
            afterSetPublicStatus: {
                type: Function,
                default: null
            },
            beforeDownload: {
                type: Function,
                default: null
            },
            showRowNum: {
                type: Boolean,
                default: false
            }
        },
        computed: {
        },
        filters: {
            icon({ fileName = '' }) {
                let icon = 'unknown'
                if(fileName.includes('.xls')) {
                    icon = 'excel'
                } else if(fileName.includes('.doc')) {
                    icon = 'word'
                } else if(fileName.includes('.ppt')) {
                    icon = 'ppt'
                } else if(fileName.includes('.txt')) {
                    icon = 'text'
                } else if(fileName.includes('.pdf')) {
                    icon = 'pdf'
                } else if(['.jpg', '.jpeg', '.gif', '.png'].some(x => fileName.includes(x))) {
                    icon = 'img'
                } else if(['.zip', '.rar', '.z', '.arj', '.gz'].some(x => fileName.includes(x))) {
                    icon = 'zip'
                } else if(['.mp4', '.avi', '.rmvb', '.wmv'].some(x => fileName.includes(x))) {
                    icon = 'video'
                } else if(['.mp3', '.flac', '.wav'].some(x => fileName.includes(x))) {
                    icon = 'music'
                }
                return `#icon-${icon}`
            }
        },
        methods: {
            previewPicture(file){
                this.pt.dialogImageUrl = this.commonJs.getFileAccessDomain()+'/admin/file/getAttachment?attachId='+file.id;
                this.pt.dialogVisible = true;
            },
            /* 为了显示上传的动态效果，将show-file-list设置为true,将file-list设置为空(getFileList返回空) */
            getFileList: function (uploadFileList) {
                /* let result = [];
                          uploadFileList.forEach(function (item) {
                              let file = {
                                  name: item.fileName + '<span>aa</span>',
                                  url: item.downloadUrl,
                                  fileId: item.fileId,
                                  groupCode: item.groupCode,
                                  savePath: item.savePath
                              };
                              result.push(file);
                          })
                          return result; */
                return []
            },
            getUploadParams: function (config) {
                const uploadParams = {
                    belongId: this.belongId,
                }
                return uploadParams
            },
            getAccept: function (config) {
                return this.config.fileFilters
            },
            showfileFilterStr(){
                if(this.showFileFilters != null && !this.showFileFilters){
                    return false
                }else{
                    return true
                }
            },
            async onPreview (file) {
                // 自定义前事件
                if (this.beforeDownload) {
                    const result = await this.beforeDownload(this.config, file)
                    if (!result) {
                        return false
                    }
                }
                window.open(this.commonJs.getFileAccessDomain() + '/admin/file/getAttachment?attachId=' + file.id)
            },
            onExceed (files, fileList) {
                this.$notify({
                    title: '警告',
                    dangerouslyUseHTMLString: true,
                    message: '最多上传文件数量:<span style="color: red;">' + this.config.maxUploadCount + '</span>,当前文件数已达到可上传文件数量!',
                    type: 'warning'
                })
            },
            onChange (files, fileList) {
            },
            async onRemove (file, fileList) {
                if (typeof (file.id) !== 'undefined' && file.id != null) {
                    deleteAttachment({attachId:file.id}).then(res => {
                        if (res.code === 0) {
                          let index;
                            this.uploadFileList.forEach(function (item, index) {
                                if (item.id === file.id) {
                                  index = index;
                                }
                            })
                          this.uploadFileList.splice(index,1)
                            this.validate()
                            return true
                        }
                    }).catch(() => {
                        this.loading = false
                    })
                    this.$emit('initData')
                    return false
                }
            },
            onBeforeUpload (file) {
                // 自定义上传前事件
                if (this.beforeUpload) {
                    const result = this.beforeUpload(this.config, file)
                    if (!result) {
                        return false
                    }
                }

                // 不允许同时多文件上传
                if (this.uploadStatus) {
                    this.$notify({
                        title: '警告',
                        dangerouslyUseHTMLString: true,
                        message: '有文件正在上传中,请稍候!',
                        type: 'warning',
                        duration: 8000
                    })
                    return false
                }

                // 文件名称长度
                const fileName = file.name
                const fileNameLen = fileName.length
                if (fileNameLen >= 100) {
                    this.$notify({
                        title: '警告',
                        dangerouslyUseHTMLString: true,
                        message: '文件名称超长,请修改文件名称!',
                        type: 'warning',
                        duration: 8000
                    })
                    return false
                }

                // 上传文件数量验证
                /* if (this.config.maxUploadCount != undefined && this.config.maxUploadCount != null) {
                   if (this.uploadFileList.length >= this.config.maxUploadCount) {
                     this.$notify({
                       title: '警告',
                       dangerouslyUseHTMLString: true,
                       message: '最多上传文件数量:<span style="color: red;">' + this.config.maxUploadCount + '</span>,当前文件数已达到可上传文件数量!',
                       type: 'warning',
                       duration: 8000
                     })
                     return false
                   }
                 }*/
                // 上传文件大小验证
                if (this.config.maxSize != undefined && this.config.maxSize != null) {
                    const fileMB = (file.size / 1024 / 1024)
                    if (this.config.maxSize < fileMB) {
                        this.$notify({
                            title: '警告',
                            dangerouslyUseHTMLString: true,
                            message: '上传文件大小不能超过:<span style="color: red;">' + this.config.maxSize + '</span>M!',
                            type: 'warning',
                            duration: 8000
                        })
                        return false
                    }
                }

                // 特殊字符校验
                const specialChar = [',', '，', '"', '“', '”', '\'', '‘', '’', '<', '>', '\\', '/', '?', '？', '。', ';', '；']
                for (let i = 0; i < specialChar.length; i++) {
                    if (file.name.indexOf(specialChar[i]) != -1) {
                        this.$notify({
                            title: '警告',
                            dangerouslyUseHTMLString: true,
                            message: '文件名称中含有特殊字符: <span style="color: red;">' + specialChar[i] + '</span> !',
                            type: 'warning',
                            duration: 8000
                        })
                        return false
                    }
                }

                // 文件类型
                const fileFilters = this.config.fileFilters
                if (fileFilters != null && fileFilters != undefined && fileFilters != '*') {
                    const last_len = fileName.lastIndexOf('.')
                    let fileExtName = ''
                    if (last_len > 0) {
                        const len = fileName.length
                        fileExtName = fileName.substring(last_len, len).toLowerCase()
                    } else {
                        this.$notify({
                            title: '警告',
                            dangerouslyUseHTMLString: true,
                            message: '无法解析文件类型 !',
                            type: 'warning',
                            duration: 8000
                        })
                        return false
                    }

                    let fileFilterFlag = false
                    const fileFilterArr = fileFilters.split(',')
                    for (let i = 0; i < fileFilterArr.length; i++) {
                        if (fileFilterArr[i] != null && fileFilterArr[i] != '' && fileFilterArr[i].toLowerCase() == fileExtName) {
                            fileFilterFlag = true
                            break
                        }
                    }
                    if (!fileFilterFlag) {
                        this.$notify({
                            title: '警告',
                            dangerouslyUseHTMLString: true,
                            message: '不允许上传类型为<span style="color: red;">' + fileExtName + '</span> 的文件 !',
                            type: 'warning',
                            duration: 8000
                        })
                        return false
                    }
                }
                return true
            },
            async uploadFile (params) {
                this.doUploadFile(params.file)
            },
            async unchunckUploadFile (file) {
                try {
                    this.uploadPercent = 100 // 整个文件上传，到了上传步骤进度条直接打到100
                    const url = this.commonJs.getFileAccessDomain() + '/admin/file/uploadAttachment'
                    let formData = new FormData()
                    formData.append('file', file)
                    formData.append('objId', this.belongId)
                    formData.append('objType', this.objType)
                    const fileSize = file.size
                    formData.append('fileSize', fileSize) // 文件大小
                    const res = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                    const { code, msg, data } = res.data
                    if (code === 0) {
                        this.uploadFileList.push(data)
                        this.validate()
                        // 自定义上传前事件
                        if (this.afterUpload) {
                            await this.afterUpload(this.config, data)
                        }
                        return true
                    } else {
                      this.$message.error("上传错误");
                        this.$emit('initData')
                        return false
                    }
                } finally {
                    this.uploadStatus = false
                    this.uploadPercent = 0
                }
            },
            async doUploadFile (file) {
                const fileMB = (file.size / 1024 / 1024)
                this.unchunckUploadFile(file)
            },
            onSuccess (response, file, fileList) {
                /* const {code, msg, data} = response;
                          if (code === 200) {
                              this.uploadFileList.push(data);
                              file.name = data.fileName;
                              file.url = data.downloadUrl;
                              file.fileId = data.fileId;
                              file.groupCode = data.groupCode;
                              file.savePath = data.savePath;
                              this.validate();
                              return true;
                          } else {
                              this.$notify.error({
                                  title: '错误',
                                  message: msg
                              });
                              this.$emit('initData');
                              return false;
                          } */
            },
            onError (err, file, fileList) {
              console.log(err)
              this.$message.error("上传异常");
                this.$emit('initData')
            },
            initUploadFileList () {
                const files = this.config.files
                if (files != null && files != undefined) {
                    this.uploadFileList = files
                    this.fileUrl = this.commonJs.getFileAccessDomain()+'/admin/file/getAttachment?attachId='
                } else {
                    this.uploadFileList = []
                }
            },
            validate () {
                if (this.config.required && this.uploadFileList.length === 0) {
                    this.showRequiredMessage = true
                    return false
                } else {
                    this.showRequiredMessage = false
                    return true
                }
            },
            clearValidate () {
                this.showRequiredMessage = false
            },
            async deleteFile (file) {
                if (file.id != undefined && file.id != null) {
                    // 自定义前事件
                    if (this.beforeDeleteFile) {
                        const result = await this.beforeDeleteFile(this.config, file)
                        if (!result) {
                            this.$emit('initData')
                            return false
                        }
                    }

                    return this.$confirm(`确定删除 ${file.attachName}？`, '警告', { type: 'warning' })
                        .then(async () => {
                            const deleteResult = this.onRemove(file, null)
                            if (deleteResult) {
                                // 自定义后事件
                                if (this.afterDeleteFile) {
                                    await this.afterDeleteFile(this.config, file)
                                }
                            }
                        })
                        .catch(_ => {
                        })
                }
            },
            calcFileSize (file) {
                let result = ''
                if (file.fileSize != undefined && file.fileSize != null) {
                    let unit = 'KB'
                    result = file.fileSize / 1024
                    if (result >= 1000) {
                        result = result / 1024
                        if (result >= 1000) {
                            result = result / 1024
                            unit = 'G'
                        } else {
                            unit = 'M'
                        }
                    }
                    result = parseFloat(result).toFixed(2) + unit
                }
                return result
            },
            async exchangePosition(firstFileId, secondFileId) {
                if (typeof (firstFileId) !== 'undefined' && firstFileId != null && typeof (secondFileId) !== 'undefined' && secondFileId != null) {
                    const url = this.commonJs.getFileAccessDomain() + '/file/gd-file/exchange-position'
                    let formData = new FormData()
                    formData.append('firstFileId', firstFileId)
                    formData.append('secondFileId', secondFileId)
                    const res = await axios.post(url, formData, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
                    const { code, msg } = res.data
                    let _this = this
                    if (code === 0) {
                        let firstIndex = -1
                        let secondIndex = -1
                        let exchanged = false
                        this.uploadFileList.forEach(function (item, index) {
                            if (item.fileId === firstFileId) {
                                firstIndex = index
                            }
                            if (item.fileId === secondFileId) {
                                secondIndex = index
                            }
                            if (!exchanged && firstIndex != -1 && secondIndex != -1 && firstIndex != secondIndex) {
                                let firstFile = _this.uploadFileList[firstIndex]
                                let secondFile = _this.uploadFileList[secondIndex]
                                let firstOrd = firstFile.ord
                                firstFile.ord = secondFile.ord
                                secondFile.ord = firstOrd
                                _this.$set(_this.uploadFileList, firstIndex, secondFile)
                                _this.$set(_this.uploadFileList, secondIndex, firstFile)
                                exchanged = true
                            }
                        })
                        return true
                    } else {
                      this.$message.error("移动异常");
                        this.$emit('initData')
                        return false
                    }
                }
            },
            moveUp(file) {
                for (let i = 0; i < this.uploadFileList.length; i++) {
                    let fileIndex = this.uploadFileList[i]
                    if (fileIndex.id == file.id) {
                        if (i > 0) {
                            let upFile =  this.uploadFileList[i - 1]
                            this.exchangePosition(file.id, upFile.id)
                            return true
                        }
                    }
                }
            },
            moveDown(file) {
                for (let i = 0; i < this.uploadFileList.length; i++) {
                    let fileIndex = this.uploadFileList[i]
                    if (fileIndex.id == file.id) {
                        if (i < (this.uploadFileList.length - 1)) {
                            let nextFile =  this.uploadFileList[i + 1]
                            this.exchangePosition(file.id, nextFile.id)
                            return true
                        }
                    }
                }
            }

        },
        mounted () {
            this.initUploadFileList()
        },
        watch: {
          'config.files': function () {
                this.initUploadFileList()
            }
        }
    }
</script>

<style>
  .el-upload-custom .el-upload{
    display: block;
  }
  .file-tooltip{
    padding: 12px!important;
    line-height: 1.4!important;
  }
  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: .2em;
    vertical-align: sub;
    fill: currentColor;
    overflow: hidden;
  }
</style>

<style scoped>
  .upload-list-box{
    box-shadow: 0px 0px 5px #c4bdbd;
    border-radius: 4px;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-left: solid 4px #4480dd;
    overflow: hidden;
  }
  .upload-config-name {
    float: left;
    text-align: left;
    font-size: 14px;
    color: #333;
    line-height: 40px;
  }
  .upload-right >>> .el-button{
    height: 30px;
    line-height: 30px;
    border-radius: 0px;
    font-size: 12px;
    margin-right: 0px;
    padding: 0px 14px;
    border-radius: 2px;
  }
  .upload-config-name-required {
    color: #ff4f00;
    font-size: 16px;
    padding-top: -4px;
    display: block;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
  }
  .upload-config-name-filter {
    padding-left: 10px;
  }
  .upload-config-name-uploaded {
    color: #ff4f00;
    padding-left: 10px;
  }

  .upload-right {
    float: right;
  }

  .upload-required-message {
    margin-right: 6px;
    font-size: 10px;
    color: #ff5a0f;
    line-height: 40px;
    padding: 1px 3px;
    border-radius: 2px;
  }

  .col-filename {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #007AF5;
    cursor: pointer;
  }

  .col-normal {
    text-align: center;
  }

  .col-operation {
    text-align: right;

  }
  .col-operation .el-button{
    float:none;
  }
  .upload-list-box .el-row{
    overflow:hidden;
  }
  .handle-btn.is-disabled:hover {
    color: #C0C4CC!important;
  }
</style>
