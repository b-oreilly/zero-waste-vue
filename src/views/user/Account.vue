<template>
    <v-container>
        <div>
            <br>
            <h1>Account</h1><br>
            <v-row>
                <v-card bg-variant="dark" v-for="user in users" :key="user._id">
                    <!-- :img-src="gif.images.fixed_width.url" :img-alt="gif.title" -->
                    <v-card-title>
                        <router-link :to="{ name: 'viewSingleItem', params: { id:item._id }}">{{ item.title }}
                        </router-link>
                        <!-- {{ item.title }} -->
                    </v-card-title>
                    <v-card-text>{{ item.categoryID.name }} </v-card-text>
                </v-card>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'viewItems',
        users: {},
        data() {
            // return {
            //     headings: [{
            //             key: 'title',
            //             sortable: true
            //         },
            //         {
            //             key: 'description'
            //         },
            //     ],
            //     item: {},
            //     items: []
            //}
        },
        mounted() {
            axios.get('/users/:id')
                .then(response => {
                    this.users = response.data
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
</style>