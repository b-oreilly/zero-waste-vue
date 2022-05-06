<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters class="mt-6" align="center">
                <v-col cols=2>
                </v-col>
                <div class="d-flex justify-center col">
                    <h1>Items</h1>
                </div>
                <v-col class="d-flex justify-center mt-2" cols=2>
                    <div class="d-flex justify-center col">
                        <AddButton />
                    </div>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="item in filteredClaimedItems" :key="item._id" cols="12" lg="3"
                    md="4" sm="6">
                    <v-card flat class="pt-3 ma-2">
                        <v-img v-if="item.photo">{{ item.photo }}</v-img>
                        <span v-else>
                            <v-img src="https://picsum.photos/400/300?random" />
                        </span>
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
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import AddButton from '@/components/AddButton'

    export default {
        name: 'viewItems',
        components: {
            AddButton
        },
        data() {
            return {
                item: {},
                items: []
            }
        },
        mounted() {
            axios.get('/items')
                .then(response => {
                    this.items = response.data
                })
                .catch(error => console.log(error))
        },
        computed: {
            filteredClaimedItems: function () {
                return this.items.filter(item => {
                    return item.claimed == false
                })
            }
        }
    }
</script>

<style>
    a {
        text-decoration: none;
        color: black;
    }

    .card {
        text-align: left;
    }

    .v-card-title {
        height: 30px;
    }
</style>