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
                    <h2>List your Item</h2>
                </div>
                <v-col cols=2>
                </v-col>
            </v-row>
            <v-card flat>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field name="title" v-model="form.title" :counter="25" :rules="titleRules" label="Title"
                        required>
                    </v-text-field>

                    <v-text-field name="description" v-model="form.description" :counter="250" :rules="descriptionRules"
                        label="Item Description" required>
                    </v-text-field>

                    <v-autocomplete name="categoryID" v-model="form.category" :items="categories" item-text="name"
                        item-value="_id" label="Category" :rules="categoryRules" required>
                    </v-autocomplete>

                    <v-autocomplete name="qualityID" v-model="form.quality" :items="qualities" item-text="name"
                        item-value="_id" label="Quality" :rules="qualityRules" required>
                    </v-autocomplete>

                    <v-text-field name="price" v-model="form.price" :rules="priceRules" label="Price" required
                        prepend-icon="mdi-currency-eur">
                    </v-text-field>

                    <v-file-input name="photo" v-model="form.photo" multiple label="Item photo(s)">
                    </v-file-input>

                    <v-btn rounded text :disabled="!valid" class="mr-4 signup" @click="addItem()">
                        Add
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
    import GoBack from '@/components/GoBack'

    export default {
        name: "addItem",
        components: {
            GoBack
        },
        data: () => ({
            form: {
                title: "",
                description: "",
                category: "",
                quality: "",
                price: ""
            },
            categories: [{
                    _id: "620a6acaff3f5cebc8370121",
                    name: 'Food'
                },
                {
                    _id: "620a6ae3ff3f5cebc8370123",
                    name: 'Clothes'
                },
                {
                    _id: "620a6af1ff3f5cebc8370125",
                    name: 'Furniture'
                },
                {
                    _id: "620a6b04ff3f5cebc8370127",
                    name: 'Electronics'
                },
                {
                    _id: "620a7a0fded499a220f386d1",
                    name: 'Tools'
                },
                {
                    _id: "620a7ca7178dada11844dbad",
                    name: 'Toys'
                }
            ],
            qualities: [{
                    _id: "620a7695289821c7777850f1",
                    name: 'Brand New/Unused'
                },
                {
                    _id: "620a768b289821c7777850ef",
                    name: 'Like new'
                },
                {
                    _id: "620a765a289821c7777850ed",
                    name: 'Lightly used'
                },
                {
                    _id: "620a763b289821c7777850eb",
                    name: 'Used'
                },
                {
                    _id: "620a762b289821c7777850e9",
                    name: 'Heavily Used'
                }
            ],

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
            // photoRules: [
            //     v => !!v || 'Item photo is required'
            // ]
        }),
        methods: {
            reset() {
                this.$refs.form.reset()
            },
            addItem() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('addItem', this.form)
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