import * as types from './mutation-types'
import Api from './Api'
import UpdateActions from './modifyActions'
import { Message } from 'element-ui'

// 饿了么alert框
const alertDialog = (argus) => {
  if (argus.close === 1) {
    Message.closeAll()
    return
  }
  let type
  let iconClass
  switch (argus.code) {
    case 0:
      type = 'success'  // 成功
      iconClass = 'ok-icon'
      break
    case 1:
      type = 'error'    // 失败
      iconClass = 'error-icon'
      break
    case 2:
      type = 'warning'  // 警告 验证失败
      iconClass = 'warning-icon'
      break
    case 3:
      type = 'error'  // 失败 业务错误
      iconClass = 'error-icon'
      break
    case 4:
      type = 'warning'  // 警告 未登录
      iconClass = 'warning-icon'
      break
    case 5:
      type = 'warning'  // 警告 没权限
      iconClass = 'warning-icon'
      break
    default:
      type = 'error'    // 失败
      argus.iconClass = 'error'
      argus.msg = '未知错误'
  }
  Message({
    type: type || '',
    iconClass: iconClass || '',             // 自定义图标的类名，会覆盖 type
    message: argus.msg || '',               // 后端信息string
    showClose: argus.showClose || true,     // 关闭按钮是否显示boolean
    customClass: argus.customClass || '',   // 自定义类名string
    center: argus.center || false,         // 文字是否居中 boolean
    duration: argus.duration || 2500,       // 自定义显示周期Number
    onClose: argus.onClose                  // 关闭后的回调方法function
  })
}
// 请求公共参数
// const publicRequest = (context, pageNum) => {
//   return {
//     // accountId: context.state.AllModule.query.account.account.replace(/-/g, ''),
//     accountId: '6730809291',
//     pageNum: pageNum || 1,
//     pageSize: context.state.query.pageSize
//   }
// }
const actions = {
  /** ===== 通用信息提示框 ===== **/
  getAlertDialog (context, param) {
    alertDialog({code: param.code, msg: param.msg, showClose: param.showClose, center: param.center, duration: param.duration, onClose: param.onClose, close: param.close})
  },

  /** ===== 全局错误提示 ===== **/
  errors (context, error) {
    if (!error) return
    let msg = '请求错误!'
    if (error.status === 408) {
      msg = error.statusText
    }
    context.commit('LOADING_CLOSE')
    alertDialog({code: 2, msg: msg, duration: 1000000})
  },

  // 刷新按钮
  getRefresh (context) {
    if (loading) {
      clearTimeout(loading)
    }
    context.commit('LOADING_OPEN')
    var loading = setTimeout(function () {
      context.commit('LOADING_CLOSE')
    }, 600)
  },

  // 业务员下拉菜单数据
  getSalesman (context) {
    context.commit('LOADING_OPEN')
    Api.getSalesman({}, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_SALEMAN, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 获取客户下拉菜单数据
  getCustomer (context, param) {
    // 参数
    let request = {
      userId: param
    }
    context.commit('LOADING_OPEN')
    Api.getCustomer(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_CUSTOMER, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 获取客户下的账户的下拉菜单数据
  getAccount (context, param) {
    if (param === '' || param === null || param === undefined) {
      return
    }
    // 参数
    let request = {
      clientId: param
    }
    context.commit('LOADING_OPEN')
    Api.getAccount(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_ACCOUNT, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 一键分析
  getAnalysis (context) {
    // 参数
    let request = {
      accountId: context.state.query.indexAccountStatus
    }
    Api.getAnalysis(request, function (respond) {
      context.commit(types.GET_ANALYSIS, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 进度条
  getPercentage (context) {
    // 参数
    let request = {
      recordId: context.state.query.recordId
    }
    Api.getPercentage(request, function (respond) {
      context.commit(types.GET_PERCENTAGE, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 历史记录-业务员下拉菜单数据
  getSalesmanHistory (context) {
    context.commit('LOADING_OPEN')
    Api.getSalesmanHistory({}, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_SALESMAN_HISTORY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 历史记录-获取客户下拉菜单数据
  getCustomerHistory (context, param) {
    // 参数
    let request = {
      userId: param || context.state.query.historySalesmanStatus
    }
    context.commit('LOADING_OPEN')
    Api.getCustomerHistory(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_CUSTOMER_HISTORY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 历史记录-获取客户下的账户的下拉菜单数据
  getAccountHistory (context, param) {
    if (param === '' || param === null || param === undefined) {
      if (context.state.query.historyCustomerStatus === '' || context.state.query.historyCustomerStatus === null || context.state.query.historyCustomerStatus === undefined) {
        return
      }
    }
    // 参数
    let request = {
      clientId: param || context.state.query.historyCustomerStatus
    }
    context.commit('LOADING_OPEN')
    Api.getAccountHistory(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_ACCOUNT_HISTORY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 历史记录
  getHistory (context, param) {
    // 参数
    let request = {
      accountId: context.state.query.historyAccountStatus,
      clientId: context.state.query.historyCustomerStatus,
      clientMgrId: context.state.query.historySalesmanStatus,
      size: param.pageSize,
      index: param.pageNum
    }
    context.commit('LOADING_OPEN')
    Api.getHistory(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_HISTORY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-总体情况
  getSummary (context) {
    // 参数
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'summary'
    }
    context.commit('LOADING_OPEN')
    Api.getSummary(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_SUMMARY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-浪费花费
  getCost (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'waste'
    }
    context.commit('LOADING_OPEN')
    Api.getCost(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_COST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-质量得分
  getQuality (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'qualityScore'
    }
    context.commit('LOADING_OPEN')
    Api.getQuality(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_QUALITY, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-点击率
  getCtr (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'clickRate'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getCtr(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_CTR, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-文字广告
  getTextAd (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'textAd'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getTextAd(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_TEXT_AD, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 分析-长尾关键字
  getLongTailKeyword (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'longTail'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getLongTailKeyword(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_LONG_TAIL_KEYWORD, respond)
    }, function (error) {
      context.dispatch('error', error)
    })
  },

  // 分析-展示份额
  getShareNum (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'showShare'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getShareNum(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_SHARE_NUMBER, respond)
    }, function (error) {
      context.dispatch('error', error)
    })
  },

  // 分析- 附加消息
  getOverHead (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'extraInformation'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getOverHead(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.QUERY_OVERHEAD, respond)
    }, function (error) {
      context.dispatch('error', error)
    })
  },

  // 分析- 其他指标
  getOtherIndex (context) {
    let request = {
      recordId: context.state.query.recordId,
      normCode: 'others'
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getOverHead(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.QUERY_OTHER_INDEX, respond)
    }, function (error) {
      context.dispatch('error', error)
    })
  },
  // 优化-浪费花费-否定关键字推荐列表-复选框请求
  getCheck (context, param) {
    let request = {
      ids: param.id,
      type: param.type,
      isSelect: param.isSelect
    }
    // 调用API
    Api.getCheck(request, function (respond) {
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-浪费花费-否定关键字推荐列表
  getNKOptimizeList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.cost.optimize.nk.sortStatus.prop,
      order: context.state.cost.optimize.nk.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getNKOptimizeList(request, function (respond) {
      console.log('action')
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_NK_OPTIMIZE_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-浪费花费-优化弹框-否定关键字推荐列表
  getNKOptimizeDialogList (context, param) {
    let request = {
      ids: context.state.cost.optimize.nk.selectId, // 表格选中的id
      prop: context.state.cost.optimize.nk.dialog.optimize.sortStatus.prop,
      order: context.state.cost.optimize.nk.dialog.optimize.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getNKOptimizeDialogList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_NK_OPTIMIZE_DIALOG_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-浪费花费-否定关键字推荐列表-优化弹框-确定方法
  getNKOptimizeDialogOk (context, param) {
    context.commit('LOADING_OPEN')
    let request = {
      recordId: context.state.query.recordId,
      datas: JSON.stringify(param.msg)
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.cost.optimize.nk.sortStatus.prop,
      order: context.state.cost.optimize.nk.sortStatus.order,
      size: param.pageSize || 20,
      index: param.pageNum || 1
    }
    context.state.cost.optimize.nk.dialog.optimize.selectRowMsg = []
    // 调用API
    Api.getNKOptimizeDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: respond.code, msg: respond.msg})
      context.commit(types.NK_OPTIMIZE_DIALOG_OK, respond)
      Api.getNKOptimizeList(refresh, function (respond) {
        context.commit(types.GET_NK_OPTIMIZE_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      console.log('error')
      context.dispatch('errors', error)
    })
  },

  // 优化-浪费花费-否定关键字推荐-PRO列表
  getNKProOptimizeList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.cost.optimize.nkPro.sortStatus.prop,
      order: context.state.cost.optimize.nkPro.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getNKProOptimizeList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_NK_PRO_OPTIMIZE_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-浪费花费-否定关键字推荐列表-PRO列表-添加弹框-确定方法
  getNKProAddDialogOk (context) {
    let request = {
      recordId: context.state.query.recordId,
      ids: context.state.cost.optimize.nkPro.selectId
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.cost.optimize.nkPro.sortStatus.prop,
      order: context.state.cost.optimize.nkPro.sortStatus.order,
      size: 20,
      index: 1
    }
    // 调用API
    Api.getNKProAddDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: respond.code, msg: respond.msg || '操作成功'})
      Api.getNKProOptimizeList(refresh, function (respond) {
        context.commit('LOADING_CLOSE')
        context.commit(types.GET_NK_PRO_OPTIMIZE_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg || '操作失败'})
    })
  },
  // 优化-质量得分
  getQualityOptimizeList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.quality.optimize.sortStatus.prop,
      order: context.state.quality.optimize.sortStatus.order,
      lteQualityScore: context.state.query.screen,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getQualityOptimizeList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_QUALITY_OPTIMIZE_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-质量得分-暂停弹框-确定方法
  getQualityStopDialogOk (context) {
    let request = {
      recordId: context.state.query.recordId,
      ids: context.state.quality.optimize.selectId
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.quality.optimize.sortStatus.prop,
      order: context.state.quality.optimize.sortStatus.order,
      lteQualityScore: context.state.query.screen,
      size: 20,
      index: 1
    }
    // 调用API
    Api.getQualityStopDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: respond.code, msg: respond.msg || '操作成功'})
      context.commit('LOADING_OPEN')
      Api.getQualityOptimizeList(refresh, function (respond) {
        context.commit('LOADING_CLOSE')
        context.commit(types.GET_QUALITY_OPTIMIZE_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg})
    })
  },
  // 优化-点击率-展示广告
  getCtrOpImpressAdList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.ctr.optimize.impressAd.sortStatus.prop,
      order: context.state.ctr.optimize.impressAd.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getCtrOpImpressAdList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_CTR_OP_IMPRESS_AD_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-点击率-展示广告-排除-确定方法
  getCtrOpImpressExcludeDialogOk (context) {
    let request = {
      recordId: context.state.query.recordId,
      ids: context.state.ctr.optimize.impressAd.selectId
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.ctr.optimize.impressAd.sortStatus.prop,
      order: context.state.ctr.optimize.impressAd.sortStatus.order,
      size: 20,
      index: 1
    }
    // 调用API
    Api.getCtrOpImpressExcludeDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: 0, msg: '操作成功'})
      Api.getCtrOpImpressAdList(refresh, function (respond) {
        console.log('refresh')
        context.commit(types.GET_CTR_OP_IMPRESS_AD_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg})
    })
  },

  // 优化-点击率-搜索广告
  getCtrOpSearchAdList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.ctr.optimize.searchAd.sortStatus.prop,
      order: context.state.ctr.optimize.searchAd.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getCtrOpSearchAdList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_CTR_OP_SEARCH_AD_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-点击率-展示广告-排除-确定方法
  getCtrOpSearchAddDialogOk (context) {
    let request = {
      recordId: context.state.query.recordId,
      ids: context.state.ctr.optimize.searchAd.selectId
    }
    // 调用API
    Api.getCtrOpSearchAddDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: 1, msg: '操作成功'})
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg})
    })
  },

  // 优化-文字广告
  getTAOptimizeList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.textAd.optimize.sortStatus.prop,
      order: context.state.textAd.optimize.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getTAOptimizeList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_TA_OP_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-文字广告-立即添加弹框
  getTAOptimizeDialogList (context, param) {
    let request = {
      recordId: context.state.query.recordId
      /* optimizationRecordId: -1 */  // context.state.textAd.optimize.id
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getTAOptimizeDialogList(request, function (respond) {
      console.log('action' + respond)
      context.commit(types.GET_TA_OP_DIALOG_LIST, respond)
      context.commit('LOADING_CLOSE')
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-文字广告-立即添加弹框-确定方法
  getTAOptimizeDialogOk (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      clientAccountId: context.state.textAd.optimize.id,
      description: param.form.description,
      finalMobileUrl: param.form.finalMobileUrl,
      finalUrl: param.form.finalUrl,
      headlinePart1: param.form.headlinePart1,
      headlinePart2: param.form.headlinePart2,
      path1: param.form.path1,
      path2: param.form.path2,
      trackingUrlTemplate: param.form.trackingUrlTemplate,
      customParameters: {
        name1: param.form.name1,
        name2: param.form.name2,
        name3: param.form.name3,
        value1: param.form.value1,
        value2: param.form.value2,
        value3: param.form.value3
      }
    }
    // 调用API
    context.commit('LOADING_OPEN')
    if (param.type === 'cnt') {
      context.commit('GET_TA_OP_DIALOG_FORM_EXIT', param.form.finalUrl)
    }
    Api.getTAOptimizeDialogOk(request, function (respond) {
      if (param.type === 'ok') {
        context.state.textAd.optimize.visible = true
      }
      alertDialog({code: respond.code, msg: respond.msg})
      context.commit('LOADING_CLOSE')
    }, function (error) {
      alertDialog({code: error.code, msg: error.msg})
      context.dispatch('errors', error)
    })
  },

  // 优化-长尾关键字
  getKWOpList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.keyword.optimize.sortStatus.prop,
      order: context.state.keyword.optimize.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getKWOpList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_KW_OP_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-长尾关键字-暂停-确定方法
  getKWOpStopDialogOk (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      ids: context.state.ctr.optimize.searchAd.selectId.toString() || param.ids.toString()
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.keyword.optimize.sortStatus.prop,
      order: context.state.keyword.optimize.sortStatus.order,
      size: param.pageSize || 20,
      index: param.pageNum || 1
    }
    // 调用API
    Api.getKWOpStopDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: respond.code, msg: respond.msg || '操作成功'})
      Api.getKWOpList(refresh, function (respond) {
        context.commit('LOADING_CLOSE')
        context.commit(types.GET_KW_OP_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg})
    })
  },

  // 优化-展示份额
  getSNOpList (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      prop: context.state.shareNum.optimize.sortStatus.prop,
      order: context.state.shareNum.optimize.sortStatus.order,
      size: param.pageSize,
      index: param.pageNum || 1
    }
    // 调用API
    context.commit('LOADING_OPEN')
    Api.getSNOpList(request, function (respond) {
      context.commit('LOADING_CLOSE')
      context.commit(types.GET_SN_OP_LIST, respond)
    }, function (error) {
      context.dispatch('errors', error)
    })
  },

  // 优化-展示份额-保存并执行-确定方法
  getSNOpDialogOk (context, param) {
    let request = {
      recordId: context.state.query.recordId,
      datas: JSON.stringify(param)
    }
    let refresh = {
      recordId: context.state.query.recordId,
      prop: context.state.shareNum.optimize.sortStatus.prop,
      order: context.state.shareNum.optimize.sortStatus.order,
      size: 20,
      index: 1
    }
    context.state.shareNum.optimize.selectRowMsg = []
    // 调用API
    Api.getSNOpDialogOk(request, function (respond) {
      context.commit('LOADING_CLOSE')
      alertDialog({code: respond.code, msg: respond.msg})
      Api.getSNOpList(refresh, function (respond) {
        context.commit('LOADING_CLOSE')
        context.commit(types.GET_SN_OP_LIST, respond)
      }, function (error) {
        context.dispatch('errors', error)
      })
    }, function (error) {
      context.dispatch('errors', error)
      alertDialog({code: error.code, msg: error.msg})
    })
  }
}

export default Object.assign(actions, UpdateActions)
