<style scoped>
  .share-radio{margin-top: 10px;display: inline-block;float: left;}
  .share-radio .share-radio-title{font-size: 14px;font-weight: 700;color: #333333;line-height: 34px;padding-top: 10px;margin-bottom: 0;}
  .outstanding{font-size: 14px;color: #333;}
  .share-content{margin-left: 10px;}
  .outstanding> input{width: 103px;height: 28px;text-align: right;}
  .share-hint{display: inline-block;width: 10px;height: 10px;border-left: 10px solid #888;border-top: 10px solid #fff;border-bottom: 10px solid #fff;}
  .share-hint-postion{display: inline-block;width: 10px;height: 10px;border-left: 10px solid #fff;border-top: 10px solid #fff;border-bottom: 10px solid #fff;position: relative;top: 0;left: -18px}
  .share-chart{display: inline-block;width: 280px;height: 240px;float: left;padding-top: 9px;}
  .share-chart ul{float: left;margin-left: 30px;}
  .share-chart ul li{float: left;padding: 0 10px;line-height: 34px;}
  .share-chart ul li:hover{cursor: pointer;}
  .share-list{;font-size: 14px;color: #888;font-weight: 400;}
  .active{color: #00aabb;font-weight: 700;border-bottom: 2px solid #00aabb;}
</style>
<template>
  <el-dialog title="提高S-西班牙-LP0714的预算" custom-class="share-num-dialog" :visible.sync="dialogFormVisible">
    <p>您的广告系列受到每日预算的限制，因此广告丧失了许多原本可以展示的机会，提高预算可以确保您不会错失潜在客户。</p>
    <div class="share-radio">
      <p class="share-radio-title">每日预算及每周可为您带来的效果</p>
      <div class="share-content">
        <el-radio class="radio" v-model="shareNum.budgetdialog.radio" label="1"><span class="outstanding">￥280.00</span> 获得<span class="outstanding">105</span>次点击并产生<span class="outstanding">￥1,589.99</span>费用</el-radio><br/>
        <el-radio class="radio" v-model="shareNum.budgetdialog.radio" label="2"><span class="outstanding">￥200.00</span>（当前预算） 获得<span class="outstanding">88</span>次点击并产生<span class="outstanding">￥1,319.99</span>费用</el-radio><br/>
        <el-radio class="radio" v-model="shareNum.budgetdialog.radio" label="3"><span class="outstanding">￥150.00</span> 获得<span class="outstanding">70</span>次点击并产生<span class="outstanding">￥1,019.99</span>费用</el-radio><br/>
        <el-radio class="radio" v-model="shareNum.budgetdialog.radio" label="4">
          <span class="outstanding">其他 ￥
            <input type="text" v-model="shareNum.budgetdialog.other" style="width: 103px"> 获得<span class="outstanding">170</span>次点击并产生<span class="outstanding">￥2,589.99</span>费用
          </span>
        </el-radio>
        <p style="font-size: 12px;color: #666;line-height: 22px;">过往效果已过去7天为基础进行计算</p>
      </div>
    </div>
    <div class="share-chart">
      <div style="height: 36px">
        <ul>
          <li class="share-list" :class="{active: shareNum.budgetdialog.total == 'ctr'}" @click="shareNum.budgetdialog.total = 'ctr'">总点击次数</li>
          <li class="share-list" :class="{active: shareNum.budgetdialog.total == 'share'}" @click="shareNum.budgetdialog.total = 'share'">总展示次数</li>
        </ul>
      </div>
      <div style="width:300px; height:170px;">
        <ShareEchart :options="shareNum.ctrPie"></ShareEchart>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import ShareEchart from '../../common/charts/dialogEchart.vue'
  export default {
    data () {
      return {}
    },
    components: {
      ShareEchart
    },
    computed: {
      query () {
        return this.$store.state.query
      },
      shareNum () {
        return this.$store.state.shareNum
      },
      dialogFormVisible: {
        get () {
          return this.$store.state.commonData.dialogFormVisible
        },
        set (val) {
          this.$store.commit('OPEN_DIALOG', val)
        }
      }
    }
  }
</script>
