<template>
  <!--主体内容组件-->
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20">
        <div class="pull-left page-title">
          <router-link :to="{name: 'ShareNum'}" class="return-icon"></router-link>展示份额优化
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20">
      <div class="bgc-white border-radius-5 keyword mb-20">
        <div class="keyword-view keyword-detail">
          <div style="overflow: hidden">
            <ul class="analyze-nav">
              <li @click="active.shareNum.view  = 'OptimizeCampaignName'" :class="{active: active.shareNum.view == 'OptimizeCampaignName'}">
                <router-link :to="{name: 'OptimizeCampaignName'}">广告系列预算出价</router-link>
              </li>
              <li @click="active.shareNum.view =  'OptimizeKeywords'" :class="{active: active.shareNum.view == 'OptimizeKeywords'}">
                <router-link :to="{name: 'OptimizeKeywords'}">关键字出价优化</router-link>
              </li>
            </ul>
          </div>
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
  import pagination from '../../common/Pagination'
  export default {
    name: 'component',
    data () {
      return {
        allowEmpty: false
      }
    },
    components: {
      pagination
    },
    computed: {
      module () {
        return this.$store.state.module
      },
      query () {
        return this.$store.state.query
      },
      active () {
        return this.$store.state.active
      }
    },
    methods: {
    }
  }
</script>
