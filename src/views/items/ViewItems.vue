<template>
    <v-container>
        <div class="footer-offset">
            <br>
            <h1>Items</h1><br>
            <v-btn text rounded :to="{ name: 'addItem'}">List an Item</v-btn><br>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="item in filteredClaimedItems" :key="item._id" cols="12" lg="3"
                    md="4" sm="6">
                    <v-card flat class="pt-3 ma-2">
                        <v-img v-if="item.photo">{{ item.photo }}</v-img>
                        <span v-else>
                            <v-img src="https://picsum.photos/400/300?random" />
                        </span>
                        <v-card-title style="word-break: break-word" align="left">
                            <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                {{ item.title }}
                            </router-link>
                        </v-card-title>
                        <v-card-text v-if="item.categoryID">
                            <router-link :to="{ name: 'viewSingleCategory', params: { id: item.categoryID._id }}">
                                <p> {{ item.categoryID.name }} </p>
                            </router-link>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'viewItems',
        components: {},
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
                    console.log(response.data)
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
</style>