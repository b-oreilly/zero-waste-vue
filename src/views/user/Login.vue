<template>
    <v-container>
        <v-col>
            <template>
                <v-card flat>
                    <div v-if="!$store.state.loggedIn">
                        <h1>Login</h1>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field class="input" v-model="form.email" label="Email" :rules="emailRules" required>
                            </v-text-field>
                            <v-text-field type="password" v-model="form.password" :counter="40" label="Password"
                                autocomplete="on" :rules="passwordRules" required></v-text-field>
                            <v-btn rounded text :disabled="!valid" class="mr-4 login" @click="login()">
                                Log in
                            </v-btn>

                            <v-btn rounded text class="mr-4 reset" @click="reset()">
                                Reset Form
                            </v-btn>
                        </v-form><br>
                        <h3>Don't have an account?<br>
                            <router-link to="register">Signup</router-link>
                        </h3>
                    </div>
                    <div v-else>
                        <!-- <h2>Welcome, {{ response.data.name }}.</h2> -->
                        <h2>You are logged in.</h2>
                    </div>
                </v-card>
            </template>
        </v-col>
    </v-container>
</template>

<script>
    // import axios from '@/config'
    import {
        mapState
    } from 'vuex'

    export default {
        name: "Login",
        components: {

        },
        data() {
            return {
                form: {
                    email: "admin@zero-waste.com",
                    password: "secret",
                },
                valid: true,
                emailRules: [
                    v => !!v || 'Email required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password required',
                    v => (v && v.length >= 6) || 'Password must be at least 6 characters'
                ]
            }
        },
        computed: {
            ...mapState(["loggedIn"])
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.form)
            },
            reset() {
                this.$refs.form.reset()
            },
            // userDetails() {
            //     let token = localStorage.getItem('token');

            //     axios
            //         .get(`/user`, {
            //             headers: {
            //                 Authorization: "Bearer " + token
            //             }
            //         })
            //         .then(response => {
            //             console.log(response.data)
            //         })
            // }
        }
    };
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #EB6F99 !important;
        font-weight: bold;
    }
</style>