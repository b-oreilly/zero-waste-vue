<template>
  <v-container>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <v-form>
        <v-text-field v-model="searchTerm"></v-text-field>
        <v-btn @click="searchItems">Search</v-btn>
        <span v-if="filteredItems">
        <div v-for="item in filteredItems" :key="item._id">
          {{ item.title }}
        </div>
        </span>
      </v-form>
    </div>
  </v-container>
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
            console.log(response.data)
          })
      }
    }
  });
</script>