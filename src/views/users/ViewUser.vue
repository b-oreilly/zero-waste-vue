<template>
  <v-container>
    <v-col>
      <v-row no-gutters align="center">
        <v-col cols=2>
          <div class="d-flex justify-start">
            <GoBackButton />
          </div>
        </v-col>
        <div class="d-flex justify-center col">
          <h1 class="mainItemTitle">User</h1>
        </div>
        <v-col cols=2>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <div class="d-flex justify-center col">
          <h2 class="mainItemTitle pl-0">{{ user.username }}</h2>
        </div>
      </v-row>
      <v-row no-gutters class="d-flex justify-center col">
        <h4 class="mainItemTitle pl-0">Location: {{ user.locationID.name }}</h4>
      </v-row>

      <v-row>
        <v-col>
          <div class="d-flex justify-center col">
            <h3 class="pt-2"> {{ user.username }}'s Items</h3>
          </div>
          <div class="footer-offset">
            <v-row no-gutters>
              <v-col class="v-card-columns" v-for="item in filteredItems" :key="item._id" cols="12" sm="3">
                <v-card flat class="pt-3 ma-2">
                  <v-img v-if="item.photo">{{ item.photo }}</v-img>
                  <span v-else>
                    <v-img src="https://picsum.photos/400/300?random" />
                  </span>
                  <div>
                    <v-row align="center">
                      <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                        <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                          {{ item.title }}
                        </router-link>
                      </v-card-title>
                    </v-row>
                    <v-row class="pt-0">
                      <v-col class="pt-0">
                        <v-card-text v-if="item.categoryID" class="pa-0 pl-1">
                          <router-link style="color: grey"
                            :to="{ name: 'viewSingleCategory', params: { id: item.categoryID._id }}">
                            <p> {{ item.categoryID.name }} </p>
                          </router-link>
                        </v-card-text>
                      </v-col>
                      <div class="justify-end">
                        <v-card-text class="pt-0" v-if="item.price">€{{ item.price }}</v-card-text>
                        <v-card-text class="pt-0" v-else>Free</v-card-text>
                      </div>
                    </v-row>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div v-if="filteredItems == 0">
              <v-row class="footer-offset">
                <v-col>
                  <div class="d-flex justify-center col pb-0">
                    <p>
                      {{ user.username }} hasn't listed any items.
                    </p>
                  </div>
                  <div>
                    <AddButton />
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
  import axios from '@/config';
  import GoBackButton from '@/components/GoBackButton.vue'

  export default {
    name: 'ViewSingleUser',
    components: {
      GoBackButton
    },
    data() {
      return {
        user: {},
        item: {},
        items: []
      }
    },
    computed: {
      filteredItems: function () {
        return this.items.filter(item => {
          return item.userID._id == this.$route.params.id
        })
      }
    },

    mounted() {
      axios.get('/items')
        .then(response => {
          this.items = response.data
        })
        .catch(error => console.log(error)),
        this.getUserDetails();
      this.getData();
    },
    methods: {
      getUserDetails() {
        if (localStorage.getItem("user")) {
          this.user = JSON.parse(localStorage.getItem("user"))
        }
      },
      getData() {
        axios.get(`/users/${this.$route.params.id}`)
          .then((response) => {
            // console.log(response.data)
            this.user = response.data
          })
          .catch(error => console.log(error))
      }
    }
  };
</script>

<style scoped>
  h2 {
    text-align: start;
    padding-left: 16px !important;

  }
</style>