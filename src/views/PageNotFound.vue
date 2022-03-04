<template>
    <v-container>
        <div id="notFound">
            <p id="main">404</p>
            <p>Page not found</p>
            <br>
            <router-link id="return" to="/">Go back home</router-link>
        </div>
    </v-container>
</template>

<script>

</script>

<style>
    #main {
        font-family: 'Roboto Mono', monospace;
        font-size: 100px !important;
        color: #000;
        margin-bottom: 0px;

    }

    #notFound {
        padding: 6em 17em 7.5em;
        border-radius: 900px;
        background-color: #20E25F;
        background-image: linear-gradient(to left, #153AB0, #20E25F);
        color: #fff;
        text-transform: uppercase;
    }

    #return {
        margin-top: 10px;
        width: 80%;
        text-decoration: none;
        color: #000;
    }
</style>