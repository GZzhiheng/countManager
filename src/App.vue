<template>
  <div id="app">
      <section>
        <!--异步组件加载-->
        <!--<keep-alive>-->
        <!--<component :is="routers.root.view"></component>-->
        <!--</keep-alive>-->

        <router-view></router-view>

      </section>

    <!--loadding-->
    <loading></loading>

    <!--v-modals-->
    <!--<div v-for="(item, index) in modals">
      <modals :value="item" :index="index"></modals>
    </div>-->

  </div>
</template>
<script>
  // import Modals from './components/common/Modals'
  import Loading from './components/common/Lading'
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        show: true
      }
    },
    computed: mapState(['module', 'query', 'active', '']),
    components: {
      Loading
    },
    mounted: function () {
      this.$store.commit('CHANGE_ROUTE', this.$route)
    },
    watch: {
      '$route' () {
        console.log('index route')
        console.log(this.$route)
        console.log(this.$store)
        this.$store.commit('CHANGE_ROUTE', this.$route)
      },
      '$store.state': {
        handler () {
          let $store = Object.assign(
            {query: this.query},
            {active: this.active}
          )
          sessionStorage.setItem('$store', JSON.stringify($store))
        },
        deep: true
      }
    },
    methods: {
    }
  }
</script>

