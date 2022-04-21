<template>
    <div>
        <v-btn text rounded class="hidden-sm-and-down pl-4 pr-4"
            :to="{ name: 'editItem', params: { id: this.$route.params.id }}">
            <v-icon>mdi-pencil</v-icon>
            &nbsp; Edit
        </v-btn>
        <span class="hidden-md-and-up">
            <v-btn icon rounded :to="{ name: 'editItem', params: { id: this.$route.params.id }}" class="mt-2">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </span>
    </div>
</template>

<style>
    v-btn {
        margin-bottom: 20px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
</style>