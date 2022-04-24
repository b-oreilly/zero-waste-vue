<template>
  <v-footer absolute class="font-weight-medium">
    <v-row no-gutters>
      <v-col class="v-card-columns" cols="12" lg="6" md="6" sm="6" xs="12">
        <div class="pt-3 ma-4">
          <router-link to="/" class="d-flex justify-start">
            <p id="site-name">
              Wastenot
            </p>
          </router-link>
          <p id="site-content">Rehome your unwanted goods</p>
        </div>
      </v-col>
      <v-col class="v-card-columns" cols="12" lg="6" md="6" sm="6" xs="12">
        
        <div class="mt-10 ml-4 mr-4">
          <p><strong>
            Explore
          </strong></p>
          <router-link to="/about" class="d-flex justify-start">
            <p id="site-content">
              About
            </p>
          </router-link>
          <router-link to="/items" class="d-flex justify-start">
            <p id="site-content">
              Items
            </p>
          </router-link>
        </div>
      </v-col>
    </v-row>
    <v-col cols="12">
      &copy; {{ new Date().getFullYear() }}
    </v-col>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer"
  };
</script>

<style>
  v-footer {
    display: inline-block;
    position: relative;
    padding-top: 100px !important;
  }
</style>