// noinspection JSAnnotator
/** ***** loading动画 ******** **/
export const LOADING_OPEN = 'LOADING_OPEN'
export const LOADING_CLOSE = 'LOADING_CLOSE'

/** ***** 模态框 ******** **/
export const MODAL_OPEN = 'MODAL_OPEN'
export const MODAL_CLOSE = 'MODAL_CLOSE'

/** ***** 视图更新操作 ******** **/
export const CHANGE_ROUTE = 'CHANGE_ROUTE'           // 路由
export const OPEN_DIALOG = 'OPEN_DIALOG'             // 弹框

/** ***** 选择账户QUERY操作 ******** **/
export const QUERY_GET_ACCOUNTS = 'QUERY_GET_ACCOUNTS'
export const QUERY_GET_ANALYSIS = 'QUERY_GET_ANALYSIS'       // 获取帐号数据

/** ***** 可操作数据方法(mutations) ******** **/
export const SCATTER_CHARTS = 'SCATTER_CHARTS'                                                    // 散点图
export const GET_SALEMAN = 'GET_SALEMAN'                                                          // 入口页-查询业务员下拉框
export const GET_CUSTOMER = 'GET_CUSTOMER'                                                        // 入口页-查询客户下拉框
export const GET_ACCOUNT = 'GET_ACCOUNT'                                                          // 入口页-查询账户下拉框
export const QUERY_INDEX_SALESMAN = 'QUERY_INDEX_SALESMAN'                                        // 入口页-查询业务员状态
export const QUERY_INDEX_CUSTOMER = 'QUERY_INDEX_CUSTOMER'                                        // 入口页-查询客户状态
export const QUERY_INDEX_ACCOUNT = 'QUERY_INDEX_ACCOUNT'                                          // 入口页-查询账户状态
export const QUERY_INDEX_PERCENTAGE = 'QUERY_INDEX_PERCENTAGE'                                    // 入口页-百分数重置为0
export const GET_SUMMARY = 'GET_SUMMARY'                                                          // 分析-总体情况
export const QUERY_SUMMARY_FILTER = 'QUERY_SUMMARY_FILTER'                                        // 分析-总体情况-选择时间段过滤
export const GET_COST = 'GET_COST'                                                                // 分析-浪费花费
export const QUERY_COST_PROFESSION_FILTER = 'QUERY_COST_PROFESSION_FILTER'                        // 分析-浪费花费-选择行业数据下拉框
export const GET_QUALITY = 'GET_QUALITY'                                                          // 分析-质量得分
export const GET_CTR = 'GET_CTR'                                                                  // 分析-分析点击率
export const GET_TEXT_AD = 'GET_TEXT_AD'                                                          // 分析-文字广告
export const GET_LONG_TAIL_KEYWORD = 'GET_LONG_TAIL_KEYWORD'                                      // 分析-长尾关键字
export const GET_SHARE_NUMBER = 'GET_SHARE_NUMBER'                                                // 分析-展示份额
export const QUERY_OVERHEAD = 'QUERY_OVERHEAD'                                                    // 分析-附加信息-行业数据
export const QUERY_OTHER_INDEX = 'QUERY_OTHER_INDEX'                                              // 分析-其他指标
export const GET_SALESMAN_HISTORY = 'GET_SALESMAN_HISTORY'                                        // 入口页-业务员下拉框
export const GET_CUSTOMER_HISTORY = 'GET_CUSTOMER_HISTORY'                                        // 入口页-客户下拉框
export const GET_ACCOUNT_HISTORY = 'GET_ACCOUNT_HISTORY'                                          // 入口页-账户下拉框
export const QUERY_HISTORY_SALESMAN = 'QUERY_HISTORY_SALESMAN'                                    // 历史记录-查询业务员下拉框状态
export const QUERY_HISTORY_CUSTOMER = 'QUERY_HISTORY_CUSTOMER'                                    // 历史记录-查询客户下拉框状态
export const QUERY_HISTORY_ACCOUNT = 'QUERY_HISTORY_ACCOUNT'                                      // 历史记录-查询账户下拉框状态
export const QUERY_IGNORE_HISTORY_DIMENSION = 'QUERY_IGNORE_HISTORY_DIMENSION'                    // 忽略历史记录-查询维度下拉框
export const QUERY_IGNORE_HISTORY_START_TIME = 'QUERY_IGNORE_HISTORY_START_TIME'                  // 忽略历史记录-查询开始时间
export const QUERY_IGNORE_HISTORY_END_TIME = 'QUERY_IGNORE_HISTORY_END_TIME'                      // 忽略历史记录-查询开始时间
export const GET_ANALYSIS = 'GET_ANALYSIS'                                                        // 一键分析
export const GET_PERCENTAGE = 'GET_PERCENTAGE'                                                    // 进度条
export const QUERY_ANALYSIS_RECORD_ID = 'QUERY_ANALYSIS_RECORD_ID'                                // 历史记录-查看
export const GET_HISTORY = 'GET_HISTORY'                                                          // 历史记录-全部数据
export const HISTORY_STATUS = 'HISTORY_STATUS'                                                    // 历史记录-入口页传过来的下拉框状态
export const GET_NK_OPTIMIZE_LIST = 'GET_NK_OPTIMIZE_LIST'                                        // 浪费花费-优化-否定关键字推荐列表
export const GET_NK_OPTIMIZE_SORT = 'GET_NK_OPTIMIZE_SORT'                                        // 浪费花费-优化-否定关键字推荐列表-排序状态
export const GET_NK_OPTIMIZE_SELECT = 'GET_NK_OPTIMIZE_SELECT'                                    // 浪费花费-优化-否定关键字推荐列表-全选状态
export const GET_NK_OPTIMIZE_SELECT_ID = 'GET_NK_OPTIMIZE_SELECT_ID'                              // 浪费花费-优化-否定关键字推荐列表-选择的id数组
export const GET_NK_OPTIMIZE_DIALOG = 'GET_NK_OPTIMIZE_DIALOG'                                    // 浪费花费-优化-否定关键字推荐-优化弹框
export const GET_NK_OPTIMIZE_DIALOG_LIST = 'GET_NK_OPTIMIZE_DIALOG_LIST'                          // 浪费花费-优化-否定关键字推荐-优化弹框-列表
export const GET_NK_OPTIMIZE_DIALOG_SORT = 'GET_NK_OPTIMIZE_DIALOG_SORT'                          // 浪费花费-优化-否定关键字推荐-优化弹框-排序状态
export const GET_NK_OPTIMIZE_DIALOG_ALL_SELECT = 'GET_NK_OPTIMIZE_DIALOG_ALL_SELECT'              // 浪费花费-优化-否定关键字推荐-优化弹框-全选状态
export const GET_NK_OPTIMIZE_DIALOG_SELECT_ID = 'GET_NK_OPTIMIZE_DIALOG_SELECT_ID'                // 浪费花费-优化-否定关键字推荐-优化弹框-选择的id数组
export const NK_OPTIMIZE_DIALOG_OK = 'NK_OPTIMIZE_DIALOG_OK'                                      // 浪费花费-优化-否定关键字推荐-优化弹框-选择的行数据
export const GET_NK_PRO_OPTIMIZE_LIST = 'GET_NK_PRO_OPTIMIZE_LIST'                                // 浪费花费-优化-否定关键字推荐-PRO-列表
export const GET_NK_PRO_OPTIMIZE_SORT = 'GET_NK_PRO_OPTIMIZE_SORT'                                // 浪费花费-优化-否定关键字推荐列表-PRO-排序状态
export const GET_NK_PRO_OPTIMIZE_SELECT = 'GET_NK_PRO_OPTIMIZE_SELECT'                            // 浪费花费-优化-否定关键字推荐列表-PRO-全选状态
export const GET_NK_PRO_OPTIMIZE_SELECT_ID = 'GET_NK_PRO_OPTIMIZE_SELECT_ID'                      // 浪费花费-优化-否定关键字推荐列表-PRO-选择的id数组
export const GET_QUALITY_OPTIMIZE_LIST = 'GET_QUALITY_OPTIMIZE_LIST'                              // 质量得分-优化
export const GET_QUALITY_OPTIMIZE_SORT = 'GET_QUALITY_OPTIMIZE_SORT'                              // 质量得分-优化-排序状态
export const GET_QUALITY_OPTIMIZE_SELECT = 'GET_QUALITY_OPTIMIZE_SELECT'                          // 质量得分-优化-全选状态
export const GET_QUALITY_OPTIMIZE_SELECT_ID = 'GET_QUALITY_OPTIMIZE_SELECT_ID'                    // 质量得分-优化-选择的id数组
export const GET_QUALITY_SCREEN = 'GET_QUALITY_SCREEN'                                            // 质量得分-优化-筛选质量得分
export const GET_CTR_OP_IMPRESS_AD_LIST = 'GET_CTR_OP_IMPRESS_AD_LIST'                            // 点击率-优化-展示广告
export const GET_CTR_OP_IMPRESS_AD_SORT = 'GET_CTR_OP_IMPRESS_AD_SORT'                            // 点击率-优化-展示广告-排序状态
export const GET_CTR_OP_IMPRESS_AD_SELECT = 'GET_CTR_OP_IMPRESS_AD_SELECT'                        // 点击率-优化-展示广告-全选状态
export const GET_CTR_OP_IMPRESS_AD_SELECT_ID = 'GET_CTR_OP_IMPRESS_AD_SELECT_ID'                  // 点击率-优化-展示广告-选择的id数组
export const GET_CTR_OP_SEARCH_AD_LIST = 'GET_CTR_OP_SEARCH_AD_LIST'                              // 点击率-优化-展示广告
export const GET_CTR_OP_SEARCH_AD_SORT = 'GET_CTR_OP_SEARCH_AD_SORT'                              // 点击率-优化-展示广告-排序状态
export const GET_CTR_OP_SEARCH_AD_SELECT = 'GET_CTR_OP_SEARCH_AD_SELECT'                          // 点击率-优化-展示广告-全选状态
export const GET_CTR_OP_SEARCH_AD_SELECT_ID = 'GET_CTR_OP_SEARCH_AD_SELECT_ID'                    // 点击率-优化-展示广告-选择的id数组
export const GET_TA_OP_LIST = 'GET_TA_OP_LIST'                                                    // 文字广告-优化
export const GET_TA_OP_SORT = 'GET_TA_OP_SORT'                                                    // 文字广告-优化-排序状态
export const GET_TA_OP_SELECT = 'GET_TA_OP_SELECT'                                                // 文字广告-优化-全选状态
export const GET_TA_OP_SELECT_ID = 'GET_TA_OP_SELECT_ID'                                          // 文字广告-优化-选择的id数组
export const GET_TA_OP_DIALOG = 'GET_TA_OP_DIALOG'                                                // 文字广告-优化-立即添加弹框显示
export const GET_TA_OP_DIALOG_ID = 'GET_TA_OP_DIALOG_ID'                                          // 文字广告-优化-立即添加点击触发id
export const GET_TA_OP_DIALOG_LIST = 'GET_TA_OP_DIALOG_LIST'                                      // 文字广告-优化-立即添加弹框数据
export const GET_TA_OP_DIALOG_FORM = 'GET_TA_OP_DIALOG_FORM'                                      // 文字广告-优化-立即添加弹框表单数据
export const GET_TA_OP_DIALOG_FORM_EXIT = 'GET_TA_OP_DIALOG_FORM_EXIT'                            // 文字广告-优化-立即添加弹框表单数据-记忆数据
export const GET_KW_OP_LIST = 'GET_KW_OP_LIST'                                                    // 长尾关键字-优化
export const GET_KW_OP_SORT = 'GET_KW_OP_SORT'                                                    // 长尾关键字-优化-排序状态
export const GET_KW_OP_SELECT = 'GET_KW_OP_SELECT'                                                // 长尾关键字-优化-全选状态
export const GET_KW_OP_SELECT_ID = 'GET_KW_OP_SELECT_ID'                                          // 长尾关键字-优化-选择的id数组
export const GET_SN_OP_LIST = 'GET_SN_OP_LIST'                                                    // 展示份额-优化
export const GET_SN_OP_SORT = 'GET_SN_OP_SORT'                                                    // 展示份额-优化-排序状态
export const GET_SN_OP_SELECT = 'GET_SN_OP_SELECT'                                                // 展示份额-优化-全选状态
export const GET_SN_OP_SELECT_ID = 'GET_SN_OP_SELECT_ID'                                          // 展示份额-优化-选择的id数组
