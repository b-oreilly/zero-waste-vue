<template>
    <v-container>
        <div class="footer-offset">
            <br>
            <h1>Item Categories</h1><br>
            <v-btn text rounded :to="{ name: 'addItem'}">List an Item</v-btn><br>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="category in categories" :key="category._id" cols="12" sm="3">
                    <v-card flat class="pt-3 ma-2">
                        <v-img v-if="category.photo">{{ category.photo }}</v-img>
                        <span v-else>
                            <v-img src="https://picsum.photos/400/300?random" />
                        </span>
                        <v-card-title style="word-break: break-word" align="left">
                            <router-link class="item-title" :to="{ name: 'viewCategory', params: { id: category._id }}">
                                {{ category.name }}
                            </router-link>
                        </v-card-title>
                        <!-- <v-card-text v-if="item.categoryID">
                            <router-link :to="{ name: 'viewCategory', params: { id: item.categoryID._id }}">
                                <p> {{ item.categoryID.name }} </p>
                            </router-link>
                        </v-card-text> -->
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'allCategories',
        components: {},
        data() {
            return {
                category: {},
                categories: []
            }
        },
        mounted() {
            axios.get('/categories')
                .then(response => {
                    this.categories = response.data
                    console.log(response.data)
                })
                .catch(error => console.log(error))
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