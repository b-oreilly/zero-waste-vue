<template>
    <div>
        <v-form>
            <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" v-model="searchTerm" class="search" flat
                rounded filled dense>
            </v-text-field>
            <span v-if="searchTerm != ''">
                <v-col class="v-card-columns">
                    <v-card flat v-for="item in filteredItems" :key="item._id" cols="12" lg="3" md="4"
                    sm="6">
                        <h5 style="word-break: break-word" align="center">
                            <router-link class="item-title" style="color: grey" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                {{ item.title }}
                            </router-link>
                        </h5>
                    </v-card>
                </v-col>
            </span>
        </v-form>
    </div>
</template>

<script>
    import axios from '@/config'

    export default ({
        name: 'SearchBar',
        data() {
            return {
                searchTerm: "",
                items: [],
                users: [],
                categories: [],
                qualities: [],
                // allContents: [...this.items, ...this.users, ...this.categories, ...this.qualities]
                // searchClosed: true
            }
        },
        computed: {
            filteredItems: function () {
                return this.items.filter(item => {
                    return item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
                    // return user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
                    // return category.name.toLowerCase().includes(this.searchTerm.toLowerCase())

                })
            }
        },
        mounted() {
            this.getAllItems();
            this.getAllUsers();
            this.getAllCategories();
            this.getAllQualities();
            this.getAllSiteContent();
        },
        methods: {
            getAllItems() {
                axios.get('/items') //can replace with firebase url 
                    // .then(response => response.json())
                    .then(response => {
                        this.items = response.data
                    })
            },
            getAllUsers() {
                axios.get('/users') //can replace with firebase url 
                    // .then(response => response.json())
                    .then(response => {
                        this.users = response.data
                    })
            },
            getAllCategories() {
                axios.get('/categories') //can replace with firebase url 
                    // .then(response => response.json())
                    .then(response => {
                        this.categories = response.data
                    })
            },
            getAllQualities() {
                axios.get('/qualities') //can replace with firebase url 
                    // .then(response => response.json())
                    .then(response => {
                        this.qualities = response.data
                    })
            },
            getAllSiteContent() {
                //let allSiteContent = this.items.concat(this.users, this.categories, this.qualities);
                //console.log(allSiteContent)
            }
        }
    });
</script>

<style>
    /* .v-input.search {
        /* max-width: 40px !important; */
    .search {
        align-content: center;
        min-height: 35px !important;

    }
</style>