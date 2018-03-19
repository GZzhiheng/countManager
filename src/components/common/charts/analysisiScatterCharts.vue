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
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/chart/line'
  export default {
    name: 'bar',
    data () {
      return {
        chart: null,
        loading: false,
        arr: {
          legend: {
            top: 15,
            right: 0,
            itemHeight: 8,
            data: this.options.legendData
          },
          grid: {        // 图表整体位置
            left: '0px',
            right: '8px',
            top: '55px',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            gridIndex: 0,
            boundaryGap: false, // 去掉两边留白
            min: this.options.xMin, // X轴最大值
            max: this.options.xMax, // X轴最小值
            interval: this.options.interval, //
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
              formatter: this.options.xAxisFormatter  // y轴刻度值格式化，可以加符号
            },
            axisLine: {
              onZero: true,
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
              name: this.options.legendData[0].name,
              hoverAnimation: false, // 移上去图形变大
              type: 'scatter',
              symbolSize: 8,   // 点的大小
              itemStyle: {
                normal: {
                  color: this.options.topPointColor // 上方圆点的颜色
                },
                emphasis: {
                  color: this.options.topPointColor // 悬浮在圆点上的颜色
                }
              },
              data: this.options.scatterTopData
            },
            {
              name: this.options.legendData[1].name,
              hoverAnimation: false, // 移上去图形变大
              type: 'scatter',
              symbolSize: 8,  // 点的大小
              itemStyle: {
                normal: {
                  color: this.options.bottomPointColor // 下方圆点的颜色
                },
                emphasis: {
                  color: this.options.bottomPointColor // 悬浮在圆点上的颜色
                }
              },
              data: this.options.scatterBottomData
            },
            {
              name: this.options.legendData[2].name,
              type: 'line',
              smooth: false,
              symbolSize: 0, // 折线点大小 0代表没有折线点
              itemStyle: {
                normal: {
                  width: 2,
                  color: this.options.lineColor
                }
              },
              data: this.options.lineData
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
              legend: {
                top: 15,
                right: 0,
                itemHeight: 8,
                data: newVal.legendData
              },
              grid: {        // 图表整体位置
                left: '0px',
                right: '8px',
                top: '55px',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                gridIndex: 0,
                boundaryGap: false, // 去掉两边留白
                min: newVal.xMin, // X轴最大值
                max: newVal.xMax, // X轴最小值
                interval: newVal.interval, // X轴间隔
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
                  formatter: newVal.xAxisFormatter  // x轴刻度值格式化，可以加符号
                },
                axisLine: {
                  onZero: true,
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
                  name: newVal.legendData[0].name,
                  hoverAnimation: false, // 移上去图形变大
                  type: 'scatter',
                  symbolSize: 8,   // 点的大小
                  itemStyle: {
                    normal: {
                      color: newVal.topPointColor // 上方圆点的颜色
                    },
                    emphasis: {
                      color: newVal.topPointColor // 悬浮在圆点上的颜色
                    }
                  },
                  data: newVal.scatterTopData
                },
                {
                  name: newVal.legendData[1].name,
                  hoverAnimation: false, // 移上去图形变大
                  type: 'scatter',
                  symbolSize: 8,  // 点的大小
                  itemStyle: {
                    normal: {
                      color: newVal.bottomPointColor // 下方圆点的颜色
                    },
                    emphasis: {
                      color: newVal.bottomPointColor // 悬浮在圆点上的颜色
                    }
                  },
                  data: newVal.scatterBottomData
                },
                {
                  name: newVal.legendData[2].name,
                  type: 'line',
                  smooth: false,
                  symbolSize: 0, // 折线点大小 0代表没有折线点
                  itemStyle: {
                    normal: {
                      width: 2,
                      color: newVal.lineColor
                    }
                  },
                  data: newVal.lineData
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
