<template>
  <!--长尾关键字内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="keywordPie">
          </div>
        </div>

        <!--下面div添加类名：chart-right-Unhealthy-box 即需要隐藏显示 立即优化 按钮-->
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.longTailTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">{{keyword.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{keyword.data.evaluations[1]}}</div>
          <div class="chart-right-box-btn" v-if="query.longTailTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeKeyword'}">立即优化
              <span class="optimizeCount" v-if="query.longTailTips>0">{{query.longTailTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.longTailTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details">
      <div class="chart-details-row">
        <div class="chart-details-box">
          <div class="chart-details-title">关键字单词占比统计</div>
          <div class="ring-chart-box">
            <div class="ring-chart-content">
              <div class="circular" style="width:424px; height:186px;" id="keywordRing">
              </div>
            </div>
            <div class="ring-chart-legend-data">
              <div v-for="item in keyword.percent">{{$toFixedVue(item, 1)}}%</div>
            </div>
          </div>
        </div>
        <div class="clear-both"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  export default {
    name: 'diagram',
    data () {
      return {
        keywordPieChartOption: {},
        keywordPieChart: null,
        keywordRingChartOption: {},
        keywordRingChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getLongTailKeyword')
      this.keywordPieChart = echarts.init(document.getElementById('keywordPie'))
      this.keywordRingChart = echarts.init(document.getElementById('keywordRing'))
      window.addEventListener('resize', this.resize, false)
      this.pieDom()
      this.keywordPieChart.setOption(this.keywordPieChartOption)
      this.ringDom()
      this.keywordRingChart.setOption(this.keywordRingChartOption)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      keyword () {
        return this.$store.state.keyword
      }
    },
    methods: {
      pieDom () {
        this.keywordPieChartOption = this.module.pie
        let option = this.keyword.pie
        this.keywordPieChartOption.color = option.color
        this.keywordPieChartOption.series.center = option.center
        this.keywordPieChartOption.series.radius = option.radius
        this.keywordPieChartOption.series.data[0].value = option.value
        this.keywordPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.keywordPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.keywordPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.keywordPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.keywordPieChartOption.series.data[1].name = option.bottomFontName
        this.keywordPieChartOption.series.data[1].value = 100 - option.value
        this.keywordPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      ringDom () {
        this.keywordRingChartOption = this.module.ring
        let option = this.keyword.ring
        this.keywordRingChartOption.legend.data = option.legendData
        this.keywordRingChartOption.color = option.color
        this.keywordRingChartOption.series.tooltip.formatter = option.seriesFormatter
        this.keywordRingChartOption.series.data[0].name = option.legendData[0]
        this.keywordRingChartOption.series.data[0].value = option.value[0]
        this.keywordRingChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.keywordRingChartOption.series.data[1].name = option.legendData[1]
        this.keywordRingChartOption.series.data[1].value = option.value[1]
        this.keywordRingChartOption.series.data[1].itemStyle.emphasis.color = option.color[1]
        this.keywordRingChartOption.series.data[2].name = option.legendData[2]
        this.keywordRingChartOption.series.data[2].value = option.value[2]
        this.keywordRingChartOption.series.data[2].itemStyle.emphasis.color = option.color[2]
      },
      resize () {
        this.keywordPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
        this.keywordRingChart.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    },
    watch: {
      'keyword.pie': {
        handler () {
          this.pieDom()
          this.keywordPieChart.setOption(this.keywordPieChartOption)
        },
        deep: true
      },
      'keyword.ring': {
        handler () {
          this.ringDom()
          this.keywordRingChart.setOption(this.keywordRingChartOption)
        },
        deep: true
      }
    }
  }
</script>
