<template>
    <v-container>
        <div class="hidden-sm-and-down gradient mt-10" id="background">
            <v-row>
                <v-col>
                    <p id="main">404</p>
                    <p class="pb-2">Page not found</p>
                    <v-btn rounded elevation="0" class="mb-8" id="return" to="/">
                        Go back home
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <div class="hidden-md-and-up footer-offset">
            <v-row no-gutters>
                <v-col>
                    <v-row>
                        <v-col>
                            <div id="background-sm" class="gradient">
                                <h1 id="main">404</h1>
                                <h3 class="body-text mb-5">Page not found</h3>
                                <v-btn flat rounded elevation="0" id="return" to="/">
                                    Go back home
                                </v-btn>
                            </div>

                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>

    </v-container>
</template>

<script>

</script>

<style scoped>
    #main {
        font-family: 'Roboto Mono', monospace;
        font-weight: 400;
        font-size: 80px !important;
    }

    .body-text {
        font-family: 'Roboto Mono', monospace;
        text-transform: uppercase;
    }

    #background {
        padding: 90px 235px 80px;
        border-radius: 900px;
        text-transform: uppercase;
    }

    p {
        text-align: center !important;
    }

    #return {
        /* margin-top: 10px; */
        width: 175px;
        text-decoration: none;
    }

    #background-sm {
        padding: 140px 0px 155px;
        border-radius: 900px;
        color: #fff;
        text-transform: uppercase;
        margin: 25px;
    }

</style>