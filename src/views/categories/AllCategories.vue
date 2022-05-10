<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters align="center" class="mt-6 mb-6">
                <div class="d-flex justify-center col">
                    <h1>Item Categories</h1>
                </div>
            </v-row>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="category in categories" :key="category._id" cols="12" lg="3" md="3"
                    sm="4" xs="2">
                    <v-card flat class="pt-3 pb-3">
                        <router-link :to="{ name: 'viewSingleCategory', params: { id: category._id }}"
                            style="color: grey">
                            <v-icon large> mdi-{{ category.icon }} </v-icon>
                            <v-card-title style="word-break: break-word" align="center" class="titles justify-center">
                                {{ category.name }}
                            </v-card-title>
                        </router-link>
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
                    // console.log(response.data)
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