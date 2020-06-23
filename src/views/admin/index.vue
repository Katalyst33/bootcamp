<template>
    <div class="admin">
        <header class="header has-background-dark px-5 py-3">
            <h1 class="has-text-white"> <img class="logo__img pr-2  "  src="/logo.png"> Devcamper Admin</h1>
            <ul class="actions">
                <li @click="logOut"><button class="button is-danger">EXIT</button></li>
                <li class="mx-3"><i class="fas fa-bars is-size-3 has-text-white"></i></li>
            </ul>

        </header>

             <div class="main">
            <div class="menu is-hidden-touch">
                <div class="has-text-primary has-background-dark py-5 admin nav-menu">

                    <ul class="has-text-white">
                        <li class="nav-item">
                            <router-link :to="{name:'AddBootcamp'}" class="has-text-white" >
                            <i class="far fa-layer-plus is-size-1"></i><br>
                            Add <br> Bootcamp
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'AllBootcampX'}" class="has-text-white">
                            <i class="fas fa-eye is-size-1"></i><br>
                            All <br> Bootcamps
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'AllUsers'}" class="has-text-white">
                            <i class="fas fa-user is-size-1"></i><br>
                           User
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'ManageReviews'}" class="has-text-white">
                                <i class="fas fa-quote-left is-size-1"></i><br>
                                Reviews
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
    methods:{
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
        height: 100vh;
    }

    .nav-item{
        border-bottom: 5px solid #ffffff;
        padding: 5%;
    }





</style>
