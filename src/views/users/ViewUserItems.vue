<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters class="mt-10" align="center">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2 class="mainItemTitle">Your Items</h2>
                </div>
                <v-col cols=2>
                    <AddButton />
                </v-col>
            </v-row>
            <br>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="item in items" :key="item._id" cols="12" lg="3" md="4" sm="6">
                    <v-card class="pt-3 ma-2" flat>
                        <v-img contain class="overflow-hidden p-0 card-image" v-if="item.itemImage != null"
                            v-bind:src="`http://localhost:8000/${item.itemImage}`"></v-img>
                        <v-img contain v-else class="card-image"
                            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                        <div>
                            <v-row align="center">
                                <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                                    <router-link class="item-title"
                                        :to="{ name: 'viewSingleItem', params: { id:item._id }}">
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
                                    <p class="pt-0 pr-4" v-if="item.price">€{{ item.price }}</p>
                                    <p class="pt-0 pr-4" v-else>Free</p>
                                </div>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <div v-if="items == 0">
                <v-row>
                    <v-col>
                        <div class="d-flex justify-center col pb-0">
                            <p>
                                You haven't listed any items!
                            </p>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBackButton from '@/components/GoBackButton'
    import AddButton from '@/components/AddButton'

    export default {
        name: "ViewUserItems",
        components: {
            GoBackButton,
            AddButton
        },
        data() {
            return {
                user: {},
                item: {},
                items: []
            }
        },
        mounted() {
            this.getUserDetails();
            this.getUserItems();
        },
        methods: {
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            getUserItems() {
                axios.get(`/items/user/${this.user._id}`)
                    .then(response => {
                        this.items = response.data
                    })
                    .catch(error => console.log(error))
            }
        }
    };
</script>

<style>
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