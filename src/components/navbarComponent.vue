<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <router-link to="/" class="navbar-brand">OssLib.org</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">

          <router-link to="./software" class="nav-link text-light mr-3 ml-3"> Software</router-link>

      </li>
      <li class="nav-item">
          <!-- <a class="nav-link text-light mr-3 ml-3" href="#"> Linux Distributions(coming-soon)</a> -->
          <router-link to="./roadmap" role="button" class="nav-link text-light mr-3 ml-3"> Roadmap</router-link>

      </li>
    </ul>
 </div>
</nav>

</template>

<script>
export default {
  name: 'navbarComponent',
  data () {
    return {
      title: 'OssLib.org'
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Righteous|Roboto:400i,500');

.navbar {
  font-size: 140%;
}

a.navbar-brand {
  font-family: 'Righteous', cursive;
  font-size: 180%;
  font-weight: bold;
  text-shadow: 0 1px 0 #ccc,
               0 2px 0 #c9c9c9,
               0 3px 0 #bbb,
               0 4px 0 #b9b9b9,
               0 5px 0 #aaa,
               0 6px 1px rgba(0,0,0,.1),
               0 0 5px rgba(0,0,0,.1),
               0 1px 3px rgba(0,0,0,.3),
               0 3px 5px rgba(0,0,0,.2),
               0 5px 10px rgba(0,0,0,.25),
               0 10px 10px rgba(0,0,0,.2),
               0 20px 20px rgba(0,0,0,.15);
}

button.btn.btn-secondary {
  margin: .2em;
  padding: 0px;
  font-size: 90%;
  background-color: inherit;
  border: none;
}

a {
  margin-left: 2px;
  font-family: 'Roboto', sans-serif;
}

button.btn.btn-secondary:hover {
  background-color: #a6ce3a;
  border-radius: 4px;
}

</style>
