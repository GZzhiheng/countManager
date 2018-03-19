// noinspection JSAnnotator
import Vue from 'vue'
const States = {
  publicLoading: false,         // 全局加载动画
  module: {                      // 全局状态
    emptyPlaceholder: 0,         // 空数据的占位符
    tableEmptyPlaceholder: '0%',    // 表格0数据的占位符
    tableNullPlaceholder: '--',    // 表格空数据的占位符
    tableNullData: '暂无数据',   // 表格没有任何数据的占位符
    bar: {                        // bar 图默认的option
      title: {
        textStyle: {
          fontSize: 14
        }
      },
      grid: {left: '0%', right: '22%', top: '10%', bottom: '0%', containLabel: true},
      xAxis: {
        axisLabel: {
          show: false
        },
        show: false
      },
      yAxis: {
        nameGap: 30, // 坐标轴名称与轴线之间的距离
        axisLabel: {
          textStyle: {
            fontSize: 12, // Y坐标轴字体大小
            color: '#333' // Y坐标轴字体颜色
          }
        },
        axisLine: { // 控制网格线是否显示
          show: false
        },
        splitLine: { // 去除y轴上的刻度线
          show: false
        },
        axisTick: { // 去除y轴上的出头线
          show: false
        },
        boundaryGap: false,
        data: ''
      },
      series: [
        {
          name: '占',
          type: 'bar',
          stack: '总量',
          barWidth: 20, // 柱子宽度
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '', // 柱子右边的数据的单位
              textStyle: {
                fontSize: 14,
                fontWeight: 'bold',
                verticalAlign: 'middle'
              },
              distance: 10  // 柱子右边的数据
            }
          },
          data: [
            {
              value: 0, // 下面柱子的值
              itemStyle: {
                normal: {
                  color: ''
                },
                emphasis: {
                  color: '' // 悬浮在图形上的颜色
                }
              }
            },
            {
              value: 0, // 上面柱子的值
              itemStyle: {
                normal: {
                  color: ''
                },
                emphasis: {
                  color: '' // 悬浮在图形上的颜色
                }
              }
            }
          ]
        }
      ]
    },
    pie: {                       // pie 图默认的option
      color: [],
      series:
      {
        itemStyle: {   // 圆环内文字样式和内容
          normal: {
            label: {
              formatter: function (params) {
                return params.value
              },
              textStyle: {
                baseline: 'top'
              }
            }
          }
        },
        hoverAnimation: false, // 移上去图形变大
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['65%', '75%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: { // 悬浮样式
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0, // 所得分
            label: {
              normal: {   // 圆环内的位置
                verticalAlign: 'top'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  padding: [], // 用padding设置位置
                  textStyle: {  // 圆环内的样式
                    color: '', // ，第一个颜色的值
                    fontSize: ''
                  }
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: '' // 悬浮在图形上的颜色
              }
            }
          },
          {
            name: '',  // 下部分文字文案
            value: 100,  // 剩下的分
            label: {
              normal: {   // 圆环内的位置
                verticalAlign: 'middle'
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  padding: [], // 用padding设置位置
                  formatter: '{b}',
                  textStyle: {     // 圆环内文案的样式
                    color: '#666',
                    fontSize: 14
                  }
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                color: '#dfe6e8' // 悬浮在图形上的颜色
              }
            }
          }
        ]
      }
    },
    ring: {                      // ring 图默认的option
      title: {
        text: '',
        textStyle: {
          fontSize: 14
        }
      },
      legend: {
        show: true,
        orient: 'vertical',
        itemWidth: 16,
        itemGap: 20,
        itemHeight: 16,
        textStyle: {
          fontSize: 14
        },
        selectedMode: false,
        align: 'left',
        x: '180px',
        y: '23%',
        data: []
      },
      tooltip: {  // 文本提示
        show: true,
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: ''               // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      color: [],
      series:
      {
        name: '',
        type: 'pie',
        cursor: 'pointer',
        tooltip: {
          trigger: 'item',
          position: function (point, params, dom, rect, size) {
            return [point[0] - 75, point[1] - 50]
          },
          backgroundColor: 'rgba(0,0,0,.8)',
          textStyle: {
            fontSize: 12
          },
          formatter: null
        },
        hoverAnimation: false, // 移上去图形变大
        center: ['21%', '50%'],
        radius: ['40%', '68%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: { // 悬浮样式
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            name: '',
            value: 0, // 所得分
            itemStyle: {
              emphasis: {
                color: '' // 悬浮在图形上的颜色
              }
            }
          },
          {
            name: '',
            value: 0,  // 所得分
            itemStyle: {
              emphasis: {
                color: '' // 悬浮在图形上的颜色
              }
            }
          },
          {
            name: '',
            value: 0,  // 所得分
            itemStyle: {
              emphasis: {
                color: '' // 悬浮在图形上的颜色
              }
            }
          }
        ]
      }
    },
    column: {                     // column 图默认的option
      legend: {
        top: 15,
        right: 0,
        itemHeight: 8,
        data: []
      },
      tooltip: {  // 文本提示
        show: true,
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: ''        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {        // 图表整体位置
        left: '6px',
        right: '6px',
        top: '55px',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        gridIndex: 0,
        boundaryGap: false, // 去掉两边留白，用min,max则无效
        min: 0.5,
        max: 10.5,
        interval: 0.5, // 配合min,max
        axisTick: {
          show: false
        },
        splitLine: {          // 是否显示分隔线
          show: false
        },
        axisLabel: {  // X轴坐标值颜色
          textStyle: {
            fontSize: 12, // 字体大小
            color: '#333' // 字体颜色
          },
          formatter: null  // y轴刻度值格式化，可以加符号
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#ccc' // X轴线颜色
          }
        }
      },
      yAxis: {
        splitNumber: 5,
        axisTick: {
          alignWithLabel: true,
          show: true,
          inside: false,
          length: 5,
          lineStyle: {  // Y轴线
            width: 1,
            color: '#ccc'
          }
        },
        name: '',
        nameTextStyle: {
          color: '#666', // Y轴名称颜色
          padding: [10, 0]
        },
        show: true,
        nameGap: 8, // 坐标轴名称与轴线之间的距离
        axisLabel: { // Y轴坐标值颜色
          textStyle: {
            fontSize: 12, // 字体大小
            color: '#333' // 字体颜色
          },
          formatter: null  // y轴刻度值格式化，可以加符号
        },
        axisLine: { // 是否显示网格线
          show: true,
          lineStyle: {
            color: '#ccc' // 轴线颜色
          }
        },
        splitLine: {          // 是否显示分隔线
          show: true,
          lineStyle: {
            color: '#e2e2e2', // 网格线颜色
            type: 'dotted' // 网格使用虚线
          }
        }
      },
      series: [
        {
          name: '',  // Y轴的名称
          tooltip: {
            trigger: 'item',
            padding: [4, 8],
            backgroundColor: 'rgba(0,0,0,.8)',
            textStyle: {
              fontSize: 12
            },
            formatter: null
          },
          smooth: false,
          type: 'bar',
          barMaxWidth: 30, // 柱条大小
          itemStyle: {
            normal: {
              color: '' // 柱条的颜色
            },
            emphasis: {
              color: '' // 悬浮在柱条上的颜色
            }
          },
          data: []  // 数据
        },
        {
          name: '',
          tooltip: {
            show: false
          },
          type: 'line',
          smooth: false,
          symbolSize: 0, // 折线点大小 0代表没有折线点
          itemStyle: {
            normal: {
              width: 2,
              color: ''
            }
          },
          data: [[1, 0.56], [2, 1.13], [3, 2.26], [4, 3.39], [5, 5.65], [6, 10.17], [7, 21.47], [7.5, 28.25], [8, 18.08], [9, 3.39], [9.5, 2.26], [10, 3.39]]
        }
      ]
    },
    scatter: {                   // scatter 图默认的option
      legend: {
        top: 15,
        right: 0,
        itemHeight: 8,
        data: []
      },
      grid: {        // 图表整体位置
        left: '6px',
        right: '6px',
        top: '55px',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        gridIndex: 0,
        boundaryGap: false, // 去掉两边留白
        min: 1, // X轴最大值
        max: 7, // X轴最小值
        interval: 1, //
        axisTick: {
          show: false
        },
        splitLine: {          // 是否显示分隔线
          show: false
        },
        axisLabel: {  // X轴坐标值颜色
          textStyle: {
            fontSize: 12, // 字体大小
            color: '#333' // 字体颜色
          },
          formatter: null  // y轴刻度值格式化，可以加符号
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#ccc' // X轴线颜色
          }
        }
      },
      yAxis: {
        splitNumber: 5,
        axisTick: {
          alignWithLabel: true,
          show: true,
          inside: false,
          length: 5,
          lineStyle: {  // Y轴线
            width: 1,
            color: '#ccc'
          }
        },
        name: '',
        nameTextStyle: {
          color: '#666', // Y轴名称颜色
          padding: [10, 23, 10, 0]
        },
        show: true,
        nameGap: 8, // 坐标轴名称与轴线之间的距离
        axisLabel: { // Y轴坐标值颜色
          textStyle: {
            fontSize: 12, // 字体大小
            color: '#333' // 字体颜色
          },
          formatter: null  // y轴刻度值格式化，可以加符号
        },
        axisLine: { // 是否显示网格线
          show: true,
          lineStyle: {
            color: '#ccc' // 轴线颜色
          }
        },
        splitLine: {          // 是否显示分隔线
          show: true,
          lineStyle: {
            color: '#e2e2e2', // 网格线颜色
            type: 'dotted' // 网格使用虚线
          }
        }
      },
      series: [
        {
          name: '',
          hoverAnimation: false, // 移上去图形变大
          type: 'scatter',
          symbolSize: 6,   // 点的大小
          itemStyle: {
            normal: {
              color: '' // 上方圆点的颜色
            },
            emphasis: {
              color: '' // 悬浮在圆点上的颜色
            }
          },
          data: []
        },
        {
          name: '',
          hoverAnimation: false, // 移上去图形变大
          type: 'scatter',
          symbolSize: 6,  // 点的大小
          itemStyle: {
            normal: {
              color: '' // 下方圆点的颜色
            },
            emphasis: {
              color: '' // 悬浮在圆点上的颜色
            }
          },
          data: ''
        },
        {
          name: '',
          type: 'line',
          smooth: false,
          symbolSize: 0, // 折线点大小 0代表没有折线点
          itemStyle: {
            normal: {
              width: 2,
              color: ''
            }
          },
          data: []
        }
      ]
    }
  },
  $route: {},
  active: {     // 当前选中的选项卡
    analysis: {   // 分析结果
      view: 'Cost'
    },
    cost: {  // 浪费花费优化
      view: 'OptimizeNegativeKeyword'
    },
    ctr: {  // 浪费花费优化
      view: 'OptimizeImpressAd'
    },
    shareNum: {  // 浪费花费优化
      view: 'OptimizeCampaignName'
    }
  },
  query: {                    // 查询条件
    view: 'Cost',    // 指标选项卡当前视图
    account: [{name: '所有账号', id: null, no: null}],
    pageNum: 1,     // 默认页码
    pageSize: 20,   // 每页多少条
    changeState: true, // 是否有点击搜索按钮，用于监听用户点了查询按钮事件非常有用
    salesmanData: [],      // 业务员下拉框里的数据
    customerData: [],     // 客户下拉框里的数据
    accountData: [],      // 账户下拉框里的数据
    indexSalesmanStatus: '',              // 入口页-业务员的状态值
    indexCustomerStatus: '',              // 入口页-客户的状态值
    indexAccountStatus: '',               // 入口页-账号的状态值
    historySalesmanStatus: '',            // 历史记录-业务员的状态值
    historyCustomerStatus: '',            // 历史记录-客户的状态值
    historyAccountStatus: '',             // 历史记录-账号的状态值
    wastCostTips: 0,                      // 浪费费用提示
    qualityScoreTips: 0,                  // 质量得分提示
    clickRateTips: 0,                     // 点击率提示
    textAdTips: 0,                        // 文字广告提示
    longTailTips: 0,                      // 长尾关键字提示
    impressionsShareTips: 0,              // 展示份额提示
    recordId: 0,                          // 分析id
    analysisSummaryTimeStatus: {name: '最近7天', id: 7}, //   // 分析总数据的时间段的状态值
    screen: 2,                            // 质量得分-优化-筛选值
    ignoreHistoryDimensionStatus: '',     // 忽略历史记录-维度的状态值
    ignoreHistoryTimeStatus: {startTime: '', endTime: ''},           // 忽略历史记录-时间选择框状态值
    costProfessionStatus: {name: 'B2B', id: 'B2B'}                // 浪费花费-行业的状态值
  },
  commonData: {   // 公共数据
    matchType: [{name: '广泛匹配', id: 'BROAD'}, {name: '完全匹配', id: 'EXACT'}, {name: '词组匹配', id: 'PHRASE'}],
    analysisSummaryTimeData: [{name: '最近7天', id: 7}, {name: '最近30天', id: 30}, {name: '最近90天', id: 90}],    // 分析总数据的时间段
    dimensionData: [{name: '所有有维度', id: 1}, {name: '浪费花费', id: 2}, {name: '质量得分', id: 3}, {name: '点击率', id: 4}, {name: '文字广告', id: 5}, {name: '长尾关键字', id: 6}, {name: '展示份额', id: 7}, {name: '搜索广告附加信息', id: 8}, {name: '其他指标', id: 9}],
    professionData: [{name: 'B2B', id: 'B2B'}, {name: 'B2C', id: 'B2C'}, {name: '其他', id: 'Others'}],  // 行业数据下拉框
    ignoreRangeData: [{name: '7天内不再提示'}, {name: '14天内不再提示'}, {name: '30天内不再提示'}]  // 忽略范围下拉框
  },
  index: {         // 历史记录数据
    time: 0,  // 分析id
    status: 10,  // 分析状态码
    errMsg: '',  // 分析返回的信息
    percentage: 0 // 进度条
  },
  history: {         // 历史记录数据
    salesmanData: [],      // 业务员下拉框里的数据
    customerData: [],     // 客户下拉框里的数据
    accountData: [],      // 账户下拉框里的数据
    list: {},        // 全部数据
    datas: [],        // 表格数据
    listTotal: 0     // 列表数据总数
  },
  ignoreHistory: {   // 忽略历史记录数据
  },
  analysisSummary: {
    data: {}, // 存全部数据
    list: [], // 存前端过滤数据
    analysisChartData: {
      color: ['#4dbd74', '#ebeff0'],      // 圆环的两个色值
      topFontPadding: [-20, 0, 0, 0],     // 圆环内上面文案位置
      value: 35,                          // 圆环内上面分值
      topFontSize: 62,                    // 圆环内上面分值字体大小
      bottomFontName: '账户总得分',       // 圆环内下面文案
      bottomFontPadding: [82, 0, 0, 0],   // 圆环内下面文案位置
      center: ['45%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '74%']              // 圆环大小、粗细
    }
  },
  cost: {
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    pieData: { // 浪费花费分析主图表（环形图）
      color: ['#ff7755', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 35,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',         // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']              // 圆环大小、粗细
    },
    wastBarData: { // 浪费金额图表
      yAxisData: ['预计十二个月', '过去30天'],
      topValue: 0,
      topColor: '#ff975e',
      bottomValue: 0,
      bottomColor: '#f4ba4a',
      formatter: function (obj) { // x轴格式化
        return '￥' + Vue.toFixedInit(obj.value)
      }
    },
    keywordBarData: { // 否定关键字图表
      yAxisData: ['行业平均水平', '我'],
      topValue: 0,
      topColor: '#33c0cc',
      bottomValue: 0,
      bottomColor: '#5dafd1',
      formatter: function (obj) { // x轴格式化
        return obj.value.toFixed(1)
      }
    },
    optimize: {    // 优化页面
      nk: {        // 否定关键字
        allSelectStatus: true,                   // 全选状态
        selectId: [],                            // 选中id集合
        listTotal: 0,                            // 列表数据总数
        sortStatus: {prop: 'cost', order: 'ascending'},  // 排序状态
        list: {},                                // 否定关键字推荐全部数据
        datas: [],                               // table数据
        totalSaveCost: 0,                       // 总的节省
        totalWastCost: 0,                       // 总的浪费
        dialog: {                                    // 弹框
          optimize: {                                // 浪费花费优化-优化弹框
            list: {},                                // 全部数据
            datas: [],                               // table数据
            visible: false,                         // 优化弹框显示
            allSelectStatus: true,                  // 全选状态
            selectId: [],                           // 选中id集合
            selectRowMsg: [],                       // 选中这一行的数据
            matchStatus: [],                        // 匹配类型
            sortStatus: {prop: 'cost', order: 'ascending'}, // 排序状态
            modifyVal: ''                           // 表格中修改框的值
          }
        }
      },
      nkPro: {    // 否定关键字-PRO
        allSelectStatus: true,                   // 全选状态
        selectId: [],                            // 选中id集合
        listTotal: 0,                            // 列表数据总数
        sortStatus: {prop: 'cost', order: 'ascending'},  // 排序状态
        list: {},                                // 否定关键字推荐
        datas: []                                // 弹框的table数据
      }
    }
  },
  quality: { // 质量得分优化
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    clicksIncrement: 0, // 点击增长
    savedCost: 0,       // 节省花费
    screenVal: 2,   // 筛选
    pieData: {
      color: ['#4dbd74', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',         // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']              // 圆环大小、粗细
    },
    barData: {
      name: '（展示量占比）',
      data: [],
      legendData: [
        {name: '展示次数占比'},
        {name: '行业平均水平'}
      ],
      xAxisFormatter: function (value, index) { // x轴格式化
        let re = /\./gi
        if (re.test(value.toString())) {
          return ''
        }
        return value + '分'
      },
      yAxisFormatter: function (value, index) { // y轴格式化
        if (value === 0) {
          return value
        }
        return value + '%'
      },
      barMaxWidth: 46,
      barColor: '#33c0cc',
      lineColor: '#f5bd4c',                 // 折线颜色
      seriesFormatter: function (params) {
        var tip = '<span style="color: #bbb">质量得分：</span>' + params.data[0] + '<br/>' +
          '<span style="color: #bbb">展示次数占比：</span>' + params.data[1].toFixed(2) + '%<br/>' +
          '<span style="color: #bbb">展示次数：</span>' + params.data[2] + ' 次'
        return tip
      }
    },
    optimize: { // 优化列表数据
      allSelectStatus: true,                   // 全选状态
      selectId: [],                            // 选中id集合
      listTotal: 0,                            // 列表数据总数
      sortStatus: {prop: 'cost', order: 'ascending'},  // 排序状态
      list: {},                                // 全部数据
      datas: []                                // 仅table数据
    }
  },
  ctr: { // 点击率 散点图
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    list: {},
    pie: {
      name: '（点击率）',
      color: ['#4dbd74', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',       // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']              // 圆环大小、粗细
    },
    scatter: {
      name: '（点击率）',
      xMin: 1, // X轴最小值 设置后可不用户设置Y轴数据
      xMax: 7, // X轴最大值
      interval: 1, // X间隔
      legendData: [
        {name: '行业平均水平'},
        {name: '高于行业平均水平的有效关键字'},
        {name: '低于行业平均水平的有效关键字'}
      ],
      topPointColor: '#4dbd74',             // 上方点的颜色
      bottomPointColor: '#ff975e',          // 下方点的颜色
      lineColor: '#5dafd1',                 // 折线颜色
      xAxisFormatter: function (value, index) { // x轴格式化
        if (value === 0) {
          return null
        }
        return value
      },
      yAxisFormatter: function (value, index) { // y轴格式化
        if (value === 0) {
          return value
        }
        return value + '%'
      },
      scatterTopData: [ // 上面的点
      ],
      scatterBottomData: [ // 下面的点
      ],
      lineData: [  // 折线
      ]
    },
    optimize: { // 优化列表数据
      impressAd: {
        allSelectStatus: true,                   // 全选状态
        selectId: [],                            // 选中id集合
        listTotal: 0,                            // 列表数据总数
        sortStatus: {prop: 'impressions', order: 'descending'},  // 排序状态
        list: {},                                // 全部数据
        datas: []                                // 仅table数据
      },
      searchAd: {
        allSelectStatus: true,                   // 全选状态
        selectId: [],                            // 选中id集合
        listTotal: 0,                            // 列表数据总数
        sortStatus: {prop: 'impressions', order: 'descending'},  // 排序状态
        list: {},                                // 全部数据
        datas: []                                // 仅table数据
      }
    }
  },
  textAd: {                               // 文字广告
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    list: {
      'Computers': {
        best: '',
        worst: '',
        avg: ''
      },
      'Tablets with full browsers': {
        best: '',
        worst: '',
        avg: ''
      },
      'Mobile devices with full browsers': {
        best: '',
        worst: '',
        avg: ''
      }
    },
    pieData: {
      color: ['#4dbd74', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',       // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%'],             // 圆环大小、粗细
      data: [{}]
    },
    barData: {
      grid: {left: '0%', right: '55%', top: '10%', bottom: '0%', containLabel: true},
      yAxisData: ['行业平均水平', '我'],
      topValue: 2.5,
      topColor: '#5dafd1',
      bottomValue: 0,
      bottomColor: '#33c0cc'
    },
    optimize: {                                // 优化列表数据
      allSelectStatus: true,                   // 全选状态
      selectId: [],                            // 选中id集合
      id: '',                                  // 立即添加当前点击id
      listTotal: 0,                            // 列表数据总数
      visible: false,                         // 优化弹框显示
      sortStatus: {prop: 'proposalAd', order: 'ascending'},  // 排序状态
      list: {},                                // 全部数据
      datas: [],                               // 仅table数据
      dialog: {
        keywords: [],                          // 两个标题
        finalUrlData: [],                          // 最终到达网址
        finalUrlBool: false,                  // 最终到达网址是否一样
        finalMobileUrlData: [],                    // 移动网址
        trackingUrlTemplate: ['1', '2', '3'],  // 跟踪模板
        form: {                                // 表单数据
          description: '',                     // 广告内容描述
          domainName: '',        // 域名
          domainNameDefault: 'www.Google.com',        // 域名演示
          descriptionDefault: '外贸圈系阿里巴巴国际网站下属网站，成立于2012年，旨在为电商人搭建拥有外贸头条、外贸培训、外贸问答、外贸服务、外贸论坛等板块及获取今日焦点，好文推荐，...',
          headlinePart1: '',                   // 第一个标题
          headlinePart1Default: '阿里巴巴外贸圈',   // 第一个标题演示
          headlinePart2: '',                   // 第二个标题
          headlinePart2Default: '外贸圈|全球领先的外贸人社区，外贸交流平台-国际贸易人学习和交流的外贸网站。',                   // 第二个标题演示
          finalUrl: [],                        // 最终到达网址
          finalMobileUrl: '',                  // 移动网址
          path1: '',                           // 路径input1
          path2: '',                           // 路径input2
          trackingUrlTemplate: '',             // 跟踪模板
          name1: '',
          value1: '',
          name2: '',
          value2: '',
          name3: '',
          value3: ''
        }
      }
    }
  },
  keyword: {  // 长尾关键字
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    percent: [],
    pie: {
      color: ['#ff7755', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',       // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']             // 圆环大小、粗细
    },
    ring: {
      color: ['#4dbd74', '#33c0cc', '#f4ba4a'],
      legendData: ['仅1个单词的关键字占比', '仅2个单词组成的关键字占比', '3个单词或以上组成的关键字占比'],
      value: [],
      seriesFormatter: function (params) {
        var tip = '<span style="color: #fafafa">' + params.data.name + '<br/>' + params.percent.toFixed(1) + '%</span>'
        return tip
      }
    },
    optimize: {   // 优化列表数据
      allSelectStatus: true,                   // 全选状态
      selectId: [],                            // 选中id集合
      listTotal: 0,                            // 列表数据总数
      sortStatus: {prop: 'cost', order: 'ascending'},  // 排序状态
      list: {},                                // 全部数据
      datas: []                                // 仅table数据
    }
  },
  shareNum: {                              // 展示份额
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    optimize: {   // 优化列表数据
      allSelectStatus: true,                   // 全选状态
      selectId: [],                            // 选中id集合
      selectRowMsg: [],                        // 选中这一行的数据
      listTotal: 0,                            // 列表数据总数
      sortStatus: {prop: 'searchRankLostImpressionShare', order: 'descending'},  // 排序状态
      list: {},                                // 全部数据
      searchImpressionShareLost: '',           // 已损失的展示份额
      datas: []                                // 仅table数据
    },
    budgetdialog: {                         // 弹框预算数据
      other: '',
      radio: '',
      total: 'ctr'                        // 点击、展示导航跳转
    },
    percent: [],
    ctrPie: {                             // 弹框内的图标数据
      data: [85, 30, 40, 108]
    },
    pie: {
      color: ['#ff7755', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',       // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']             // 圆环大小、粗细
    },
    ring: {
      color: ['#4dbd74', '#33c0cc', '#f4ba4a'],
      legendData: ['预算错失的展示份额', '广告评级错失的展示份额', '搜索展示份额'],
      value: [15, 69, 99]
    }
  },
  overHead: {                             // 搜索广告附加信息
    data: { // 存分析-全部数据
      evaluations: ['', '', '']
    },
    Flex: false,
    pie: {
      color: ['#ff7755', '#dfe6e8'],      // 圆环的两个色值
      topFontPadding: [-28, 0, 0, 0],     // 圆环内上面文案位置
      value: 0,                          // 圆环内上面分值
      topFontSize: 46,                    // 圆环内上面分值字体大小
      bottomFontName: '指标得分',       // 圆环内下面文案
      bottomFontPadding: [48, 0, 0, 0],   // 圆环内下面文案位置
      center: ['46%', '50%'],             // 圆环位置在box里居中
      radius: ['65%', '76%']             // 圆环大小、粗细
    }
  },
  otherIndex: {                          // 其他指标
    data: {}
  },

  /**
  * 优化数据变量
  **/
  optimizeTextAd: {                                  // 文字广告--优化列表
    textAdList: [
      {
        id: 1,
        keyWord: '2016-05-03',
        adGroup: 'Tom',
        campaign: 'Grove St, Los Angeles',
        quality: 5,
        conversion: 5,
        cpc: 5,
        ctrCount: 5,
        showCount: 5,
        totalConsumption: 1236,
        ctr: 1233,
        share: 1234
      },
      {
        id: 2,
        keyWord: '2016-05-03',
        adGroup: 'Tom',
        campaign: 'Grove St, Los Angeles',
        quality: 7,
        conversion: 7,
        cpc: 7,
        ctrCount: 9,
        showCount: 9,
        totalConsumption: 9,
        ctr: 8,
        share: 8
      }
    ],
    pageNum: 1,                                     // 默认页码
    pageSize: 20,                                   // 每页多少条
    textAdListTotal: 65,                           // 列表总条数
    sortStatus: {prop: null, order: null}           // 排序状态
  },
  optimizeKeyword: {
    keywordList: [
      {
        id: 1,
        keyWord: '2016-05-03',
        adGroup: 'Tom',
        campaign: 'Grove St, Los Angeles',
        quality: 5,
        conversion: 5,
        cpc: 5,
        ctrCount: 5,
        showCount: 5,
        totalConsumption: 1236,
        ctr: 1233,
        share: 1234
      },
      {
        id: 2,
        keyWord: '2016-05-03',
        adGroup: 'Tom',
        campaign: 'Grove St, Los Angeles',
        quality: 7,
        conversion: 7,
        cpc: 7,
        ctrCount: 9,
        showCount: 9,
        totalConsumption: 9,
        ctr: 8,
        share: 8
      }
    ],
    pageNum: 1,                                     // 默认页码
    pageSize: 20,                                   // 每页多少条
    keywordListTotal: 32,                           // 列表总条数
    sortStatus: {prop: null, order: null}           // 排序状态
  }
}
// 获取本地session状态
let $store = JSON.parse(sessionStorage.getItem('$store'))
if ($store != null && $store.query.account != null) {
  States.publicLoading = false
}
if ($store) {
  for (let key in $store) {
    States[key] = $store[key]
  }
}

export default States
