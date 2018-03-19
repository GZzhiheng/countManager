<template>
  <!--质量得分内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <p class="quality-add">您的质量得分提高<span class="suggest-data-color"> 1 </span>分，
        可以为您节省<span class="suggest-data-color"> ¥{{$toFixed(quality.savedCost)}} </span>元或每月增加
        <span class="suggest-data-color"> {{quality.clicksIncrement}} </span>个点击</p>
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px;height:167px;" id="qualityPie">
          </div>
        </div>
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.qualityScoreTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">过去90天，{{quality.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{quality.data.evaluations[1]}}</div>
          <div class="chart-right-box-suggest" v-if="quality.data.evaluations[2]">{{quality.data.evaluations[2]}}</div>
          <div class="chart-right-box-btn" v-if="query.qualityScoreTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeQuality'}">立即优化
              <span class="optimizeCount" v-if="query.qualityScoreTips>0">{{query.qualityScoreTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.qualityScoreTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details">
      <div class="chart-details-row">
        <div class="chart-details-box">
          <div class="chart-details-title">关键字质量得分占比</div>
          <div class="chart-details-content" style="height: 310px;padding: 0px">
            <div class="circular" style="width:100%; height:310px;" id="qualityColumn">
            </div>
          </div>
          <p class="eCharts-X-name">(质量得分)<br>过去90天</p>
        </div>
        <div class="clear-both"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  export default {
    data () {
      return {
        qualityPieChartOption: {},
        qualityPieChart: null,
        qualityColumnChartOption: {},
        qualityColumnChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getQuality')
      this.qualityPieChart = echarts.init(document.getElementById('qualityPie'))
      this.qualityColumnChart = echarts.init(document.getElementById('qualityColumn'))
      this.pieDom()
      this.qualityPieChart.setOption(this.qualityPieChartOption)
      this.columnDom()
      this.qualityColumnChart.setOption(this.qualityColumnChartOption)
      window.addEventListener('resize', this.resize, false)
      this.resize()
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      quality () {
        return this.$store.state.quality
      }
    },
    methods: {
      pieDom () {
        this.qualityPieChartOption = this.module.pie
        let option = this.quality.pieData
        this.qualityPieChartOption.color = option.color
        this.qualityPieChartOption.series.center = option.center
        this.qualityPieChartOption.series.radius = option.radius
        this.qualityPieChartOption.series.data[0].value = option.value
        this.qualityPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.qualityPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.qualityPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.qualityPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.qualityPieChartOption.series.data[1].name = option.bottomFontName
        this.qualityPieChartOption.series.data[1].value = 100 - option.value
        this.qualityPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      columnDom () {
        this.qualityColumnChartOption = this.module.column
        let option = this.quality.barData
        this.qualityColumnChartOption.legend.data = option.legendData
        this.qualityColumnChartOption.xAxis.axisLabel.formatter = option.xAxisFormatter
        this.qualityColumnChartOption.yAxis.name = option.name
        this.qualityColumnChartOption.yAxis.axisLabel.formatter = option.yAxisFormatter
        this.qualityColumnChartOption.series[0].tooltip.formatter = option.seriesFormatter
        this.qualityColumnChartOption.series[0].barMaxWidth = option.barMaxWidth
        this.qualityColumnChartOption.series[0].data = option.data
        this.qualityColumnChartOption.series[0].name = option.legendData[0].name
        this.qualityColumnChartOption.series[0].itemStyle.normal.color = option.barColor
        this.qualityColumnChartOption.series[0].itemStyle.emphasis.color = option.barColor
        this.qualityColumnChartOption.series[1].name = option.legendData[1].name
        this.qualityColumnChartOption.series[1].itemStyle.normal.color = option.lineColor
      },
      resize () {
        let barWidth = (document.body.offsetWidth - 300)
        this.qualityPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
        this.qualityColumnChart.resize({
          width: barWidth,
          height: 'auto'
        })
      }
    },
    watch: {
      'quality.pieData': {
        handler () {
          this.pieDom()
          this.qualityPieChart.setOption(this.qualityPieChartOption)
        },
        deep: true
      },
      'quality.barData': {
        handler () {
          this.columnDom()
          this.qualityColumnChart.setOption(this.qualityColumnChartOption)
        },
        deep: true
      }
    }
  }
</script>
