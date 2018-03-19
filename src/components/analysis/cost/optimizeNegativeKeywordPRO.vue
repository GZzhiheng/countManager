<template>
  <!--主体内容组件-->
  <div>
    <div class="clearfix pad-lt-rt-20 position-relative title-box">
      <div class="form-span-color table-blod-title table-title-bgc">
        <span>消费</span>
        <span class="suggest-data-color">≥30天</span>
        <span>或</span>
        <span class="suggest-data-color">30天内</span>
        <span>全部搜索广告系列至少</span>
        <span class="suggest-data-color">1</span>
        <span>个转化使用，推荐的数据会更准确</span>
      </div>
      <div class="pull-left table-title-left-width">
        <!--<div class="form-span-color table-light-title">-->
          <!--<span>上次优化时间：</span>-->
          <!--<span>2017-04-15</span>-->
          <!--<span>建议您</span>-->
          <!--<span class="suggest-data-color">4月22日</span>-->
          <!--<span>再进行优化,避免过度优化</span>-->
        <!--</div>-->
        <div class="form-span-color table-blod-title">
          <span>过去30天里，以下搜索词</span>
          <span>触发了您的关键字并产生了费用却</span>
          <span class="suggest-data-color">0</span>
          <span>转化</span>
          <span>这些词可能会提高您的每次转化成本，立即添加为否定关键字，节省您的花费</span>
        </div>
      </div>
      <div class="pull-left table-title-right-width absolute-right-bottom">
        <!--<a class="btn null-border-ok-btn height-28 vertical-initial pull-right ml-10">导出</a>
        <a class="btn normal-blod-ok-btn height-28 vertical-initial pull-right">刷新</a>-->
        <div :class="selectId.length > 0 ? '': 'btn-mask-box'">
          <!--<div class="dropdown btn-drop pull-right mr-20">
            <button type="button"  class="btn weight-blod-ok-btn mask-weight-blod-ok-btn height-28 vertical-initial" data-toggle="dropdown">
              忽略</button>
            <ul class="dropdown-menu dropdownSelect-menu border-radio-3" role="menu">
              <template v-for="item in commonData.ignoreRangeData">
                <li role="presentation">
                  <a role="menuitem" tabindex="-1" href="javascript:;">{{item.name}}</a>
                </li>
              </template>
            </ul>
          </div>-->
          <a class="btn normal-blod-ok-btn mask-normal-blod-ok-btn height-28 vertical-initial pull-right mr-20" @click="addDialog">立即添加</a>
          <div class="btn-mask negative-keyword-btn-mask" style="width: 72px;right: 121px;">
            <div class="btn-mask-hover-title">列表选中后可操作性</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 table-shadow table-title-top mb-20">
      <div class="el-table el-table--fit el-table--border el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header position-relative" style="width: 100%;">
            <thead>
            <tr>
              <th class="el-table_1_column_22 el-table-column--selection is-leaf" style="width: 5%">
                <div class="cell">
                  <div class="checkbox">
                    <input id="allSelect" v-model="allSelectStatus" @click="checkedAll" type="checkbox">
                    <label for="allSelect"><span></span><i class="fa fa-check"></i></label>
                  </div>
                  </label>
                </div>
              </th>
              <th class="el-table_1_column_23 is-leaf is-sortable" :class="order[0]" style="width: 26%" @click="sortMethod({prop: 'criteria', order: order[0], index: 0})" >
                <div class="cell">搜索词<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_24 is-leaf is-sortable" :class="order[1]" style="width: 13%" @click="sortMethod({prop: 'groupName', order: order[1], index: 1})">
                <div class="cell">广告组<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_25 is-leaf is-sortable" :class="order[2]" style="width: 13%" @click="sortMethod({prop: 'campaignName', order: order[2], index: 2})">
                <div class="cell">广告系列<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_26 is-leaf is-sortable" :class="order[3]" style="width: 8%" @click="sortMethod({prop: 'clicks', order: order[3], index: 3})">
                <div class="cell">点击次数<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_28 is-leaf is-sortable" :class="order[4]" style="width: 8%" @click="sortMethod({prop: 'conversions', order: order[4], index: 4})">
                <div class="cell">转化次数<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_30 is-leaf is-sortable" :class="order[5]" style="width: 9%" @click="sortMethod({prop: 'cpa', order: order[5], index: 5})">
                <div class="cell">CPA<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_30 is-leaf is-sortable" :class="order[6]" style="width: 9%" @click="sortMethod({prop: 'accountCpa', order: order[6], index: 6})">
                <div class="cell">账户CPA<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="el-table_1_column_29 is-leaf is-sortable" :class="order[7]" style="width: 9%" @click="sortMethod({prop: 'cost', order: order[7], index: 7})">
                <div class="cell">总消费<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
              </th>
              <th class="gutter" style="width: 17px;"></th>
            </tr>
            </thead>
          </table>
        </div>
        <div class="el-table__body-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;min-width: 1056px">
            <tbody>
            <tr class="el-table__row" v-if="nkPro.datas.length > 0" v-for="item in nkPro.datas">
              <td class="el-table_1_column_22 el-table-column--selection" style="width: 5%">
                <div class="cell">
                  <div class="checkbox">
                    <input :id="item.id" :value="item.id" v-model="selectId" type="checkbox" @click="select({id: [item.id], isSelect: item.isSelect, type: 'WAST_COST'})">
                    <label :for="item.id"><span></span><i class="fa fa-check"></i></label>
                  </div>
                </div>
              </td>
              <td class="el-table_1_column_23" style="width: 26%"><div class="cell" v-html="item.criteria"></div></td>
              <td class="el-table_1_column_24" style="width: 13%"><div class="cell">{{item.groupName || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_25" style="width: 13%"><div class="cell">{{item.campaignName || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_26" style="width: 8%"><div class="cell">{{item.clicks || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_27" style="width: 8%"><div class="cell">{{item.conversions || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_28 text-right" style="width: 9%"><div class="cell">￥{{$toFixed(item.cpa) || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_29 text-right" style="width: 9%"><div class="cell">￥{{$toFixed(item.accountCpa) || module.tableEmptyPlaceholder}}</div></td>
              <td class="el-table_1_column_30 text-right" style="width: 9%"><div class="cell">￥{{$toFixed(item.cost) || module.tableEmptyPlaceholder}}</div></td>
              <td class="gutter"></td>
            </tr>
            <tr v-if="nkPro.datas.length === 0" class="emptyTr text-center"><td colspan="8">{{module.tableNullData}}</td></tr>
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
    <!--page-->
    <pagination
      :request="nkPro.sortStatus"
      :total="nkPro.listTotal"
      :pageSize="query.pageSize"
      :dispatch="'getNKProOptimizeList'"
    ></pagination>
  </div>
</template>

<script>
  import Vue from 'vue'
  import pagination from '../../common/Pagination'
  export default {
    name: 'component',
    data () {
      return {
        order: ['', '', '', '', '', '', '', 'ascending'], // 排序列的初始状态
        prop: 'cost' // 当前排序字段
      }
    },
    components: {
      pagination
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
      commonData () {
        return this.$store.state.commonData
      },
      nkPro () {
        return this.$store.state.cost.optimize.nkPro
      },
      list () {
        return this.$store.state.cost.optimize.nkPro.list
      },
      selectId: {   // 选中id数组
        get () {
          return this.$store.state.cost.optimize.nkPro.selectId
        },
        set (val) {
          this.$store.commit('GET_NK_PRO_OPTIMIZE_SELECT_ID', val)
        }
      },
      allSelectStatus: { // 全选状态
        get () {
          return this.$store.state.cost.optimize.nkPro.allSelectStatus
        },
        set (val) {
          this.$store.commit('GET_NK_PRO_OPTIMIZE_SELECT', val)
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
          document.querySelector('.gutter').style.width = 17 + 'px'
          document.querySelector('.el-table__header').style.minWidth = parseInt(document.querySelector('.el-table__body').style.minWidth) + 17 + 'px'
        } else {
          document.querySelector('.gutter').style.width = 0 + 'px'
          document.querySelector('.el-table__header').style.minWidth = parseInt(document.querySelector('.el-table__body').style.minWidth) + 'px'
        }
      },
      tableHeight () {
        var height = document.body.clientHeight -
          document.querySelector('.analyze-nav').offsetHeight -
          document.querySelector('.top-height').offsetHeight -
          document.querySelector('.title-box').offsetHeight -
          document.querySelector('.top-nav').offsetHeight - 111
        document.querySelector('.el-table').style.maxHeight = height + 'px'
        document.querySelector('.el-table__body-wrapper').style.maxHeight = height - 46 + 'px'
      },
      checkedAll () { // 全选
        var _this = this
        if (!_this.allSelectStatus) { // 实现全选
          _this.selectId = []
          _this.nkPro.datas.forEach(function (item) {    // 列表全选中，获取全部ID
            _this.selectId.push(item.id)
          })
        } else { // 取消全选
          _this.selectId = []
        }
        var requestId = []
        _this.nkPro.datas.forEach(function (item) {    // 不管选不选中，都要获取全部ID发送后端
          requestId.push(item.id)
        })

        let request = {
          id: requestId,
          type: _this.nkPro.datas[0].type,
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
        this.$store.commit('GET_NK_PRO_OPTIMIZE_SORT', argus)
      },
      addDialog () {
        var _this = this
        _this.$confirm('会以添加后的否定关键字展示，是否确定添加为否定关键字！', '', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          confirmButtonClass: 'el-Success-Dialog',   // 按钮类名定义
          cancelButtonClass: 'el-off-Dialog'   // 按钮类名定义
        }).then(function () {
          _this.$store.dispatch('getNKProOptimizeList', {pageSize: _this.query.pageSize, pageNum: _this.query.pageNum}) // 刷新列表
          _this.$store.dispatch('getNKProAddDialogOk')
        }).catch(function () {  // 取消方法
        })
      }
    }
  }
</script>
