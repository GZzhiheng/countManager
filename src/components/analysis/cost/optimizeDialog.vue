<style scoped>
  .el-dialog{width: auto !important;}
</style>
<template>
  <div class="dialogs-component">
    <el-dialog title="添加否定关键字" :visible.sync="visible" width="50%">
      <div class="content">
        <span style="padding: 0 20px;color: #888;font-size: 12px">提示：会以添加后的否定关键字展示！</span>
        <div class="col-xs-12 table-responsive table-box table-shadow table-title-top mb-20">
          <div class="optimize-dialog-table el-table el-table--fit el-table--border el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
            <div class="el-table__header-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="optimize-dialog-el-table-header el-table__header position-relative" style="width: 100%;">
                <thead>
                <tr>
                  <th class="el-table_1_column_22 el-table-column--selection is-leaf" style="width: 48px">
                    <div class="cell">
                      <div class="checkbox">
                        <input id="dialogAllSelect" v-model="allSelectStatus" @click="checkedAll" type="checkbox">
                        <label for="dialogAllSelect"><span></span><i class="fa fa-check"></i></label>
                      </div>
                      </label>
                    </div>
                  </th>
                  <th class="el-table_1_column_23 is-leaf is-sortable" :class="order[0]" style="width: 122px" @click="sortMethod({prop: 'criteria', order: order[0], index: 0})" >
                    <div class="cell">词根<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_24 is-leaf" style="width: 95px">
                    <div class="cell">匹配方式<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_25 is-leaf is-sortable" :class="order[1]" style="width: 130px" @click="sortMethod({prop: 'groupName', order: order[1], index: 1})">
                    <div class="cell">广告组<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_26 is-leaf is-sortable" :class="order[2]" style="width: 130px" @click="sortMethod({prop: 'campaignName', order: order[2], index: 2})">
                    <div class="cell">广告系列<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_27 is-leaf is-sortable" :class="order[3]" style="width: 97px" @click="sortMethod({prop: 'conversions', order: order[3], index: 3})">
                    <div class="cell">总转化次数<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_28 is-leaf is-sortable" :class="order[4]" style="width: 84px" @click="sortMethod({prop: 'cpa', order: order[4], index: 4})">
                    <div class="cell">平均CPA<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="el-table_1_column_29 is-leaf is-sortable" :class="order[5]" style="width: 100px" @click="sortMethod({prop: 'cost', order: order[5], index: 5})">
                    <div class="cell">总消费<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></div>
                  </th>
                  <th class="gutter optimize-dialog-gutter" style="width: 17px;"></th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="optimize-dialog-table-body-wrapper el-table__body-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="optimize-dialog-table-body el-table__body" style="width: 100%;min-width: 806px">
                <tbody>
                <tr class="el-table__row" v-if="optimize.datas.length>0" v-for="(item, index) in optimize.datas">
                  <td class="el-table_1_column_22 el-table-column--selection" style="width: 48px">
                    <div class="cell">
                      <div class="checkbox">
                        <input :id="item.id" :value="item.id" v-model="selectId" type="checkbox" @click="select({id: [item.id], isSelect: item.isSelect, type: 'WAST_COST_SUB'})">
                        <label :for="item.id"><span></span><i class="fa fa-check"></i></label>
                      </div>
                    </div>
                  </td>
                  <td class="el-table_1_column_23" style="width: 122px">
                    <div class="cell">{{item.criteria || module.tableEmptyPlaceholder}}</div>
                    <!--<div class="cell table-pencil-up" @click="dialogScreen(item.id, item.criteria)">-->
                      <!--<p class="glyphicon-p" :title="item.criteria" :id="item.id + 'input'"></p>-->
                      <!--<i class="glyphicon glyphicon-pencil" ></i>-->
                    <!--</div>-->
                    <!--<div class="optimize-dialog" :id="item.id + 'dialog'">-->
                      <!--<div class="optimize-dialog-box">-->
                        <!--<input type="text" class="dialog-input" v-model="item.criteria">-->
                        <!--<button class="dialog-save" @click="dialogScreenBtn(item.id, 'ok')">保存</button>-->
                        <!--<button class="dialog-off" @click="dialogScreenBtn(item.id, 'cancel')">取消</button>-->
                      <!--</div>-->
                    <!--</div>-->
                  </td>
                  <td class="el-table_1_column_24" style="width: 95px">
                    <div class="cell tableSelect">
                      <template>
                        <el-select v-model="optimize.matchStatus[index]" placeholder="请选择" popper-class="tableSelectBox">
                          <el-option
                            v-for="item in commonData.matchType[index]"
                            :key="item.key"
                            :label="item.name"
                            :value="item.key">
                          </el-option>
                        </el-select>
                      </template>
                    </div>
                  </td>
                  <td class="el-table_1_column_25" style="width: 130px"><div class="cell">{{item.groupName || module.tableEmptyPlaceholder}}</div></td>
                  <td class="el-table_1_column_26" style="width: 130px"><div class="cell">{{item.campaignName || module.tableEmptyPlaceholder}}</div></td>
                  <td class="el-table_1_column_27" style="width: 97px"><div class="cell">{{item.conversions || module.tableEmptyPlaceholder}}</div></td>
                  <td class="el-table_1_column_28 text-right" style="width: 84px"><div class="cell">￥{{$toFixed(item.cpa) || module.tableEmptyPlaceholder}}</div></td>
                  <td class="el-table_1_column_30 text-right" style="width: 100px"><div class="cell">￥{{$toFixed(item.cost) || module.tableEmptyPlaceholder}}</div></td>
                  <td class="gutter optimize-dialog-gutter-body"></td>
                </tr>
                <tr v-if="optimize.datas.length === 0" class="emptyTr text-center"><td colspan="6">{{module.tableNullData}}</td></tr>
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
          :request="sortStatus"
          :total="list.rowCount"
          :pageSize="query.pageSize"
          :dispatch="'getNKOptimizeDialogList'"
        ></pagination>
        <!--page-->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="okMethod()" class="el-btn-bgc">确认添加</el-button>
        <el-button @click="visible = false" class="el-btn-bgc-off">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import pagination from '../../common/Pagination'
  export default {
    data () {
      return {
        order: ['', '', '', '', '', 'ascending'], // 排序列的初始状态
        prop: 'cost'                        // 当前排序字段
//        modifyDialog: false,            // 修改框显示
//        modifyVal: ''                     // 修改框显示
      }
    },
    components: {
      pagination
    },
    updated () {
      this.tableHeight()
      this.tableWidth()
    },
    mounted () {
      document.querySelector('.el-table__body-wrapper').addEventListener('scroll', this.scrollTbody, false)
    },
    destroyed () {
      document.querySelector('.el-table__body-wrapper').removeEventListener('scroll', this.scrollTbody, false)
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
      list () {
        return this.$store.state.cost.optimize.nk.dialog.optimize.list
      },
      selectRowMsg () {
        return this.$store.state.cost.optimize.nk.dialog.optimize.selectRowMsg
      },
      optimize () {
        return this.$store.state.cost.optimize.nk.dialog.optimize
      },
      sortStatus () {
        return this.$store.state.cost.optimize.nk.dialog.optimize.sortStatus
      },
      selectId: {   // 选中id数组
        get () {
          return this.$store.state.cost.optimize.nk.dialog.optimize.selectId
        },
        set (val) {
          this.$store.commit('GET_NK_OPTIMIZE_DIALOG_SELECT_ID', val)
        }
      },
      allSelectStatus: { // 全选状态
        get () {
          return this.$store.state.cost.optimize.nk.dialog.optimize.allSelectStatus
        },
        set (val) {
          this.$store.commit('GET_NK_OPTIMIZE_DIALOG_ALL_SELECT', val)
        }
      },
      visible: {
        get () {
          return this.$store.state.cost.optimize.nk.dialog.optimize.visible
        },
        set (val) {
          this.$store.commit('GET_NK_OPTIMIZE_DIALOG', val)
        }
      }
    },
    methods: {
      tableHeight () {
        if (document.querySelector('.optimize-dialog-table')) {
          document.querySelector('.optimize-dialog-table').style.maxHeight = '500px'
          document.querySelector('.optimize-dialog-table-body-wrapper').style.maxHeight = parseInt(document.querySelector('.optimize-dialog-table').style.maxHeight) - 46 + 'px'
        }
      },
      tableWidth () {
        if (document.querySelector('.optimize-dialog-table-body-wrapper')) {
          var obj = document.querySelector('.optimize-dialog-table-body-wrapper')
          if (obj.scrollHeight > obj.clientHeight || obj.scrollWidth > obj.clientWidth) {
            document.querySelector('.optimize-dialog-gutter').style.width = '17px'
            document.querySelector('.optimize-dialog-gutter-body').style.width = '0px'
            document.querySelector('.optimize-dialog-el-table-header').style.minWidth = parseInt(document.querySelector('.optimize-dialog-table-body').style.minWidth) + 17 + 'px'
          } else {
            document.querySelector('.optimize-dialog-gutter').style.width = '1px'
            document.querySelector('.optimize-dialog-gutter-body').style.width = '1px'
            document.querySelector('.optimize-dialog-el-table-header').style.minWidth = parseInt(document.querySelector('.optimize-dialog-table-body').style.minWidth) + 'px'
          }
        }
      },
      scrollTbody () {
        document.querySelector('.optimize-dialog-el-table-header').style.left = -document.querySelector('.optimize-dialog-table-body-wrapper').scrollLeft + 'px'
      },
      select (argus) { // 复选框请求
        let dom = document.getElementById(argus.id[0])
        if (dom.checked === false) {
          argus.isSelect = false
        } else {
          argus.isSelect = true
        }
        this.$store.dispatch('getCheck', argus)
      },
//      dialogScreen (id, initVal) {    // id弹框, initVal初始值
//        this.modifyVal = initVal
//        document.getElementById(id + 'dialog').style.display = 'block'
//      },
//      dialogScreenBtn (id, type) {    // id 弹框，type点击按钮类型
//        if (type === 'ok') {
//          document.getElementById(id + 'dialog').style.display = 'none'
//          this.criteria = document.getElementById(id).innerText
//        }
//        if (type === 'cancel') {
//          document.getElementById(id + 'input').innerText = this.modifyVal
//          document.getElementById(id + 'dialog').style.display = 'none'
//        }
//      },
      sortMethod (argus) { // 排序
        var results = Vue.sortMethod(argus, this.prop, this.order)
        argus = results.argus
        this.prop = results.prop
        this.order = results.order
        this.$store.commit('GET_NK_OPTIMIZE_DIALOG_SORT', argus)
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
        _this.optimize.datas.forEach(function (item) {    // 不管选不选中，都要获取全部ID发送后端,为了保存是否选中状态
          requestId.push(item.id)
        })

        let request = {
          id: requestId,
          type: _this.optimize.datas[0].type,
          isSelect: !_this.allSelectStatus
        }
        this.$store.dispatch('getCheck', request) // 保留状态
      },
      okMethod () {
        var _this = this
        let matchType
        _this.optimize.datas.forEach(function (item1, index1) {
          let dom = document.getElementById(item1.id)
          if (dom.checked === true) {
            // keyword = document.getElementById(item1.id + 'input').innerText
            matchType = _this.optimize.matchStatus[index1]
            _this.selectRowMsg.push({id: item1.id, matchType: matchType}) // keyword: keyword
          }
        })
        this.$store.dispatch('getNKOptimizeDialogOk', {pageSize: this.query.pageSize, pageNum: this.query.pageNum, msg: _this.selectRowMsg})
        // this.$store.dispatch('getNKOptimizeList', {pageSize: this.query.pageSize, pageNum: this.query.pageNum}) // 刷新列表
      }
    }
  }
</script>
