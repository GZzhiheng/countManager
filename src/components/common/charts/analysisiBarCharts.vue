<style scoped>
  .circular{width:300px; height:180px; position: relative}
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
  export default {
    name: 'bar',
    data () {
      return {
        chart: null,
        loading: false,
        arr: {
          title: {
            textStyle: {
              fontSize: 14
            }
          },
          grid: this.options.grid || {left: '0%', right: '15%', top: '10%', bottom: '0%', containLabel: true},
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
            data: this.options.yAxisData
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
                  formatter: this.options.formatter, // 柱子右边的数据的单位
                  textStyle: {
                    fontSize: 14
                  },
                  distance: 10  // 柱子右边的数据
                }
              },
              data: [
                {
                  value: this.options.bottomValue, // 下面柱子的值
                  itemStyle: {
                    normal: {
                      color: this.options.bottomColor
                    },
                    emphasis: {
                      color: this.options.bottomColor // 悬浮在图形上的颜色
                    }
                  }
                },
                {
                  value: this.options.topValue, // 上面柱子的值
                  itemStyle: {
                    normal: {
                      color: this.options.topColor
                    },
                    emphasis: {
                      color: this.options.topColor // 悬浮在图形上的颜色
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    },
    props: {
      options: Object
    },
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
                textStyle: {
                  fontSize: 14
                }
              },
              grid: newVal.grid || {left: '0%', right: '15%', top: '10%', bottom: '0%', containLabel: true},
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
                data: newVal.yAxisData
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
                      formatter: newVal.formatter, // 柱子右边的数据的单位
                      textStyle: {
                        fontSize: 14
                      },
                      distance: 10  // 柱子右边的数据
                    }
                  },
                  data: [
                    {
                      value: newVal.bottomValue, // 下面柱子的值
                      itemStyle: {
                        normal: {
                          color: newVal.bottomColor
                        },
                        emphasis: {
                          color: newVal.bottomColor // 悬浮在图形上的颜色
                        }
                      }
                    },
                    {
                      value: newVal.topValue, // 上面柱子的值
                      itemStyle: {
                        normal: {
                          color: newVal.topColor
                        },
                        emphasis: {
                          color: newVal.topColor // 悬浮在图形上的颜色
                        }
                      }
                    }
                  ]
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
