<template>
  <div>
    <MobileNavbar class="hidden-md-and-up"/>
    <DesktopNavbar class="hidden-sm-and-down" />
  </div>
</template>

<script>
  // import axios from '@/config'
  //import SearchBar from '@/components/SearchBar'
  import DesktopNavbar from './DesktopNavbar.vue'
  import MobileNavbar from './MobileNavbar.vue'

  import {
    mapActions,
    mapState
  } from 'vuex'

  export default ({
    components: {
      //SearchBar
      MobileNavbar,
      DesktopNavbar
    },
    data() {
      return {
        drawer: false
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    methods: {
      ...mapActions(['logout'])
    }
  })
</script>


<style scoped>
  @media screen and (min-width: 690px) {

  }
</style>