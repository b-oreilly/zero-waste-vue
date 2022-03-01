<template>
    <v-container>
        <div id="notFound">
            <p id="main">404</p>
            <p>Page not found</p>
            <!-- <v-btn rounded text id="return"> -->
            <br>
            <router-link to="/">Go back home</router-link>
            <!-- </v-btn> -->
        </div>
    </v-container>
</template>

<script>

</script>

<style>
    #main {
        font-family: 'Roboto Mono', monospace;
        font-size: 120px !important;
    }

    #notFound {
        padding: 6em 17em 7.5em;
        border-radius: 900px;
        background-color: #20E25F;
        background-image: linear-gradient(to right, #153AB0, #20E25F);
        color: #fff;
    }

    #return {
        height: 45px !important;
        margin-top: 10px;
        width: 80%;
        text-decoration: none;
        color: #000;
    }
</style>