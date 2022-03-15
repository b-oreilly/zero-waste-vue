<template>
  <v-container>
    <v-col>
      <v-row no-gutters>
        <v-col cols=2>
          <div class="d-flex justify-start">
            <GoBack />
          </div>
        </v-col>
        <div class="d-flex justify-center col">
          <h2>User</h2>
        </div>
        <v-col cols=2>
        </v-col>
      </v-row>
      <br>
      <v-card flat>

        <v-card-title>
          <h3> {{ user.username }} </h3>
        </v-card-title>
        <v-card-text> {{ user.first_name }} {{ user.last_name }}</v-card-text>


        <!-- <v-btn text @click="deleteCourse(user.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn> -->
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
  import axios from '@/config';
  import GoBack from '@/components/GoBack.vue'

  export default {
    name: 'ViewSingleUser',
    components: {
      GoBack
    },
    data() {
      return {
        user: {},
        users: []
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        axios.get(`/users/${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data)
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