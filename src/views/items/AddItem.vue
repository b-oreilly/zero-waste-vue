<template>
    <v-app>
        <v-container>
            <v-col>
                <template>
                    <v-card flat>
                        <h1>List your Item</h1>
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

                            <v-text-field v-model="form.quality" :counter="25" :rules="qualityRules" label="Quality"
                                required>
                            </v-text-field>

                            <v-text-field v-model="form.price" :rules="priceRules" label="Price" required>
                            </v-text-field>

                            <v-file-input v-model="form.price" :rules="photoRules" multiple label="Item photo(s)">
                            </v-file-input>

                            <v-btn rounded text :disabled="!valid" class="mr-4 signup" @click="addItem()">
                                Add
                            </v-btn>

                            <v-btn rounded text class="mr-4 reset" @click="reset">
                                Reset Form
                            </v-btn>

                        </v-form>
                    </v-card>
                </template>
            </v-col>
        </v-container>
    </v-app>
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
            qualityRules: [
                v => !!v || 'Quality is required',
                v => (v && v.length >= 4) || 'Quality must be at least 4 characters',
            ],
            priceRules: [
                v => !!v || 'Price is required',
                v => /^\d*\.?\d*$/.test(v) || 'Price must be valid',
            ],
            photoRules: [
                v => !!v || 'Item photo is required'
            ]
        }),
        methods: {
            reset() {
                this.$refs.form.reset()
            }
            // addItem() {
            //     if (this.$refs.form.validate()) {
            //         this.$store.dispatch('addItem', this.form)
            //     }
            //}
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