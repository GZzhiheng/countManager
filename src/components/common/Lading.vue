<style scoped>
  /***Loading 样式****/
  .loading .uil-spin-css{width: 200px;height:  200px;position: fixed;left: 50%;top: 50%;z-index: 1100;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);}
  .loading{display: block;position: fixed;width: 100%;left: 0;top: 0;height: 100%;background-color: rgba(0, 0, 0, 0.2);z-index: 99999999;}
  .loading .mask{width:100%; height:100%; position: fixed; top:0; left:0; z-index:99999999;}
</style>
<template>
  <div v-show="publicLoading" class="loading">
    <div class="mask"></div>
    <div class="uil-spin-css">
      <img src="../../assets/images/loading_1.gif" alt="">
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'loading',
    data () {
      return {
        title: 'this is public loading'
      }
    },
    computed: mapState(['publicLoading'])
  }
</script>
