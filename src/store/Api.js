/**
 * 所有调取后台API 都在此处
 * successCallback   成功回调
 * errorCallback     失败回调
 */
import Vue from 'vue'
import ModifyApi from './ModifyApi'
const timeout = 60000   // 请求超时60000毫秒,一分钟
let previousRequest = []
// 请求开始前判断之前请求是否完成
const before = function (request) {
  if (previousRequest[request.url] === request) {
    previousRequest[request.url].abort()
  }
  previousRequest[request.url] = request
}
// 删除已完成请求的状态
const removePreviousRequest = function (url) {
  let tmp = []
  for (let key in previousRequest) {
    if (previousRequest[key].url !== url) {
      tmp[key] = previousRequest[key]
    }
  }
  previousRequest = tmp
}
const Api = {

  /**
   * 获取业务员下拉框
   */
  getSalesman (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/sys/user/queryUserList.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 获取客户下拉框
   */
  getCustomer (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url
    if (param.userId) {
      url = '/clientmgr/client/listUserClient?userId=' + param.userId
    } else {
      url = '/clientmgr/client/listUserClient'
    }
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 获取客户下的账户下拉框
   */
  getAccount (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/clientmgr/clientAccount/select?clientId=' + param.clientId
    Vue.http.get(url, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 一键分析
   */
  getAnalysis (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/record/create.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 进度条
   */
  getPercentage (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/record/qryFinishedCount.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 历史记录-业务员下拉菜单数据
   */
  getSalesmanHistory (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/sys/user/queryUserList.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 历史记录-获取客户下拉框
   */
  getCustomerHistory (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url
    if (param.userId) {
      url = '/clientmgr/client/listUserClient?userId=' + param.userId
    } else {
      url = '/clientmgr/client/listUserClient'
    }
    Vue.http.get(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 历史记录-获取客户下的账户下拉框
   */
  getAccountHistory (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url
    if (param.clientId) {
      url = '/clientmgr/clientAccount/select?clientId=' + param.clientId
    } else {
      url = '/clientmgr/clientAccount/select'
    }
    Vue.http.get(url, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 历史记录
   */
  getHistory (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/record/qryAnalysisHistoryList.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-总体情况
   */
  getSummary (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/querySummaryNormDatas.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-浪费花费
   */
  getCost (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-质量得分
   */
  getQuality (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-点击率数据
   */
  getCtr (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryCtrNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-文字广告
   */
  getTextAd (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-长尾关键字
   */
  getLongTailKeyword (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-展示份额
   */
  getShareNum (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-附加消息getOtherIndex
   */
  getOverHead (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 分析列表-其他指标
   */
  getOtherIndex (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/analyse/resultData/queryNorm8RecordIdNormCode.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 复选框请求
   */
  getCheck (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    let url = '/optimization/common/isSelect.do'
    // let url = 'http://rap.networkgrand.com/mockjsdata/2/optimization/wastCost/searchTerm/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },
  /**
   * 优化-浪费花费-否定关键字推荐列表
   */
  getNKOptimizeList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/wastCost/searchTerm/list'
    // let url = 'http://rap.networkgrand.com/mockjsdata/2/optimization/wastCost/searchTerm/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化-浪费花费-否定关键字推荐列表-优化弹框列表
   */
  getNKOptimizeDialogList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/wastCost/searchTerm/add'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化-浪费花费-否定关键字推荐列表-优化弹框-确定方法
   */
  getNKOptimizeDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/wastCost/searchTerm/add.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-浪费花费-否定关键字推荐列表-PRO
   *
   */
  getNKProOptimizeList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    // Vue.http.options.headers.set('X-CSRF-TOKEN', 'TOKEN');
    let url = '/optimization/wastCost/searchTermPro/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化-浪费花费-否定关键字推荐列表-PRO-添加弹框-确定方法
   */
  getNKProAddDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/wastCost/searchTermPro/add.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-质量得分-列表
   */
  getQualityOptimizeList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/qualityScore/keyword/list'
    // let url = ''
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化-质量得分-暂停弹框-确定方法
   */
  getQualityStopDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = 'optimization/qualityScore/keyword/pause.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-点击率-展示广告-列表
   */
  getCtrOpImpressAdList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/clickRate/placement/list'
    // let url = ''
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-点击率-展示广告-排除弹框-确定方法
   */
  getCtrOpImpressExcludeDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/clickRate/placement/exclude.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-点击率-搜索广告-列表
   */
  getCtrOpSearchAdList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/clickRate/searchTerms/list'
    // let url = ''
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-点击率-搜索广告-添加否定关键字弹框-确定方法
   */
  getCtrOpSearchAddDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/clickRate/searchTerms/add.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },
  /**
   * 优化列表-文字广告-列表
   */
  getTAOptimizeList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/ad/textAd/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-文字广告-立即添加弹框
   */
  getTAOptimizeDialogList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/ad/textAd/proposal'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      console.log(param)
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-文字广告-立即添加弹框-确定方法
   */
  getTAOptimizeDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/ad/textAd/add.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },
  /**
   * 优化列表-长尾关键字
   */
  getKWOpList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/longTailKeyword/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-长尾关键字-暂停弹框-确定方法
   */
  getKWOpStopDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/longTailKeyword/keyword/pause.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },
  /**
   * 优化列表-展示份额
   */
  getSNOpList (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/impressionShare/keyword/list'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  },

  /**
   * 优化列表-展示份额-确定并保存弹框-确定方法
   */
  getSNOpDialogOk (param = {}, successCallback = () => {}, errorCallback = () => {}) {
    Vue.http.options.emulateJSON = true
    let url = '/optimization/impressionShare/keyword/updateBid.do'
    Vue.http.post(url, param, {before, timeout: timeout}).then(response => {
      successCallback(response.body)
      removePreviousRequest(url)
    }, response => {
      errorCallback(response.body)
      removePreviousRequest(url)
    })
  }
}

export default Object.assign(Api, ModifyApi)
