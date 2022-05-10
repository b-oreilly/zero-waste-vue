<template>
    <v-container>
        <v-col>
            <v-row no-gutters class="mt-4">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2>Create a message</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-card flat>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-autocomplete id="receiverUserID" name="receiverUserID" v-model="form.receiverUserID"
                        :items="receivers" item-text="username" item-value="_id" label="Send to" :rules="receiverRules"
                        required spellcheck="false">
                    </v-autocomplete>
                    <v-textarea id="title" name="message" v-model="form.message" :counter="250" :rules="messageRules"
                        label="Message Body" required class="pt-10 mb-6" no-resize rows="4">
                    </v-textarea>

                    <v-btn rounded elevation="0" :disabled="!valid" class="mr-4 login form" @click="sendMessage()">
                        Send
                    </v-btn>

                    <v-btn rounded text class="mr-4 reset" @click="reset">
                        Clear
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
    import GoBackButton from '@/components/GoBackButton'
    import axios from '@/config'


    export default {
        name: "createMessage",
        components: {
            GoBackButton
        },
        data: () => ({
            form: {
                senderUserID: "",
                receiverUserID: "",
                message: "",
                sent: true,
                seen: false
            },
            receivers: [],
            valid: true,
            messageRules: [
                v => !!v || 'Message required',
                v => (v && v.length >= 1) || 'Message must be at least 1 character',
            ],
            receiverRules: [
                v => !!v || 'Message recipient required'
            ]
        }),
        mounted() {
            this.getUserDetails();
            this.getFilteredUsers();
        },
        computed: {
            recipientUsers: function () {
                return this.users.filter(user => {
                    return user.receiverUserID._id !== localStorage.getItem('userID')
                })
            }
        },
        methods: {
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            getFilteredUsers() {
                axios.get(`/users`)
                    .then((response) => {
                        this.receivers = response.data
                        // console.log(this.receivers)
                    })
                    .catch(error => console.log(error))
            },
            sendMessage() {
                let token = localStorage.getItem('token')
                // let userID = localStorage.getItem('userID')

                if (this.$refs.form.validate()) {
                    axios
                        .post(`/messages`, {
                            senderUserID: localStorage.getItem('userID'),
                            receiverUserID: this.form.receiverUserID,
                            message: this.form.message,
                            sent: this.form.sent,
                            seen: this.form.seen
                        }, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            console.log(response.data)
                            this.$router.push({
                                name: "messages"
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            console.log(err.response.data)
                        })
                }
            }
        }
    };
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #004FFF !important;
        font-weight: bold;
    }
</style>