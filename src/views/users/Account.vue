<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters align="center" class="mt-10">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2>Account Details</h2>
                </div>
                <v-col cols=2>
                    <EditAccountButton />
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
                                <v-list-item-subtitle>{{ user.locationID.name }}</v-list-item-subtitle>
                                <v-list-item-subtitle>Member since: {{ new Date(user.createdAt).toLocaleString() }}
                                </v-list-item-subtitle>
                                <v-btn rounded elevation="0" class="mt-4"
                                    :to="{ name: 'viewUser', params: { id: this.user._id }}">
                                    View public profile</v-btn>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col">
                            <h3 class="pt-2">Your Items</h3>
                        </div>
                    </v-col>
                </v-row>
                <v-divider />
                <v-row no-gutters>
                    <v-col class="v-card-columns" v-for="item in filteredItems" :key="item._id" cols="12" lg="3" md="4"
                        sm="6">
                        <v-card flat class="pt-3 ma-2">
                            <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                <v-img contain class="overflow-hidden responsive p-0 item-image"
                                    v-if="item.itemImage != null"
                                    v-bind:src="`http://localhost:8000/${item.itemImage}`">
                                </v-img>
                                <v-img v-else class="item-image"
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
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center col pb-0">
                                <p>
                                    You haven't listed any items.
                                </p>
                            </div>
                            <div>
                                <AddButton />
                            </div>
                        </v-col>
                    </v-row>
                </div>


                <!-- Saved -->
                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col">
                            <h3>Your Saved Items</h3>
                        </div>
                    </v-col>
                </v-row>
                <v-divider />
                <v-row no-gutters>
                    <v-col cols="12" lg="3" md="4" sm="6" class="v-card-columns"
                        v-for="interaction in filteredSavedInteractions" :key="interaction._id">
                        <v-card flat class="pt-3 ma-2">
                            <h4 style="word-break: break-word" class="interaction pa-4" align="center">
                                Saved
                            </h4>
                            <router-link class="item-title"
                                :to="{ name: 'viewSingleItem', params: { id: interaction.itemID._id }}">
                                <v-img contain class="overflow-hidden responsive p-0 item-image"
                                    v-if="item.itemImage != null"
                                    v-bind:src="`http://localhost:8000/${item.itemImage}`">
                                </v-img>
                                <v-img v-else class="item-image"
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                                <div>
                                    <v-row align="center">
                                        <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                                            <router-link class="item-title"
                                                :to="{ name: 'viewSingleItem', params: { id: interaction.itemID._id }}">
                                                {{ interaction.itemID.title }}
                                            </router-link>
                                        </v-card-title>
                                    </v-row>
                                    <v-row class="pt-0">
                                        <v-col class="pt-0">
                                        </v-col>
                                        <div class="justify-end">
                                            <p class="pt-0 pr-4" v-if="interaction.itemID.price">€{{ interaction.itemID.price }}</p>
                                            <p class="pt-0 pr-4" v-else>Free</p>
                                        </div>
                                    </v-row>
                                </div>
                            </router-link>
                        </v-card>
                    </v-col>
                </v-row>
                <div v-if="filteredSavedInteractions == 0">
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center col">
                                <p>
                                    You haven't saved any items.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <!-- Interested -->
                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col">
                            <h3>Your Interest List</h3>
                        </div>
                    </v-col>
                </v-row>
                <v-divider />
                <v-row no-gutters>
                    <v-col cols="12" lg="3" md="4" sm="6" class="v-card-columns"
                        v-for="interaction in filteredInterestedInteractions" :key="interaction._id">
                        <v-card flat class="pt-3 ma-2">
                            <h4 style="word-break: break-word" class="interaction pa-4" align="center">
                                Interested
                            </h4>
                            <router-link class="item-title"
                                :to="{ name: 'viewSingleItem', params: { id: interaction.itemID._id }}">
                                <v-img contain class="overflow-hidden responsive p-0 item-image"
                                    v-if="item.itemImage != null"
                                    v-bind:src="`http://localhost:8000/${item.itemImage}`">
                                </v-img>
                                <v-img v-else class="item-image"
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                                <div>
                                    <v-row align="center">
                                        <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                                            {{ interaction.itemID.title }}
                                        </v-card-title>
                                    </v-row>
                                    <v-row class="pt-0">
                                        <v-col class="pt-0">
                                            <v-card-text v-if="item.categoryID" class="pa-0 pl-1">
                                                <router-link class="item-title"
                                                    :to="{ name: 'viewUser', params: { id: interaction.itemID.userID._id }}">
                                                    {{ interaction.itemID.categoryID.name }}
                                                </router-link>
                                            </v-card-text>
                                        </v-col>
                                        <div class="justify-end">
                                            <p class="pt-0 pr-4" v-if="interaction.itemID.price">€{{ interaction.itemID.price }}</p>
                                            <p class="pt-0 pr-4" v-else>Free</p>
                                        </div>
                                    </v-row>
                                </div>
                            </router-link>
                        </v-card>
                    </v-col>
                </v-row>
                <div v-if="filteredInterestedInteractions == 0">
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center col">
                                <p>
                                    You haven't marked any items as interested.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div>

                <!-- Claimed -->
                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col">
                            <h3>Your Claimed Items</h3>
                        </div>
                        <v-divider />
                        <v-row no-gutters>
                            <v-col cols="12" lg="3" md="4" sm="6" class="v-card-columns"
                                v-for="interaction in filteredClaimedInteractions" :key="interaction._id">
                                <v-card flat class="pt-3 ma-2">
                                    <h4 style="word-break: break-word" class="interaction pa-4" align="center">
                                        Claimed
                                    </h4>
                                    <router-link class="item-title"
                                        :to="{ name: 'viewSingleItem', params: { id: interaction.itemID._id }}">
                                        <v-img contain class="overflow-hidden responsive p-0 item-image"
                                            v-if="item.itemImage != null"
                                            v-bind:src="`http://localhost:8000/${item.itemImage}`"></v-img>
                                        <v-img v-else class="item-image"
                                            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                                        <div>
                                            <v-row align="center">
                                                <v-card-title style="word-break: break-word" align="left"
                                                    class="mt-2 pb-0">
                                                    <router-link class="item-title"
                                                        :to="{ name: 'viewSingleItem', params: { id: interaction.itemID._id }}">
                                                        {{ interaction.itemID.title }}
                                                    </router-link>
                                                </v-card-title>
                                            </v-row>
                                            <v-row class="pt-0">
                                                <v-col class="pt-0">
                                                    <v-card-text v-if="item.categoryID" class="pa-0 pl-1">
                                                        <router-link style="color: grey" class="item-title"
                                                            :to="{ name: 'viewUser', params: { id: interaction.itemID.userID._id }}">
                                                            {{ interaction.itemID.userID.username }}
                                                        </router-link>
                                                    </v-card-text>
                                                </v-col>
                                                <div class="justify-end">
                                                    <p class="pt-0 pr-4" v-if="interaction.itemID.price">€{{ interaction.itemID.price }}</p>
                                                    <p class="pt-0 pr-4" v-else>Free</p>
                                                </div>
                                            </v-row>
                                        </div>
                                    </router-link>
                                </v-card>
                            </v-col>
                        </v-row>
                        <div v-if="filteredClaimedInteractions == 0">
                            <v-row>
                                <v-col>
                                    <div class="d-flex justify-center col">
                                        <p>
                                            You haven't claimed any items.
                                        </p>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>

                <!-- Reviews -->
                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col">
                            <h3>User Reviews</h3>
                        </div>
                        <v-divider />
                        <div class="footer-offset">
                            <v-row no-gutters>
                                <v-col class="v-card-columns" v-for="review in filteredUserReviews" :key="review._id"
                                    cols="12" lg="3" md="4" sm="6">
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
                                        <v-card-subtitle style="word-break: break-word" align="left"
                                            v-if="review.message">
                                            "{{ review.message }}"
                                        </v-card-subtitle>


                                        <v-card-text v-if="review.reviewerUserID" align="left">
                                            <router-link
                                                :to="{ name: 'viewUser', params: { id: review.reviewerUserID._id }}">
                                                <p> {{ review.reviewerUserID.username }} </p>
                                            </router-link>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <div v-if="filteredUserReviews == 0">
                                <v-row>
                                    <v-col>
                                        <div class="d-flex justify-center col">
                                            <p>
                                                You haven't gotten any reviews.
                                            </p>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBackButton from '@/components/GoBackButton.vue'
    import EditAccountButton from '@/components/EditAccountButton'
    import AddButton from '@/components/AddButton'


    export default {
        name: 'Account',
        components: {
            GoBackButton,
            EditAccountButton,
            AddButton
        },
        data() {
            return {
                user: {},
                item: {},
                items: [],
                review: {},
                reviews: [],
                interaction: {},
                interactions: []
            }
        },
        mounted() {
            this.getItems();
            this.getUserDetails();
            this.getUserReviews();
            this.getUserInteractions();
        },
        methods: {
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            getUserInteractions() {
                axios
                    .get(`/user_interactions`)
                    .then(response => {
                        this.interactions = response.data
                    })
                    .catch(err => {
                        console.log(err)
                        console.log(err.response.data)
                    })
            },
            getItems() {
                axios.get('/items')
                    .then(response => {
                        this.items = response.data
                    })
                    .catch(error => console.log(error))
            },
            getUserReviews() {
                axios.get('/reviews')
                    .then(response => {
                        this.reviews = response.data
                    })
                    .catch(error => console.log(error))
            }
        },
        computed: {
            filteredItems: function () {
                return this.items.filter(item => {
                    return item.userID._id == localStorage.getItem('userID')
                })
            },
            filteredInterestedInteractions: function () {
                return this.interactions.filter(interaction => {
                    return interaction.userID._id == localStorage.getItem('userID') &&
                        interaction.interactionID.interactionName == 'Interested'
                })
            },
            filteredSavedInteractions: function () {
                return this.interactions.filter(interaction => {
                    return interaction.userID._id == localStorage.getItem('userID') &&
                        interaction.interactionID.interactionName == 'Saved'
                })
            },
            filteredClaimedInteractions: function () {
                return this.interactions.filter(interaction => {
                    return interaction.userID._id == localStorage.getItem('userID') &&
                        interaction.interactionID.interactionName == 'Claim'
                })
            },
            filteredUserReviews: function () {
                return this.reviews.filter(review => {
                    return review.reviewedUserID._id == localStorage.getItem('userID')
                })
            }
        }
    }
</script>

<style scoped>
    .post {
        text-decoration: none;
        color: #659F41 !important;
        font-weight: bold;
    }
</style>