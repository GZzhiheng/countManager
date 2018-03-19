<template>
  <!--主体内容组件-->
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20 position-absolute">
        <div class="pull-left page-title">
          <router-link :to="{name: 'Ctr'}" class="return-icon"></router-link>点击率优化
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20">
      <div class="bgc-white border-radius-5 keyword mb-20">
        <div class="keyword-view keyword-detail">
          <div style="overflow: hidden">
            <ul class="analyze-nav">
              <li @click="active.ctr.view  = 'OptimizeImpressAd'" :class="{active: active.ctr.view == 'OptimizeImpressAd'}">
                <router-link :to="{name: 'OptimizeImpressAd'}">展示广告</router-link>
              </li>
              <li @click="active.ctr.view =  'OptimizeSearchAd'" :class="{active: active.ctr.view == 'OptimizeSearchAd'}">
                <router-link :to="{name: 'OptimizeSearchAd'}">搜索广告</router-link>
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
