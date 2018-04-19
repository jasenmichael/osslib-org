<template>
<div id="main" class="container">

  <div class="text-center container-fluid">
    <h1 class="display-1 text-secondary">OssLib.org</h1>
    <h2>Open Source Software Libray</h2>
    <hr class="my-4">
    <p class="lead">
      <router-link  class="btn btn-primary btn-lg" role="button" to="software">Software</router-link>
      <!-- <a class="btn btn-primary btn-lg" href="#" role="button">Linux Distributions</a> -->
    </p>
    <blockquote class="blockquote">
      <p id="free" class="mb-0">"Free software is a matter of liberty, not price. To understand the concept, you should think of free as in free speech, not as in free beer."</p>
      <footer class="blockquote-footer">Richard Stallman</footer>
    </blockquote>
    <p class="small" title="Source Title">read more here<a target="_blank" href="https://en.wikipedia.org/wiki/Gratis_versus_libre"> "Gratis" versus "Libre"</a></p>
  </div>

</div>
</template>

<script>
export default {
  name: 'homePageComponent',
  data () {
    return {
      title: 'Home Page'
    }
  }
}
</script>

<style scoped>

#main {
  font-size: 160%;
  font-family: 'Righteous', cursive;
  background-image: url(../assets/open-source2.png);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;
  height: 90vh;
}

h1 {
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

hr {
  width: 20%;
  border: 0; height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0));
}

#free {
  font-size: 150%;
  margin: auto;
  max-width: 800px;

}

blockquote p {
  font-family: 'Roboto', sans-serif;
}

</style>
