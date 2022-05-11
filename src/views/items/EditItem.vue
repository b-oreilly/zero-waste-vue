<template>
    <v-container>
        <div class="footer-offset">
            <v-col>
                <v-row no-gutters class="mt-4">
                    <v-col cols=2>
                        <div class="d-flex justify-center">
                            <GoBackButton />
                        </div>
                    </v-col>
                    <div class="d-flex justify-center col">
                        <h2>Edit Item</h2>
                    </div>
                    <v-col cols=2>
                    </v-col>
                </v-row>
                <v-card flat>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field id="title" name="title" v-model="form.title" :counter="25" :rules="titleRules"
                            label="Item Title" required>
                        </v-text-field>

                        <v-textarea id="description" name="description" v-model="form.description" :counter="250"
                            :rules="descriptionRules" label="Description" full-width rows="2" row-height="20" required>
                        </v-textarea>

                        <v-autocomplete id="categoryID" name="categoryID" v-model="form.categoryID" :items="categories"
                            item-text="name" item-value="_id" label="Category" :rules="categoryRules" required>
                        </v-autocomplete>

                        <v-autocomplete id="qualityID" name="qualityID" v-model="form.qualityID" :items="qualities"
                            item-text="name" item-value="_id" label="Quality" :rules="qualityRules" required>
                        </v-autocomplete>

                        <v-text-field id="price" name="price" v-model="form.price" :rules="priceRules" label="Price"
                            required prepend-icon="mdi-currency-eur">
                        </v-text-field>

                    <v-btn rounded text :disabled="!valid" class="mr-4 signup form" @click="editItem()">
                        Edit
                    </v-btn>

                        <v-btn rounded text class="mr-4 reset" @click="reset">
                            Reset Form
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </div>
    </v-container>
</template>

<script>
    import GoBackButton from '@/components/GoBackButton'
    import axios from '@/config'

    export default {
        name: "addItem",
        components: {
            GoBackButton
        },
        data: () => ({
            item: {},
            form: {
                title: "",
                description: "",
                category: "",
                quality: "",
                user: "",
                price: ""
            },
            categories: [],
            qualities: [],

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
            ]
        }),
        mounted() {
            this.getUserDetails();
            this.getCategories()
            this.getQualities();
            this.getItem();
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
            getCategories() {
                axios.get(`/categories`)
                    .then(response => {
                        console.log(response.data)
                        this.categories = response.data
                    })
                    .catch(error => console.log(error))
            },
            getQualities() {
                axios.get(`/qualities`)
                    .then(response => {
                        console.log(response.data)
                        this.qualities = response.data
                    })
                    .catch(error => console.log(error))
            },
            getItem() {
                axios.get(`/items/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data)
                        this.item = response.data
                        this.$set(this.form, 'title', response.data.title)
                        this.$set(this.form, 'description', response.data.description)
                        this.$set(this.form, 'categoryID', response.data.categoryID._id)
                        this.$set(this.form, 'qualityID', response.data.qualityID._id)
                        this.$set(this.form, 'price', response.data.price)
                    })
                    .catch(error => console.log(error))
            },
            editItem() {
                let token = localStorage.getItem('token')
                // let userID = localStorage.getItem('userID')

                if (this.$refs.form.validate()) {
                    axios
                        .put(`/items/${this.$route.params.id}`, {
                            title: this.form.title,
                            description: this.form.description,
                            categoryID: this.form.categoryID,
                            qualityID: this.form.qualityID,
                            userID: localStorage.getItem('userID'),
                            price: this.form.price
                        }, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            console.log(response.data)
                            this.$router.push(`/items/${this.$route.params.id}`)
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