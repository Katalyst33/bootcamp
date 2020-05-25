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



                </div>

                <div class="navbar-end mr-4">
                    <div class="navbar-item">
                        <template v-if="!user">
                            <div class="buttons">
                                <router-link :to="{name:'login'}" class="button is-primary">
                                    <strong>Sign up</strong>
                                </router-link>
                                <router-link :to="{name:'login'}" class="button is-light">
                                    Log in
                                </router-link>
                            </div>
                        </template>
                        <template v-else>
                            <div class="navbar-item has-dropdown  mr-5 is-hoverable"  >
                                <a class="navbar-link">
                                    Account
                                </a>

                                <div class="navbar-dropdown mr-5">
                                    <template v-if="user">
                                        <h1 class="navbar-item">{{user.data.name}}</h1>
                                        <h1 class="navbar-item">{{user.data.email}}</h1>
                                        <div class="navbar-item">
                                            <h1 class="is-capitalized" v-if="user.data.role === 'admin' || 'publisher'">{{user.data.role}} Role</h1>

                                        </div>
                                    </template>
                                    <hr class="navbar-divider">
                                    <button @click="logOut" class="button is-danger">Logout</button>
                                </div>
                            </div>

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
        },
        toggleDrop: {
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
      dropToggle(){
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
        try {
          await this.$http.get("/api/v1/auth/logout");
          console.log("logout successfully");
          await this.$store.commit("SET_USER");

          await this.$router.push("/");


        } catch (e) {
          return e;
        }


      },
      checkButtonAnswer(answerOption) {

        if (answerOption === this.calculateAnswer()) {
          this.$swal.fire({
            title: "Correct !",
            text: this.message.correct,
            imageUrl: "/img/face/albert.png",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Custom image"
          }).then(this.onWin);

        } else {
          this.$swal.fire({
            title: `Wrong!! \n ${this.valueA} ${this.operator} ${this.valueB} is ${this.answer}`,
            text: this.message.wrong,
            imageUrl: "/img/face/hawk.png",
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Custom image"
          }).then(this.refreshGameValues);
        }

        // alert(`value: ${answerOption}`);
        // return answerOption;

        // console.log(this.calculateAnswer())

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
