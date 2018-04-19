import Vue from 'vue'
import Router from 'vue-router'

import softwarePageComponent from '@/components/softwarePageComponent'
import homePageComponent from '@/components/homePageComponent'
import roadmapPageComponent from '@/components/roadmapPageComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePageComponent',
      component: homePageComponent
    }, {
      path: '/software',
      name: 'softwarePageComponent',
      component: softwarePageComponent,
      props: true
    }, {
      path: '/roadmap',
      name: 'roadmapPageComponent',
      component: roadmapPageComponent
    }
  ]
})
