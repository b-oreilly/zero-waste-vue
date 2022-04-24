<template>
  <v-app id="app">
    <Navbar />
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
  import Navbar from "@/components/Navbar"
  import Footer from "@/components/Footer"

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    created() {
      localStorage.getItem('token') ? this.$store.commit('SET_STATUS', true) : this.$store.commit(
        'SET_STATUS', false)
    }
  }
</script>


<style lang="scss">
  #app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #252525;
  }

  // preventing the extra whitespace of the navigation being displayed outside the app
  html,
  body {
    overflow-x: hidden;
  }
</style>