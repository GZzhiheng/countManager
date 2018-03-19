<style>
 .span-coloe{display:inline-block;width: 16px;height: 16px;position:relative;top:3px;border-radius: 3px;margin-right: 5px}
 .span-yellow{background-color: #f4ba4a}
 .span-green{background-color: #4dbd74}
 .span-blue{background-color: #33c0cc}
</style>
<template>
  <!--点击率内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <p class="quality-add">
        过去14天，您的搜索广告共错失了<span class="suggest-data-color"> {{shareNum.data.searchImpressionShareLost}} </span>的展示份额
      </p>
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="shareNumPie">
          </div>
        </div>
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.impressionsShareTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">{{shareNum.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{shareNum.data.evaluations[1]}}</div>
          <div class="chart-right-box-btn" v-if="query.impressionsShareTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeShareNum'}">立即优化
              <span class="optimizeCount" v-if="query.impressionsShareTips>0">{{query.impressionsShareTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.impressionsShareTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details">
      <div class="chart-details-row">
        <div class="chart-details-box">
          <div class="chart-details-title">展示份额占比</div>
          <div>
            <div class="ring-chart-content not-hover" style="width:238px;height: 140px;">
              <div class="ring-chart-legend-data share-ring-chart-legend-data" style="width: 100%">
                <div><!--<span class="span-coloe span-yellow"></span>-->因预算错失的展示份额</div>
                <div><!--<span class="span-coloe span-green"></span>-->因评级错失的展示份额</div>
                <div><!--<span class="span-coloe span-blue"></span>-->搜索广告展示份额</div>
              </div>
              <!--<div class="circular" style="width:238px; height:186px;" id="shareNumRing">-->
              <!--</div>-->
            </div>
            <div class="ring-chart-legend-data share-ring-chart-legend-data">
              <div v-for="item in shareNum.percent">{{item}}</div>
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
  import 'echarts/lib/component/legend'
  export default {
    data () {
      return {
        shareNumPieChartOption: {},
        shareNumPieChart: null
//        shareNumRingChartOption: {},
//        shareNumRingChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getShareNum')
      this.shareNumPieChart = echarts.init(document.getElementById('shareNumPie'))
//      this.shareNumRingChart = echarts.init(document.getElementById('shareNumRing'))
      window.addEventListener('resize', this.resize, false)
      this.pieDom()
      this.shareNumPieChart.setOption(this.shareNumPieChartOption)
//      this.ringDom()
//      this.shareNumRingChart.setOption(this.shareNumRingChartOption)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      shareNum () {
        return this.$store.state.shareNum
      }
    },
    methods: {
      pieDom () {
        this.shareNumPieChartOption = this.module.pie
        let option = this.shareNum.pie
        this.shareNumPieChartOption.color = option.color
        this.shareNumPieChartOption.series.center = option.center
        this.shareNumPieChartOption.series.radius = option.radius
        this.shareNumPieChartOption.series.data[0].value = option.value
        this.shareNumPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.shareNumPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.shareNumPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.shareNumPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.shareNumPieChartOption.series.data[1].name = option.bottomFontName
        this.shareNumPieChartOption.series.data[1].value = 100 - option.value
        this.shareNumPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
//      ringDom () {
//        this.shareNumRingChartOption = this.module.ring
//        let option = this.shareNum.ring
//        this.shareNumRingChartOption.legend.data = option.legendData
//        this.shareNumRingChartOption.color = option.color
//        this.shareNumRingChartOption.series.data[0].name = option.legendData[0]
//        this.shareNumRingChartOption.series.data[0].value = option.value[0]
//        this.shareNumRingChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
//        this.shareNumRingChartOption.series.data[1].name = option.legendData[1]
//        this.shareNumRingChartOption.series.data[1].value = option.value[1]
//        this.shareNumRingChartOption.series.data[1].itemStyle.emphasis.color = option.color[1]
//        this.shareNumRingChartOption.series.data[2].name = option.legendData[2]
//        this.shareNumRingChartOption.series.data[2].value = option.value[2]
//        this.shareNumRingChartOption.series.data[2].itemStyle.emphasis.color = option.color[2]
//      },
      resize () {
        this.shareNumPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
//        this.shareNumRingChart.resize({
//          width: 'auto',
//          height: 'auto'
//        })
      }
    },
    watch: {
      'shareNum.pie': {
        handler () {
          this.pieDom()
          this.shareNumPieChart.setOption(this.shareNumPieChartOption)
        },
        deep: true
      }
//      'shareNum.ring': {
//        handler () {
//          this.ringDom()
//          this.shareNumRingChart.setOption(this.shareNumRingChartOption)
//        },
//        deep: true
//      }
    }
  }
</script>
