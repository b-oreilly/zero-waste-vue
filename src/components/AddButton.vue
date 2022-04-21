<template>
    <div>
        <v-btn rounded text elevation="0" :to="{ name: 'addItem'}" class="hidden-sm-and-down mt-2">
            <v-icon>mdi-plus</v-icon>
            &nbsp;list an item
        </v-btn><br>
        <span class="hidden-md-and-up">
            <v-btn icon rounded :to="{ name: 'addItem'}" class="">
                <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
        </span>
    </div>
</template>

<script>
</script>

<style>
    
</style>