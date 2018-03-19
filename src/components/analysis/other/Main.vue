<style scoped>
  ul {
    width: 50%;
    height: auto;
    float: left
  }
  ul li {width: 100%;height: auto;border-radius: 3px;background-color: #f6f7f8;margin-bottom: 20px; padding: 10px 15px 16px 20px;}
  .other-text-content {display: inline-block;font-size: 14px;color: #666666; line-height: 20px;padding-left: 25px;}
  .other-box >li>h4{font-size: 16px;font-weight: normal;color: #333}
  .other-box >li>p{margin-bottom: 0px}
  .other-box-left{padding-right: 10px}
  .other-box-right{padding-left: 10px}
</style>
<template>
  <!--其他内容组件-->
  <div class="pad-lt-rt-20">
    <div class="pad-tp-bd-20">
      <ul class="other-box other-box-left">
        <li>
          <h4>展示广告和搜索广告是否有分开广告系列进行投放</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isSeparateDelivery?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isSeparateDelivery">有分开投放！</p>
          <p class="other-text-content" v-else>没有，建议您的展示广告和搜索广告分开广告系列进行投放！</p>
          <!--<a class="btn full-blod-ok-btn height-28 vertical-initial pull-right">立即优化</a>-->
        </li>
        <li>
          <h4>广告系列是否有针对设备进行出价调整</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isBidAdjustment?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isBidAdjustment">有针对设备进行出价调整！</p>
          <p class="other-text-content" v-else>没有，建议您针对不同的设备进行出价调整，以达到更好的广告效果！</p>
        </li>
        <!--<li>-->
          <!--<h4>账户过去7天是否有优化操作</h4>-->
          <!--<span class="feed-back-icon good-icon"></span>-->
          <!--<p class="other-text-content">账户过去7天有优化操作</p>-->
        <!--</li>-->
        <li>
          <h4>账户的关键字是否使用2种以上匹配方式</h4>
          <span class="feed-back-icon" :class="otherIndex.data.keywordMatchTypeCount>1?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.keywordMatchTypeCount>1">有使用2种以上匹配方式！</p>
          <p class="other-text-content" v-else>没有，建议您的关键字至少使用2种匹配方式！</p>
        </li>
        <li>
          <h4>展示广告展示频次设置</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isSetFrequencyCap?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isSetFrequencyCap">有设置展示广告展示频次上限！</p>
          <p class="other-text-content" v-else>没有，建议设置展示广告展示频次上限，避免浪费！</p>
        </li>
        <li>
          <h4>广告组中是否有有效的广告</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isHaveEffectiveAd?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isHaveEffectiveAd">广告组有有效的广告！</p>
          <p class="other-text-content" v-else>没有，建议广告组设置有效的广告！</p>
        </li>
      </ul>
      <ul class="other-box other-box-right">
        <!--<li>-->
          <!--<h4>广告语是否有拼写错误</h4>-->
          <!--<span class="feed-back-icon" :class="otherIndex.data.isBidAdjustment?'good-icon':'bad-icon'"></span>-->
          <!--<p class="other-text-content">1无拼写错误</p>-->
        <!--</li>-->
        <li>
          <h4>是否投放再营销广告</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isRemarketing?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isRemarketing">有投放再营销广告！</p>
          <p class="other-text-content" v-else>没有，建议投放再营销广告，提高您的转化率！</p>
        </li>
        <!--<li>-->
          <!--<h4>账户是否有设置正确的转化跟踪</h4>-->
          <!--<span class="feed-back-icon" :class="otherIndex.data.isConvTracker?'good-icon':'bad-icon'"></span>-->
          <!--<p class="other-text-content" v-if="otherIndex.data.isConvTracker">有设置正确的转化跟踪！</p>-->
          <!--<p class="other-text-content" v-else>没有，建议您检查账户的转化跟踪设置，确保能正常的跟踪转化！</p>-->
        <!--</li>-->
        <li>
          <h4>地理位置定位设置</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isNotSetLocation?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isNotSetLocation">有地理位置定位设置！</p>
          <p class="other-text-content" v-else>没有，我们不建议您定位全球所有国家和地区，添加地理位置可细化您的广告定位！</p>
        </li>
        <li>
          <h4>广告组重复关键字</h4>
          <span class="feed-back-icon" :class="!otherIndex.data.isHaveRepeatKeyword?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="!otherIndex.data.isHaveRepeatKeyword">无广告组重复关键字！</p>
          <p class="other-text-content" v-else>有，我们建议您暂停重复的关键字，一个关键字只会展示一则广告，重复的关键字会导致内部竞争！</p>
        </li>
        <li>
          <h4>广告组中是否有已拒登的广告</h4>
          <span class="feed-back-icon" :class="!otherIndex.data.isHaveDisapprovedAd?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="!otherIndex.data.isHaveDisapprovedAd">广告组中无已拒登的广告！</p>
          <p class="other-text-content" v-else>有，我们建议您尽快处理已拒登的广告，避免影响广告投放效果！</p>
        </li>
        <li>
          <h4>普通展示广告GDN广告系列是否排除GMAIL展示位置</h4>
          <span class="feed-back-icon" :class="otherIndex.data.isNeedExcludeGmail?'good-icon':'bad-icon'"></span>
          <p class="other-text-content" v-if="otherIndex.data.isNeedExcludeGmail">普通展示广告GDN广告系列有排掉Gmail展示位置！</p>
          <p class="other-text-content" v-else>我们建议您在普通展示广告中排除Gmail展示位置，避免广告展示在Gmail中，我们不建议您把Gmail广告和普通展示广告放在同一个广告系列中投放，否则会影响您的广告投！</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'diagram',
    components: {
    },
    mounted () {
      this.$store.dispatch('getOtherIndex')
    },
    computed: {
      query () {
        return this.$store.state.query
      },
      otherIndex () {
        return this.$store.state.otherIndex
      }
    },
    methods: {}
  }
</script>
