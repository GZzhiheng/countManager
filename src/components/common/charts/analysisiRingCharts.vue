<style scoped>
  .circular{position: relative; width:260px; height:180px; }
</style>
<template>
  <div class="circular">
    <features :option="arr" :loading="loading" @ready="onReady" @click="onClick"></features>
  </div>
</template>
<script>
  import Features from 'vue-echarts-v3/src/lite.vue'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  export default {
    name: 'circular',
    data () {
      return {
        chart: null,
        loading: false,
        arr: {
          title: {
            text: this.options.title || '',
            textStyle: {
              fontSize: this.options.fontSize || 14
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
            data: this.options.legendData
          },
          color: this.options.color,
          series:
          {
            name: this.options.title,
            hoverAnimation: false, // 移上去图形变大
            type: 'pie',
            center: this.options.center,
            radius: this.options.radius,
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
                name: this.options.legendData[0],
                value: this.options.value[0], // 所得分
                itemStyle: {
                  emphasis: {
                    color: this.options.color[0] // 悬浮在图形上的颜色
                  }
                }
              },
              {
                name: this.options.legendData[1],
                value: this.options.value[1],  // 所得分
                itemStyle: {
                  emphasis: {
                    color: this.options.color[1] // 悬浮在图形上的颜色
                  }
                }
              },
              {
                name: this.options.legendData[2],
                value: this.options.value[2],  // 所得分
                itemStyle: {
                  emphasis: {
                    color: this.options.color[2] // 悬浮在图形上的颜色
                  }
                }
              }
            ]
          }
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
                text: newVal.title || '',
                textStyle: {
                  fontSize: newVal.fontSize || 14
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
                data: newVal.legendData
              },
              color: newVal.color,
              series:
              {
                name: newVal.title,
                hoverAnimation: false, // 移上去图形变大
                type: 'pie',
                center: newVal.center,
                radius: newVal.radius,
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
                    name: newVal.legendData[0],
                    value: newVal.value[0], // 所得分
                    itemStyle: {
                      emphasis: {
                        color: newVal.color[0] // 悬浮在图形上的颜色
                      }
                    }
                  },
                  {
                    name: newVal.legendData[1],
                    value: newVal.value[1],  // 所得分
                    itemStyle: {
                      emphasis: {
                        color: newVal.color[1] // 悬浮在图形上的颜色
                      }
                    }
                  },
                  {
                    name: newVal.legendData[2],
                    value: newVal.value[2],  // 所得分
                    itemStyle: {
                      emphasis: {
                        color: newVal.color[2] // 悬浮在图形上的颜色
                      }
                    }
                  }
                ]
              }
            }
          )
        },
        deep: true
      }
    }
  }
</script>
