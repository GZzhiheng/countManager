<style scoped>
  .overHead-text {
    width: 758px;
    height: auto
  }
  .text-Format-p {
    font-size: 12px;
    text-indent: 2em;
    line-height: 28px
  }

  .text-flex {
    color: #3388cc;
    font-size: 12px;
    cursor: pointer;
    display: inline-block
  }
  ul{height: 28px}
  ul li{height: 28px;float: left;width: 100px}
</style>
<template>
  <!--附加信息内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <div class="chart-bgc position-relative">
        <div class="chart-box not-hover">
          <div class="circular" style="width:184px; height:167px;" id="overheadPie">
          </div>
        </div>
        <div class="chart-right-box chart-right-Unhealthy-box chart-right-healthy-box">
          <div class="chart-right-box-title">过去30天，{{overHead.data.evaluations[0]}}</div>
          <div class="chart-right-box-suggest">{{overHead.data.evaluations[1]}}</div>
        </div>
      </div>
    </div>
    <div class="pad-tp-bd-20">
      <div class="chart-details-title" style="border-bottom: none;">附加链接最好与最坏的对比</div>
      <table class="table dataTable table-con table-bordered table-hover table-responsive table-analysis" style="min-width: 1048px">
        <thead>
        <tr>
          <th style="width: 37px"></th>
          <th>附加信息</th>
          <th>广告系列</th>
          <th>广告组</th>
          <th>点击次数</th>
          <th>展示次数</th>
          <th>点击率</th>
          <th class="text-right">花费</th>
          <th>转化次数</th>
          <th>转化率</th>
          <th class="text-right">每次转化费用</th>
        </tr>
        </thead>
        <tbody>
        <tr  class="best-tr" v-for="item in overHead.data.bestPlaceholders">
          <td class="table-first-td">最好</td>
          <td>{{item.feedInfos.txt || module.tableEmptyPlaceholder}}</td>
          <td>{{item.campaignName || module.tableEmptyPlaceholder}}</td>
          <td>{{item.adGroupName || module.tableEmptyPlaceholder}}</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr, 'init') || module.tableEmptyPlaceholder}}</td>
          <td class="text-right">￥{{$toFixed(item.cost) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixed(item.conversions) || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.conversionRate, 'init') || module.tableEmptyPlaceholder}}</td>
          <td class="text-right">￥{{$toFixed(item.costPerConversion) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr class="worst-tr" v-for="item in overHead.data.worstPlaceholders">
          <td class="table-first-td">最差</td>
          <td>{{item.feedInfos.txt || module.tableEmptyPlaceholder}}</td>
          <td>{{item.campaignName || module.tableEmptyPlaceholder}}</td>
          <td>{{item.adGroupName || module.tableEmptyPlaceholder}}</td>
          <td>{{item.clicks || module.tableEmptyPlaceholder}}</td>
          <td>{{item.impressions || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.ctr) || module.tableEmptyPlaceholder}}</td>
          <td class="text-right">￥{{$toFixed(item.cost) || module.tableEmptyPlaceholder}}</td>
          <td>{{$toFixed(item.conversions) || module.tableEmptyPlaceholder}}</td>
          <td>{{$changePercent(item.conversionRate, 'init') || module.tableEmptyPlaceholder}}</td>
          <td class="text-right">￥{{$toFixed(item.costPerConversion) || module.tableEmptyPlaceholder}}</td>
        </tr>
        <tr>
          <td class="table-first-td">平均</td>
          <td colspan="3" class="table-border-hidden"></td>
          <td class="table-border-hidden">{{overHead.data.avgclicks || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden">{{overHead.data.avgimpressions || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden">{{$changePercent(overHead.data.avgCtr) || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden text-right">￥{{$toFixed(overHead.data.avgCost) || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden">{{overHead.data.avgconversions || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden">{{$changePercent(overHead.data.avgConversionRate) || module.tableEmptyPlaceholder}}</td>
          <td class="table-border-hidden text-right">￥{{$toFixed(overHead.data.avgCostPerConversion) || module.tableEmptyPlaceholder}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pad-tp-bd-20" style="padding-bottom: 10px">
      <div class="chart-details-title">添加广告附加信息的好处
        <!--<a class="btn normal-blod-ok-btn height-28 vertical-initial pull-right chart-details-title-btn-position">添加广告附加信息</a>-->
      </div>
      <div class="overHead-text" style="padding-top: 10px;">
        <p class="text-Format-p">
          广告附加信息更多理由来点击您的广告。广告附加信息是一种广告格式，可以显示关于您商家的额外信息（在文字广告的基础上“附加”的信息）。有些附加信息要手动添加，有些附加信息可以自动添加。与更高的广告排名类似，广告附加信息让您的广告在搜索结果页面上更加显眼。显眼程度的提高有两大好处：</p>
        <p class="text-Format-p">1、提高展示率：广告附加信息可以提高广告的展示率</p>
        <p class="text-Format-p">
          2、增加价值：广告附加信息通常有助于提高广告的点击率，从而增加总点击次数，它们为用户提供了很有价值的途径来详细了解您的业务或者与您的广告进行互动，比如致电您的商家或者提供指向您网站的更多链接。
          <span v-show="!overHead.Flex">...</span>
          <a style="text-indent: 0;margin-bottom: 3px;margin-left: 2em" v-show="!overHead.Flex" @click="overHead.Flex = !overHead.Flex" class="text-flex">查看更多<span aria-hidden="true" class="glyphicon glyphicon-triangle-bottom"></span></a>
        </p>
        <div  v-show="overHead.Flex">
        <h5 style="font-weight: 600;padding-top: 10px">参考例子：</h5>
        <p class="text-Format-p">1、附加应用信息</p>
        <p>在广告文字下方显示一条链接，用户点击该链接后可以转到应用商店或者开始下载您的应用。</p>
        <p class="text-Format-p"><img src="../../../../static/res/images/overhead-1.png" alt="附加应用"></p>
        <p class="text-Format-p">2、附加电话信息</p>
        <p>显示“指点”按钮，便于用户点击按钮给您致电。</p>
        <p class="text-Format-p"><img src="../../../../static/res/images/overhead-2.png" alt="附加电话"></p>
        <p class="text-Format-p">3、附加地址信息</p>
        <p>帮助附近的用户查找最近的店面或者给您致电。</p>
        <p>苏州冰激凌店</p>
        <p>（413）123-4567</p>
        <p>我店特供开心果味冰激凌。</p>
        <p>老顾客买1送1。</p>
        <p>地址：江苏省苏州市市观前街1号</p>
        <p class="text-Format-p">4、附加评价信息</p>
        <p>显示权威来源提供的第三方好评。</p>
        <p>蘑菇探秘之旅</p>
        <p>[广告] www.example.com</p>
        <p>凭借真菌指南，辨识美味蘑菇-快来寻找鸡油菌、牛肝菌、秀珍菇！</p>
        <p>“太有意思了，我带回来一大包美味牛肝菌。”-examplog.com</p>
        <p class="text-Format-p">5、附加连接</p>
        <p>添加可帮助用户找到所需信息的链接。</p>
        <p>小华狗粮点</p>
        <p>[广告] www.example.com</p>
        <p>手工制作的饼干和蛋糕，您的小狗值得拥有！</p>
        <p>
          <ul>
            <li><span style="width: 6px;height: 6px;background-color: #000;border-radius: 50%;display: inline-block"></span> 营业时间</li>
            <li><span style="width: 6px;height: 6px;background-color: #000;border-radius: 50%;display: inline-block"></span> 特价</li>
          </ul>

          <ul>
            <li><span style="width: 6px;height: 6px;background-color: #000;border-radius: 50%;display: inline-block"></span> 饼干</li>
            <li><span style="width: 6px;height: 6px;background-color: #000;border-radius: 50%;display: inline-block"></span> 特色狗粮</li>
          </ul>
        </p>
          <p class="text-Format-p">6、附加宣传信息</p>
          <p>向您的广告添加说明文字，以便用户详细了解您提供的产品或者服务。</p>
          <p>小爱电子产品</p>
          <p>[广告] www.example.com</p>
          <p>我店特供开心果味冰激凌。</p>
          <p>欢迎选购小爱电子产品：笔记本电脑、智能手机及视频游戏等，应有尽有！</p>
        </div>
      </div>
      <a v-show="overHead.Flex" @click="overHead.Flex = !overHead.Flex" class="text-flex mb-20">点击收起<span aria-hidden="true" class="glyphicon glyphicon-triangle-top"></span></a>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  export default {
    data () {
      return {
        overheadChartOption: {},
        overheadPie: null
      }
    },
    components: {
    },
    mounted () {
      this.$store.dispatch('getOverHead')
      this.overheadPie = echarts.init(document.getElementById('overheadPie'))
      window.addEventListener('resize', this.resize, false)
      this.pieDom()
      this.overheadPie.setOption(this.overheadChartOption)
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      overHead () {
        return this.$store.state.overHead
      }
    },
    methods: {
      pieDom () {
        this.overheadChartOption = this.module.pie
        let option = this.overHead.pie
        this.overheadChartOption.color = option.color
        this.overheadChartOption.series.center = option.center
        this.overheadChartOption.series.radius = option.radius
        this.overheadChartOption.series.data[0].value = option.value
        this.overheadChartOption.series.data[0].itemStyle.normal.label.padding = option.topFontPadding
        this.overheadChartOption.series.data[0].itemStyle.normal.label.textStyle.color = option.color[0]
        this.overheadChartOption.series.data[0].itemStyle.normal.label.textStyle.fontSize = option.topFontSize
        this.overheadChartOption.series.data[0].itemStyle.emphasis.color = option.color[0]
        this.overheadChartOption.series.data[1].name = option.bottomFontName
        this.overheadChartOption.series.data[1].value = 100 - option.value
        this.overheadChartOption.series.data[1].itemStyle.normal.label.padding = option.bottomFontPadding
      },
      resize () {
        this.overheadPie.resize({
          width: 'auto',
          height: 'auto'
        })
      }
    },
    watch: {
      'overHead.pie': {
        handler () {
          this.pieDom()
          this.overheadPie.setOption(this.overheadChartOption)
        },
        deep: true
      }
    }
  }
</script>
