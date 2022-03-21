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
                    <h2 class="mainItemTitle">Item</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <br>
            <v-row>

                <v-col md=6 sm=12>
                    <v-img class="overflow-hidden responsive p-0" v-if="item.photo">{{ item.photo }}</v-img>
                    <span v-else>
                        <v-img src="https://picsum.photos/400/300?random" />
                    </span>
                </v-col>
                <v-card md=6 sm=12 flat class="overflow-hidden footer-offset">
                    <div class="itemBody">

                        <v-col>
                            <v-card-title class="pt-0">
                                <h2> {{ item.title }} </h2>
                            </v-card-title>

                            <v-card-text>

                                <p>{{ item.description }}</p>

                                <v-divider /><br>

                                <router-link :to="{ name: 'viewCategory', params: { id: item.categoryID._id }}">
                                    <p> {{ item.categoryID.name }} </p>
                                </router-link>

                                <router-link :to="{ name: 'viewQuality', params: { id: item.qualityID._id }}">
                                    <p> {{ item.qualityID.name }} </p>
                                </router-link>

                                <p v-if="item.claimed == true"> Claimed </p>


                                <p v-if="item.price">Asking price: €{{ item.price }}</p>
                                <p v-else>Free</p>


                                <div v-if="!$store.state.loggedIn">
                                    <p>Please <router-link to="/login">Login</router-link>
                                        or <router-link to="/register">Signup</router-link>
                                        to contact this user.</p>
                                </div>
                                <div v-else>
                                    <router-link :to="{ name: 'viewUser', params: { id:item.userID._id }}">
                                        <p v-if="item.userID.username"> {{ item.userID.username }}</p>
                                    </router-link>
                                </div>


                                <p>Date Posted/Updated: <br> {{ new Date(item.updatedAt).toLocaleString() }}</p>

                                <!-- <p v-if="item.categoryID">Category: {{ item.category.name}}</p> -->
                                <!-- <p>???? {{item.categoryID}}</p> -->
                                <!-- <p> {{ Object.values(item.categoryID)[1] }} </p> -->


                                <!-- <p v-if="item.claimed">Claimed</p> -->


                            </v-card-text>
                        </v-col>


                        <!-- <v-row>
                    <v-btn text rounded :to="{ name: 'editItem', params: { id: this.$route.params.id}}"
                        variant="warning">Edit</v-btn>
                    <v-btn text rounded class="delete" @click="deleteData()">Delete</v-btn>
                </v-row> -->
                    </div>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBack from '@/components/GoBack'

    export default {
        name: "viewSingleItem",
        components: {
            GoBack
        },
        data() {
            return {
                item: {}
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                axios.get(`/items/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data)
                        this.item = response.data
                    })
                    .catch(error => console.log(error))
            },
            deleteData() {
                let token = localStorage.getItem('token')

                axios.delete(`/items/${this.$route.params.id}`, {
                        headers: {
                            "Accepted": `application/json`,
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({
                            name: "viewItems",
                            params: {}
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })

            },
        }
    };
</script>

<style scoped>
    .btn {
        margin-right: 10px;
    }

    v-img {
        max-width: auto;
        /* height: 100px !important; */
    }

    .itemTitle,
    .itemBody {
        text-transform: capitalize;
    }

    p {
        text-align: left;
    }

    .mainItemTitle {
        vertical-align: middle;
    }
</style>