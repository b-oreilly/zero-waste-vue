<template>
    <v-container>
        <v-col>
            <template>
                <v-card flat class="pt-7 pb-2">
                    <div v-if="!$store.state.loggedIn">
                        <h1>Login</h1>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field class="input" v-model="form.email" label="Email" :rules="emailRules" required
                                autocomplete="email">
                            </v-text-field>
                            <v-text-field :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                :counter="40" label="Password" autocomplete="on" :rules="passwordRules" required
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword">
                            </v-text-field>
                            <div v-if="this.loginError == true">
                                <p class="alert alert-danger" role="alert" variant="warning">
                                    {{ error }}
                                </p>
                                <!-- <p variant="warning">You have entered an invalid username or password.</p> -->
                            </div>
                            <v-btn rounded elevation="0" :disabled="!valid" class="mr-4 login" @click="login()">
                                Log in
                            </v-btn>

                            <v-btn rounded text class="mr-4 reset" @click="reset()">
                                Reset Form
                            </v-btn>
                        </v-form>
                        <div class="footer-offset mt-10">
                            <h4 align="center">Don't have an account?</h4>
                                <router-link to="/register">Signup</router-link>
                        </div>
                    </div>
                    <div v-else>
                        <div class="hidden-sm-and-down loggedin gradient">
                            <v-row class="mt-8">
                                <v-col class="mb-10">
                                    <h2>Welcome back, {{ user.first_name }}.</h2>
                                    <h2>You are logged in.</h2>
                                    <v-btn rounded elevation="0" class="mb-8" to="/account">
                                        View your account
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </div>
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
                user: [],
                form: {
                    email: "",
                    password: "",
                },
                valid: true,
                emailRules: [
                    v => !!v || 'Email required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password required',
                    v => (v && v.length >= 6) || 'Password must be at least 6 characters'
                ],
                showPassword: false,
                loginError: false,
                error: "You have entered an invalid username or password."
            }
        },
        computed: {
            ...mapState(["loggedIn"]),
        },
        mounted() {
            this.getUserDetails();
        },
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('login', this.form)
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            getUserDetails() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"))
                }
            },
            incorrectDetails() {
                if (this.store.error.response.status == 401) {
                    this.loginError = true
                    // alert('Incorrect email/password.')
                }
            }
        }
    };
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #659F41 !important;
        font-weight: bold;
    }

    .loggedin {
        border-radius: 40px;
        padding-top: 20px;
    }
</style>