<template>
    <v-container>
        <div class="footer-offset">
            <v-col>
                <v-row no-gutters align="center" class="mt-6">
                    <div class="d-flex justify-center col">
                        <h1>Item Search</h1>
                    </div>
                </v-row>
                <v-row>
                    <div class="justify-center col">
                        <SearchBar />
                    </div>
                </v-row>
            </v-col>
        </div>
    </v-container>
</template>

<script>
    import SearchBar from '@/components/SearchBar'


    export default ({
        name: 'Search',
        components: {
            SearchBar
        }
    });
</script>
<style>
</style>