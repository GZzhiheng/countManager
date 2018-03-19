<style scoped>
  #main{text-align: center}
  #main .sales_man_content{margin: 10px auto;text-align:center;width: 98%;height: 286px;border-color: #fff;border-radius: 5px !important;}
  #main .manager_analyze{width: 191px;height: 56px;background-color: #33c0cc;display: inline-block;border-radius: 28px;cursor:pointer;text-align: center;overflow: hidden}
  #main .manager_analyze:hover{background-color: #00aabb}
  #main .manager_analyze a{display: block;text-decoration:none;font-size: 20px;line-height: 56px;color: #FFFFFF;}
  #main .history{font-size: 14px;color: #00aabb;width: 90px;margin: 10px auto;margin-top: 33px;cursor: pointer}
  .height-125-el-select{height:125px;line-height: 35px;padding: 45px 0}
</style>
<template>
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20">
        <div class="pull-left page-title">
          账户管家
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20 bgc-white sales_man_content">
      <div class="sales_select_content">
        <div class="clearfix height-125-el-select" style="width: 1016px;margin: 0 auto;">
          <form class="form-horizontal" role="form" id="queryFrm">
            <fieldset>
              <div class="clearfix">
                <div class="form-group height-box-35 width-box-240">
                  <div class="col-md-12">
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1 form-span-index"><span class="require-color">*</span>业务员：</span>
                      <div class="pull-left mr-40 ml-5">
                        <template>
                          <el-select v-model="indexSalesmanStatus" @change="chooseCustomer(indexSalesmanStatus)" filterable placeholder="请选择">
                            <el-option
                              v-for="item in query.salesmanData"
                              :key="item.id"
                              :label="item.no +'/'+ item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1 form-span-index"><span class="require-color">*</span>客户：</span>
                      <div class="select2-btn-28 pull-left mr-40 ml-5">
                        <template>
                          <el-select v-model="indexCustomerStatus" @change="chooseAccount(indexCustomerStatus)" filterable placeholder="请选择">
                            <el-option
                              v-for="item in query.customerData"
                              :key="item.id"
                              :label="item.no + '/' + item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1 form-span-index"><span class="require-color">*</span>账户：</span>
                      <div class="select2-btn-28 pull-left ml-5">
                        <template>
                          <el-select v-model="indexAccountStatus" filterable placeholder="请选择">
                            <el-option
                              v-for="item in query.accountData"
                              :key="item.id"
                              :label="item.account + '/' + item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="manager_analyze" v-if="!rate">
          <a @click="analysis">一键分析</a>
        </div>
        <div class="progress" v-if="rate" style="margin-top: 14px">
          <el-progress :percentage="percentage" :stroke-width="10"></el-progress>
          <p style="font-size: 12px;color: #666;margin: 15px 0 10px 0">可能需要几分钟，请耐心等待</p>
        </div>
        <p class="history" v-if="!rate">
          <a @click="historyLink" style="color: #00aabb">查看历史记录</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from './../../router'
  export default {
    name: 'component',
    data () {
      return {
        rate: false
      }
    },
    mounted () {
      this.$store.dispatch('getSalesman')
      if (this.indexCustomerStatus !== '' && this.indexCustomerStatus !== undefined && this.indexCustomerStatus !== null) { // 客户存在，需要发请求得到下拉框
        this.$store.dispatch('getCustomer', this.indexSalesmanStatus)
      }
      if (this.indexAccountStatus !== '' && this.indexAccountStatus !== undefined && this.indexAccountStatus !== null) { // 账户存在，需要发请求得到下拉框
        this.$store.dispatch('getAccount', this.indexCustomerStatus)
      }
      // 回到入口页，历史记录状态全部清空
      this.query.historySalesmanStatus = '' // 清空到了历史页面记住的业务员下拉框状态
      this.query.historyCustomerStatus = '' // 清空到了历史页面记住的客户下拉框状态
      this.query.historyAccountStatus = ''  // 清空到了历史页面记住的账户下拉框状态
    },
    updated () {
      this.$nextTick(function () {
        let selectDown = document.getElementsByClassName('el-select-dropdown')
        for (let i = 0; i < selectDown.length; i++) {
          selectDown[i].style.minWidth = '240px'
        }
      })
    },
    computed: {
      query () {
        return this.$store.state.query
      },
      time () {
        return this.$store.state.index.time
      },
      status () {
        return parseInt(this.$store.state.index.status)
      },
      errMsg () {
        return this.$store.state.index.errMsg
      },
      percentage () {
        return parseInt(this.$store.state.index.percentage)
      },
      recordId () {
        return this.$store.state.query.recordId
      },
      active () {
        return this.$store.state.active
      },
      indexSalesmanStatus: {
        get () {
          return this.$store.state.query.indexSalesmanStatus
        },
        set (val) {
          this.$store.commit('QUERY_INDEX_SALESMAN', val)
        }
      },
      indexCustomerStatus: {
        get () {
          return this.$store.state.query.indexCustomerStatus
        },
        set (val) {
          this.$store.commit('QUERY_INDEX_CUSTOMER', val)
        }
      },
      indexAccountStatus: {
        get () {
          return this.$store.state.query.indexAccountStatus
        },
        set (val) {
          this.$store.commit('QUERY_INDEX_ACCOUNT', val)
        }
      }
    },
    destroyed () {
      this.$store.dispatch('getAlertDialog', {close: 1})
    },
    methods: {
      analysis () {
        if (!this.$store.state.query.indexAccountStatus) {
          this.$store.dispatch('getAlertDialog', {code: 2, msg: '请选择一个账户'})
          return
        }
        this.rate = true
        this.$store.dispatch('getAnalysis')
      },
      historyLink () {
        this.$store.commit('HISTORY_STATUS')
        router.push({name: 'History'})
      },
      chooseCustomer (val) {
        this.$store.dispatch('getCustomer', val)
      },
      chooseAccount (val) {
        this.$store.dispatch('getAccount', val)
      }
    },
    watch: {
      recordId () {
        this.$store.dispatch('getPercentage')
      },
      time () {
        try {
          let _this = this
          if (_this.percentage < 100 && _this.status !== 1 && _this.status !== 2 && _this.status !== 3) { // 正在请求
            setTimeout(function () {
              _this.$store.dispatch('getPercentage')
            }, 3000)
          }
          if (_this.status === 1) { // 成功跳转
            _this.$store.commit('QUERY_INDEX_PERCENTAGE', 0) // 百分数重置为0
            _this.active.analysis.view = 'Cost'
            router.push({name: 'Cost'})
          }
          if (_this.status === 2) { // 错误提示并还原
            _this.$store.commit('QUERY_INDEX_PERCENTAGE', 0) // 百分数重置为0
            _this.rate = false
            _this.$store.dispatch('getAlertDialog', {code: 1, msg: _this.errMsg, duration: 1000000})
          }
          if (_this.status === 3) { // 错误提示并还原
            _this.$store.commit('QUERY_INDEX_PERCENTAGE', 0) // 百分数重置为0
            _this.rate = false
            _this.$store.dispatch('getAlertDialog', {code: 1, msg: '系统错误,请重新分析', duration: 1000000})
          }
        } catch (e) {
          console.log('index/main:watch>time' + e)
        }
      }
    }
  }

</script>
