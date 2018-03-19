<template>
  <!--主体内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="costPie">
          </div>
        </div>
        <!--去掉chart-right-healthy-box就是不健康需要优化的样式-->
        <div class="chart-right-box chart-right-Unhealthy-box" :class="query.wastCostTips > 0?'':'chart-right-healthy-box'">
          <div class="chart-right-box-title">{{cost.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{cost.data.evaluations[1]}}</div>
          <div class="chart-right-box-btn" v-if="query.wastCostTips > 0">
            <router-link class="btn optimizeBtn" :to="{name: 'OptimizeNegativeKeyword'}">立即优化
              <span class="optimizeCount" v-if="query.wastCostTips>0">{{query.wastCostTips}}</span>
              <span class="optimizeCount optimizeCountMore" v-if="query.wastCostTips>99">99+</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-details">
      <div class="dropdown-position">
        <div class="dropdown dropdownSelectBox">
          <button type="button" class="btn dropdown-toggle dropdown-btn" id="dropdownMenu" data-toggle="dropdown" v-model="costProfessionStatus.id">{{costProfessionStatus.name}}<span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdownSelect-menu" role="menu" aria-labelledby="dropdownMenu">
            <template v-for="item in commonData.professionData">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="javascript:;" @click="actionProfessionData({name: item.name, id: item.id})">{{item.name}}</a>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="chart-details-row">
        <div class="chart-details-left-box">
          <div class="chart-details-title">浪费金额</div>
          <div class="chart-details-content not-hover" style="height: 105px;padding-top: 20px">
            <div class="circular costBar" style="height:66px;" id="costBar1">
            </div>
          </div>
        </div>
        <div class="chart-details-right-box">
          <div class="chart-details-title">否定关键字数量</div>
          <div class="chart-details-content not-hover" style="height: 105px;padding-top: 20px">
            <div class="circular costBar" style="height:66px;" id="costBar2">
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
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/title'
  export default {
    name: 'cost',
    data () {
      return {
        costPieChartOption: {},
        costPieChart: null,
        costBarChartOption1: {},
        costBarChart1: null,
        costBarChartOption2: {},
        costBarChart2: null
      }
    },
    mounted () {
      this.$store.dispatch('getCost')
      this.costPieChart = echarts.init(document.getElementById('costPie'))
      this.costBarChart1 = echarts.init(document.getElementById('costBar1'))
      this.costBarChart2 = echarts.init(document.getElementById('costBar2'))
      this.pieDom()
      this.costPieChart.setOption(this.costPieChartOption)
      this.barDom1()
      this.costBarChart1.setOption(this.costBarChartOption1)
      this.barDom2()
      this.costBarChart2.setOption(this.costBarChartOption2)
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
      commonData () {
        return this.$store.state.commonData
      },
      cost () {
        return this.$store.state.cost
      },
      costProfessionStatus () {
        return this.$store.state.query.costProfessionStatus
      }
    },
    methods: {
      actionProfessionData (argus) { // 浪费花费-行业下拉框的点击事件，这里仅仅改变状态，其实应是dispatch事件
        this.$store.commit('QUERY_COST_PROFESSION_FILTER', argus)
      },
      pieDom () {
        this.costPieChartOption = this.module.pie
        let option = this.cost.pieData
        this.costPieChartOption.color = option.color
        this.costPieChartOption.series.center = option.center
        this.costPieChartOption.series.radius = option.radius
        this.costPieChartOption.series.data[0].value = option.value
        this.costPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.costPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.costPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.costPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.costPieChartOption.series.data[1].name = option.bottomFontName
        this.costPieChartOption.series.data[1].value = 100 - option.value
        this.costPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      barDom1 () {
        this.costBarChartOption1 = this.module.bar
        let option = this.cost.wastBarData
        this.costBarChartOption1.yAxis.data = option.yAxisData
        this.costBarChartOption1.series[0].label.normal.formatter = option.formatter
        this.costBarChartOption1.series[0].data[0].value = option.bottomValue
        this.costBarChartOption1.series[0].data[0].itemStyle.normal.color = option.bottomColor
        this.costBarChartOption1.series[0].data[0].itemStyle.emphasis.color = option.bottomColor
        this.costBarChartOption1.series[0].data[1].value = option.topValue
        this.costBarChartOption1.series[0].data[1].itemStyle.normal.color = option.topColor
        this.costBarChartOption1.series[0].data[1].itemStyle.emphasis.color = option.topColor
      },
      barDom2 () {
        this.costBarChartOption2 = this.module.bar
        let option = this.cost.keywordBarData
        this.costBarChartOption2.yAxis.data = option.yAxisData
        this.costBarChartOption2.series[0].label.normal.formatter = option.formatter
        this.costBarChartOption2.series[0].data[0].value = option.bottomValue
        this.costBarChartOption2.series[0].data[0].itemStyle.normal.color = option.bottomColor
        this.costBarChartOption2.series[0].data[0].itemStyle.emphasis.color = option.bottomColor
        this.costBarChartOption2.series[0].data[1].value = option.topValue
        this.costBarChartOption2.series[0].data[1].itemStyle.normal.color = option.topColor
        this.costBarChartOption2.series[0].data[1].itemStyle.emphasis.color = option.topColor
      },
      resize () {
        let barWidth = (document.body.offsetWidth - 330) / 2
        this.costPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
        this.costBarChart1.resize({
          width: barWidth,
          height: 'auto'
        })
        this.costBarChart2.resize({
          width: barWidth,
          height: 'auto'
        })
      }
    },
    watch: {
      'cost.pieData': {
        handler () {
          this.pieDom()
          this.costPieChart.setOption(this.costPieChartOption)
        },
        deep: true
      },
      'cost.wastBarData': {
        handler () {
          this.barDom1()
          this.costBarChart1.setOption(this.costBarChartOption1)
        },
        deep: true
      },
      'cost.keywordBarData': {
        handler () {
          this.barDom2()
          this.costBarChart2.setOption(this.costBarChartOption2)
        },
        deep: true
      }
    }
  }
</script>
