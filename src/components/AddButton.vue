<template>
    <div align="center">
        <v-btn rounded elevation="0" :to="{ name: 'addItem'}" class="hidden-sm-and-down mt-2 post">
            <v-icon>mdi-plus</v-icon>
            &nbsp;list an item
        </v-btn><br>
        <v-btn icon rounded :to="{ name: 'addItem'}" class="hidden-md-and-up">
            <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
    </div>
</template>

<script>
</script>

<style>

</style>