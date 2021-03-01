<template>
  <div>
    <h1 style="text-align:center;">草拟中标通知书</h1>
    <el-collapse class="folded-panel" v-model="activeCollapseItems">
      <el-form
        :disabled="routeParams.readonly"
        :model="dataForm"
        :ref="formName"
        :rules="rules"
        label-position="right"
        label-width="160px"
      >
        <el-collapse-item :name="collapseItemNames.projectInfo" title="项目信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标段名称：" prop="packageName">
                <el-input :disabled="true"
                          v-model.trim="dataForm.packageName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标段编号：" prop="packageCode">
                <el-input :disabled="true"
                          v-model.trim="dataForm.packageCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="建设单位：" prop="tenderName">
                <el-input :disabled="true"
                          v-model.trim="dataForm.tenderName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="招标代理：" prop="agent">
                <el-input :disabled="true"
                          v-model.trim="dataForm.agent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目监督部门：" prop="superviseDeptName">
                <el-input :disabled="true"
                          v-model.trim="dataForm.superviseDeptName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item :name="collapseItemNames.resultBidderInfo" title="中标企业信息">
          <el-row>
            <el-col :span="24">
              <el-form-item label="中标单位名称：" prop="bidderName">
                <el-input :disabled="true"
                          v-model.trim="dataForm.bidderName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="中标企业属性：" prop="enterpriseProperty">
                <el-input :disabled="true"
                          v-model.trim="dataForm.enterpriseProperty"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中标总价（万元）：" prop="winPrice">
                <el-input :disabled="true"
                          v-model.trim="dataForm.winPrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="中标工期：" prop="timeLimit">
                <el-input :disabled="true"
                          v-model.trim="dataForm.timeLimit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="总价：" prop="price">
                <el-input :disabled="true"
                          v-model.trim="dataForm.price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目负责人/注册证书号：" prop="managerName">
                <el-input :disabled="true"
                          v-model.trim="dataForm.managerName+dataForm.certificateNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交易服务费支付类型：" prop="serviceFeePayType">
                <el-select :disabled="true" v-model="dataForm.serviceFeePayType">
                  <el-option :key="option.name" :label="option.desc" :value="option.name"
                             v-for="option in enums.serviceFeePayType"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目负责人编号：" prop="personCode">
                <el-input :disabled="true"
                          v-model.trim="dataForm.personCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交易服务费交纳：" prop="serviceFeePayStatus">
                <el-select :disabled="true" v-model="dataForm.serviceFeePayStatus">
                  <el-option :key="option.name" :label="option.desc" :value="option.name"
                             v-for="option in enums.serviceFeePayStatus"></el-option>
                </el-select><!--全缴 免缴 缓交-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="人工费：" prop="laborCosts" required>
                <el-input @keyup.native="checkMoneyAmount" v-model="dataForm.laborCosts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="安全防护、文明施工措施费：" prop="safetyFee" required>
                <el-input @keyup.native="checkMoneyAmount" v-model="dataForm.safetyFee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否保密项目：" prop="secretProject" required>
                <el-radio-group v-model="dataForm.secretProject">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea"
                          v-model.trim="dataForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item :name="collapseItemNames.resultLetterInfo" title="中标通知书信息">
          <el-row>
            <el-col :span="12">
              <el-form-item label="中标通知书模板：" prop="noticeTemplateType" required>
                <el-select v-model="dataForm.noticeTemplateType">
                  <el-option :key="option.name" :label="option.desc" :value="option.name"
                             v-for="option in enums.resultLetterTemplateType"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中标通知书编号：" prop="noticeCode">
                <el-input :disabled="true" placeholder="系统自动生成,无需填写"
                          v-model="dataForm.noticeCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="招标人签章时间：" prop="tenderSealTime" required>
                <el-date-picker type="datetime" v-model="dataForm.tenderSealTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="招标代理签章时间：" prop="agentSealTime" required>
                <el-date-picker type="datetime" v-model="dataForm.agentSealTime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="有无电子签章：" prop="signatureType" required>
                <el-radio-group v-model="dataForm.signatureType">
                  <el-radio :key="item.name" :label="item.name"
                            v-for="item in enums.resultLetterSignatureType">{{item.desc}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!--<el-button size="mini">签章时间（必填）</el-button>
              →-->
              <el-button size="mini">下载中标通知书PDF版</el-button>
              →
              <el-button size="mini">上传中标通知书PDF版</el-button>
              →
              <el-button size="mini">在线签章（可选）</el-button>
              →
              <el-button size="mini">查看中标通知书PDF版</el-button>
            </el-col>
          </el-row>
          <div>
            <h5>温馨提示：</h5>
            <ol>
              <li>
                1.如无法查看电子中标通知书或不能进行电子签章，请确认已安装PDF文档查看工具及安装电子签章工具（下载地址及使用说明）。
              </li>
              <li>
                2.如上传电子中标通知书PDF版，请招标代理或招标人按一比一的比例彩色打印并竖立扫描后（推荐：图片尺寸为1654*2340），上传 PDF版本文件，请勿对电子
                中标通知书格式进行修改。
              </li>
              <li>
                3.如已盖章的中标通知书需修改，请进行
                <el-button @click="resetForm" size="mini" v-show="!routeParams.readonly">重置
                </el-button>
              </li>
              <li>
                4.下载《电子中标通知书操作指引》（下载地址）了解系统相关操作。
              </li>
            </ol>
          </div>
        </el-collapse-item>
        <el-collapse-item :name="collapseItemNames.resultLetterAttachment" title="附件区">
          <el-table>
            <el-table-column align="center" label="编号" type="index" width="60px"></el-table-column>
            <el-table-column align="center" label="附件名称" prop="departmentName"></el-table-column>
            <el-table-column align="center" label="大小" prop="operator"></el-table-column>
            <el-table-column align="center" label="上传时间" prop="operationCommnet"></el-table-column>
            <el-table-column align="center" label="上传" prop="operationTime"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-form>
    </el-collapse>
    <!--底部操作按钮-->
    <el-footer class="operation-button-div">
      <el-row>
        <el-col :span="8">
          <el-button @click="switchAllCollapseItems(false)">全部展开</el-button>
          <el-button @click="switchAllCollapseItems(true)">全部收缩</el-button>
        </el-col>
        <el-col :span="16">
          <el-button @click="saveForm" v-show="operation.saveResultLetter && !routeParams.readonly">
            保存
          </el-button>
          <el-button @click="submitForm" v-show="showCommitBt()">
            提交
          </el-button>
          <el-button @click="openApprovalForm" v-show="showApprovalBt(routeParams.recordItemId) && routeParams.isApprove">审核</el-button>
          <el-button @click="openApprovalHisory" v-show="showApprovalBt(routeParams.recordItemId)">审核记录</el-button>
          <el-button @click="goBack" v-show="routeParams.isIndex">
            返回
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
    <approval-form :approvalFormShow="approvalFormShow"
                   url="/api/jsgc_app/jsgc/result-letter/approval-result-letter"
                   :hostId="this.dataForm.resultLetterId"
                   :recordItemId="this.routeParams.recordItemId"
                   @closeApprovalForm="closeApprovalForm"
    ></approval-form>
    <approval-history :approvalHistoryShow="approvalHistoryShow"
                      :hostId="this.dataForm.resultLetterId"
                      @closeApprovalHistory="closeApprovalHistory"
    ></approval-history>
  </div>
</template>

<script>
    import {findResultLetterById, saveResultLetter,commitResultLetter} from '@/api/data/resultLetterData.js'
    import {getStore, gz_current_page_params} from '@/util/sessionStorage'

    export default {
        name: 'resultLetterEdit',
        data() {
            return {
                approvalFormShow:false,
                approvalHistoryShow:false,
                collapseItemNames: {
                    projectInfo: 'collapse-item-project-info',
                    resultBidderInfo: 'collapse-item-result-bidder-info',
                    resultLetterInfo: 'collapse-item-result-letter-info',
                    resultLetterAttachment: 'collapse-item-result-letter-attachment',
                },
                activeCollapseItems: [],
                routeParams: {
                    readonly: false,
                    isApprove:false,
                    projectId: '',
                    packageId: '',
                    recordItemId:'',
                    isIndex: false
                },
                formName: 'dataForm',
                dataForm: {
                    packageId: '', //标段id
                    packageName: '', //标段名称
                    packageCode: '', //标段编号
                    projectId: '', //项目id
                    projectName: '', //项目名称
                    projectCode: '', //项目编号
                    tenderName: '', //建设单位,这里指招标单位
                    agent: '', //招标代理
                    superviseDeptName: '', //项目监督部门
                    resultLetterId: '', //中标通知书id
                    enrollId: '', //报名id
                    enterpriseBaseId: '', //企业id
                    bidderName: '', //投标人名称,这里指中标单位名称
                    enterpriseProperty: '', //中标企业属性
                    enterpriseName: '', //企业名称
                    winPrice: '', //中标总价(万元)
                    timeLimit: '', //工期
                    price: '', //总价
                    secretProject: '', //是否保密项目 1:是,0:否
                    safetyFee: '', //安全防护/安全措施施工费
                    laborCosts: '', //人工费
                    managerName: '', //项目负责人名称
                    certificateNumber: '', //证书编号
                    personCode: '', //负责人编号
                    serviceFeePayStatus: '', //交易服务费缴纳状态
                    serviceFeePayType: '', //交易服务费支付类型
                    noticeTemplateType: '', //中标通知书模板类型
                    noticeCode: '', //中标通知书编号
                    signatureType: '', //电子签证类型  1:招标人或者招标代理都有签章 2:招标人或招标代理无电子签章或有一个电子签章 3:修改中标通知书
                    tenderSealTime: '', //招标人签章时间
                    agentSealTime: '', //招标代理签章时间
                    remark: '', //备注
                    approvalStatus:'',//审核状态
                },
                rules: {
                    secretProject: [{type: 'boolean', required: true, message: '请选择是否保密项目'}],
                    noticeTemplateType: [{required: true, message: '请选择中标通知书模板类型'}],
                    signatureType: [{required: true, message: '请选择电子签证类型'}],
                    tenderSealTime: [{required: true, message: '招标人签章时间不能为空'}],
                    agentSealTime: [{required: true, message: '招标代理签章时间不能为空'}],
                    safetyFee: [{required: true, message: '安全措施施工费不能为空'}],
                    laborCosts: [{required: true, message: '人工费不能为空'}],
                    remark: [{max: 150, message: '备注不能超过150字'}],
                }
            };
        },
        computed: {
            allCollapseItemNames: function () {
                let all = [];
                for (var key in this.collapseItemNames) {
                    all.push(this.collapseItemNames[key]);
                }
                return all;
            },
            operation: function () {
                return {
                    saveResultLetter: this.commonJs.hasOperation(this, 'ResultLetterEdit'),
                }
            },
            enums: function () {
                return {
                    serviceFeePayStatus: this.commonJs.getEnum(this, "ServiceFeePayStatusEnum"),
                    serviceFeePayType: this.commonJs.getEnum(this, "ServiceFeePayTypeEnum"),
                    resultLetterTemplateType: this.commonJs.getEnum(this, "ResultLetterTemplateTypeEnum"),
                    resultLetterSignatureType: this.commonJs.getEnum(this, "ResultLetterSignatureTypeEnum"),
                }
            },
        },
        methods: {
            openApprovalForm(){
                this.approvalFormShow = true;
            },
            closeApprovalForm(){
                this.approvalFormShow = false;
            },
            openApprovalHisory(){
                this.approvalHistoryShow = true;
            },
            closeApprovalHistory(){
                this.approvalHistoryShow = false;
            },
            showApprovalBt(recordItemId){
                if(recordItemId) {
                    return recordItemId.length > 0
                }
                return false;
            },
            showCommitBt(){
                if((this.dataForm.approvalStatus === 'UNCOMMIT' || this.dataForm.approvalStatus === 'NOPASSED')
                    && this.operation.saveResultLetter
                    && !this.routeParams.readonly){
                    return true
                }
                return false;
            },
            //最多6位小数的数字输入
            checkMoneyAmount: function (e) {
                if (e.target.value) {
                    var expr = /(\d{1,}(\.\d{0,6})?)/g;
                    if (expr.test(e.target.value)) {
                        e.target.value = e.target.value.match(expr)[0];
                    } else {
                        e.target.value = '';
                    }
                }
            },
            async loadData() {
                if (this.routeParams.packageId) {
                    const {code, data} = await findResultLetterById({id: this.routeParams.packageId});
                    if (code === 200) {
                        this.dataForm = data;
                        if(data.approvalStatus){
                            this.dataForm.approvalStatus = data.approvalStatus.name;
                        }
                        if (!data.resultConfirmId) {
                            this.$message({type: 'warning', message: "您还没有完成确定中标人哦！"});
                        }
                    }
                }
            },
            async saveForm() {
                const {code, data} = await saveResultLetter(this.dataForm);
                if (code === 200) {
                    if (data) {
                        this.dataForm.resultLetterId = data;
                    }
                    this.$message({
                        type: 'success',
                        message: "保存成功"
                    });
                }
            },
            async submitForm() {
                this.$refs[this.formName].validate(async valid => {
                    if (valid) {
                        // await this.saveForm();
                        this.commitForm();
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确内容!!',
                            duration: 1500
                        });
                    }
                })
            },
            async commitForm() {
                const {code,msg} = await commitResultLetter(this.dataForm);
                if (code === 200) {
                    this.$message({
                        type: 'success',
                        message: "提交成功"
                    });
                }else{
                    this.$notify.error({
                        title: '提交失败',
                        message: msg,
                        duration: 1500
                    });
                }
            },
            resetForm() {
                this.$refs[this.formName].resetFields();
            },
            goBack() {
                this.$router.go(-1);
            },
            switchAllCollapseItems(foldOrExpand) {
                if (foldOrExpand) {
                    this.activeCollapseItems = [];
                } else {
                    this.activeCollapseItems = this.allCollapseItemNames;
                }
            }
        },
        beforeCreate() {
            this.commonJs.parseCurrentPageParams(this);
        },
        async mounted() {
            this.activeCollapseItems = this.allCollapseItemNames;
            this.routeParams = JSON.parse(getStore(gz_current_page_params));
            this.loadData();
        },
    }
</script>
<style scoped>
  .operation-button-div {
    bottom: 10px;
    position: fixed;
    width: 100%;
  }
</style>
