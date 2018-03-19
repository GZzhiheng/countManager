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
          backgroundColor: '#fff',
          animation: false,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top: 5,
            bottom: 30
          },
          xAxis: {
            type: 'value',
            scale: true,
            position: 'bottom',
            splitLine: {
              interval: 2,
              lineStyle: {
                type: 'dotted',
                color: '#cfc3bd'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            splitNumber: 60,
            type: 'category',
            show: true,
            axisLine: {
              show: false,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: {
              show: false,
              rotate: 0,
              textStyle: {
                color: '#682d19'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#cfc3bd'
              }
            },
            data: []
          },
          series: [{
            name: '费用',
            type: 'bar',
            barGap: '-100%',
            label: {
              normal: {
                textStyle: {
                  color: '#682d19'
                },
                position: 'right',
                show: false,
                formatter: '{b}'
              }
            },
            itemStyle: {
              normal: {
                color: '#1FBCD2'
              }
            },
            data: this.options.data
          }]
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
              backgroundColor: '#faf6f3',
              animation: false,
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                top: 60,
                bottom: 30
              },
              xAxis: {
                type: 'value',
                scale: true,
                position: 'bottom',
                splitLine: {
                  interval: 2,
                  lineStyle: {
                    type: 'dotted',
                    color: '#cfc3bd'
                  }
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              },
              yAxis: {
                splitNumber: 25,
                type: 'category',
                show: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    type: 'dashed'
                  }
                },
                axisLabel: {
                  show: false,
                  rotate: 0,
                  textStyle: {
                    color: '#682d19'
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#cfc3bd'
                  }
                },
                data: []
              },
              series: [{
                name: '费用',
                type: 'bar',
                barGap: '-100%',
                label: {
                  normal: {
                    textStyle: {
                      color: '#682d19'
                    },
                    position: 'right',
                    show: false,
                    formatter: '{b}'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#1FBCD2'
                  }
                },
                data: newVal.data
              }]
            }
          )
        },
        deep: true
      }
    }
  }
</script>
