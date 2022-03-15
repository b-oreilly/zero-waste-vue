<template>
    <v-container>
        <v-card flat>
            <v-row no-gutters>
                <v-col cols=2>
                    <div class="d-flex justify-start">
                        <!-- <GoBack /> -->
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2>Account Details</h2>
                </div>
                <v-col cols=2>
                    <v-btn text rounded :to="{ name: 'editAccount', params: { id: this.$route.params.id }}">Edit</v-btn>
                </v-col>
            </v-row>
            <v-row class="mt-4">
                <v-col class="d-flex justify-center">
                    <v-avatar size="100">
                        <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                    </v-avatar>
                </v-col>
                <v-col class="d-flex justify-start">
                    <v-list-item color="rgba(0, 0, 0, .4)">
                        <v-list-item-content align="left">
                            <v-list-item-title class="title">{{ user.first_name }} {{ user.last_name }}
                            </v-list-item-title>
                            <!-- <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle> -->
                            <v-list-item-subtitle>Member since: {{ new Date(user.createdAt).toLocaleString() }}</v-list-item-subtitle>
                            <v-btn text rounded class="mt-4" :to="{ name: 'viewUser', params: { id: this.user._id }}">View public profile</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
            <!-- :img-src="gif.images.fixed_width.url" :img-alt="gif.title" -->
            <!-- <v-card-title>
                        <router-link :to="{ name: 'account', params: { id:user._id }}">{{ user.first_name }}
                        </router-link>
                    </v-card-title> -->

        </v-card>
    </v-container>
</template>

<script>
    // import axios from '@/config'
    // import GoBack from '@/components/GoBack.vue'

    export default {
        name: 'Dashboard',
        components: {
            // GoBack
        },
        data() {
            return {
                user: {}
            }
        },
        mounted() {
            this.getUserDetails();
        },
        methods: {
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            }
        }
    }
</script>

<style>
    a {
        text-decoration: none;
        color: black;
    }
</style>