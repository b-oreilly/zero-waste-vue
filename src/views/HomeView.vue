<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <v-form>
      <v-input v-model="searchTerm" placeholder="Search" type="search" icon="magnify" icon-clickable>
      </v-input>
      <v-autocomplete clearable filled rounded class="d-flex justify-start" align="center" v-model="items"
        :items="items">
        <v-icon> mdi-magnify </v-icon>
      </v-autocomplete>
    </v-form> -->
  </div>

</template>

<script>
  // import SearchBar from '@/components/SearchBar'
  export default {
    components: {},
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }),
  }
</script>