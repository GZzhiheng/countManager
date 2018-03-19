<style scoped>
.height-40{height: 40px;}
</style>
<template>
  <!--忽略历史记录-主体内容组件-->
  <div id="main">
    <div class="clearfix bgc-white top-height">
      <div class="pad-lt-rt-20">
        <div class="pull-left page-title">
          <router-link :to="{name: active.ignoreHistory.view}" class="return-icon"></router-link>忽略历史记录
        </div>
      </div>
    </div>
    <div class="pad-lt-rt-20">
      <div class="bgc-white border-radius-5 mt-10">
        <div class="clearfix height-56 pad-lt-rt-20 form-span-color height-40">
          <span>上次优化时间：</span>
          <span>2017-04-15</span>
          <span>建议您</span>
          <span class="suggest-data-color">4月22日</span>
          <span>再进行优化，避免过度优化。</span>
        </div>
        <div class="clearfix height-56">
          <form class="form-horizontal" role="form" id="queryFrm">
            <fieldset>
              <div class="clearfix">
                <div class="form-group height-box-28 width-box-144">
                  <div class="col-md-12">
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1">维度名称：</span>
                      <div class="el-select-height-28 pull-left mr-40 ml-5 mt-14">
                        <template>
                          <el-select v-model="ignoreHistoryDimensionStatus" filterable placeholder="请选择">
                            <el-option
                              v-for="item in commonData.dimensionData"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="pull-left">
                      <span class="pull-left form-span-color position-relative-top-1">时间：</span>
                      <div class="pull-left el-select-height-28 ml-5 mt-14">
                        <el-date-picker v-model="startTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </div>
                      <span class="pull-left form-span-color position-relative-top-1 ml-5">至</span>
                      <div class="pull-left el-select-height-28 mr-40 ml-5 mt-14">
                        <el-date-picker v-model="endTime" type="date" placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </div>
                    <a class="btn normal-blod-ok-btn height-28 vertical-initial">搜索</a>
                    <div class="pull-right position-relative" :class="selectId.length > 0 ? '': 'btn-mask-box'">
                      <a class="btn normal-blod-ok-btn mask-normal-blod-ok-btn height-28 vertical-initial">取消忽略</a>
                      <div class="btn-mask">
                        <div class="btn-mask-hover-title" style="top:50px;">列表选中后可操作性</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="clearfix">
            <div class="col-xs-12 table-responsive table-box table-shadow">
              <section class="table-flip-scroll">
                <table class="table dataTable table-con table-bordered text-left table-hover" id="putFile">
                  <thead>
                    <tr>
                      <th style="width: 48px;padding: 0!important;">
                        <div class="checkbox">
                          <input id="ignoreHistoryAllselect" v-model="allSelectStatus" @click="select" type="checkbox">
                          <label for="ignoreHistoryAllselect"><span></span><i class="fa fa-check"></i></label>
                        </div>
                      </th>
                      <th><div class="pull-left">维度名称</div></th>
                      <th><div class="pull-left">忽略内容</div></th>
                      <th><div class="pull-left">广告组</div></th>
                      <th><div class="pull-left">广告系列</div></th>
                      <th><div class="pull-left">忽略类型</div></th>
                      <th><div class="pull-left">时间</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in ignoreHistory">
                      <td style="width: 48px;padding: 0!important;">
                        <div class="checkbox">
                          <input :id="item.id" :value="item.id" v-model="selectId" type="checkbox">
                          <label :for="item.id"><span></span><i class="fa fa-check"></i></label>
                        </div>
                      </td>
                      <td><div class="pull-left">维度名称</div></td>
                      <td><div class="pull-left">忽略内容</div></td>
                      <td><div class="pull-left">广告组</div></td>
                      <td><div class="pull-left">广告系列</div></td>
                      <td><div class="pull-left">时间</div></td>
                      <td class="tb-handle">
                        <div class="pull-left">
                          <a>查看</a>
                          <a>下载</a>
                          <a>删除</a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <!--page-->
              <pagination
                :total="100"
                :pageSize="20"
                :dispatch="'2'"
              ></pagination>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
  import pagination from '../common/Pagination'
  export default {
    name: 'component',
    data () {
      return {
        ignoreHistory: [ // 造的数据
          {'id': 1},
          {'id': 2},
          {'id': 3},
          {'id': 4}
        ],
        value1: '',
        allSelectStatus: false, // 全选状态
        selectId: [] // 选中id集合
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
      commonData () {
        return this.$store.state.commonData
      },
      active () {
        return this.$store.state.active
      },
      ignoreHistoryDimensionStatus: {
        get () {
          return this.$store.state.query.ignoreHistoryDimensionStatus
        },
        set (val) {
          this.$store.commit('QUERY_IGNORE_HISTORY_DIMENSION', val)
        }
      },
      startTime: {
        get () {
          return this.$store.state.query.ignoreHistoryTimeStatus.startTime
        },
        set (val) {
          this.$store.commit('QUERY_IGNORE_HISTORY_START_TIME', val)
        }
      },
      endTime: {
        get () {
          return this.$store.state.query.ignoreHistoryTimeStatus.endTime
        },
        set (val) {
          this.$store.commit('QUERY_IGNORE_HISTORY_END_TIME', val)
        }
      }
    },
    methods: {
      select () { // 全选
        var _this = this
        if (_this.allSelectStatus) { // 实现全选
          _this.selectId = []
          _this.ignoreHistory.forEach(function (item) {    // 列表全选中，获取全部ID
            _this.selectId.push(item.id)
          })
        } else { // 取消全选
          _this.selectId = []
        }
      },
      formatterRMB (obj, attr, value) {        // 钱币转换
        return this.$toFixed(value, '¥')
      }
    },
    watch: {
      selectId () {
        let dataLen = this.ignoreHistory.length
        if (this.selectId.length === dataLen) {
          this.allSelectStatus = true
        } else {
          this.allSelectStatus = false
        }
      }
    }
  }
</script>
