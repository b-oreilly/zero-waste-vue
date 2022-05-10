<template>
    <v-container>
        <div class="footer-offset mt-6">
            <h1>Item Qualities</h1>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="quality in qualities" :key="quality._id" cols="12" lg="3" md="4"
                    sm="6">
                    <v-card flat class="pt-3 pb-3">
                        <v-card-title style="word-break: break-word" align="center" class="titles justify-center">
                            <router-link style="color: grey"
                                :to="{ name: 'viewSingleQuality', params: { id: quality._id }}">
                                {{ quality.name }}
                            </router-link>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'

    export default {
        name: 'allQualities',
        components: {},
        data() {
            return {
                quality: {},
                qualities: []
            }
        },
        mounted() {
            axios.get('/qualities')
                .then(response => {
                    this.qualities = response.data
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