<style>

</style>
<template>
  <!--主体内容组件-->
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20 position-absolute">
        <div class="pull-left page-title">
          <router-link :to="{name: 'Index'}" class="return-icon"></router-link>历史分析
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20 ">
      <div class="bgc-white border-radius-5 mt-10">
        <div class="clearfix height-56">
          <form class="form-horizontal" role="form" id="queryFrm">
            <fieldset>
              <div class="clearfix">
                <div class="form-group height-box-28 width-box-144">
                  <div class="col-md-12">
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1">业务员：</span>
                      <div class="el-select-height-28 pull-left mr-40 ml-5 mt-14">
                        <template>
                          <el-select v-model="historySalesmanStatus" @change="chooseCustomer(historySalesmanStatus)" filterable placeholder="请选择">
                            <template v-for="item in history.salesmanData">
                            <el-option
                              v-if="item.no"
                              :key="item.id"
                              :label="item.no +'/'+ item.name"
                              :value="item.id">
                            </el-option>
                            <el-option
                              v-else
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                            </template>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1">客户：</span>
                      <div class="el-select-height-28 pull-left width-box-210 mr-40 ml-5 mt-14">
                        <template>
                          <el-select v-model="historyCustomerStatus" @change="chooseAccount(historyCustomerStatus)" filterable placeholder="请选择">
                            <template v-for="item in history.customerData">
                              <el-option
                                v-if="item.no"
                                :key="item.id"
                                :label="item.no +'/'+ item.name"
                                :value="item.id">
                              </el-option>
                              <el-option
                                v-else
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </template>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1">账户：</span>
                      <div class="el-select-height-28 pull-left width-box-210 mr-40 ml-5 mt-14">
                        <template>
                          <el-select v-model="historyAccountStatus" filterable placeholder="请选择">
                            <template v-for="item in history.accountData">
                              <el-option
                                v-if="item.account"
                                :key="item.id"
                                :label="item.account +'/'+ item.name"
                                :value="item.id">
                              </el-option>
                              <el-option
                                v-else
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </template>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <a class="btn normal-blod-ok-btn height-28 vertical-initial" @click="search">搜索</a>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="clearfix">
          <div class="col-xs-12 table-shadow mb-20">
            <div class="el-table el-table--fit el-table--border el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header position-relative" style="width: 100%;">
                  <thead>
                    <th class="el-table_1_column_22 el-table-column--selection is-leaf" style="width: 5%">
                      <div class="cell">
                      </div>
                    </th>
                    <th class="el-table_1_column_23 is-leaf"  style="width: 12%" >
                      <div class="cell">优化师<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="el-table_1_column_24 is-leaf" style="width: 40%">
                      <div class="cell">客户<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="el-table_1_column_25 is-leaf" style="width: 12%">
                      <div class="cell">账号<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="el-table_1_column_26 is-leaf" style="width: 12%">
                      <div class="cell">账户总评分<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="el-table_1_column_28 is-leaf" style="width: 14%">
                      <div class="cell">生成日期<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="el-table_1_column_30 is-leaf" style="width: 5%">
                      <div class="cell">操作<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                    </th>
                    <th class="gutter" style="width: 17px;"></th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;min-width: 1034px">
                  <tbody>
                  <tr class="el-table__row" :class="item.status === '1'?'pointer':''" v-if="history.datas.length > 0" v-for="item in history.datas" @dblclick.stop="see(item.id, item.status)">
                    <td class="el-table_1_column_22 el-table-column--selection" style="width: 5%">
                      <div class="cell icon-td" style="text-align: left">
                        <i v-if="item.status === '0'" class="analysis-status analysis-unfinished" title="分析未完成"></i>
                        <i v-if="item.status === '1'" class="analysis-status analysis-finished" title="分析完成"></i>
                        <i v-if="item.status === '2'" class="analysis-status analysis-finished-data-Error" title="分析完成,但业务数据错误"></i>
                        <i v-if="item.status === '3'" class="analysis-status analysis-finished-system-Error" title="分析完成，但系统错误"></i>
                      </div>
                    </td>
                    <td class="el-table_1_column_23" style="width: 12%"><div class="cell">{{item.clientMgrName || module.tableEmptyPlaceholder}}</div></td>
                    <td class="el-table_1_column_24" style="width: 40%"><div class="cell">{{item.clientName || module.tableEmptyPlaceholder}}</div></td>
                    <td class="el-table_1_column_25" style="width: 12%"><div class="cell">{{item.account || module.tableEmptyPlaceholder}}</div></td>
                    <td class="el-table_1_column_26" style="width: 12%"><div class="cell">{{$toFixedVue(item.score) || module.tableEmptyPlaceholder}}</div></td>
                    <td class="el-table_1_column_27" style="width: 14%"><div class="cell">{{item.createAt || module.tableEmptyPlaceholder}}</div></td>
                    <td class="el-table_1_column_28" style="width: 5%">
                      <div class="cell">
                        <a style="color: #00aabb" @click.stop="see(item.id, item.status)" v-if="item.status === '1'">查看</a>
                      </div>
                    </td>
                    <td class="gutter"></td>
                  </tr>
                  <tr v-if="history.datas.length === 0" class="emptyTr text-center"><td colspan="6">{{module.tableNullData}}</td></tr>
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
          <pagination
            :total="history.listTotal"
            :pageSize="query.pageSize"
            :dispatch="'getHistory'"
          ></pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import router from './../../router'
  import pagination from '../common/Pagination'
  export default {
    name: 'component',
    data () {
      return {
        allowEmpty: false
      }
    },
    components: {
      pagination
    },
    updated () {
      // 更新表格宽度
      this.tableWidth()
      this.tableHeight()
    },
    mounted () {
      this.tableWidth()
      this.tableHeight()
      this.$store.dispatch('getSalesmanHistory')
      this.$store.dispatch('getAccountHistory')
      this.$store.dispatch('getCustomerHistory')
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
      active () {
        return this.$store.state.active
      },
      history () {
        return this.$store.state.history
      },
      historySalesmanStatus: {
        get () {
          return this.$store.state.query.historySalesmanStatus
        },
        set (val) {
          this.$store.commit('QUERY_HISTORY_SALESMAN', val)
        }
      },
      historyCustomerStatus: {
        get () {
          return this.$store.state.query.historyCustomerStatus
        },
        set (val) {
          this.$store.commit('QUERY_HISTORY_CUSTOMER', val)
        }
      },
      historyAccountStatus: {
        get () {
          return this.$store.state.query.historyAccountStatus
        },
        set (val) {
          this.$store.commit('QUERY_HISTORY_ACCOUNT', val)
        }
      }
    },
    methods: {
      see (val, status) {
        if (status === '1') {
          this.$store.commit('QUERY_ANALYSIS_RECORD_ID', val)
          this.active.analysis.view = 'Cost'
          router.push({name: 'Cost'})
        }
      },
      search () {
        this.$store.dispatch('getHistory', {pageSize: this.query.pageSize, pageNum: this.query.pageNum})
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
          document.querySelector('.form-group').offsetHeight -
          document.querySelector('.top-nav').offsetHeight - 96
        document.querySelector('.el-table').style.maxHeight = height + 'px'
        document.querySelector('.el-table__body-wrapper').style.maxHeight = height - 46 + 'px'
      },
      chooseCustomer (val) {
        this.$store.dispatch('getCustomerHistory', val)
      },
      chooseAccount (val) {
        this.$store.dispatch('getAccountHistory', val)
      }
    }
  }
</script>
