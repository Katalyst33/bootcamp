<template>
    <div class="">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="/logo.svg">
                    <h1 class="is-size-4  has-text-primary"><span
                            class="has-text-weight-bold">Dev</span><span>Bootcamp</span>
                    </h1>
                </router-link>

                <a @click="menuToggle" role="button" class="navbar-burger burger" :class="toggleMenu" aria-label="menu"
                   aria-expanded="false" data-target="navbarBasicExample">
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

                   <template v-if="user">
                       <h1  class="navbar-item">{{user.data.name}}</h1>
                       <h1  class="navbar-item">{{user.data.email}}</h1>

                   </template>

                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                       <template v-if="!user">
                           <div class="buttons">
                               <router-link :to="{name:'register'}" class="button is-primary">
                                   <strong>Sign up</strong>
                               </router-link>
                               <router-link :to="{name:'login'}" class="button is-light">
                                   Log in
                               </router-link>
                           </div>
                       </template>
                        <template v-else>
                            <button  @click="logOut" class="button is-danger">Logout</button>
                        </template>

                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script>
  import { mapState } from "vuex";


  export default {
    data() {
      return {

        toggleMenu: {
          "is-active": false
        }
      };
    },
    computed: {
      ...mapState(["user"])
    },

    methods: {
      menuToggle() {
        this.toggleMenu["is-active"] = !this.toggleMenu["is-active"];
      },

      async logOut() {

        try {
          await this.$http.get("/api/v1/auth/logout");
          console.log("logout successfully");
          await  this.$store.commit("SET_USER");

        } catch (e) {
          return e;
        }


      },

    }

  };
</script>

<style scoped>

    .logo {
        height: 60px;
        max-width: 100%;

    }


</style>
