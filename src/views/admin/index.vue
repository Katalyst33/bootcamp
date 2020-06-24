<template>
    <div class="admin">
        <header class="header has-background-dark px-5 py-3">
            <router-link to="/" class="has-text-white is-size-4"> <img class="logo__img"  src="/admin-logo.png"> Devcamper Admin</router-link>
            <ul class="actions">
                <li @click="menuToggle" class="mx-3 is-hidden-desktop"><a><i class=" is-size-3 has-text-white" :class=toggleIcon></i></a></li>
            </ul>

        </header>

             <div class="main">
            <div class="menu " :class="toggleMenu">
                <div class="has-text-primary has-background-dark py-5 admin nav-menu">

                    <ul class="has-text-white">
                        <li @click="menuToggle" class="nav-item">
                            <router-link :to="{name:'AddBootcamp'}" class="has-text-white" >
                            <i class="far fa-layer-plus is-size-3"></i><br>
                            Add <br> Bootcamp
                            </router-link>
                        </li>
                        <li @click="menuToggle" class="nav-item">
                            <router-link :to="{name:'AllBootcampX'}" class="has-text-white">
                            <i class="fas fa-eye is-size-3"></i><br>
                            All <br> Bootcamps
                            </router-link>
                        </li>
                        <li @click="menuToggle" class="nav-item">
                            <router-link :to="{name:'AllUsers'}" class="has-text-white">
                            <i class="fas fa-user is-size-3"></i><br>
                           User
                            </router-link>
                        </li>
                        <li @click="menuToggle" class="nav-item">
                            <router-link :to="{name:'ManageReviews'}" class="has-text-white">
                                <i class="fas fa-quote-left is-size-3"></i><br>
                                Reviews
                            </router-link>
                        </li>
                        <li  class="nav-item " @click="logOut">
                            <router-link :to="{name:'ManageReviews'}" class="has-text-white">
                                <i class="fad fa-sign-out-alt is-size-1 has-text-danger"></i><br>
                                Logout
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page-content">
                        <router-view></router-view>

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        toggleMenu:{
          "is-hidden-touch":true
        },
        toggleIcon: {
          "fas fa-bars": true,
          "fas fa-times": false
        },
      };
    },
    methods:{
      menuToggle() {
        this.toggleMenu["is-hidden-touch"] = !this.toggleMenu["is-hidden-touch"];
        this.toggleIcon["fas fa-bars"] = !this.toggleIcon["fas fa-bars"];
        this.toggleIcon["fas fa-times"] = !this.toggleIcon["fas fa-times"];

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

    .header{
        display: flex;
    }
    .actions{
        display: flex;
        justify-content: flex-end;
        flex-grow: 8;

    }

    .main{
        display: flex;
        justify-items: center;
    }


    .menu{

        flex-grow: 1;
    }
    .page-content{
        flex-grow: 10;
    }
    .logo {
        font-size: 20px;
        /*padding: 7.5px 10px 7.5px 0;*/
    }

    .logo__img{
        height: 25px;
    }
    .item{
        padding: 10px;
        color: #ffffff;
    }

    .nav-menu{
        height: 100%;
    }

    .nav-item{
        border-bottom: 5px solid #ffffff;
        padding: 10px 10px;
    }

    /* Extra small devices (portrait phones, less than 576px)*/
    @media (max-width: 576px) {

        .page-content{
            flex-grow: 5;
            background-color: #5e53a5;
        }
    }




</style>
