<style scoped>
  .position-absolute .el-input {
    width: 50% !important;
  }
</style>
<template>
  <!--文字广告内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="textAdPie">
          </div>
        </div>

        <!--下面div添加类名：chart-right-Unhealthy-box 即需要隐藏显示 立即优化 按钮-->
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.textAdTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">{{textAd.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{textAd.data.evaluations[1]}}</div>
          <div class="chart-right-box-btn" v-if="query.textAdTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeTextAd'}">立即优化
              <span class="optimizeCount" v-if="query.textAdTips>0">{{query.textAdTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.textAdTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details-row mt-20">
      <div class="chart-details-box">
        <div class="chart-details-title">文字广告数量</div>
        <div class="chart-details-content not-hover" style="height: 116px;padding-top: 20px">
          <div class="circular" style="width:100%; height:66px;" id="textAdBar">

          </div>
          <p class="text-center">(过去30天)</p>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div class="pad-tp-bd-20" style="padding-top: 0;padding-bottom: 30px">
      <div class="chart-details-title">点击率对比</div>
      <div class="mt-20 quality-add">在过去30天，账户中计算机和移动设备分别点击率最高和最低的广告语表现情况如下，我们建议
        <span class="highlight-number-hint">每个广告组添加不少于3条广告语</span>，每隔一段时间优化比较差的广告语内容，提高点击率。
      </div>
      <table class="table dataTable table-con table-bordered table-responsive table-analysis" style="min-width: 658px">
        <thead>
        <tr class="no-right-border">
          <th>广告语</th>
          <th>点击次数</th>
          <th>展示次数</th>
          <th>点击率</th>
          <th>平均排名</th>
        </tr>
        </thead>
        <tbody>
        <tr class="no-right-border best-tr" v-for="item in textAd.list.Computers.best">
          <td class="table-first-td">计算机点击率最高</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border worst-tr" v-for="item in textAd.list.Computers.worst">
          <td class="table-first-td">计算机点击率最低</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border" v-for="item in textAd.list.Computers.avg">
          <td class="table-first-td">计算机平均</td>
          <td>{{$parseInt(item.clicks) || module.tableNullPlaceholder}}</td>
          <td>{{$parseInt(item.impressions) || module.tableNullPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border best-tr" v-for="item in textAd.list['Tablets with full browsers'].best">
          <td class="table-first-td">平板电脑点击率最高</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border worst-tr" v-for="item in textAd.list['Tablets with full browsers'].worst">
          <td class="table-first-td">平板电脑点击率最低</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border" v-for="item in textAd.list['Tablets with full browsers'].avg">
          <td class="table-first-td">平板电脑平均</td>
          <td>{{$parseInt(item.clicks) || module.tableNullPlaceholder}}</td>
          <td>{{$parseInt(item.impressions) || module.tableNullPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border best-tr" v-for="item in textAd.list['Mobile devices with full browsers'].best">
          <td class="table-first-td">移动设备点击率最高</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border worst-tr" v-for="item in textAd.list['Mobile devices with full browsers'].worst">
          <td class="table-first-td">移动设备点击率最低</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="no-right-border" v-for="item in textAd.list['Mobile devices with full browsers'].avg">
          <td class="table-first-td">移动设备平均</td>
          <td>{{$parseInt(item.clicks) || module.tableNullPlaceholder}}</td>
          <td>{{$parseInt(item.impressions) || module.tableNullPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixedVue(item.averagePosition, 1) || module.tableEmptyPlaceholder}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/title'
  export default {
    data () {
      return {
        textAdPieChartOption: {},
        textAdPieChart: null,
        textAdBarChartOption: {},
        textAdBarChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getTextAd')
      this.textAdPieChart = echarts.init(document.getElementById('textAdPie'))
      this.textAdBarChart = echarts.init(document.getElementById('textAdBar'))
      window.addEventListener('resize', this.resize, false)
      this.pieDom()
      this.textAdPieChart.setOption(this.textAdPieChartOption)
      this.barDom()
      this.textAdBarChart.setOption(this.textAdBarChartOption)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      textAd () {
        return this.$store.state.textAd
      }
    },
    methods: {
      pieDom () {
        this.textAdPieChartOption = this.module.pie
        let option = this.textAd.pieData
        this.textAdPieChartOption.color = option.color
        this.textAdPieChartOption.series.center = option.center
        this.textAdPieChartOption.series.radius = option.radius
        this.textAdPieChartOption.series.data[0].value = option.value
        this.textAdPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.textAdPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.textAdPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.textAdPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.textAdPieChartOption.series.data[1].name = option.bottomFontName
        this.textAdPieChartOption.series.data[1].value = 100 - option.value
        this.textAdPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      barDom () {
        this.textAdBarChartOption = this.module.bar
        let option = this.textAd.barData
        this.textAdBarChartOption.grid = option.grid
        this.textAdBarChartOption.yAxis.data = option.yAxisData
        this.textAdBarChartOption.series[0].label.normal.formatter = option.formatter
        this.textAdBarChartOption.series[0].data[0].value = option.bottomValue
        this.textAdBarChartOption.series[0].data[0].itemStyle.normal.color = option.bottomColor
        this.textAdBarChartOption.series[0].data[0].itemStyle.emphasis.color = option.bottomColor
        this.textAdBarChartOption.series[0].data[1].value = option.topValue
        this.textAdBarChartOption.series[0].data[1].itemStyle.normal.color = option.topColor
        this.textAdBarChartOption.series[0].data[1].itemStyle.emphasis.color = option.topColor
      },
      resize () {
        this.textAdPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
        this.textAdBarChart.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    },
    watch: {
      'textAd.pieData': {
        handler () {
          this.pieDom()
          this.textAdPieChart.setOption(this.textAdPieChartOption)
        },
        deep: true
      },
      'textAd.barData': {
        handler () {
          this.barDom()
          this.textAdBarChart.setOption(this.textAdBarChartOption)
        },
        deep: true
      }
    }
  }
</script>
