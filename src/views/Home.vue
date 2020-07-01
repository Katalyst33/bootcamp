<template>
    <div id="home">

        <section class="section">
            <div class="container has-text-left">
                <div class="columns">
                    <div class="column">
                        <h1 class="is-size-3 has-text-weight-bold mt-5 "> Start your Career</h1>
                        <p class=" is-size-4">Start your Learning journey with DevBootCamp </p>
                        <router-link :to="{name:'AllBootcamps'}" class="button is-primary my-4">Browse Bootcamp
                        </router-link>
                    </div>
                    <div class="column">
                        <img src="/img/girlbook.svg">
                    </div>
                </div>


            </div>
        </section>


        <div class="section has-background-primary">
            <div class="container">

                <div class=" py-4">
                    <div class="columns">
                        <div class="column">
                            <h4 class="is-size-3 has-text-white">Are you a Publisher ? join us today</h4>
                        </div>
                        <div class="column">
                            <button class="button is-white">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    name: "Home",
    components: {}
  };
</script>

<style scoped>
    #home{
        height: 100vh;
    }
</style>
