<template>
    <v-container>
        <v-col>
            <v-row no-gutters>
                <v-col cols=2>
                    <div class="d-flex justify-start">
                        <GoBack />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2 class="mainItemTitle">Quality</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <br>
            <!-- <v-row no-gutters>
                <v-col v-for="n in 3" :key="n" cols="12" sm="4">
                    <v-card class="pa-2" outlined tile>
                        One of three columns
                    </v-card>
                </v-col>
            </v-row> -->
            <v-row>
                <v-card flat class="overflow-hidden grey lighten-3 pa-6" style="max-width: 1080px;">
                    <div class="itemBody">

                        <v-col>
                            <v-card-title class="pt-0">
                                <h2> {{ quality.name }} </h2>
                            </v-card-title>


                    
                        </v-col>


                        <!-- <v-row>
                    <v-btn text rounded :to="{ name: 'editItem', params: { id: this.$route.params.id}}"
                        variant="warning">Edit</v-btn>
                    <v-btn text rounded class="delete" @click="deleteData()">Delete</v-btn>
                </v-row> -->
                    </div>
                </v-card>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBack from '@/components/GoBack'

    export default {
        name: "viewSingleItem",
        components: {
            GoBack
        },
        data() {
            return {
                quality: {}
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                axios.get(`/qualities/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data)
                        this.quality = response.data
                    })
                    .catch(error => console.log(error))
            },
        }
    };
</script>

<style>
    .btn {
        margin-right: 10px;
    }

    v-img {
        max-width: auto;
        /* height: 100px !important; */
    }

    .itemTitle,
    .itemBody {
        text-transform: capitalize;
    }

    p {
        text-align: left;
    }

    .mainItemTitle {
        vertical-align: middle;
    }
</style>