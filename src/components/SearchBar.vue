<template>
    <div>
        <!-- <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" v-model="search" class="search"
        :class="{ 'closed' : searchClosed && !search}" flat rounded filled dense clearable>
    </v-text-field> -->
        <!-- :class="{ 'closed' : searchClosed && !search}" -->

        <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" v-model="searchTerm" class="search" flat
            rounded filled dense clearable>
        </v-text-field>
    </div>
</template>

<script>
    // import axios from '@/config'

    export default ({
        name: 'SearchBar',
        data() {
            return {
                items: [],
                searchTerm: ""
                // searchClosed: true
            }
        },
        computed: {
            filteredItems: function () {
                return this.items.filter(item => {
                    return item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
                })
            }
        },
        mounted() {
            this.getAllItems();
        },
        methods: {
            // getAllItems() {
            //     axios.get('/items') //can replace with firebase url 
            //         // .then(response => response.json())
            //         .then(response => {
            //             this.items = response.data
            //             console.log(response.data)
            //         })
            // }
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