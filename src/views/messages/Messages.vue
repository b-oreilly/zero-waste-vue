<template>
    <v-container>
        <div class="footer-offset">
            <br>
            <h1>Messages</h1><br>
            <v-btn text rounded :to="{ name: 'createMessage'}">Write a Message</v-btn><br>
            <v-row no-gutters>
                <v-col class="v-card-columns" v-for="message in messages" :key="message._id" cols="12" sm="3">
                    <v-card flat class="pt-3 ma-2">
                        {{ message.message }}
                        <p> Sent by:
                        {{ message.senderUserID.username }}</p>
                        <p> Sent to:
                        {{ message.receiverUserID.username }}</p>
                        <!-- <v-card-title style="word-break: break-word" align="left">
                            <router-link class="item-title" :to="{ name: 'viewSingleItem', params: { id:item._id }}">
                                {{ item.title }}
                            </router-link>
                        </v-card-title>
                        <p v-if="item.categoryID" class="pl-4">
                            <router-link :to="{ name: 'viewCategory', params: { id: item.categoryID._id }}">
                                <p> {{ item.categoryID.name }} </p>
                            </router-link>
                        </p>
                        <p v-if="item.userID" class="pl-4">
                            <router-link :to="{ name: 'viewUser', params: { id:item.userID._id }}">
                                <p v-if="item.userID.username"> {{ item.userID.username }}</p>
                            </router-link> -->
                        <!-- </p> -->
                    </v-card>
                </v-col>
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
                message: {},
                messages: []
            }
        },
        mounted() {
            axios.get('/messages')
                .then(response => {
                    this.messages = response.data
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

    .card {
        text-align: left;
    }

    .v-card-title {
        height: 30px;
    }
</style>