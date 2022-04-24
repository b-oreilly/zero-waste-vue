<template>
    <div>
        <v-btn text rounded class="hidden-sm-and-down" :to="{ name: 'editAccount', params: { id: this.user._id }}">
            <v-icon>mdi-pencil</v-icon>
            &nbsp; Edit
        </v-btn>

        <span class="hidden-md-and-up">
            <v-btn icon rounded :to="{ name: 'editAccount', params: { id: this.user._id }}">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </span>
    </div>
</template>

<script>
    export default ({
        name: 'EditAccountButton',
        data() {
            return {
                user: {},
                mounted() {
                    this.getUserDetails();
                },
                methods: {
                    getUserDetails() {
                        if (localStorage.getItem("user")) {
                            this.user = JSON.parse(localStorage.getItem("user"))
                        }
                    }
                }
            }
        }
    })
</script>


<style>
    v-btn {
        margin-bottom: 20px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>