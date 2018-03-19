import * as types from './mutation-types'

const scoreColor = (score, color) => {
  if (score < 60) {
    color = ['#ff7755', '#ebeff0']
  }
  if (score >= 60 && score < 80) {
    color = ['#f4ba4a', '#ebeff0']
  }
  if (score >= 80) {
    color = ['#4dbd74', '#ebeff0']
  }
  return color
}

export default {
  /** ***** loading动画 ******** **/
  // 打开加载动画
  [types.LOADING_OPEN] (state) {
    state.publicLoading = true
  },

  // 关闭加载动画
  [types.LOADING_CLOSE] (state) {
    state.publicLoading = false
  },

  // 更新路由元信息状态
  [types.CHANGE_ROUTE] (state, argus) {
    state.$route = argus
    if (argus.fullPath.indexOf('cost/optimize') > 0) {
      state.active.cost.view = argus.name
      return
    }
    if (argus.fullPath.indexOf('ctr/optimize') > 0) {
      state.active.ctr.view = argus.name
      return
    }
    if (argus.fullPath.indexOf('share/optimize') > 0) {
      state.active.shareNum.view = argus.name
      return
    }
    if (argus.fullPath.indexOf('analysis') > 0) {
      state.active.analysis.view = argus.name
    }
  },
  // 关闭模态框
  [types.MODAL_CLOSE] (state, index) {
    state.modals.splice(index, 1)
  },

  /** ***** 账户******** **/
  // 获取业务员下拉框
  [types.GET_SALEMAN] (state, argus) {
    state.query.salesmanData = argus.data
  },

  // 获取客户下拉框
  [types.GET_CUSTOMER] (state, argus) {
    state.query.customerData = argus.data
  },

  // 获取客户下账户的下拉框
  [types.GET_ACCOUNT] (state, argus) {
    state.query.accountData = argus.data
  },

  // 更新入口页-更新业务员状态
  [types.QUERY_INDEX_SALESMAN] (state, argus) {
    state.query.indexSalesmanStatus = argus
    state.query.indexCustomerStatus = ''
    state.query.indexAccountStatus = ''
  },

  // 更新入口页-更新客户状态
  [types.QUERY_INDEX_CUSTOMER] (state, argus) {
    state.query.indexCustomerStatus = argus
    state.query.indexAccountStatus = ''
  },

  // 更新入口页-更新账户状态
  [types.QUERY_INDEX_ACCOUNT] (state, argus) {
    state.query.indexAccountStatus = argus
  },

  // 历史记录-获取业务员下拉框
  [types.GET_SALESMAN_HISTORY] (state, argus) {
    state.history.salesmanData = []
    state.history.salesmanData = argus.data
    state.history.salesmanData.unshift({id: '', name: '全部', no: ''})
  },

  // 历史记录-获取客户下拉框
  [types.GET_CUSTOMER_HISTORY] (state, argus) {
    state.history.customerData = []
    state.history.customerData = argus.data
    state.history.customerData.unshift({id: '', name: '全部', no: ''})
  },

  // 历史记录-获取客户下账户的下拉框
  [types.GET_ACCOUNT_HISTORY] (state, argus) {
    state.history.accountData = []
    if (argus.data) {
      state.history.accountData = argus.data
    }
    state.history.accountData.unshift({id: '', name: '全部', account: ''})
  },

  // 更新历史记录-更新业务员状态
  [types.QUERY_HISTORY_SALESMAN] (state, argus) {
    state.query.historySalesmanStatus = argus
    state.query.historyCustomerStatus = ''
    state.query.historyAccountStatus = ''
  },

  // 历史记录-更新客户状态
  [types.QUERY_HISTORY_CUSTOMER] (state, argus) {
    state.query.historyCustomerStatus = argus
    state.query.historyAccountStatus = ''
  },

  // 历史记录-更新账户状态
  [types.QUERY_HISTORY_ACCOUNT] (state, argus) {
    state.query.historyAccountStatus = argus
  },

  // 一键分析
  [types.GET_ANALYSIS] (state, argus) {
    state.query.recordId = argus.data
  },

  // 历史记录-查看
  [types.QUERY_ANALYSIS_RECORD_ID] (state, argus) {
    state.query.recordId = argus
  },

  // 进度条
  [types.GET_PERCENTAGE] (state, argus) {
    state.index.time = state.index.time + 1
    state.index.percentage = argus.data
    state.index.status = argus.status
    state.index.errMsg = argus.errMsg
  },

  // 更新入口页-百分数重置为0
  [types.QUERY_INDEX_PERCENTAGE] (state, argus) {
    state.index.percentage = argus
  },
  // 历史记录-数据
  [types.GET_HISTORY] (state, argus) {
    state.history.datas = argus.data.datas
    state.history.list = argus.data
    state.history.listTotal = argus.data.rowCount
  },

  // 历史记录-入口页传过来的下拉框状态
  [types.HISTORY_STATUS] (state) {
    state.query.historySalesmanStatus = state.query.indexSalesmanStatus
    state.query.historyCustomerStatus = state.query.indexCustomerStatus
    state.query.historyAccountStatus = state.query.indexAccountStatus
  },

  // 分析总体情况 - 下拉框状态改变并且过滤数据
  [types.QUERY_SUMMARY_FILTER] (state, argus) {
    state.query.analysisSummaryTimeStatus = argus  // 从 analysisSummary.data中拿全部数据
    for (let i = 0; i < state.analysisSummary.data.reportDataList.length; i++) { // 前端自己过滤下拉框条件, 过滤后的reportDataList存在list中
      if (state.analysisSummary.data.reportDataList[i].dayCount === state.query.analysisSummaryTimeStatus.id) {
        state.analysisSummary.list = state.analysisSummary.data.reportDataList[i]
      }
    }
  },

  // 分析结果视图-浪费花费-更新行业数据下拉框状态
  [types.QUERY_COST_PROFESSION_FILTER] (state, argus) {
    state.query.costProfessionStatus = argus
    state.cost.keywordBarData.bottomValue = state.cost.data.negativeKwBM[argus.id]  // 否定关键字-行业平均水平
  },

  // 忽略历史记录-更新维度状态
  [types.QUERY_IGNORE_HISTORY_DIMENSION] (state, argus) {
    state.query.ignoreHistoryDimensionStatus = argus
  },

  // 忽略历史记录-更新开始时间状态
  [types.QUERY_IGNORE_HISTORY_START_TIME] (state, argus) {
    state.query.ignoreHistoryTimeStatus.startTime = argus
  },
  // 忽略历史记录-更新结束时间状态
  [types.QUERY_IGNORE_HISTORY_END_TIME] (state, argus) {
    state.query.ignoreHistoryTimeStatus.endTime = argus
  },

  // 分析总体情况-初始化
  [types.GET_SUMMARY] (state, argus) {
    state.analysisSummary.data = argus.data  // 全部据全部存在analysisSummary.data中
    state.analysisSummary.analysisChartData.value = Math.round(argus.data.score)  // 指标得分
    state.analysisSummary.analysisChartData.color = []
    state.analysisSummary.analysisChartData.color = scoreColor(argus.data.score, state.analysisSummary.analysisChartData.color)
    for (let i = 0; i < state.analysisSummary.data.reportDataList.length; i++) { // 前端自己过滤下拉框条件，过滤后的reportDataList存在list中
      if (state.analysisSummary.data.reportDataList[i].dayCount === state.query.analysisSummaryTimeStatus.id) {
        state.analysisSummary.list = state.analysisSummary.data.reportDataList[i]
      }
    }
    state.query.wastCostTips = argus.data.wastCostTips
    state.query.qualityScoreTips = argus.data.qualityScoreTips
    state.query.clickRateTips = argus.data.clickRateTips
    state.query.textAdTips = argus.data.textAdTips
    state.query.longTailTips = argus.data.longTailTips
    state.query.impressionsShareTips = argus.data.impressionsShareTips
  },

  // 分析结果视图-浪费花费--初始化
  [types.GET_COST] (state, argus) {
    state.cost.data = argus.data  // 全部据全部存在analysisSummary.data中
    state.cost.pieData.value = argus.data.score // 指标得分
    state.cost.pieData.color = []
    state.cost.pieData.value = Math.round(argus.data.score) // 指标得分
    state.cost.pieData.color = scoreColor(argus.data.score, state.cost.pieData.color)
    state.cost.wastBarData.topValue = argus.data.wasteCost  // 浪费金额-过去30天
    state.cost.wastBarData.bottomValue = argus.data.yearWasteCost  // 浪费金额-预计十二个月
    state.cost.keywordBarData.topValue = argus.data.negativeKwCount  // 否定关键字-我
    state.cost.keywordBarData.bottomValue = argus.data.negativeKwBM[state.query.costProfessionStatus.id]  // 否定关键字-行业平均水平
  },

  // 分析结果视图-质量得分
  [types.GET_QUALITY] (state, argus) {
    state.quality.data = argus.data   // 指标得分
    state.quality.pieData.value = argus.data.score   // 指标得分
    state.quality.clicksIncrement = argus.data.clicksIncrement // 点击增长
    state.quality.savedCost = argus.data.savedCost       // 节省花费
    state.quality.pieData.value = Math.round(argus.data.score) // 指标得分
    state.quality.pieData.color = scoreColor(argus.data.score, state.quality.pieData.color)
    state.quality.barData.data = []
    for (var i = 0; i < argus.data.qualityScoreImpressionPercent.length; i++) {
      state.quality.barData.data.push([argus.data.qualityScoreImpressionPercent[i].score, argus.data.qualityScoreImpressionPercent[i].impressionPercent, argus.data.qualityScoreImpressionPercent[i].impressions])
    }
  },

  // 分析结果视图-点击率
  [types.GET_CTR] (state, argus) {
    let data = argus.data
    state.ctr.data = data // 指标得分
    state.ctr.pie.value = data.score // 指标得分
    state.ctr.list = data.deviceData
    state.ctr.scatter.scatterTopData = []
    state.ctr.scatter.scatterBottomData = []
    state.ctr.scatter.lineData = []
    state.ctr.pie.color = scoreColor(argus.data.score, state.ctr.pie.color)
    for (let i = 0; i < data.highKeywords.length; i++) {
      state.ctr.scatter.scatterTopData.push([data.highKeywords[i].averagePosition, data.highKeywords[i].ctr * 100])
    }
    for (let j = 0; j < data.lowKeywords.length; j++) {
      state.ctr.scatter.scatterBottomData.push([data.lowKeywords[j].averagePosition, data.lowKeywords[j].ctr * 100])
    }
    for (let k = 0; k < data.positionClickRateBM.length; k++) {
      state.ctr.scatter.lineData.push([data.positionClickRateBM[k].position, data.positionClickRateBM[k].clickRate])
    }
  },

  // 分析结果视图-文字广告
  [types.GET_TEXT_AD] (state, argus) {
    state.textAd.data = argus.data
    state.textAd.list = argus.data.adDeviceReport
    state.textAd.pieData.value = Math.round(argus.data.score)     // 指标得分
    state.textAd.barData.topValue = argus.data.avgTextAdCount.toFixed(1)     // 我
    state.textAd.barData.bottomValue = 2.5                        // 行业平均水平
    state.textAd.pieData.color = scoreColor(argus.data.score, state.textAd.pieData.color)
  },

  // 分析结果视图-长尾关键字
  [types.GET_LONG_TAIL_KEYWORD] (state, argus) {
    state.keyword.data = argus.data
    state.keyword.pie.value = Math.round(argus.data.score)         // 指标得分
    state.keyword.pie.color = scoreColor(argus.data.score, state.keyword.pie.color)
    state.keyword.ring.value = [
      argus.data.kwLengthData['1'].impressions,
      argus.data.kwLengthData['2'].impressions,
      argus.data.kwLengthData['3'].impressions
    ]
    state.keyword.percent = [
      (argus.data.kwLengthData['1'].impressionPercent * 100).toFixed(2),
      (argus.data.kwLengthData['2'].impressionPercent * 100).toFixed(2),
      (argus.data.kwLengthData['3'].impressionPercent * 100).toFixed(2)
    ]
  },

  // 分析结果视图-展示份额
  [types.GET_SHARE_NUMBER] (state, argus) {
    state.shareNum.data = argus.data
    state.shareNum.pie.value = Math.round(argus.data.score)         // 指标得分
    state.shareNum.pie.color = scoreColor(argus.data.score, state.shareNum.pie.color)
    state.shareNum.ring.value = [
      argus.data.budgetLostImpressionShareTotal,
      argus.data.rankLostImpressionShareTotal,
      argus.data.impressionShareTotal
    ]
    state.shareNum.percent = [
      argus.data.budgetLostImpressionShareTotal,
      argus.data.rankLostImpressionShareTotal,
      argus.data.impressionShare
    ]
  },

  // 分析结果视图-附加消息
  [types.QUERY_OVERHEAD] (state, argus) {
    state.overHead.data = argus.data
    state.overHead.pie.value = argus.data.score         // 指标得分
    state.overHead.pie.color = scoreColor(argus.data.score, state.overHead.pie.color)
  },

  // 分析结果视图-其他指标
  [types.QUERY_OTHER_INDEX] (state, argus) {
    state.otherIndex.data = argus.data
  },

  // 优化-浪费花费
  [types.GET_NK_OPTIMIZE_LIST] (state, argus) {
    state.cost.optimize.nk.totalWastCost = argus.totalWastCost
    state.cost.optimize.nk.totalSaveCost = argus.totalSaveCost
    state.cost.optimize.nk.listTotal = argus.data.rowCount
    state.cost.optimize.nk.list = argus.data
    state.cost.optimize.nk.datas = argus.data.datas
    state.cost.optimize.nk.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.cost.optimize.nk.selectId.push(arr[i].id)
      }
    }
    if (state.cost.optimize.nk.selectId.length === arr.length) {
      state.cost.optimize.nk.allSelectStatus = true
    } else {
      state.cost.optimize.nk.allSelectStatus = false
    }
  },

  // 优化-浪费花费-排序状态
  [types.GET_NK_OPTIMIZE_SORT] (state, argus) {
    state.cost.optimize.nk.sortStatus = argus
  },
  // 优化-浪费花费-全选状态
  [types.GET_NK_OPTIMIZE_SELECT] (state, argus) {
    state.cost.optimize.nk.allSelectStatus = argus
  },

  // 优化-浪费花费-选中的id数组
  [types.GET_NK_OPTIMIZE_SELECT_ID] (state, argus) {
    state.cost.optimize.nk.selectId = argus
  },

  // 优化结果视图-浪费花费-优化弹框
  [types.GET_NK_OPTIMIZE_DIALOG] (state, argus) {
    state.cost.optimize.nk.dialog.optimize.visible = argus
  },

  // 优化结果视图-浪费花费-优化弹框-列表
  [types.GET_NK_OPTIMIZE_DIALOG_LIST] (state, argus) {
    var obj = state.cost.optimize.nk.dialog.optimize
    obj.list = argus.data
    obj.datas = argus.data.datas
    obj.selectId = []
    var arr = argus.data.datas
    state.commonData.matchType = []
    obj.matchStatus = []
    for (let i = 0; i < arr.length; i++) {
      state.commonData.matchType.push([{name: '广泛匹配', key: 'BROAD'}, {name: '完全匹配', key: 'EXACT'}, {name: '词组匹配', key: 'PHRASE'}])
      obj.matchStatus.push('BROAD')
      if (arr[i].isSelect === 'true') {
        obj.selectId.push(arr[i].id)
      }
    }
    if (obj.selectId.length === arr.length) {
      obj.allSelectStatus = true
    } else {
      obj.allSelectStatus = false
    }
  },

  // 优化-浪费花费-优化弹框-排序状态
  [types.GET_NK_OPTIMIZE_DIALOG_SORT] (state, argus) {
    state.cost.optimize.nk.dialog.optimize.sortStatus = argus
  },

  // 优化结果视图-浪费花费-优化弹框-全选状态
  [types.GET_NK_OPTIMIZE_DIALOG_ALL_SELECT] (state, argus) {
    state.cost.optimize.nk.dialog.optimize.allSelectStatus = argus
  },

  // 优化-浪费花费-优化弹框-选中的id数组
  [types.GET_NK_OPTIMIZE_DIALOG_SELECT_ID] (state, argus) {
    state.cost.optimize.nk.dialog.optimize.selectId = argus
  },

  // 优化-浪费花费-优化弹框-选中的id数组
  [types.NK_OPTIMIZE_DIALOG_OK] (state) {
    console.log('asction --->close')
    state.cost.optimize.nk.dialog.optimize.visible = false
  },
  // 优化结果视图-浪费花费-PRO
  [types.GET_NK_PRO_OPTIMIZE_LIST] (state, argus) {
    state.cost.optimize.nkPro.listTotal = argus.data.rowCount
    state.cost.optimize.nkPro.list = argus.data
    state.cost.optimize.nkPro.datas = argus.data.datas
    state.cost.optimize.nkPro.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.cost.optimize.nkPro.selectId.push(arr[i].id)
      }
    }
    if (state.cost.optimize.nkPro.selectId.length === arr.length) {
      state.cost.optimize.nkPro.allSelectStatus = true
    } else {
      state.cost.optimize.nkPro.allSelectStatus = false
    }
  },
  // 优化-浪费花费-PRO-排序状态
  [types.GET_NK_PRO_OPTIMIZE_SORT] (state, argus) {
    state.cost.optimize.nkPro.sortStatus = argus
  },
  // 优化-浪费花费-PRO-全选状态
  [types.GET_NK_PRO_OPTIMIZE_SELECT] (state, argus) {
    state.cost.optimize.nkPro.allSelectStatus = argus
  },

  // 优化-浪费花费-PRO-选中的id数组
  [types.GET_NK_PRO_OPTIMIZE_SELECT_ID] (state, argus) {
    state.cost.optimize.nkPro.selectId = argus
  },

  // 优化-质量得分
  [types.GET_QUALITY_OPTIMIZE_LIST] (state, argus) {
    state.quality.optimize.listTotal = argus.data.rowCount
    state.quality.optimize.list = argus.data
    state.quality.optimize.datas = argus.data.datas
    state.quality.optimize.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.quality.optimize.selectId.push(arr[i].id)
      }
    }
    if (state.quality.optimize.selectId.length === arr.length) {
      state.quality.optimize.allSelectStatus = true
    } else {
      state.quality.optimize.allSelectStatus = false
    }
  },
  // 优化-质量得分-筛选
  [types.GET_QUALITY_SCREEN] (state, argus) {
    state.query.screen = argus
  },

  // 优化-质量得分-排序状态
  [types.GET_QUALITY_OPTIMIZE_SORT] (state, argus) {
    state.quality.optimize.sortStatus = argus
  },
  // 优化-质量得分-全选状态
  [types.GET_QUALITY_OPTIMIZE_SELECT] (state, argus) {
    state.quality.optimize.allSelectStatus = argus
  },

  // 优化-质量得分-选中的id数组
  [types.GET_QUALITY_OPTIMIZE_SELECT_ID] (state, argus) {
    state.quality.optimize.selectId = argus
  },

  // 优化-点击率-展示广告
  [types.GET_CTR_OP_IMPRESS_AD_LIST] (state, argus) {
    state.ctr.optimize.impressAd.listTotal = argus.data.rowCount
    state.ctr.optimize.impressAd.list = argus.data
    state.ctr.optimize.impressAd.datas = argus.data.datas
    state.ctr.optimize.impressAd.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.ctr.optimize.impressAd.selectId.push(arr[i].id)
      }
    }
    if (state.ctr.optimize.impressAd.selectId.length === arr.length) {
      state.ctr.optimize.impressAd.allSelectStatus = true
    } else {
      state.ctr.optimize.impressAd.allSelectStatus = false
    }
  },

  // 优化-点击率-展示广告-排序状态
  [types.GET_CTR_OP_IMPRESS_AD_SORT] (state, argus) {
    state.ctr.optimize.impressAd.sortStatus = argus
  },
  // 优化-点击率-展示广告-全选状态
  [types.GET_CTR_OP_IMPRESS_AD_SELECT] (state, argus) {
    state.ctr.optimize.impressAd.allSelectStatus = argus
  },

  // 优化-点击率-展示广告-选中的id数组
  [types.GET_CTR_OP_IMPRESS_AD_SELECT_ID] (state, argus) {
    state.ctr.optimize.impressAd.selectId = argus
  },

  // 优化-点击率-搜索广告
  [types.GET_CTR_OP_SEARCH_AD_LIST] (state, argus) {
    state.ctr.optimize.searchAd.listTotal = argus.data.rowCount
    state.ctr.optimize.searchAd.list = argus.data
    state.ctr.optimize.searchAd.datas = argus.data.datas
    state.ctr.optimize.searchAd.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.ctr.optimize.searchAd.selectId.push(arr[i].id)
      }
    }
    if (state.ctr.optimize.searchAd.selectId.length === arr.length) {
      state.ctr.optimize.searchAd.allSelectStatus = true
    } else {
      state.ctr.optimize.searchAd.allSelectStatus = false
    }
  },

  // 优化-点击率-搜索广告-排序状态
  [types.GET_CTR_OP_SEARCH_AD_SORT] (state, argus) {
    state.ctr.optimize.searchAd.sortStatus = argus
  },
  // 优化-点击率-搜索广告-全选状态
  [types.GET_CTR_OP_SEARCH_AD_SELECT] (state, argus) {
    state.ctr.optimize.searchAd.allSelectStatus = argus
  },

  // 优化-点击率-搜索广告-选中的id数组
  [types.GET_CTR_OP_SEARCH_AD_SELECT_ID] (state, argus) {
    state.ctr.optimize.searchAd.selectId = argus
  },

  // 优化-文字广告
  [types.GET_TA_OP_LIST] (state, argus) {
    state.textAd.optimize.listTotal = argus.data.rowCount
    state.textAd.optimize.list = argus.data
    state.textAd.optimize.datas = argus.data.datas
    state.textAd.optimize.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.textAd.optimize.selectId.push(arr[i].id)
      }
    }
    if (state.textAd.optimize.selectId.length === arr.length) {
      state.textAd.optimize.allSelectStatus = true
    } else {
      state.textAd.optimize.allSelectStatus = false
    }
  },

  // 优化-文字广告-排序状态
  [types.GET_TA_OP_SORT] (state, argus) {
    state.textAd.optimize.sortStatus = argus
  },
  // 优化-文字广告-全选状态
  [types.GET_TA_OP_SELECT] (state, argus) {
    state.textAd.optimize.allSelectStatus = argus
  },

  // 优化-文字广告-选中的id数组
  [types.GET_TA_OP_SELECT_ID] (state, argus) {
    state.textAd.optimize.selectId = argus
  },
  // 优化-文字广告-优化弹框
  [types.GET_TA_OP_DIALOG] (state, argus) {
    state.textAd.optimize.visible = argus
  },
  // 优化-文字广告-立即添加点击触发id
  [types.GET_TA_OP_DIALOG_ID] (state, argus) {
    state.textAd.optimize.id = argus
    state.textAd.optimize.visible = true  // 弹框组建显示
  },
  // 优化-文字广告-立即添加弹框-表单数据
  [types.GET_TA_OP_DIALOG_LIST] (state, argus) {
    state.textAd.optimize.dialog.trackingUrlTemplate = argus.data.trackingUrlTemplates
    state.textAd.optimize.dialog.keywords = []
    console.log(argus.data.finalUrls)
    /* state.textAd.optimize.dialog.finalUrl = argus.data.finalUrls */
    state.textAd.optimize.dialog.form.finalMobileUrl = argus.data.finalMobileUrls
    if (argus.data.keywords) {
      for (let i = 0; i < argus.data.keywords.length; i++) {
        state.textAd.optimize.dialog.keywords.push({'value': argus.data.keywords[i]})
      }
    }
    if (argus.data.finalUrls) {
      for (let i = 0; i < argus.data.finalUrls.length; i++) {
        state.textAd.optimize.dialog.form.finalUrl.push(argus.data.finalUrls[i])
      }
    }
    if (argus.data.finalMobileUrls) {
      for (let i = 0; i < argus.data.finalMobileUrls.length; i++) {
        state.textAd.optimize.dialog.finalMobileUrl.push({'value': argus.data.finalMobileUrls[i]})
      }
    }
  },
  // 优化-文字广告-立即添加弹框-请求数据
  [types.GET_TA_OP_DIALOG_FORM] (state, argus) {
    state.textAd.optimize.dialog.form = argus
  },

  // 优化-文字广告-立即添加弹框-请求数据
  [types.GET_TA_OP_DIALOG_FORM_EXIT] (state, argus) {
    state.textAd.optimize.dialog.form.finalUrl = argus
    state.textAd.optimize.dialog.form.description = ''
    state.textAd.optimize.dialog.form.finalMobileUrl = ''
    state.textAd.optimize.dialog.form.headlinePart1 = ''
    state.textAd.optimize.dialog.form.headlinePart2 = ''
    state.textAd.optimize.dialog.form.path1 = ''
    state.textAd.optimize.dialog.form.path2 = ''
    state.textAd.optimize.dialog.form.trackingUrlTemplate = ''
    state.textAd.optimize.dialog.form.name1 = ''
    state.textAd.optimize.dialog.form.name2 = ''
    state.textAd.optimize.dialog.form.name3 = ''
    state.textAd.optimize.dialog.form.value1 = ''
    state.textAd.optimize.dialog.form.value2 = ''
    state.textAd.optimize.dialog.form.value3 = ''
  },

  // 优化-长尾关键字
  [types.GET_KW_OP_LIST] (state, argus) {
    console.log(argus.data)
    state.keyword.optimize.listTotal = argus.data.rowCount
    state.keyword.optimize.list = argus.data
    state.keyword.optimize.datas = argus.data.datas
    state.keyword.optimize.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.keyword.optimize.selectId.push(arr[i].id)
      }
    }
    if (state.keyword.optimize.selectId.length === arr.length) {
      state.keyword.optimize.allSelectStatus = true
    } else {
      state.keyword.optimize.allSelectStatus = false
    }
  },

  // 优化-长尾关键字-排序状态
  [types.GET_KW_OP_SORT] (state, argus) {
    state.keyword.optimize.sortStatus = argus
  },
  // 优化-长尾关键字-全选状态
  [types.GET_KW_OP_SELECT] (state, argus) {
    state.keyword.optimize.allSelectStatus = argus
  },

  // 优化-长尾关键字-选中的id数组
  [types.GET_KW_OP_SELECT_ID] (state, argus) {
    state.keyword.optimize.selectId = argus
  },

  // 优化-展示份额
  [types.GET_SN_OP_LIST] (state, argus) {
    state.shareNum.optimize.listTotal = argus.data.rowCount
    state.shareNum.optimize.list = argus.data
    state.shareNum.optimize.searchImpressionShareLost = argus.searchImpressionShareLost
    state.shareNum.optimize.datas = argus.data.datas
    state.shareNum.optimize.selectId = []
    var arr = argus.data.datas
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].isSelect === 'true') {
        state.shareNum.optimize.selectId.push(arr[i].id)
      }
    }
    if (state.keyword.optimize.selectId.length === arr.length) {
      state.shareNum.optimize.allSelectStatus = true
    } else {
      state.shareNum.optimize.allSelectStatus = false
    }
  },

  // 优化-展示份额-排序状态
  [types.GET_SN_OP_SORT] (state, argus) {
    state.shareNum.optimize.sortStatus = argus
  },
  // 优化-展示份额-全选状态
  [types.GET_SN_OP_SELECT] (state, argus) {
    state.shareNum.optimize.allSelectStatus = argus
  },

  // 优化-展示份额-选中的id数组
  [types.GET_SN_OP_SELECT_ID] (state, argus) {
    state.shareNum.optimize.selectId = argus
  }
}
