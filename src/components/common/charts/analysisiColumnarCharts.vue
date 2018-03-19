<style scoped>
  .circular {
    width: 100%;
    height: 680px;
    position: relative
  }
</style>
<template>
  <div class="circular">
    <features :option="arr" :loading="loading" @ready="onReady" @click="onClick"></features>
  </div>
</template>
<script>
  import Features from 'vue-echarts-v3/src/lite.vue'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/tooltip'
  export default {
    name: 'bar',
    data () {
      return {
        chart: null,
        loading: false,
        arr: {
          title: {
            show: false
          },
          tooltip: {  // 文本提示
            show: true,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: ''        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {        // 图表整体位置
            left: '0px',
            right: '0',
            top: '55px',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            show: true,
            data: this.options.xAxisData, // X轴坐标值数据
            axisTick: {
              show: false
            },
            axisLabel: {  // X轴坐标值颜色
              textStyle: {
                fontSize: 12, // 字体大小
                color: '#333' // 字体颜色
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ccc' // X轴线颜色
              }
            }
          },
          yAxis: {
            min: this.options.min, // Y轴最大值 设置后可不用户设置Y轴数据
            max: this.options.max, // Y轴最小值
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
            data: this.options.yAxisData, // Y轴数据
            name: this.options.name,
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
              formatter: this.options.yAxisFormatter  // y轴刻度值格式化，可以加符号
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
              tooltip: {
                trigger: 'item',
                padding: [4, 8],
                backgroundColor: 'rgba(63,71,78,0.9)',
                textStyle: {
                  fontSize: 12
                },
                formatter: this.options.seriesFormatter
              },
              smooth: false,
              name: this.options.name,  // Y轴的名称
              type: 'bar',
              barCategoryGap: this.options.barCategoryGap,
              barMaxWidth: this.options.barMaxWidth, // 柱条大小
              data: this.options.data,  // 数据
              itemStyle: {
                normal: {
                  color: this.options.barColor // 柱条的颜色
                },
                emphasis: {
                  color: this.options.barColor // 悬浮在柱条上的颜色
                }
              }
            }
          ]
        }
      }
    },
    props: {options: Object},
    components: {
      Features
    },
    mounted () {
      window.addEventListener('resize', this.resize, false)
    },
    destroyed () {
      window.removeEventListener('resize', this.resize, false)
    },
    methods: {
      doRandom () {
        const that = this
        let data = []
        for (let i = 0, min = 5, max = 99; i < 6; i++) {
          data.push(Math.floor(Math.random() * (max + 1 - min) + min))
        }
        that.loading = !that.loading
        that.bar.series[0].data = data
      },
      onReady (instance) {
        this.chart = instance
      },
      onClick (event, instance, echarts) {
//        console.log(arguments)
      },
      resize () {
        this.chart.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    },
    watch: {
      options: {
        handler (newVal) {
          this.chart.setOption(
            {
              title: {
                show: false
              },
              tooltip: {  // 文本提示
                show: true,
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: ''        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {        // 图表整体位置
                left: '0px',
                right: '0',
                top: '55px',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                show: true,
                data: newVal.xAxisData, // X轴坐标值数据
                axisTick: {
                  show: false
                },
                axisLabel: {  // X轴坐标值颜色
                  textStyle: {
                    fontSize: 12, // 字体大小
                    color: '#333' // 字体颜色
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: '#ccc' // X轴线颜色
                  }
                }
              },
              yAxis: {
                min: newVal.min, // Y轴最大值 设置后可不用户设置Y轴数据
                max: newVal.max, // Y轴最小值
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
                data: newVal.yAxisData, // Y轴数据
                name: newVal.name,
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
                  formatter: newVal.yAxisFormatter  // y轴刻度值格式化，可以加符号
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
                  tooltip: {
                    trigger: 'item',
                    padding: [4, 8],
                    backgroundColor: 'rgba(63,71,78,0.9)',
                    textStyle: {
                      fontSize: 12
                    },
                    formatter: newVal.seriesFormatter
                  },
                  smooth: false,
                  name: newVal.name,  // Y轴的名称
                  type: 'bar',
                  barCategoryGap: newVal.barCategoryGap,
                  barMaxWidth: newVal.barMaxWidth, // 柱条大小
                  data: newVal.data,  // 数据
                  itemStyle: {
                    normal: {
                      color: newVal.barColor // 柱条的颜色
                    },
                    emphasis: {
                      color: newVal.barColor // 悬浮在柱条上的颜色
                    }
                  }
                }
              ]
            }
          )
        },
        deep: true
      }
    }
  }
</script>
