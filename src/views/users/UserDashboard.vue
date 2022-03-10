<template>
    <v-container>
        <div>
            <br>
            <h1>Hi, {{ user.first_name }}</h1><br>

            <v-card bg-variant="dark">
                <v-card-title>Account Details</v-card-title>
                <!-- :img-src="gif.images.fixed_width.url" :img-alt="gif.title" -->
                <!-- <v-card-title>
                        <router-link :to="{ name: 'account', params: { id:user._id }}">{{ user.first_name }}
                        </router-link>
                    </v-card-title> -->
                <v-card-text>{{ user.first_name }} {{ user.last_name }} </v-card-text>

            </v-card>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'userAccount',
        data() {
            return {
                user: {},
                users: []
            }
        },
        mounted()  {
            this.getUserDashboard();
        },
        methods: {
            getUserDashboard() {
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

<style>
    a {
        text-decoration: none;
        color: black;
    }
</style>