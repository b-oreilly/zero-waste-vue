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
                    <v-text-field v-model="form.title" :counter="25" :rules="titleRules" label="Item title" required>
                    </v-text-field>

                    <v-text-field v-model="form.description" :counter="250" :rules="descriptionRules"
                        label="Item Description" required>
                    </v-text-field>

                    <v-select v-model="form.category" :items="categories" label="Category" :rules="categoryRules"
                        required>
                    </v-select>

                    <v-select v-model="form.quality" :items="qualities" label="Quality" :rules="qualityRules"
                        required>
                    </v-select>

                    <v-text-field v-model="form.price" :rules="priceRules" label="Price" type="number" required
                        prepend-icon="mdi-currency-eur">
                    </v-text-field>

                    <v-file-input v-model="form.photo" :rules="photoRules" multiple label="Item photo(s)">
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
            categories: ["Food", "Clothes", "Funiture", "Electronics", "Tools", "Toys"],
            qualities: ["Brand new", "Like new", "Lightly used", "Used", "Heavily used"],
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