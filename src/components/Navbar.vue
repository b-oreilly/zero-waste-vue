<template>
  <div>
    <MobileNavbar class="hidden-sm-and-up" />
    <DesktopNavbar class="hidden-xs-only" />
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
        drawer: false,
        // siteItems: [{
        //     title: 'About',
        //     link: '/about',
        //   },
        //   {
        //     title: 'Items',
        //     link: '/items',
        //   }
        // ],
        // userItems: [{
        //   title: 'Account',
        //   link: '/account/:id',
        // },
        // {
        //   title: 'Your items',
        //   link: '/items',
        // }]
      }
    },
    computed: {
      ...mapState(['loggedIn'])
    },
    mounted() {
      // this.getUserDashboard()
    },
    methods: {
      ...mapActions(['logout']),
      //   getUserDashboard() {
      //     axios.get(`/users`)
      //       .then((response) => {
      //         console.log(response.data)
      //         this.user = response.data
      //       })
      //       .catch(error => console.log(error))
      //   }
    }
  })
</script>


<style scoped>
  router-link,
  a {
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    color: #000 !important;
  }

  #title {
    text-transform: uppercase !important;
    color: #000 !important;
  }

  .v-toolbar__items {
    vertical-align: middle;
  }

  #user {
    /* background-color: rgba(0, 0, 0, 0.06); */
    width: 140px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .v-menu__content {
    box-shadow: none;
    /* background-color: #c0c0c0; */
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .v-list {
    padding: 0px !important;
  }
</style>