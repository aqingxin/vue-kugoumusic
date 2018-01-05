import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import kogounav from '@/components/kogounav'
import newSong from '@/components/newSong'
import rank from '@/components/rank'
import audioBar from '@/components/audioBar'
import search from '@/components/search'
import hotSearch from '@/components/hotSearch'
import searchResult from '@/components/searchResult'
import rankDetail from '@/components/rankDetail'
import songSheet from '@/components/songSheet'
import sheetdetail from '@/components/sheetdetail'
import singer from '@/components/singer'
import singerClass from '@/components/singerClass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path:'/',
          name:'kogounav',
          component:kogounav,
          children:[
            {
              path:'/',
              name:'newSong',
              component:newSong
            },
            {
              path:'/rank',
              name:'rank',
              component:rank
            },
            {
              path:'/songSheet',
              name:'songSheet',
              component:songSheet
            },
            {
              path:'/singer',
              name:'singer',
              component:singer,
            }
          ]
        },
        {
          path:'/',
          name:'audioBar',
          component:audioBar,
        },
        {
          path:'/search',
          name:'search',
          component:search,
          children:[
            {
              path:'/search',
              name:'hotSearch',
              component:hotSearch,
            },
            {
              path:'/searchResult',
              name:'searchResult',
              component:searchResult,
            }
          ]
        },
        {
          path:'/rankDetail/:id',
          name:'rankDetail',
          component:rankDetail,
        },
        {
          path:'/sheetdetail/:id',
          name:'sheetdetail',
          component:sheetdetail,
        },
        {
          path:'/singerClass/:id',
          name:'singerClass',
          component:singerClass,
        },
      ]
    },
    
  ]
})
