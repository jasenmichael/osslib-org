<template>
  <div id="app">
    <router-view  :admin="admin" :setAdmin="setAdmin"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Open Source Software Library',
      admin: false
    }
  },
  methods: {
    setAdmin () {
      if (!this.admin) {
        this.admin = true
      } else {
        this.admin = false
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Righteous|Roboto:400i,500');

body {
  scroll-behavior: smooth;
}

</style>
