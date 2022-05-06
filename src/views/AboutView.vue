<template>
  <v-container>
    <div class="footer-offset">
      <v-row no-gutters class="mt-8" align="center">
        <v-col cols=2>
        </v-col>
        <div class="d-flex justify-center col">
          <h1>About</h1>
        </div>
        <v-col cols=2>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" class="mt-4">
        <v-col>
          <div class="d-flex justify-center col">
            <v-card flat>
              <v-card-text class="d-flex about">
                Too often are good items of food, clothing, furniture, etc. thrown away as they're deemed as waste.
                The purpose of the application is to enable users to share their unwanted items with other users in
                their area, also for businesses to share their items no longer fit for sale that would otherwise be
                disposed
                of.
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
  .about {
    font-size: 16px;
  }
</style>