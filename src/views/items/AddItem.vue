<template>
    <v-container>
        <div class="footer-offset">
            <v-row no-gutters align="center" class="mt-10">
                <v-col cols=2>
                    <div class="d-flex justify-center">
                        <GoBackButton />
                    </div>
                </v-col>
                <div class="d-flex justify-center col">
                    <h2>List your Item</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-card flat>
                <v-form ref="form" v-model="valid" enctype="multipart/form-data" lazy-validation>
                    <v-text-field id="title" name="title" v-model="form.title" :counter="25" :rules="titleRules"
                        label="Item Title" required>
                    </v-text-field>

                    <v-textarea id="description" name="description" v-model="form.description" :counter="250"
                        :rules="descriptionRules" label="Description" full-width rows="3" row-height="20" no-resize
                        required>
                    </v-textarea>

                    <v-autocomplete id="categoryID" name="categoryID" v-model="form.categoryID" :items="categories"
                        item-text="name" item-value="_id" label="Category" :rules="categoryRules" required>
                    </v-autocomplete>

                    <v-autocomplete id="qualityID" name="qualityID" v-model="form.qualityID" :items="qualities"
                        item-text="name" item-value="_id" label="Quality" :rules="qualityRules" required>
                    </v-autocomplete>

                    <v-file-input prepend-icon="mdi-camera" id="itemImage" name="itemImage" v-model="form.itemImage"
                        label="Item image" :rules="imageRules" type="file" required>
                    </v-file-input>

                    <v-text-field id="price" name="price" v-model="form.price" :rules="priceRules" label="Price"
                        required prepend-icon="mdi-currency-eur">
                    </v-text-field>

                    <v-btn rounded text :disabled="!valid" class="mr-4 signup form" @click="addItem()">
                        Add
                    </v-btn>

                    <v-btn rounded text class="mr-4 reset" @click="reset">
                        Reset Form
                    </v-btn>
                </v-form>
            </v-card>
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
            categories: [],
            qualities: [],
            form: {
                user: "",
                title: "",
                description: "",
                category: "",
                quality: "",
                itemImage: "",
                price: ""
            },
            valid: true,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length >= 3) || 'Title must be at least 3 characters',
            ],
            descriptionRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 3) || 'Description must be at least 3 characters',
            ],
            categoryRules: [
                v => !!v || 'Category is required',
                v => (v && v.length >= 4) || 'Category must be at least 4 characters',
            ],
            qualityRules: [
                v => !!v || 'Quality is required',
                v => (v && v.length >= 4) || 'Quality must be at least 4 characters',
            ],
            imageRules: [
                v => !!v || 'Image is required'
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
                        // console.log(response.data)
                        this.categories = response.data
                    })
                    .catch(error => console.log(error))
            },
            getQualities() {
                axios.get(`/qualities`)
                    .then(response => {
                        // console.log(response.data)
                        this.qualities = response.data
                    })
                    .catch(error => console.log(error))
            },
            addItem() {
                let token = localStorage.getItem('token')

                if (this.$refs.form.validate()) {
                    axios
                        .post(`/items`, {
                            title: this.form.title,
                            description: this.form.description,
                            categoryID: this.form.categoryID,
                            qualityID: this.form.qualityID,
                            userID: localStorage.getItem('userID'),
                            itemImage: this.form.itemImage,
                            price: this.form.price,
                            claimed: false
                        }, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            console.log(response.data)
                            this.$router.push({
                                name: "viewItems"
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