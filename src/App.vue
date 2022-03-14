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
      localStorage.getItem('token') &&  localStorage.getItem('user') ? this.$store.commit('SET_STATUS', true) && this.$store.commit('SET_TOKEN', 'token') : this.$store.commit(
        'SET_STATUS', false)
    }
  }
</script>


<style lang="scss">
  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #252525;
  }

  // nav {
  //   padding: 30px;

  a {
    font-weight: bold;
    color: #252525;
    text-decoration: none;

    // &.router-link-exact-active {
    //   color: #42b983;
    // }
  }
</style>