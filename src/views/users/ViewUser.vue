<template>
  <v-container>
    <div class="footer-offset">
      <v-row no-gutters align="center" class="mt-8">
        <v-col cols=2>
          <div class="d-flex justify-center">
            <GoBackButton />
          </div>
        </v-col>
        <div class="d-flex justify-center col">
          <h1 class="mainItemTitle">User</h1>
        </div>
        <v-col cols=2>
        </v-col>
      </v-row>
      <v-card flat>
        <v-row class="mt-4">
          <v-col class="d-flex justify-center">
            <v-avatar size="150">
              <v-img
                src="https://repository-images.githubusercontent.com/130118224/a2c75780-e0a9-11eb-8494-3581a0b1c93b">
              </v-img>
            </v-avatar>
          </v-col>
          <v-col class="d-flex justify-start">
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content align="left">
                <v-list-item-title class="title">{{ user.first_name }} {{ user.last_name }}
                </v-list-item-title>
                <h5 class="pt-2">{{ user.locationID.name }}</h5>
                <v-list-item-subtitle class="pt-1">Member since: {{ new Date(user.createdAt).toLocaleString() }}
                </v-list-item-subtitle>
                <v-btn rounded elevation="0" class="mt-4 login-sm" :to="{ name: 'createMessage' }">
                  Message</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>

      <v-row>
        <v-col>
          <div class="d-flex justify-center col">
            <h3 class="pt-2"> {{ user.username }}'s Items</h3>
          </div>
          <div class="footer-offset">
            <v-row no-gutters>
              <v-col class="v-card-columns" v-for="item in filteredItems" :key="item._id" cols="12" lg="3" md="4"
                sm="6">
                <v-card flat class="pt-3 ma-2">
                  <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                    <v-img contain class="overflow-hidden p-0 card-image" v-if="item.itemImage != null"
                      v-bind:src="`http://localhost:8000/${item.itemImage}`"></v-img>
                    <v-img contain v-else class="card-image"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                    <div>
                      <v-row align="center">
                        <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                          {{ item.title }}
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
                          <p class="pt-0 pr-4" v-if="item.price">€{{ item.price }}</p>
                          <p class="pt-0 pr-4" v-else>Free</p>
                        </div>
                      </v-row>
                    </div>
                  </router-link>
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
    </div>
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