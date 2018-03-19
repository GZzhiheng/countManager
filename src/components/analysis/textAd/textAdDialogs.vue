<style scoped>
  label{font-weight: 400 !important;}
  .content{display: inline-block;overflow: hidden;float: left;width: 454px;}
  .content-hint{display: inline-block;width: 480px;background-color: #f6f7f8;margin-left: 38px;word-break: break-all;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;}
  .content-hint .hint-head{height: 48px;}
  .content-hint .hint-head .hint-title{float: left;}
  .content-hint .hint-head .hint-title>li{float: left;}
  .content-hint .hint-head .hint-t-1{font-size: 16px;color: #333;font-weight: bolder;padding: 20px;}
  .hint-title-nav{padding: 20px 10px 10px;font-weight: bolder;color: #888;}
  .content-hint .hint-head .hint-title-nav:hover{cursor: pointer;}
  .hint-main{width: 440px;margin: 10px auto;position: relative}
  .mobile-main{border:3px solid #bcbcbc;background-color: #fff;border-bottom: 0;border-top-left-radius: 36px;border-top-right-radius: 36px}
  .mobile-box{min-height: 100px;background-color: #f6f7f8;margin: 30px 8px 0 8px;padding: 10px 8px 0 8px}
  .mobile-point{display: inline-block;height: 12px;width: 12px;background-color: #fff;border-radius: 50%;  border:3px solid #e0e0e0;position: absolute;top:10px;left: 215px;}
  .mobile-detail{background-color: #fff;box-shadow: 0px 1px 3px 0px #999}
  .mobile-detail-title{position: relative;border-bottom:1px solid #ebebeb;line-height: 16px;padding: 15px 30px 10px 15px;font-size: 14px;color: #660099}
  .ad-flag{position: absolute;font-size: 12px;background: #ccc;border-radius: 50%;width: 12px;height: 12px;color: #fff;line-height: 12px;text-align: center;right: 20px;}
  .adText{color: #006621;font-size: 12px;}
  .adUrl{vertical-align: text-bottom;}
  .adText-title{display: inline-block;border: 1px solid #006621;height:16px;line-height: 14px;padding: 0 2px;margin-top:3px;margin-right: 2px;border-radius: 3px}
  .mobile-detail-content{padding: 15px 15px 10px 15px;}
  .describe{width: 100%;line-height: 16px;font-size: 14px;color: #222;overflow: visible;resize: none;border: 0;min-height: 50px;}
  .pc-box{border: 1px solid #ccc;padding: 14px 8px 14px 14px;background-color: #fff}
  .pc-title{line-height: 16px;font-size: 14px;color: #1a0dab}
  .pc-detail-content{padding:0;}
  .pc-describe{color: #666}
  .hint-introduce{padding-top: 11px;padding-left: 20px}
  .hint-introduce>p{font-size: 14px;line-height: 32px;margin: 0;color: #444;font-weight: bold}
  .hint-introduce ul{margin-left: 20px;margin-bottom: 24px;}
  .hint-introduce ul li{font-size: 12px;line-height: 24px;list-style: square}
  .action{border-bottom: 2px solid #33c0cc;color: #33c0cc}
</style>
<template>
  <div class="dialogs-component">
    <el-dialog title="添加广告语" :visible.sync="visible" class="textAdDialog" :before-close="handleClose">
      <div class="content">
        <div class="float-left">
          <el-form :rules="rules" ref="form" :model="form">
            <el-form-item label="最终到达网址：" :label-width="formLabelWidth" prop="finalUrl" required>
              <el-autocomplete
                class="el-input-width"
                popper-class="my-autocomplete"
                v-model="form.finalUrl"
                :fetch-suggestions="querySearchFinalUrl"
                @select="selectValid('finalUrl')"
                auto-complete="off">
                <template slot-scope="querySearchFinalUrl">
                  <div class="name">{{ querySearchFinalUrl.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="第1个标题：" :label-width="formLabelWidth" prop="headlinePart1"  required>
              <el-autocomplete
                id="headlinePart1"
                class="el-input-width"
                popper-class="my-autocomplete"
                v-model="form.headlinePart1"
                :fetch-suggestions="querySearchTile"
                @select="selectValid('headlinePart1')"
                auto-complete="off">
                <template slot-scope="keywords">
                  <div class="name">{{ keywords.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="第2个标题：" :label-width="formLabelWidth" prop="headlinePart2" required>
              <el-autocomplete
                id="headlinePart2"
                class="el-input-width"
                popper-class="my-autocomplete"
                v-model="form.headlinePart2"
                :fetch-suggestions="querySearchTile"
                @select="selectValid('headlinePart2')"
                auto-complete="off">
                <template slot-scope="keywords">
                  <div class="name">{{ keywords.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="路径：" :label-width="formLabelWidth">
              <div>{{form.domainName || form.domainNameDefault}}</div>
                <el-form-item label="/" prop="path1" class="el-input-double el-input-domain-path">
                  <el-input v-model="form.path1" class="el-input-width-small"></el-input>
                </el-form-item>
                <el-form-item label="/" prop="path2" class="el-input-double el-input-domain-path">
                  <el-input v-model="form.path2" class="el-input-width-small"></el-input>
                </el-form-item>
              <p style="font-weight: normal;color: #888;text-indent: 1.5em;line-height: 16px;font-size: 12px;margin-bottom: 5px">建议填写，会带来意想不到的效果</p>
            </el-form-item>
            <el-form-item label="广告内容摘要：" :label-width="formLabelWidth" prop="description" required>
              <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="form.description" id="description"
                        auto-complete="off" class="el-input-textarea"></el-input>
            </el-form-item>
            <p style="color: #333;font-weight: 800;margin-top: 30px;margin-bottom: 20px">网址选项（高级）</p>
            <el-form-item label="移动网络：" :label-width="formLabelWidth" prop="finalMobileUrl">
              <el-autocomplete
                class="el-input-width"
                popper-class="my-autocomplete"
                v-model="form.finalMobileUrl"
                :fetch-suggestions="querySearchFinalMobileUrl"
                auto-complete="off">
                <template slot-scope="querySearchFinalMobileUrl">
                  <div class="name">{{ querySearchFinalMobileUrl.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="跟踪模版：" :label-width="formLabelWidth" prop="trackingUrlTemplate">
              <el-select v-model="form.trackingUrlTemplate" icon="caret-bottom" class="el-input-tail-model">
                <el-option
                  v-for="item in trackingUrlTemplate"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <p style="font-weight: normal;color: #888;line-height: 28px;font-size: 12px;margin-bottom: 1px;">示例：http://www.trackingc.com/?={Ipurl}&id=1</p>
            </el-form-item>
            <el-form-item label="自定义参数：" :label-width="formLabelWidth">
                <el-form-item label="{ _" prop="name1" class="el-input-double">
                  <el-input v-model="form.name1" class="el-user-defined-name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="}=" prop="value1" class="el-input-double el-input-doubleLast">
                  <el-input v-model="form.value1" class="el-user-defined-val" placeholder="值"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth">
                <el-form-item label="{ _" prop="name2" class="el-input-double">
                  <el-input v-model="form.name2" class="el-user-defined-name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="}=" prop="value2" class="el-input-double el-input-doubleLast">
                  <el-input v-model="form.value2" class="el-user-defined-val" placeholder="值"></el-input>
                </el-form-item>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
                <el-form-item label="{ _" prop="name3" class="el-input-double">
                  <el-input v-model="form.name3" class="el-user-defined-name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="}=" prop="value3" class="el-input-double el-input-doubleLast">
                  <el-input v-model="form.value3" class="el-user-defined-val" placeholder="值"></el-input>
                </el-form-item>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content-hint">
        <div class="hint-head">
          <ul class="hint-title">
            <li class="hint-t-1">预览</li>
            <li class="hint-title-nav" :class="{action: navTitle=='move'}" @click="navTitle = 'move'">移动设备</li>
            <li class="hint-title-nav" :class="{action: navTitle=='desk'}" @click="navTitle = 'desk'">桌面版</li>
          </ul>
        </div>
        <div class="hint-main mobile-main" v-show="navTitle=='move'">
          <div class="mobile-box">
            <span class="mobile-point"></span>
            <div class="mobile-detail">
              <div class="mobile-detail-title">
                <span class="ad-flag">i</span>
                <span>{{form.headlinePart1 || form.headlinePart1Default}}</span>:<span>{{form.headlinePart2 || form.headlinePart2Default}}</span>
                <div class="adText">
                  <span class="adText-title">广告</span>
                  <span class="adUrl">{{form.domainName || form.domainNameDefault}}<span v-if="form.path1">/</span>{{form.path1}}<span v-if="form.path2">/</span>{{form.path2}}</span>
                </div>
              </div>
              <div class="mobile-detail-content">
                <span class="describe">{{form.description || form.descriptionDefault}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hint-main pc-main" v-show="navTitle=='desk'">
          <div class="pc-box">
            <div class="pc-title">
              <span>{{form.headlinePart1 || form.headlinePart1Default}}</span>:<span>{{form.headlinePart2 || form.headlinePart2Default}}</span>
            </div>
            <div class="adText">
              <span class="adText-title">广告</span>
              <span class="adUrl">{{form.domainName || form.domainNameDefault}}</span>
            </div>
            <div class="pc-detail-content">
              <span class="describe pc-describe">{{form.description || form.descriptionDefault}}</span>
            </div>
          </div>
        </div>
        <div class="hint-introduce">
          <p>Best Practice Check广告语撰写建议：</p>
          <ul>
            <li>在标题中使用高流量的关键字；</li>
            <li>在标题中正确使用标点符号；</li>
            <li>在显示的路径中添加核心关键字；</li>
            <li>在描述中使用相关的关键字；</li>
            <li>每个单词的首字母都大写；</li>
            <li>使用关键字插入工具{Keyword}；</li>
            <li>使用号召用语，如Get,Buy,Inquire,Shop,Try,Learn；</li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form', 'ok')" class="el-btn-bgc">保存</el-button>
        <el-button type="primary" @click="submitForm('form', 'cnt')" class="el-btn-bgc">保存再添加</el-button>
        <el-button @click="cancel" class="el-btn-bgc-off">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        navTitle: 'move',
        formLabelWidth: '114px',
        rules: {
          finalUrl: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          headlinePart1: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 0, max: 30, message: '0 到 30 个字符', trigger: 'blur' }
          ],
          headlinePart2: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 0, max: 30, message: '0 到 30 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 0, max: 80, message: '0 到 80 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    updated () {
      if (document.querySelector('.el-input__inner')) {
        document.querySelector('.el-input__inner').addEventListener('blur', this.finalUrlBlur, false)
      }
      if (document.getElementById('headlinePart1')) {
        document.getElementById('headlinePart1').querySelector('.el-input__inner').setAttribute('maxlength', '30')
      }
      if (document.getElementById('headlinePart2')) {
        document.getElementById('headlinePart2').querySelector('.el-input__inner').setAttribute('maxlength', '30')
      }
      if (document.getElementById('description')) {
        document.getElementById('description').querySelector('.el-textarea__inner').setAttribute('maxlength', '80')
      }
    },
    mounted () {
      this.$store.dispatch('getTAOptimizeDialogList')
    },
    computed: {
      query () {
        return this.$store.state.query
      },
      finalUrlBool () {
        return this.$store.state.textAd.optimize.dialog.finalUrlBool
      },
      trackingUrlTemplate () {
        return this.$store.state.textAd.optimize.dialog.trackingUrlTemplate
      },
      keywords () {
        return this.$store.state.textAd.optimize.dialog.keywords
      },
      finalUrlData () {
        return this.$store.state.textAd.optimize.dialog.finalUrlData
      },
      finalMobileUrlData () {
        return this.$store.state.textAd.optimize.dialog.finalMobileUrlData
      },
      finalUrl () {
        return this.$store.state.textAd.optimize.dialog.form.finalUrl
      },
      form () {
        return this.$store.state.textAd.optimize.dialog.form
      },
      visible: {
        get () {
          return this.$store.state.textAd.optimize.visible
        },
        set (val) {
          this.$store.commit('GET_TA_OP_DIALOG', val)
        }
      }
    },
    methods: {
      finalUrlBlur () {
        let val = document.querySelector('.el-input__inner').value
        if (val.indexOf('//') !== -1 && val.indexOf('//') < val.length - 2 && val.indexOf('/') >= val.indexOf('//')) {
          this.form.domainName = val.split(/\//)[2]
          return
        }
        if (val.indexOf('/') > 0) {
          this.form.domainName = val.substring(0, val.indexOf('/'))
          return
        }
        this.form.domainName = val
      },
      querySearchFinalUrl (queryString, cb) {
        var restaurants = this.finalUrlData
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      querySearchTile (queryString, cb) {
        var restaurants = this.keywords
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      querySearchFinalMobileUrl (queryString, cb) {
        var restaurants = this.finalMobileUrlData
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (argus) => {
          return (argus.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      selectValid (prop) {
        this.$refs['form'].validateField(prop)  // 下拉框选择验证
      },
      submitForm (formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = this.form
            this.$store.dispatch('getTAOptimizeList', {pageSize: this.query.pageSize, pageNum: this.query.pageSize})
            this.$store.dispatch('getTAOptimizeDialogOk', {form: form, type: type})
          } else {
            return false
          }
        })
      },
      cancel () {
        this.$refs['form'].resetFields()
        this.visible = false
        console.log('close')
      },
      handleClose () {
        this.visible = false
        console.log('close')
        this.$store.commit('GET_TA_OP_DIALOG_FORM_EXIT', [])
      }
    }/*
      * ,
    watch: {
      form: {  // 表单数据时时更新
        handler (newData) {
          this.$store.commit('GET_TA_OP_DIALOG_FORM', newData)
        },
        deep: true
      },
      finalUrl (val) {
      }
    }
    */
  }
</script>
