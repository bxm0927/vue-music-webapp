import Vue from 'vue'
import Router from 'vue-router'
// import MyRecommend from '@/components/MyRecommend/MyRecommend'
// import MySinger from '@/components/MySinger/MySinger'
// import MyRank from '@/components/MyRank/MyRank'
// import MySearch from '@/components/MySearch/MySearch'
// import MySingerDetail from '@/components/MySingerDetail/MySingerDetail'
// import MySongListDetail from '@/components/MySongListDetail/MySongListDetail'
// import MyRankDetail from '@/components/MyRankDetail/MyRankDetail'
// import MyUser from '@/components/MyUser/MyUser'

Vue.use(Router)

// 路由懒加载
const MyRecommend = (resolve) => {
  import('@/components/MyRecommend/MyRecommend').then((module) => {
    resolve(module)
  })
}
const MySinger = (resolve) => {
  import('@/components/MySinger/MySinger').then((module) => {
    resolve(module)
  })
}
const MyRank = (resolve) => {
  import('@/components/MyRank/MyRank').then((module) => {
    resolve(module)
  })
}
const MySearch = (resolve) => {
  import('@/components/MySearch/MySearch').then((module) => {
    resolve(module)
  })
}
const MySingerDetail = (resolve) => {
  import('@/components/MySingerDetail/MySingerDetail').then((module) => {
    resolve(module)
  })
}
const MySongListDetail = (resolve) => {
  import('@/components/MySongListDetail/MySongListDetail').then((module) => {
    resolve(module)
  })
}
const MyRankDetail = (resolve) => {
  import('@/components/MyRankDetail/MyRankDetail').then((module) => {
    resolve(module)
  })
}
const MyUser = (resolve) => {
  import('@/components/MyUser/MyUser').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/user',
      name: 'user',
      component: MyUser
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: MyRecommend,
      children: [
        {
          path: ':id',
          name: 'songlistdetail',
          component: MySongListDetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: MySinger,
      children: [
        {
          path: ':id',
          name: 'singerdetail',
          component: MySingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: MyRank,
      children: [
        {
          path: ':id',
          name: 'rankdetail',
          component: MyRankDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: MySearch,
      children: [
        {
          path: ':id',
          component: MySingerDetail
        }
      ]
    }
  ]
})
