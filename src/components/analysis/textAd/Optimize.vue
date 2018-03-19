<style scoped>
  .table-title-top{margin-bottom: 20px;}
</style>
<template>
  <!--文字广告--优化内容组件-->
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20 position-absolute">
        <div class="pull-left page-title">
          <router-link :to="{name: 'TextAd'}" class="return-icon"></router-link>文字广告优化
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20">
      <div class="bgc-white border-radius-5 keyword">
        <div class="clearfix content-detail mt-10">
          <div>
            <div class="clearfix pad-lt-rt-20 position-relative title-box">
              <div class="pull-left table-title-left-width">
                <!--<div class="form-span-color table-light-title">-->
                  <!--<span>上次优化时间：</span>-->
                  <!--<span>2017-04-15</span>-->
                  <!--<span>建议您</span>-->
                  <!--<span class="suggest-data-color">4月22日</span>-->
                  <!--<span>再进行优化，避免过度优化。</span>-->
                <!--</div>-->
                <div class="form-span-color table-light-title">
                  <span>在以下广告组建议增加广告语，以便于优化推广效果。</span>
                </div>
              </div>
              <!--<div class="pull-left table-title-right-width absolute-right-bottom">
                <a class="btn normal-blod-ok-btn height-28 vertical-initial pull-right" @click="refresh">刷新</a>
                <div class="dropdown btn-drop pull-right mr-20">
                  <button type="button" class="btn weight-blod-ok-btn mask-weight-blod-ok-btn height-28 vertical-initial"
                          data-toggle="dropdown">忽略
                  </button>
                  <ul class="dropdown-menu dropdownSelect-menu border-radio-3" role="menu">
                    <template v-for="item in commonData.ignoreRangeData">
                      <li role="presentation" class="position-relative">
                        <div :class="selectId.length > 0 ? '': 'mask-li-box'">
                          <a role="menuitem" tabindex="-1" href="javascript:;">{{item.name}}</a>
                          <div class="mask-li position-absolute">
                            <span class="mask-li-tip position-absolute">列表选中后可操作性</span>
                          </div>
                        </div>
                      </li>
                    </template>
                    <li role="presentation">
                      <a role="menuitem" tabindex="-1" href="javascript:;">忽略历史记录</a>
                    </li>
                  </ul>
                </div>
              </div>-->
            </div>
            <div class="col-xs-12 table-responsive table-box table-shadow table-title-top mb-20">
              <div class="el-table el-table--fit el-table--border el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
                <div class="el-table__header-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__header position-relative" style="width: 100%;">
                    <thead>
                    <tr>
                      <!--<th class="el-table_1_column_22 el-table-column&#45;&#45;selection is-leaf" style="width: 10%">-->
                        <!--<div class="cell">-->
                          <!--<div class="checkbox">-->
                            <!--<input id="textAdAllSelect" v-model="allSelectStatus" @click="checkedAll" type="checkbox">-->
                            <!--<label for="textAdAllSelect"><span></span><i class="fa fa-check"></i></label>-->
                          <!--</div>-->
                          <!--</label>-->
                        <!--</div>-->
                      <!--</th>-->
                      <th class="el-table_1_column_24 is-leaf is-sortable" :class="order[0]" style="width: 33.3%" @click="sortMethod({prop: 'groupName', order: order[0], index: 0})">
                        <div class="cell">广告组<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                      </th>
                      <th class="el-table_1_column_25 is-leaf is-sortable" :class="order[1]" style="width: 33.3%" @click="sortMethod({prop: 'campaignName', order: order[1], index:1})">
                        <div class="cell">广告系列<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                      </th>
                      <th class="el-table_1_column_26 is-leaf is-sortable" :class="order[2]" style="width: 33.3%" @click="sortMethod({prop: 'proposalAd', order: order[2], index: 2})">
                        <div class="cell">优化建议<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                      </th>
                      <th class="gutter" style="width: 17px;"></th>
                    </tr>
                    </thead>
                  </table>
                </div>
                <div class="el-table__body-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;min-width: 498px">
                    <tbody>
                    <tr class="el-table__row" v-if="optimize.datas.length > 0" v-for="item in optimize.datas">
                      <!--<td class="el-table_1_column_22 el-table-column&#45;&#45;selection" style="width: 10%">-->
                        <!--<div class="cell">-->
                          <!--<div class="checkbox">-->
                            <!--<input :id="item.id" :value="item.id" v-model="selectId" type="checkbox" @click="select({id: [item.id], isSelect: item.isSelect, type: 'CLICK_RATE_SEARCH'})">-->
                            <!--<label :for="item.id"><span></span><i class="fa fa-check"></i></label>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</td>-->
                      <td class="el-table_1_column_24" style="width: 33.3%"><div class="cell">{{item.groupName || module.tableEmptyPlaceholder}}</div></td>
                      <td class="el-table_1_column_25" style="width: 33.3%"><div class="cell">{{item.campaignName || module.tableEmptyPlaceholder}}</div></td>
                      <td class="el-table_1_column_26" style="width: 33.3%">
                        <div class="cell">
                          建议添加 <span style="color: red;">{{item.proposalAd || module.tableEmptyPlaceholder}}</span> 条广告语
                          <a @click="openDialog(item.id)" style="color: #0c81d8;margin-left: 20px;">立即添加</a>
                        </div>
                      </td>
                      <td class="gutter"></td>
                    </tr>
                    <tr v-if="optimize.datas.length === 0" class="emptyTr text-center"><td colspan="3">{{module.tableNullData}}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div class="el-table__column-resize-proxy" style="display: none;"></div>
                <div class="resize-triggers">
                  <div class="expand-trigger">
                    <div></div>
                  </div>
                  <div class="contract-trigger"></div>
                </div>
              </div>
            </div>
            <!--OptimizeDialog-->
            <TextAdDialogs v-if="visible"></TextAdDialogs>
          </div>
          <!--page-->
          <pagination
            :request="optimize.sortStatus"
            :total="optimize.listTotal"
            :pageSize="query.pageSize"
            :dispatch="'getTAOptimizeList'"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import pagination from '../../common/Pagination'
  import TextAdDialogs from './textAdDialogs.vue'
  export default {
    name: 'component',
    data () {
      return {
        order: ['', '', 'ascending'], // 排序列的初始状态
        prop: 'proposalAd' // 当前排序字段
      }
    },
    components: {
      pagination,
      TextAdDialogs
    },
    updated () {
      // 更新表格宽度
      this.tableWidth()
    },
    mounted () {
      this.tableHeight()
      window.addEventListener('resize', this.tableHeight, false)
      window.addEventListener('resize', this.tableWidth, false)
      document.querySelector('.el-table__body-wrapper').addEventListener('scroll', this.scrollTbody, false)
    },
    destroyed () {
      window.removeEventListener('resize', this.tableHeight, false)
      window.removeEventListener('resize', this.tableWidth, false)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      visible: {
        get () {
          return this.$store.state.textAd.optimize.visible
        },
        set (val) {
          this.$store.commit('GET_TA_OP_DIALOG', val)
        }
      },
      optimize () {
        return this.$store.state.textAd.optimize
      },
      selectId: {   // 选中id数组
        get () {
          return this.$store.state.textAd.optimize.selectId
        },
        set (val) {
          this.$store.commit('GET_TA_OP_SELECT_ID', val)
        }
      },
      allSelectStatus: { // 全选状态
        get () {
          return this.$store.state.textAd.optimize.allSelectStatus
        },
        set (val) {
          this.$store.commit('GET_TA_OP_SELECT', val)
        }
      }
    },
    methods: {
      select (argus) { // 复选框请求
        let dom = document.getElementById(argus.id[0])
        if (dom.checked === false) {
          argus.isSelect = false
        } else {
          argus.isSelect = true
        }
        this.$store.dispatch('getCheck', argus)
      },
      scrollTbody () {
        document.querySelector('.el-table__header').style.left = -document.querySelector('.el-table__body-wrapper').scrollLeft + 'px'
      },
      tableWidth () {
        var obj = document.querySelector('.el-table__body-wrapper')
        if (obj.scrollHeight > obj.clientHeight || obj.scrollWidth > obj.clientWidth) {
          document.querySelector('.gutter').style.width = '17px'
          document.querySelector('.el-table__header').style.minWidth = parseInt(document.querySelector('.el-table__body').style.minWidth) + 17 + 'px'
        } else {
          document.querySelector('.gutter').style.width = '0px'
          document.querySelector('.el-table__header').style.minWidth = parseInt(document.querySelector('.el-table__body').style.minWidth) + 'px'
        }
      },
      tableHeight () {
        var height = document.body.clientHeight -
          document.querySelector('.top-height').offsetHeight -
          document.querySelector('.title-box').offsetHeight -
          document.querySelector('.top-nav').offsetHeight - 111
        document.querySelector('.el-table').style.maxHeight = height + 'px'
        document.querySelector('.el-table__body-wrapper').style.maxHeight = height - 46 + 'px'
      },
      openDialog (val) {
        this.$store.commit('GET_TA_OP_DIALOG_ID', val)
      },
      checkedAll () { // 全选
        var _this = this
        if (!_this.allSelectStatus) { // 实现全选
          _this.selectId = []
          _this.optimize.datas.forEach(function (item) {    // 列表全选中，获取全部ID
            _this.selectId.push(item.id)
          })
        } else { // 取消全选
          _this.selectId = []
        }
        var requestId = []
        _this.optimize.datas.forEach(function (item) {    // 不管选不选中，都要获取全部ID发送后端
          requestId.push(item.id)
        })

        let request = {
          id: requestId,
          type: _this.optimize.datas[0].type,
          isSelect: !_this.allSelectStatus
        }
        this.$store.dispatch('getCheck', request)
      },
      refresh () {
        this.$store.dispatch('getRefresh')
      },
      sortMethod (argus) { // 排序
        var results = Vue.sortMethod(argus, this.prop, this.order)
        argus = results.argus
        this.prop = results.prop
        this.order = results.order
        this.$store.commit('GET_TA_OP_SORT', argus)
      }
    }
  }
</script>
