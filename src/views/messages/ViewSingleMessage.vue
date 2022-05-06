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
                messages: []
            }
        },
        methods: {
            getMessages() {
                axios.get(`/messages`)
                    .then(response => {
                        this.messages = response.data
                        console.log(response.data)
                    })
                    .catch(error => console.log(error))
            },
            getSingleMessage() {
                axios.get(`/messages/${this.$route.params.id}`)
                    .then(response => {
                        this.message = response.data
                        console.log(response.data)
                    })
                    .catch(error => console.log(error))
            }
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
        },
        mounted() {
            this.getMessages();
            this.getSingleMessage();
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