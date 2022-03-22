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
                            <v-list-item-subtitle>Member since: {{ new Date(user.createdAt).toLocaleString() }}
                            </v-list-item-subtitle>
                            <v-btn text rounded class="mt-4" :to="{ name: 'viewUser', params: { id: this.user._id }}">
                                View public profile</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row><br>

            <v-row>
                <v-col>
                    <div class="d-flex justify-center col">
                        <h3 class="pt-2">Your Items</h3>
                    </div>
                    <v-divider />
                    <v-row no-gutters>
                        <v-col class="v-card-columns" v-for="item in filteredItems" :key="item._id" cols="12" sm="3">
                            <v-card flat class="pt-3 ma-2">
                                <v-img v-if="item.photo">{{ item.photo }}</v-img>
                                <span v-else>
                                    <v-img src="https://picsum.photos/400/300?random" />
                                </span>
                                <v-card-title style="word-break: break-word" align="left">
                                    <router-link class="item-title"
                                        :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                        {{ item.title }}
                                    </router-link>
                                </v-card-title>
                                <v-card-text v-if="item.categoryID">
                                    <router-link :to="{ name: 'viewCategory', params: { id: item.categoryID._id }}">
                                        <p> {{ item.categoryID.name }} </p>
                                    </router-link>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <div class="d-flex justify-center col">
                        <h3>User Reviews</h3>
                    </div>
                    <v-divider />
                    <div class="footer-offset">
                        <v-row no-gutters>
                            <v-col class="v-card-columns" v-for="review in reviews" :key="review._id" cols="12" sm="3">
                                <v-card flat class="pt-3 ma-2">

                                    <p v-if="review.score == 1">
                                        <v-icon>mdi-star</v-icon>
                                    </p>
                                    <p v-else-if="review.score == 2">
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                    </p>
                                    <p v-else-if="review.score == 3">
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                    </p>
                                    <p v-else-if="review.score == 4">
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                    </p>
                                    <p v-else-if="review.score == 5">
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                        <v-icon>mdi-star</v-icon>
                                    </p>
                                    <v-card-subtitle style="word-break: break-word" align="left" v-if="review.message">
                                        "{{ review.message }}"
                                    </v-card-subtitle>


                                    <v-card-text v-if="review.reviewerUserID">
                                        <router-link
                                            :to="{ name: 'viewUser', params: { id: review.reviewerUserID._id }}">
                                            <p> {{ review.reviewerUserID.username }} </p>
                                        </router-link>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
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
    import axios from '@/config'
    // import GoBack from '@/components/GoBack.vue'

    export default {
        name: 'Dashboard',
        components: {
            // GoBack
        },
        data() {
            return {
                user: {},
                item: {},
                items: [],
                review: {},
                reviews: []
            }
        },
        computed: {
            filteredItems: function () {
                return this.items.filter(item => {
                    return item.userID._id == localStorage.getItem('userID')
                })
            }
        },
        mounted() {
            axios.get('/items')
                .then(response => {
                    this.items = response.data
                })
                .catch(error => console.log(error)),

                axios.get('/reviews')
                .then(response => {
                    this.reviews = response.data
                })
                .catch(error => console.log(error)),
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