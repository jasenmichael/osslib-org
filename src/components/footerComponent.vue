<template>

<nav class="navbar bottom navbar-light text-dark">
  <section id="footer">

    <div id="footer-links" class="row text-xs-center text-sm-center text-md-center">

      <div class="col-xs-12 col-sm-12 col-md-4 text-left">
        <h5>Open Source Resources:</h5>
        <ul class="list-unstyled quick-links" v-for="resource in osResources" :key="resource.key">
          <li><a :href="resource.url" target="_blank"><i class="fa fa-angle-double-right"></i> {{resource.name}}</a></li>
        </ul>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4 text-left">
        <h5>Developer Picks:</h5>
        <ul class="list-unstyled quick-links" v-for="resource in devPickResources" :key="resource.key">
          <li><a :href="resource.url" target="_blank"><i class="fa fa-angle-double-right"></i> {{resource.name}}</a></li>
        </ul>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4 text-left">
        <h5>Top Linux Distributions:</h5>
        <ul class="list-unstyled quick-links" v-for="resource in distroResources" :key="resource.key">
          <li><a :href="resource.url" target="_blank"><i class="fa fa-angle-double-right"></i> {{resource.name}}</a></li>
        </ul>
      </div>
    </div>

    <div id="post-footer">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
          <ul class="list-unstyled list-inline social text-center">
            <li class="list-inline-item"><a href="#"><i class="fa fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-google-plus"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fa fa-envelope"></i></a></li>
          </ul>
        </div>
      </div>

      <div class="row support">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
          <p>Support Open Source innovation and ethics.</p>
          <p class="h6">&copy; ® All right Reversed.<a class="text-green ml-2" href="http://osslib.org" target="_blank">Open Source Library - OssLib.org</a></p>
        </div>
      </div>
    </div>

<adminComponent :admin="admin" :setAdmin="setAdmin"></adminComponent>
</section>

</nav>

</template>

<script>
import adminComponent from '@/components/adminComponent'

export default {
  name: 'footerComponent',
  components: {
    adminComponent
  },
  props: [
    'setAdmin',
    'admin'
  ],
  data () {
    return {
      // apiUrl: 'http://localhost:3000/resources',
      apiUrl: 'https://osslib.herokuapp.com/resources',
      resourcesList: [],
      title: 'OssLib.org'
    }
  },
  beforeMount () {
    fetch(this.apiUrl).then(response => {
      return response.json()
    }).then(data => {
      this.resourcesList = data.resources
    })
  },
  computed: {
    osResources () {
      return this.resourcesList.filter((resource) => {
        return resource.section.match(new RegExp('oslink', 'i'))
      })
    },
    devPickResources () {
      return this.resourcesList.filter((resource) => {
        return resource.section.match(new RegExp('devpick', 'i'))
      })
    },
    distroResources () {
      return this.resourcesList.filter((resource) => {
        return resource.section.match(new RegExp('distro', 'i'))
      })
    }
  }
}
</script>

<style scoped>

@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

nav {
  background-color: #a6ce3a;
}

#footer {
  margin: auto;
  width: 80%;
}

#footer, #footer-links {
  margin-top: 2em;
  font-size: 120%;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

h5 {
  color: #333538;
  text-shadow: 1px 1px 2px  rgb(158, 158, 158), 1px 1px 1px  #008cba;
  font-size: 110%;
  font-family: 'Righteous', cursive;
}

.support  {
  color: #333538;
  font-size: 130%;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
}

</style>
