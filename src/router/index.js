import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/Main'
import History from '@/components/history/Main'
import IgnoreHistory from '@/components/ignoreHistory/Main'
import Analysis from '@/components/analysis/Main'
import Cost from '@/components/analysis/cost/Main'
import OptimizeCost from '@/components/analysis/cost/Optimize'
import OptimizeNegativeKeyword from '@/components/analysis/cost/optimizeNegativeKeyword'
import OptimizeNegativeKeywordPRO from '@/components/analysis/cost/optimizeNegativeKeywordPRO'
import OptimizeQuality from '@/components/analysis/quality/optimize'
import Ctr from '@/components/analysis/ctr/Main'
import OptimizeCtr from '@/components/analysis/ctr/Optimize'
import OptimizeImpressAd from '@/components/analysis/ctr/optimizeImpressAd'
import OptimizeSearchAd from '@/components/analysis/ctr/optimizeSearchAd'
import Keyword from '@/components/analysis/keyword/Main'
import Other from '@/components/analysis/other/Main'
import Overhead from '@/components/analysis/overhead/Main'
import Quality from '@/components/analysis/quality/Main'
import OptimizeTextAd from '@/components/analysis/textAd/Optimize'
import OptimizeKeyword from '@/components/analysis/keyword/Optimize'
import ShareNum from '@/components/analysis/shareNum/Main'
import OptimizeShareNum from '@/components/analysis/shareNum/OptimizeKeywords'
import TextAd from '@/components/analysis/textAd/Main'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/analysis/index',  // 入口
      name: 'Index',
      component: Index
    },
    {
      path: '/analysis/history/main',  // 历史记录
      name: 'History',
      component: History
    },
    { // 忽略历史记录之后index需要做成动态路由
      path: '/analysis/ignoreHistory/main',
      name: 'IgnoreHistory',
      component: IgnoreHistory
    },
    {
      path: '/analysis/main',  // 分析结果
      name: 'Analysis',
      component: Analysis,
      children: [
        {
          path: '/analysis/cost/main',
          name: 'Cost',
          component: Cost
        },
        {
          path: '/analysis/ctr/main',
          name: 'Ctr',
          component: Ctr
        },
        {
          path: '/analysis/keyword/main',
          name: 'Keyword',
          component: Keyword
        },
        {
          path: '/analysis/other/main',
          name: 'Other',
          component: Other
        },
        {
          path: '/analysis/overhead/main',
          name: 'Overhead',
          component: Overhead
        },
        {
          path: '/analysis/quality/main',
          name: 'Quality',
          component: Quality
        },
        {
          path: '/analysis/ahareNum/main',
          name: 'ShareNum',
          component: ShareNum
        },
        {
          path: '/analysis/textAd/main',
          name: 'TextAd',
          component: TextAd
        }
      ]
    },
    {
      path: '/analysis/cost/optimize',   // 浪费花费-否定关键字推荐
      name: 'OptimizeCost',
      component: OptimizeCost,
      children: [
        {
          path: '/analysis/cost/optimizeNegativeKeyword',
          name: 'OptimizeNegativeKeyword',
          component: OptimizeNegativeKeyword
        },
        {
          path: '/analysis/cost/optimizeNegativeKeywordPRO',
          name: 'OptimizeNegativeKeywordPRO',
          component: OptimizeNegativeKeywordPRO
        }
      ]
    },
    {
      path: '/analysis/quality/optimizeMain',   // 质量得分-否定关键字推荐
      name: 'OptimizeQuality',
      component: OptimizeQuality
    },
    {
      path: '/analysis/ctr/optimize',   // 浪费花费-否定关键字推荐
      name: 'OptimizeCtr',
      component: OptimizeCtr,
      children: [
        {
          path: '/analysis/ctr/optimizeImpressAd',
          name: 'OptimizeImpressAd',
          component: OptimizeImpressAd
        },
        {
          path: '/analysis/ctr/optimizeSearchAd',
          name: 'OptimizeSearchAd',
          component: OptimizeSearchAd
        }
      ]
    },
    {
      path: '/analysis/textAd/optimize',        // 文字广告-优化列表
      name: 'OptimizeTextAd',
      component: OptimizeTextAd
    },
    {
      path: '/analysis/keyword/optimizeMain',   // 长尾关键字-优化列表
      name: 'OptimizeKeyword',
      component: OptimizeKeyword
    },
    {
      path: '/analysis/share/optimize',   // 展示份额否定关键字推荐
      name: 'OptimizeShareNum',
      component: OptimizeShareNum
    }
  ]
})
let version = {
  ac_version: '1.0'
}
router.beforeEach(function (to, from, next) {
  if (!to.fullPath.includes('ac_version') && /^\/analysis.*/.test(to.fullPath)) {
    router.push({path: to.fullPath, query: version})
    return
  }
  next() // 跳出beforeEach循环
})
export default router
