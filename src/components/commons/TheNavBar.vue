<template>
    <div class="">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="/logo.png">
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

                </div>

                <div class="navbar-end mr-4">
                    <div class="navbar-item">
                        <template v-if="!user.data">
                            <div class="buttons">
                                <router-link :to="{name:'register'}" class="button is-primary">
                                    <strong>Sign up</strong>
                                </router-link>
                                <router-link :to="{name:'login'}" class="button is-light">
                                    Log in
                                </router-link>
                            </div>
                        </template>
                        <!--                        error part-->
                        <template v-else>
                           <template >
                               <div class="navbar-item has-dropdown  mr-5 is-hoverable">
                                   <a class="navbar-link">
                                       Account
                                   </a>

                                   <div class="navbar-dropdown mr-5">
                                       <template >
                                           <h1 class="navbar-item">{{user.name}}</h1>
                                           <h1 class="navbar-item">{{user.email}}</h1>
                                           <div class="navbar-item">
                                               <h1 class="is-capitalized" v-if="user.role === 'admin' || 'publisher'">
                                                   {{user.role}} Role</h1>

                                           </div>
                                       </template>
                                       <hr class="navbar-divider">
                                       <router-link :to="{name:'UpdateAccount'}">Manage Account</router-link>
                                       <hr class="navbar-divider">

                                       <button @click="logOut" class="button is-danger">Logout</button>
                                       <router-link :to="{name:'AllBootcampX'}" v-if="user.role === 'admin'" @click="logOut" class="button is-warning">Administrator</router-link>


                                   </div>
                               </div>
                           </template>

                        </template>
                        <!--                        error part-->


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
        },
        toggleDrop: {
          "is-active": false
        },
        vuexLocal:{},


      };
    },
    computed: {
      ...mapState(["user", "loaded"])
    },

    mounted() {
      this.vuexLocal  = JSON.parse(localStorage.getItem("vuex"));
    },



    methods: {
      menuToggle() {
        this.toggleMenu["is-active"] = !this.toggleMenu["is-active"];
      },
      dropToggle() {
        this.toggleDrop["is-active"] = !this.toggleDrop["is-active"];
      },

      async logOut() {
        function timerInterval() {
          setInterval(() => {
            const content = this.$swal.getContent();
            if (content) {
              const b = content.querySelector("b");
              if (b) {
                b.textContent = this.$swal.getTimerLeft();
              }
            }
          }, 100);
        }


        try {
          await this.$http.get("/api/v1/auth/logout");
          await this.$store.commit("SET_USER");
          await this.$store.dispatch("getCurrentUser");
          await this.$swal.fire({
            icon: "error",
            text: "logout successfully, you will be redirected shortly",
            timer: 2000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              this.$swal.showLoading();

            },
            onClose: () => {
              clearInterval(timerInterval);
            }
          });

          await this.$router.push({ name: "Home" });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });
        }
      }


    }

  };
</script>

<style scoped>

    .logo {
        height: 60px;
        max-width: 100%;

    }







</style>
