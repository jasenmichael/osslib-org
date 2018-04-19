<template>
<div>
    <navbarComponent></navbarComponent>

    <div id="roadmap" class="container">
      <h1>roadmap</h1>
      <hr>
      <p class="src">you can see the src roadmap and change logs <a target="_blank" href="https://github.com/jasenmichael/galvanize-tower/tree/master/osslib.org"> here</a></p>
      <hr>
      <vue-showdown id='md' :markdown='content'/>
      <hr>
      <p class="thanks">special thanks to the <a target="_blank" href="https://github.com/showdownjs/showdown">showdown.js team</a></p>
    </div>

    <footerComponent :admin="admin" :setAdmin="setAdmin"></footerComponent>

</div>
</template>

<script>
import navbarComponent from '@/components/navbarComponent'
import footerComponent from '@/components/footerComponent'

import Vue from 'vue'
import VueShowdown from 'vue-showdown'
Vue.component('VueShowdown', VueShowdown)

export default {
  name: 'roadmapPageComponent',
  props: [
    'setAdmin',
    'admin'
  ],
  data () {
    return {
      url: 'https://raw.githubusercontent.com/jasenmichael/galvanize-tower/master/osslib.org/roadmap.md?token=Aco5MXXWV65UpNIqLnSGEG8_Y5yEugiSks5ayJscwA%3D%3D',
      content: ''
    }
  },
  components: {
    navbarComponent,
    footerComponent
  },
  beforeMount () {
    fetch(this.url)
      .then(response => {
        return response.text()
      }).then(md => {
        this.content = md
      })
  },
  computed: {
  }
}

</script>

<style scoped>

* {
  font-family: 'Roboto', sans-serif;
}

#roadmap {
  margin-top: 5.5em;
}

 #md.* {
  font-size: 210%;
}

.thanks, .src {
  font-size: 120%;
}

</style>
