<template>
    <div class="">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="/logo.svg">
                    <h1 class="is-size-4  has-text-primary"><span class="has-text-weight-bold">Dev</span><span>Bootcamp</span>
                    </h1>
                </router-link>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu pl-5 ">
                <div class="navbar-start">

                    <router-link to="/" class="navbar-item">
                        Home
                    </router-link>


                    <router-link :to="{name:'AllBootcamps'}" class="navbar-item">
                       Browse Bootcamps
                    </router-link>

                    <router-link :to="{name:'Bootcamp'}" class="navbar-item">
                        view Bootcamp
                    </router-link>
<!--
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            More
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                About
                            </a>
                            <a class="navbar-item">
                                Jobs
                            </a>
                            <a class="navbar-item">
                                Contact
                            </a>
                            <hr class="navbar-divider">
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>-->
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
  export default {

  };
</script>

<style scoped>

.logo{
    height: 60px;
    max-width: 100%;

}



</style>
