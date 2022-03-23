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
                    <h2>Edit Account</h2><br>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-card flat class="footer-offset">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="pt-4">
                        <v-row>

                            <v-col>
                                <v-text-field v-model="form.first_name" :rules="nameRules" label="First Name" required>
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="form.last_name" :rules="nameRules" label="Last Name" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-text-field v-model="form.username" :counter="25" :rules="nameRules" label="Username" required>
                    </v-text-field>

                    <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required autocomplete="email">
                    </v-text-field>

                    <v-text-field type="password" v-model="form.password" :rules="passwordRules" label="Password"
                        autocomplete="on" required></v-text-field>

                    <!-- <v-text-field prepend-inner-icon="mdi-map-marker"></v-text-field> -->

                    <v-text-field type="number" v-model="form.longitude" :counter="40" :rules="locationRules"
                        label="Location" autocomplete="on" required></v-text-field>

                    <v-text-field type="number" v-model="form.latitude" :counter="40" :rules="locationRules"
                        label="Location" autocomplete="on" required></v-text-field>

                    <!-- <v-file-input name="photo" v-model="form.photo" :rules="photoRules" multiple label="Item photo(s)">
                    </v-file-input> -->

                    <v-btn rounded text :disabled="!valid" class="mr-4 signup" @click="editAccount()">
                        Edit
                    </v-btn>

                    <v-btn rounded text class="mr-4 reset" @click="reset">
                        Reset Form
                    </v-btn>
                </v-form>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
    import axios from '@/config'
    import GoBack from '@/components/GoBack.vue'

    export default {
        components: {
            GoBack
        },
        data() {
            return {
                user: {},
                form: {
                    first_name: "",
                    last_name: "",
                    username: "",
                    longitude: "",
                    latitude: "",
                    email: "",
                    password: "",
                },
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 3) || 'Name must be at least 3 characters',
                ],
                userNameRules: [
                    v => !!v || 'Username is required',
                    v => (v && v.length >= 5) || 'Username must be at least 5 characters',
                ],
                emailRules: [
                    v => !!v || 'Email required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password required',
                    v => (v && v.length >= 6) || 'Password must be at least 6 characters',
                ],
                locationRules: [
                    v => !!v || 'Location required'
                ],
                // hasSaved: false,
                // isEditing: null,
                // model: null,
                // states: [{
                //         name: 'Dún Laoghaire',
                //         lat: 1,
                //         long: 2
                //     },
                //     {
                //         name: 'Blackrock',
                //         lat: 1,
                //         long: 2
                //     },
                //     {
                //         name: 'Monkstown',
                //         lat: 1,
                //         long: 2
                //     },
                //     {
                //         name: 'Shankill',
                //         lat: 1,
                //         long: 2
                //     },
                //     {
                //         name: 'Bray',
                //         lat: 1,
                //         long: 2
                //     },
                // ],
            }
        },
        mounted() {
            this.getUserDetails();
            this.getAccountDetails();
        },
        methods: {
            // customFilter(item, queryText) {
            //     const textOne = item.name.toLowerCase()
            //     const textTwo = item.abbr.toLowerCase()
            //     const searchText = queryText.toLowerCase()

            //     return textOne.indexOf(searchText) > -1 ||
            //         textTwo.indexOf(searchText) > -1
            // },
            // save() {
            //     this.isEditing = !this.isEditing
            //     this.hasSaved = true
            // },
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            getAccountDetails() {
                axios.get(`/users/${localStorage.getItem("userID")}`)
                    .then(response => {
                        this.user = response.data
                        this.$set(this.form, 'first_name', this.user.first_name)
                        this.$set(this.form, 'last_name', this.user.last_name)
                        this.$set(this.form, 'username', this.user.username)
                        this.$set(this.form, 'longitude', this.user.longitude)
                        this.$set(this.form, 'latitude', this.user.latitude)
                        this.$set(this.form, 'email', this.user.email)
                        this.$set(this.form, 'password', this.user.password)
                    })
                    .catch(error => console.log(error))
            },
            editAccount() {
                let token = localStorage.getItem('token')
                // let userID = localStorage.getItem('userID')

                if (this.$refs.form.validate()) {
                    axios
                        .put(`/users/${this.$route.params.id}`, {
                            first_name: this.form.first_name,
                            last_name: this.form.last_name,
                            username: this.form.username,
                            longitude: this.form.longitude,
                            latitude: this.form.latitude,
                            email: this.form.email,
                            password: this.form.passward
                        }, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            console.log(response.data)
                            this.$router.push({
                                name: "account"
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