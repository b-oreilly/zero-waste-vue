<template>
    <v-container>
        <v-col>
            <template>
                <v-card flat>
                    <h1>Signup</h1>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="form.first_name" :counter="25" :rules="nameRules" label="First Name"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.last_name" :counter="25" :rules="nameRules" label="Last Name"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.username" :counter="25" :rules="nameRules" label="Username"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>

                        <v-text-field type="password" v-model="form.password" :counter="40" :rules="passwordRules"
                            label="Password" autocomplete="on" required></v-text-field>

                        <v-btn rounded text :disabled="!valid" class="mr-4 signup" @click="register()">
                            Sign up
                        </v-btn>

                        <v-btn rounded text class="mr-4 reset" @click="reset">
                            Reset Form
                        </v-btn>

                    </v-form>
                    <br>
                    <h3>Already have an account?<br>
                        <router-link to="login">Login</router-link>
                    </h3>
                </v-card>
            </template>
        </v-col>
    </v-container>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: "Home",
        data: () => ({
            form: {
                first_name: "",
                last_name: "",
                username: "",
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
            ]
        }),
        computed: {
            ...mapState(["loggedIn"])
        },
        methods: {
            reset() {
                this.$refs.form.reset()
            },
            register() {
                this.$store.dispatch('register', this.form)
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