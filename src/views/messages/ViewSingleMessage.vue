<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters align="center" class="mt-6">
                <v-col cols=2>
                    <div class="d-flex justify-center mt-2">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2 class="mainItemTitle">Message</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-row no-gutters class="mt-4">
                <v-col>


                    <v-avatar size="150">
                        <v-img
                            src="https://repository-images.githubusercontent.com/130118224/a2c75780-e0a9-11eb-8494-3581a0b1c93b">
                        </v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <p class="item-title mt-4">{{ message.message }}</p>
                    <p class="pl-4">From:
                        {{ message.senderUserID.username }}</p>
                    <p class="pl-4">Received at:
                        {{ new Date(message.updatedAt).toLocaleString('en-GB', { timeZone: 'GMT' }) }}</p>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-end">
                <div v-if="senderUserID == user.id">
                    <v-btn text rounded class="delete" variant="warning"
                        @click="deleteDialog = !deleteDialog">
                        Delete</v-btn>

                    <v-dialog v-model="deleteDialog" max-width="500px">
                        <v-card>
                            <h3 class="pa-6">Are you sure you want to delete this message?</h3>
                            <v-btn text rounded class="delete mb-6 mr-2" @click="deleteMessage()">Delete
                            </v-btn>
                            <v-btn text rounded class="cancel mb-6 ml-2"
                                @click="deleteDialog = !deleteDialog">
                                Cancel</v-btn>
                        </v-card>
                    </v-dialog>
                </div>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBackButton from '@/components/GoBackButton'

    export default {
        name: 'viewSingleMessage',
        components: {
            GoBackButton
        },
        data() {
            return {
                message: {},
                messages: [],
                deleteDialog: false
            }
        },
        mounted() {
            this.getUserDetails();
            this.getMessages();
            this.getSingleMessage();
            this.getInteractions();
        },
        methods: {
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            getMessages() {
                axios.get(`/messages`)
                    .then(response => {
                        this.messages = response.data
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))
            },
            getSingleMessage() {
                axios.get(`/messages/${this.$route.params.id}`)
                    .then(response => {
                        this.message = response.data
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))
            },
            deleteMessage() {
                axios.delete(`/messages/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data)
                        this.$router.push({
                            name: "messages",
                            params: {}
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })

            },

        },
        computed: {
            receivedMessages: function () {
                return this.messages.filter(message => {
                    return message.receiverUserID._id == localStorage.getItem('userID')
                })
            },
            sentMessages: function () {
                return this.messages.filter(message => {
                    return message.senderUserID._id == localStorage.getItem('userID')
                })
            }
        }
    }
</script>

<style scoped>
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