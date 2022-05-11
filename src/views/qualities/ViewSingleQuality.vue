<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters align="center" class="mt-6 mb-4">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h1 class="mainItemTitle">Quality</h1>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-col>
                <v-row no-gutters>
                    <div class="d-flex justify-center col">
                        <h2 class="mainItemTitle">{{ quality.name }}</h2>
                    </div>
                </v-row>
                <br>
                <v-row no-gutters>
                    <v-col class="v-card-columns" v-for="item in items" :key="item._id" cols="12" lg="3" md="4" sm="6">
                        <v-card class="pt-3 ma-2" flat>
                            <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                <v-img contain class="overflow-hidden p-0 card-image" v-if="item.itemImage != null"
                                    v-bind:src="`http://localhost:8000/${item.itemImage}`"></v-img>
                                <v-img contain v-else class="card-image"
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/f8/No-image-available-4X3.png?20190523201847" />
                                <div>
                                    <v-row align="center">
                                        <v-card-title style="word-break: break-word" align="left" class="mt-2 pb-0">
                                            {{ item.title }}
                                        </v-card-title>
                                    </v-row>
                                    <v-row class="pt-0">
                                        <v-col class="pt-0">
                                            <v-card-text v-if="item.categoryID" class="pa-0 pl-1">
                                                <router-link style="color: grey"
                                                    :to="{ name: 'viewSingleCategory', params: { id: item.categoryID._id }}">
                                                    <p> {{ item.categoryID.name }} </p>
                                                </router-link>
                                            </v-card-text>
                                        </v-col>
                                        <div class="justify-end">
                                            <p class="pt-0 pr-4" v-if="item.price">€{{ item.price }}</p>
                                            <p class="pt-0 pr-4" v-else>Free</p>
                                        </div>
                                    </v-row>
                                </div>
                            </router-link>
                        </v-card>
                    </v-col>
                </v-row>
                <div v-if="items == 0">
                    <v-row>
                        <v-col>
                            <div class="d-flex justify-center col pb-0">
                                <p>
                                    There are no items listed of this quality.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBackButton from '@/components/GoBackButton'

    export default {
        name: "ViewSingleQuality",
        components: {
            GoBackButton
        },
        data() {
            return {
                items: [],
                item: {},
                quality: []
            }
        },
        mounted() {
            this.getItemQuality();
            this.getQuality();
        },
        methods: {
            getItemQuality() {
                axios.get(`/items/quality/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response.data)
                        this.items = response.data
                    })
                    .catch(error => console.log(error))
            },
            getQuality() {
                axios.get(`/qualities/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response.data)
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