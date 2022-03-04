<template>
    <v-container>
        <div>
            <br>
            <h1>Items</h1><br>
            <v-btn text rounded :to="{ name: 'addItem'}">List an Item</v-btn><br>
            <br>
            <!-- <b-table responsive variant="dark" striped hover :items="items" :fields="headings">
                <template #cell(name)="data">
                    {{ data.value.title }}]
                </template>
                <template #cell(capital)="data">
                    {{ data.value.description }}
                </template>
            </b-table> -->
            <v-row>
                <v-card flat bg-variant="dark" v-for="item in items" :key="item._id">
                    <!-- :img-src="gif.images.fixed_width.url" :img-alt="gif.title" -->
                    <v-card-title>
                        <router-link class="itemTitle" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                            {{ item.title }}
                        </router-link>
                        <!-- {{ item.title }} -->
                    </v-card-title>
                    <v-card-text v-if="item.categoryID.name">
                        <!-- <router-link :to="{ name: 'viewCategory', params: { id:categoryID._id }}"> -->
                        {{ item.categoryID.name }}
                        <!-- </router-link> -->
                    </v-card-text>
                </v-card>
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
                headings: [{
                        key: 'title',
                        sortable: true
                    },
                    {
                        key: 'description'
                    },
                ],
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
        }
    }
</script>

<style>
    a {
        text-decoration: none;
        color: black;
    }
</style>