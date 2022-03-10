<template>
    <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" v-model="search" class="search"
        :class="{ 'closed' : searchClosed && !search}" flat rounded filled dense clearable>
    </v-text-field>
</template>

<script>
    export default ({
        methods: {

        },
        data() {
            return {
                searchClosed: true
            }
        }
    })
</script>

<style>
    /* .v-input.search {
        /* max-width: 40px !important; */
        .search{
            align-content: center;
            min-height: 35px !important;

        }
</style>