<template>
  <div class="footer-offset mt-8">
    <div class="hidden-sm-and-down">
      <v-card flat tile dark class="mt-3 ">
        <v-row no-gutters>
          <v-col md="6">
            <div id="shape" class="pl-8">
              <h1 id="site-name-home" align="left">
                Wastenot
              </h1>
              <h2 class="pb-10" align="left">Rehome your unwanted goods </h2>
            </div>
          </v-col>
          <v-col class="d-flex align-center pb-6">
            <v-img contain id="main-img" src="../assets/HumaaansHomePage.png" />
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="hidden-md-and-up">
      <v-card flat tile dark class="mt-3 footer-offset-sm">
        <v-row no-gutters>
          <v-col md="6">
            <div id="shape-sm" class="pl-8">
              <h1 id="site-name-home" align="center">
                Wastenot
              </h1>
              <h2 class="pb-0" align="center">Rehome your unwanted goods </h2>
            </div>
          </v-col>
          <v-col class="d-flex align-center pb-10">
            <v-img contain id="main-img" src="../assets/HumaaansHomePage.png" />
            <br>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default ({
    name: 'HomeView',
    components: {}
  });
</script>
<style scoped>
  #shape {
    padding: 140px 0px 155px;
  }

  #shape-sm {
    padding: 140px 32px 155px;
  }

  #main-img {
    max-height: 250px;
  }
</style>