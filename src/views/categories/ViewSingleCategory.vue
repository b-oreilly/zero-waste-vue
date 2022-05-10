<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters class="mt-6 mb-4">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h1 class="mainItemTitle">Category</h1>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-col>
                <v-row no-gutters>
                    <div class="d-flex justify-center col">
                        <h2 class="mainItemTitle">{{ category.name }}</h2>
                    </div>
                </v-row>
                <br>
                <v-row no-gutters>
                    <v-col class="v-card-columns" v-for="item in items" :key="item._id" cols="12" lg="3" md="4" sm="6">
                        <v-card class="pt-3 ma-2" flat>
                            <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                <v-img v-if="item.photo">{{ item.photo }}</v-img>
                                <span v-else>
                                    <v-img src="https://picsum.photos/400/300?random" />
                                </span>
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
                <div v-if="items == 0">
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center col pb-0">
                                <p>
                                    There are no items listed in this category.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBackButton from '@/components/GoBackButton'

    export default {
        name: "ViewSingleCategory",
        components: {
            GoBackButton
        },
        data() {
            return {
                items: [],
                item: {},
                category: []
            }
        },
        mounted() {
            this.getItemCategory();
            this.getCategory();
        },
        methods: {
            getItemCategory() {
                axios.get(`/items/category/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response.data)
                        this.items = response.data
                    })
                    .catch(error => console.log(error))
            },
            getCategory() {
                axios.get(`/categories/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response.data)
                        this.category = response.data
                    })
                    .catch(error => console.log(error))
            },
        }
    };
</script>