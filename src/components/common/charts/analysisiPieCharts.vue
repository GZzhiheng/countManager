<style scoped>
  .circular{position: relative; width:260px; height:180px; }
</style>
<template>
  <div class="circular" style="width:260px; height:180px;" :id="tuBiaoId">
  </div>
</template>
<script>
  import Features from 'vue-echarts-v3/src/lite.vue'
  import 'echarts/lib/chart/pie'
  export default {
    name: 'circular',
    data () {
      return {
        chart: null,
        loading: false,
        tuBiaoId: '',
        arr: {
          color: this.options.color,
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
                value: this.options.value, // 所得分
                label: {
                  normal: {   // 圆环内的位置
                    verticalAlign: 'top'
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      padding: this.options.topFontPadding, // 用padding设置位置
                      textStyle: {  // 圆环内的样式
                        color: this.options.color[0], // ，第一个颜色的值
                        fontSize: this.options.topFontSize
                      }
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: this.options.color[0] // 悬浮在图形上的颜色
                  }
                }
              },
              {
                name: this.options.bottomFontName,  // 下部分文字文案
                value: 100 - this.options.value,  // 剩下的分
                label: {
                  normal: {   // 圆环内的位置
                    verticalAlign: 'middle'
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      padding: this.options.bottomFontPadding, // 用padding设置位置
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
                    color: '#ebeff0' // 悬浮在图形上的颜色
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
    },
    created () {
      this.tuBiaoId = 'id' + Math.random(100000, 500000)
    },
    mounted () {
      console.log(this.tuBiaoId)
      this.chart = echarts.init(document.getElementById(this.tuBiaoId))
      console.log(this.chart)
      this.chart.setOption(this.arr)
      window.addEventListener('resize', this.resize, false)
    },
    watch: {
      options: {
        handler () {
          this.chart.setOption(this.arr)
        },
        deep: true
      }
    }
  }
</script>
