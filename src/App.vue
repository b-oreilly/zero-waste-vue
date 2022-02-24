<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
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
    data() {
      return {

      }
    },
    created() {
      localStorage.getItem('token') ? this.$store.commit('SET_USER_STATUS', true) : this.$store.commit(
        'SET_USER_STATUS', false)
    }
  }
</script>


<style lang="scss">
  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>