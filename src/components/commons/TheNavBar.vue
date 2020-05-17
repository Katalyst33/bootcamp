<template>
    <div class="">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="/logo.svg">
                    <h1 class="is-size-4  has-text-primary"><span class="has-text-weight-bold">Dev</span><span>Bootcamp</span>
                    </h1>
                </router-link>

                <a @click="menuToggle" role="button" class="navbar-burger burger" :class="toggleMenu" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu  pl-5 " :class="toggleMenu">
                <div class="navbar-start">

                    <router-link to="/" class="navbar-item">
                        Home
                    </router-link>


                    <router-link :to="{name:'AllBootcamps'}" class="navbar-item">
                       Browse Bootcamps
                    </router-link>

                   <!-- <router-link :to="{name:'Bootcamp'}" class="navbar-item">
                        view Bootcamp
                    </router-link>-->
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
                            <router-link :to="{name:'register'}" class="button is-primary">
                                <strong>Sign up</strong>
                            </router-link>
                            <router-link :to="{name:'login'}" class="button is-light">
                                Log in
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        toggleMenu:{
          'is-active':false
        }
      };
    },

    methods:{
      menuToggle(){
        this.toggleMenu["is-active"] = !this.toggleMenu["is-active"]
      }
    }

  };
</script>

<style scoped>

.logo{
    height: 60px;
    max-width: 100%;

}



</style>
