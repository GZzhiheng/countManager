<style scoped></style>
<template>
  <div style="padding: 0 20px" class="page-div" v-show="total > 0">
    <div class="dataTables_info" style="margin-top: 5px;">
      1-{{pagination.current_count}}/
      共{{pagination.total}}条
    </div>
    <span class="changePageBox" v-if="this.pagination.total > this.pageSize">到第&nbsp;
      <input type="text" class="input-text changePage" v-model="jumpVal" @keyup.enter="jump">&nbsp;页&nbsp;&nbsp;
      <a class="changePageBtn" href="javascript:void(0);" @click="jump">GO</a>
    </span>
    <div class="pull-right pagination-ac">
      <pagination :pagination="pagination" :callback="jump" :options="paginationOptions"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from 'vue-bootstrap-pagination'
  export default {
    data () {
      return {
        timer: null,
        isFirstLoad: true,   // 是否为第一次加载
        fakeTempData: null, // 伪数据缓存
        jumpVal: null, // 跳页
        pagination: {
          total: this.total,
          current_count: 0,
          per_page: 0,
          current_page: 1,
          last_page: 0
        },
        paginationOptions: {
          offset: this.offset,
          previousText: '',
          nextText: '',
          alwaysShowPrevNext: true
        }
      }
    },
    components: {
      pagination
    },
    mounted () {
      if (this.fake) {
        this.pagination.total = this.fakeData.dataList.length
      }
      this.pageInit()
    },
    beforeUpdate () {
      this.pageInit()
    },
    props: {
      offset: {  // page左右偏移个数
        type: Number,
        default: 4
      },
      total: Number,     // 总数
      pageSize: Number,  // 每页条数
      dispatch: String,  // 异步方法
      isChange: [String, Boolean, Number], // 改变状态拉取数据
      request: { // 附加参数到请求
        type: Object,
        default: function (val) {
          return val || {}
        }
      },
      requestPro: { // 附加参数到请求
        default: function (val) {
          return val || {}
        }
      },
      fake: {               // 是否使用本地伪分页
        type: Boolean,
        default: false
      },
      fakeData: Object,    // 伪分页数据源 state
      fakeMutation: String // 伪数据源更新方法 Mutations
    },
    methods: {
      jump () {
        let pageNum
        if (parseInt(this.jumpVal) === this.pagination.current_page) { // 跳转当前页 不请求
          return
        }
        if (this.jumpVal && this.jumpVal < this.pagination.last_page + 1 && this.jumpVal > 0) {
          this.pagination.current_page = parseInt(this.jumpVal)
          pageNum = this.jumpVal
          this.jumpVal = ''
        } else {
          this.jumpVal = ''
          pageNum = this.pagination.current_page
        }

        // 判断是否使用伪分页
        if (this.fake && !this.isFirstLoad) {
          this.isFakePage()
          return
        }
        let request = {
          pageNum: pageNum,
          pageSize: this.pageSize
        }
        request = Object.assign(request, this.request)
        this.$store.dispatch(this.dispatch, request)
      },
      // 分页计算
      pageInit () {
        console.log(this.total)
        this.pagination.per_page = this.pageSize
        this.pagination.total = this.total
        this.pagination.last_page = Math.ceil(this.total / this.pageSize)
        this.pagination.current_count = this.pagination.total > this.pageSize ? this.pageSize : this.pagination.total
      },
      // 是否使用伪分页
      isFakePage () {
        // loading
        if (this.timer != null) clearTimeout(this.timer)
        this.$store.commit('LOADING_OPEN')
        let self = this
        this.timer = setTimeout(function () {
          self.$store.commit('LOADING_CLOSE')
        }, 200)
        // fakeTempData伪数据缓存赋值
        let fakeData = JSON.stringify(this.fakeData)
        let fakeTempData = JSON.parse(fakeData)
        if (this.fakeTempData === null) {
          this.fakeTempData = JSON.parse(fakeData)
        }
        // 计算更新视图数据
        let temp = []
        let page = (this.pagination.current_page - 1) * this.pageSize + this.pageSize
        page = page > this.fakeTempData.dataList.length ? this.fakeTempData.dataList.length : page
        let counter = this.pageSize
        if (page === this.fakeTempData.dataList.length) counter = (this.fakeTempData.dataList.length % 10)
        for (let i = 0; i < counter; i++) {
          page--
          temp.push(this.fakeTempData.dataList[page])
        }
        fakeTempData.dataList = temp
        fakeTempData.totalNum = this.fakeTempData.dataList.length
        this.$store.commit(this.fakeMutation, fakeTempData)
      }
    },
    watch: {
      request () {
        this.jump()
      },
      requestPro () {
        this.jump()
      },
      total () {
        this.pageInit()
      },
      isChange () {
        this.isFirstLoad = true
        this.pageInit()
        this.pagination.current_page = 1
        this.fakeTempData = null
      },
      fakeData () {
        if (this.fake && this.isFirstLoad) {
          this.isFakePage()
          this.isFirstLoad = false
        }
      }
    }
  }
</script>
