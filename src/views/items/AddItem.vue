<template>
    <v-container>
        <v-col>
            <template>
                <v-card flat>
                    <h1>List an Item</h1>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="form.title" :counter="25" :rules="titleRules" label="Item title"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.description" :counter="250" :rules="descriptionRules"
                            label="Item Description" required>
                        </v-text-field>

                        <v-text-field v-model="form.category" :counter="25" :rules="categoryRules" label="Category"
                            required>
                        </v-text-field>

                        <v-text-field v-model="form.price" :rules="priceRules" label="Price" required></v-text-field>

                        <v-btn rounded text :disabled="!valid" class="mr-4 signup" @click="addItem()">
                            Add
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
    export default {
        name: "addItem",
        data: () => ({
            form: {
                title: "",
                description: "",
                category: "",
                price: ""
            },
            valid: true,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length >= 3) || 'Title must be at least 3 characters',
            ],
            descriptionRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 10) || 'Description must be at least 10 characters',
            ],
            categoryRules: [
                v => !!v || 'Category is required',
                v => (v && v.length >= 4) || 'Category must be at least 4 characters',
            ],
            priceRules: [
                v => !!v || 'Price is required',
                v => /^\d*\.?\d*$/.test(v) || 'Price must be valid',
            ]
        }),
        methods: {
            reset() {
                this.$refs.form.reset()
            },
            addItem() {
                this.$store.dispatch('addItem', this.form)
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