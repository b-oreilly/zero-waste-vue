<template>
    <v-col>
        <h2>Item</h2><br>
        <v-card flat class="overflow-hidden" style="max-width: 1080px;">
            <v-row no-gutters>
                <!-- <v-img :src="`https://picsum.photos/400/?image=10`"></v-img> -->
                <div class="itemBody">
                    <v-card-title class="itemTitle">
                        {{ item.title }}
                    </v-card-title>
                    <v-card-text>
                        <p>Description: {{ item.description }}</p>

                        <!-- <p v-if="item.categoryID">Category: {{ item.category.name}}</p> -->
                        <!-- <p>???? {{item.categoryID}}</p> -->
                        <!-- <p> {{ Object.values(item.categoryID)[1] }} </p> -->

                        <p v-if="item.price">Asking price: €{{ item.price }}</p>
                        <p v-else>Free</p>

                        <p v-if="item.userID.first_name && item.userID.last_name"> {{ item.userID.first_name }}
                            {{ item.userID.last_name }}</p>
                    </v-card-text>


                    <!-- <b-button :to="{ name: 'editItem', params: { id: this.$route.params.id}}" variant="warning">Edit</b-button> -->
                    <v-btn text rounded class="delete" @click="deleteData()">Delete</v-btn>

                </div>
            </v-row>
        </v-card>
    </v-col>
</template>

<script>
    import axios from '@/config'

    export default {
        name: "viewSingleItem",
        components: {},
        data() {
            return {
                item: {}
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = localStorage.getItem('token')

                axios
                    .get(`/items/${this.$route.params.id}`, {
                        headers: {
                            "Accepted": `application/json`,
                            "Authorization": `Bearer ${token}`

                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.item = response.data
                    })
                    .catch(error => console.log(error))
            },
            deleteData() {
                let token = localStorage.getItem('token')

                axios.delete(`/items/${this.$route.params.id}`, {
                        headers: {
                            "Accepted": `application/json`,
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({
                            name: "viewItems",
                            params: {}
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })

            },
        }
    };
</script>

<style scoped>
    .btn {
        margin-right: 10px;
    }

    v-img {
        max-width: auto;
        height: 100px !important;
    }
</style>