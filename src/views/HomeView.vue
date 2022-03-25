<template>
  <div>
    <v-container>
      <div class="home">
        <v-form>
          <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" v-model="searchTerm" class="search" flat
            rounded filled dense>
          </v-text-field> <!-- @click="searchItems" -->
          <!-- <v-btn rounded dark elevation="0">Search</v-btn> -->

          <span v-if="searchTerm != ''">
            <v-col class="v-card-columns" v-for="item in filteredItems" :key="item._id" cols="12">
              <v-card flat>
                <h3 style="word-break: break-word" align="center">
                  <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                    {{ item.title }}
                  </router-link>
                </h3>
              </v-card>
            </v-col>
          </span>
        </v-form>
      </div>
    </v-container>
    <v-card flat tile dark class="mt-3">
      <v-row>
        <v-col md="6" cols="12">
          <div id="shape">
            <h2 class="pt-10 pb-10">Rehome your unwanted goods </h2>
          </div>
        </v-col>
        <v-col>
          <div id="shape">
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  // import SearchBar from '@/components/SearchBar'
  import axios from '@/config'


  export default ({
    data() {
      return {
        items: [],
        searchTerm: ""
        // searchClosed: true
      }
    },
    computed: {
      filteredItems: function () {
        return this.items.filter(item => {
          return item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          // return user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
          // return category.name.toLowerCase().includes(this.searchTerm.toLowerCase())

        })
      }
    },
    mounted() {
      this.getAllItems();
    },
    methods: {
      getAllItems() {
        axios.get('/items') //can replace with firebase url 
          // .then(response => response.json())
          .then(response => {
            this.items = response.data
          })
        axios.get('/users') //can replace with firebase url 
          // .then(response => response.json())
          .then(response => {
            this.users = response.data
          })
        axios.get('/categories') //can replace with firebase url 
          // .then(response => response.json())
          .then(response => {
            this.categories = response.data
          })
      }
    }
  });
</script>
<style scoped>
  #shape {
    padding: 140px 0px 155px;
  }
</style>