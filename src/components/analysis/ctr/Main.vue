<template>
  <!--点击率内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <p class="quality-add">搜索广告点击率提高
        <span class="suggest-data-color"> 1% </span>，您可以增加
        <span class="suggest-data-color"> {{$toFixedVue(ctr.data.searchAdIncreatmentClicks)}} </span>个点击，或者
        <span class="suggest-data-color"> {{$toFixedVue(ctr.data.searchAdIncreatementConvs)}} </span>个转化；展示广告点击率提高
        <span class="suggest-data-color"> 0.5% </span>，您可以增加
        <span class="suggest-data-color"> {{$toFixedVue(ctr.data.displayIncreatmentClicks)}} </span>个点击，或者
        <span class="suggest-data-color"> {{$toFixedVue(ctr.data.displayIncreatementConvs)}} </span>个转化；
      </p>
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="ctrPie">
          </div>
        </div>
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.clickRateTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">过去14天，{{ctr.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{ctr.data.evaluations[1]}}</div>
          <div class="chart-right-box-btn" v-if="query.clickRateTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeImpressAd'}">立即优化
              <span class="optimizeCount" v-if="query.clickRateTips>0">{{query.clickRateTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.clickRateTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details">
      <div class="chart-details-row">
        <div class="chart-details-box">
          <div class="chart-details-title">有效关键字点击率与行业水平对比</div>
          <div class="chart-details-content not-hover" style="height: 310px;padding: 0">
            <div class="circular" style="width:100%; height:310px;" id="ctrScatter">
            </div>
          </div>
          <p class="eCharts-X-name">（平均排名）<br>过去14天</p>
        </div>
        <div class="clear-both"></div>
      </div>
    </div>
    <div class="pad-tp-bd-20" style="padding-top: 10px">
      <div class="chart-details-title" style="border-bottom: none;">各设备数据对比</div>
      <table class="table dataTable table-con table-bordered table-hover table-responsive table-analysis">
        <thead>
          <tr class="no-right-border">
            <th>设备</th>
            <th>搜索广告点击率（过去14天）</th>
            <th>搜索广告平均排名（过去14天）</th>
            <th>展示广告点击率（过去7天）</th>
            <th>展示广告平均排名（过去7天）</th>
          </tr>
        </thead>
        <tbody>
          <tr class="no-right-border" v-if="ctr.list.Computers">
            <td>计算机</td>
            <td>{{$changePercent(ctr.list.Computers.searchClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list.Computers.searchAveragePosition || module.tableEmptyPlaceholder}}</td>
            <td>{{$changePercent(ctr.list.Computers.displayClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list.Computers.displayAveragePosition || module.tableEmptyPlaceholder}}</td>
          </tr>
          <tr class="no-right-border"v-if="ctr.list['Tablets with full browsers']">
            <td>平板设备</td>
            <td>{{$changePercent(ctr.list['Tablets with full browsers'].searchClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list['Tablets with full browsers'].searchAveragePosition || module.tableEmptyPlaceholder}}</td>
            <td>{{$changePercent(ctr.list['Tablets with full browsers'].displayClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list['Tablets with full browsers'].displayAveragePosition || module.tableEmptyPlaceholder}}</td>
          </tr>
          <tr class="no-right-border"v-if="ctr.list['Mobile devices with full browsers']">
            <td>移动设备</td>
            <td>{{$changePercent(ctr.list['Mobile devices with full browsers'].searchClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list['Mobile devices with full browsers'].searchAveragePosition || module.tableEmptyPlaceholder}}</td>
            <td>{{$changePercent(ctr.list['Mobile devices with full browsers'].displayClickRate) || module.tableEmptyPlaceholder}}</td>
            <td>{{ctr.list['Mobile devices with full browsers'].displayAveragePosition || module.tableEmptyPlaceholder}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/chart/line'
  export default {
    data () {
      return {
        ctrPieChartOption: {},
        ctrPieChart: null,
        ctrScatterChartOption: {},
        ctrScatterChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getCtr')
      this.ctrPieChart = echarts.init(document.getElementById('ctrPie'))
      this.ctrScatterChart = echarts.init(document.getElementById('ctrScatter'))
      this.pieDom()
      this.ctrPieChart.setOption(this.ctrPieChartOption)
      this.scatterDom()
      this.ctrScatterChart.setOption(this.ctrScatterChartOption)
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
      ctr () {
        return this.$store.state.ctr
      }
    },
    methods: {
      pieDom () {
        this.ctrPieChartOption = this.module.pie
        let option = this.ctr.pie
        this.ctrPieChartOption.color = option.color
        this.ctrPieChartOption.series.center = option.center
        this.ctrPieChartOption.series.radius = option.radius
        this.ctrPieChartOption.series.data[0].value = option.value
        this.ctrPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.ctrPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.ctrPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.ctrPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.ctrPieChartOption.series.data[1].name = option.bottomFontName
        this.ctrPieChartOption.series.data[1].value = 100 - option.value
        this.ctrPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      scatterDom () {
        this.ctrScatterChartOption = this.module.scatter
        let option = this.ctr.scatter
        this.ctrScatterChartOption.legend.data = option.legendData
        this.ctrScatterChartOption.xAxis.min = option.xMin
        this.ctrScatterChartOption.xAxis.max = option.xMax
        this.ctrScatterChartOption.xAxis.interval = option.interval
        this.ctrScatterChartOption.yAxis.name = option.name
        this.ctrScatterChartOption.xAxis.axisLabel.formatter = option.xAxisFormatter
        this.ctrScatterChartOption.yAxis.axisLabel.formatter = option.yAxisFormatter
        this.ctrScatterChartOption.series[0].name = option.legendData[1].name
        this.ctrScatterChartOption.series[0].itemStyle.normal.color = option.topPointColor
        this.ctrScatterChartOption.series[0].itemStyle.emphasis.color = option.topPointColor
        this.ctrScatterChartOption.series[0].data = option.scatterTopData
        this.ctrScatterChartOption.series[1].name = option.legendData[2].name
        this.ctrScatterChartOption.series[1].itemStyle.normal.color = option.bottomPointColor
        this.ctrScatterChartOption.series[1].itemStyle.emphasis.color = option.bottomPointColor
        this.ctrScatterChartOption.series[1].data = option.scatterBottomData
        this.ctrScatterChartOption.series[2].name = option.legendData[0].name
        this.ctrScatterChartOption.series[2].itemStyle.normal.color = option.lineColor
        this.ctrScatterChartOption.series[2].data = option.lineData
      },
      resize () {
        let barWidth = (document.body.offsetWidth - 300)
        this.ctrPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
        this.ctrScatterChart.resize({
          width: barWidth,
          height: 'auto'
        })
      }
    },
    watch: {
      'ctr.pie': {
        handler () {
          this.pieDom()
          this.ctrPieChart.setOption(this.ctrPieChartOption)
        },
        deep: true
      },
      'ctr.scatter': {
        handler () {
          this.scatterDom()
          this.ctrScatterChart.setOption(this.ctrScatterChartOption)
        },
        deep: true
      }
    }
  }
</script>
