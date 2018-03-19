<style scoped>
  .analysis-spread {
    position: absolute;
    z-index: 3;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: #fff;
    font-size: 16px;
    right: -10px;
    top: -25px;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
  }
  .bgColor-60-score{background-color: #ff7755;}
  .bgColor-80-score{background-color: #f4ba4a;}
  .bgColor-100-score{background-color: #4dbd74;}
  .bgColor-null-score{background-color: #a0afb7;font-size: 12px;padding: 9px 0;line-height: normal}
  .hidden-spread{display: none}
</style>
<template>
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20 position-absolute">
        <div class="pull-left page-title">
          <router-link :to="{name: 'Index'}" class="return-icon"></router-link>分析结果
        </div>
      </div>
      <span style="color:#666">{{analysisSummary.data.clientName}} -- {{analysisSummary.data.accountName}}</span>
    </div>
    <div class="creation keyword pad-lt-rt-20 mb-20">
      <div class="keyword-view keyword-summary bgc-white border-radius-5" v-show="!packUp">
        <span class="analysis-spread bgColor-null-score" @click="packUpMethod">收起</br>总分</span>
        <div class="analysis-charts-box not-hover">
          <div class="circular" style="width:246px; height:210px;" id="mainPie"></div>
        </div>
        <div class="analysis-result-box">
          <div class="analysis-result-row">
            <div class="analysis-result-row-padding analysis-result-row-left-padding">
              <div class="analysis-result-icon-row">
                <div class="analysis-result-icon-row-1">
                  <div class="width-full height-full">
                    <span class="analysis-icon campaign-icon"></span>
                    <div class="inline-block">
                      <div class="analysis-result-icon-row-count">{{analysisSummary.data.availableCampaignCount || module.emptyPlaceholder}}</div>
                      <div class="analysis-result-icon-row-text">有效广告系列数量</div>
                    </div>
                  </div>
                </div>
                <div class="analysis-result-icon-row-2">
                  <div class="width-full height-full">
                    <span class="analysis-icon group-icon"></span>
                    <div class="inline-block">
                      <div class="analysis-result-icon-row-count">{{analysisSummary.data.availableGroupCount || module.emptyPlaceholder}}</div>
                      <div class="analysis-result-icon-row-text">有效广告组数量</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="analysis-result-icon-row">
                <div class="analysis-result-icon-row-1">
                  <div class="width-full height-full">
                    <span class="analysis-icon ad-icon"></span>
                    <div class="inline-block">
                      <div class="analysis-result-icon-row-count">{{analysisSummary.data.availableAdCount || module.emptyPlaceholder}}</div>
                      <div class="analysis-result-icon-row-text">有效文字广告数量</div>
                    </div>
                  </div>
                </div>
                <div class="analysis-result-icon-row-2">
                  <div class="width-full height-full">
                    <span class="analysis-icon searchKW-icon"></span>
                    <div class="inline-block">
                      <div class="analysis-result-icon-row-count">{{analysisSummary.data.availableSearchKw || module.emptyPlaceholder}}</div>
                      <div class="analysis-result-icon-row-text">搜索有效关键字数量</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--<div class="analysis-result-row-left">-->
                <!--<span class="analysis-result-row-left-text"> 有效广告系列数量</span>-->
                <!--<span class="analysis-result-row-right-text">{{analysisSummary.data.availableCampaignCount || module.emptyPlaceholder}}</span>-->
                <!--<span></span>-->
              <!--</div>-->
              <!--<div class="analysis-result-row-left">-->
                <!--<span class="analysis-result-row-left-text"> 有效广告组数量</span>-->
                <!--<span class="analysis-result-row-right-text">{{analysisSummary.data.availableGroupCount || module.emptyPlaceholder}}</span>-->
                <!--<span></span>-->
              <!--</div>-->
              <!--<div class="analysis-result-row-left">-->
                <!--<span class="analysis-result-row-left-text"> 有效文字广告数量</span>-->
                <!--<span class="analysis-result-row-right-text">{{analysisSummary.data.availableAdCount || module.emptyPlaceholder}}</span>-->
                <!--<span></span>-->
              <!--</div>-->
              <!--<div class="analysis-result-row-left bd-null">-->
                <!--<span class="analysis-result-row-left-text">搜索有效关键字数量</span>-->
                <!--<span class="analysis-result-row-right-text">{{analysisSummary.data.availableSearchKw || module.emptyPlaceholder}}</span>-->
                <!--<span></span>-->
              <!--</div>-->
            </div>
            <div class="analysis-result-row-padding analysis-result-row-right-padding" style="top: -1px;">
              <div class="position-relative main-dropdown-position">
                <div class="dropdown dropdownSelectBox">
                  <button type="button" class="btn dropdown-toggle dropdown-btn" id="dropdownMenu" data-toggle="dropdown" v-model="query.analysisSummaryTimeStatus.id">{{query.analysisSummaryTimeStatus.name}}<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu dropdownSelect-menu" role="menu" aria-labelledby="dropdownMenu">
                    <template v-for="item in commonData.analysisSummaryTimeData">
                      <li role="presentation">
                        <a role="menuitem" tabindex="-1" href="javascript:;" @click="actionDataRange(item)">{{item.name}}</a>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
              <div class="analysis-result-row-right">
                <span class="analysis-result-row-left-text">点击次数</span>
                <span class="analysis-result-row-right-text">{{analysisSummary.list.clicks || module.emptyPlaceholder}}</span>
                <span></span>
              </div>
              <div class="analysis-result-row-right">
                <span class="analysis-result-row-left-text">转化次数</span>
                <span class="analysis-result-row-right-text">{{analysisSummary.list.conversions || module.emptyPlaceholder}}</span>
                <span></span>
              </div>
              <div class="analysis-result-row-right">
                <span class="analysis-result-row-left-text">平均每次转化费用</span>
                <span class="analysis-result-row-right-text">¥{{$toFixed(analysisSummary.list.costPerAllConversion || module.emptyPlaceholder)}}</span>
                <span></span>
              </div>
              <div class="analysis-result-row-right bd-null">
                <span class="analysis-result-row-left-text">平均每周的花费</span>
                <span class="analysis-result-row-right-text">¥{{$toFixed(analysisSummary.list.weekCost || module.emptyPlaceholder)}}</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <!--<div class="retract" @click="packUpMethod">点击收起<i class="retract-icon"></i></div>-->
      </div>
      <div class="keyword-view keyword-detail bgc-white border-radio-5">
        <span v-if="packUp" :class="bgColor" class="analysis-spread" @click="packUp = false">{{analysisSummary.analysisChartData.value}}分</span>
        <div style="overflow: hidden">
          <ul class="analyze-nav">
            <li @click="active.analysis.view = 'Cost'" :class="{active: active.analysis.view == 'Cost'}">
              <router-link :to="{name: 'Cost'}">浪费花费
                <span class="analyzeCount" v-if="query.wastCostTips>0">{{query.wastCostTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.wastCostTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view =  'Quality'" :class="{active: active.analysis.view == 'Quality'}">
              <router-link :to="{name: 'Quality'}">质量得分
                <span class="analyzeCount" v-if="query.qualityScoreTips>0">{{query.qualityScoreTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.qualityScoreTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view = 'Ctr'" :class="{active: active.analysis.view == 'Ctr'}">
              <router-link :to="{name: 'Ctr'}">点击率
                <span class="analyzeCount" v-if="query.clickRateTips>0">{{query.clickRateTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.clickRateTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view = 'TextAd'" :class="{active: active.analysis.view == 'TextAd'}">
              <router-link :to="{name: 'TextAd'}">文字广告
                <span class="analyzeCount" v-if="query.textAdTips>0">{{query.textAdTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.textAdTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view = 'Keyword'" :class="{active: active.analysis.view == 'Keyword'}">
              <router-link :to="{name: 'Keyword'}">长尾关键字
                <span class="analyzeCount" v-if="query.longTailTips>0">{{query.longTailTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.longTailTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view = 'ShareNum'" :class="{active: active.analysis.view == 'ShareNum'}">
              <router-link :to="{name: 'ShareNum'}">展示份额
                <span class="analyzeCount" v-if="query.impressionsShareTips>0">{{query.impressionsShareTips}}</span>
                <span class="analyzeCount analyzeCountMore" v-if="query.impressionsShareTips>99">99+</span>
              </router-link>
            </li>
            <li @click="active.analysis.view = 'Overhead'" :class="{active: active.analysis.view == 'Overhead'}">
              <router-link :to="{name: 'Overhead'}">搜索广告附加信息
              </router-link>
            </li>
            <li @click="active.analysis.view = 'Other'" :class="{active: active.analysis.view == 'Other'}">
              <router-link :to="{name: 'Other'}">其他指标</router-link>
            </li>
          </ul>
        </div>
        <div class="clearfix content-detail">

          <!--视图-->
          <router-view></router-view>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  export default {
    name: 'component',
    data () {
      return {
        packUp: false, // 点击收起
        bgColor: 'bgColor-100-score',
        mainPieChartOption: {},
        mainPieChart: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getSummary')
      this.mainPieChart = echarts.init(document.getElementById('mainPie'))
      window.addEventListener('resize', this.resize, false)
      this.pieDom()
      this.mainPieChart.setOption(this.mainPieChartOption)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      active () {
        return this.$store.state.active
      },
      query () {
        return this.$store.state.query
      },
      commonData () {
        return this.$store.state.commonData
      },
      analysisSummary () {
        return this.$store.state.analysisSummary
      }
    },
    methods: {
      actionDataRange (argus) {
        this.$store.commit('QUERY_SUMMARY_FILTER', argus)
      },
      packUpMethod () { // 折叠上面图表
        this.packUp = true
        if (this.analysisSummary.data.score < 60) {
          this.bgColor = 'bgColor-60-score'
        }
        if (this.analysisSummary.data.score >= 60 && this.analysisSummary.data.score < 80) {
          this.bgColor = 'bgColor-80-score'
        }
        if (this.analysisSummary.data.score >= 80) {
          this.bgColor = 'bgColor-100-score'
        }
      },
      pieDom () {
        this.mainPieChartOption = this.module.pie
        let option = this.analysisSummary.analysisChartData
        this.mainPieChartOption.color = option.color
        this.mainPieChartOption.series.center = option.center
        this.mainPieChartOption.series.radius = option.radius
        this.mainPieChartOption.series.data[0].value = option.value
        this.mainPieChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.mainPieChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.mainPieChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.mainPieChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.mainPieChartOption.series.data[1].name = option.bottomFontName
        this.mainPieChartOption.series.data[1].value = 100 - option.value
        this.mainPieChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
        this.mainPieChartOption.series.data[1].itemStyle.emphasis.color = option.color[1]
      },
      resize () {
        this.mainPieChart.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    },
    watch: {
      'analysisSummary.analysisChartData': {
        handler () {
          this.pieDom()
          this.mainPieChart.setOption(this.mainPieChartOption)
        },
        deep: true
      }
    }
  }
</script>
