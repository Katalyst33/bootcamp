<template>
    <div>

        <div class="section">
            <div class="container"><h1>Login here !!!</h1>

                <div class="columns is-mobile">
                    <div class="column is-half is-offset-one-quarter">
                        <section class="has-text-left">
                            <div class="field">
                                <label class="label">Email:</label>
                                <div class="control">
                                    <input v-model="form.email" class="input" type="text"
                                           placeholder="Email address">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Password:</label>
                                <div class="control">
                                    <input v-model="form.password" class="input" type="text"
                                           placeholder="Password ?">
                                </div>
                            </div>
                            <button @click="login" class="button is-primary is-medium">Login</button>

                            <button @click="logOut" class="button is-danger">logout</button>
                            <button @click="heyTravis" class="button is-grey">cookie</button>
                        </section>




                    </div>
                </div>
            </div>
        </div>
        <template>
            <json-view :data="form"/>
        </template>

    </div>
</template>

<script>
  import store from "../store/index";

  export default {

    data() {
      return {
        notification: {
          error: null,
          success: null
        },
        error: null,
        form: {
          email: "admin@gmail.com",
          password: "123456"
        }
      };
    },

    computed: {
      loggedUser() {
        return store.state.user;
      }
    },

    mounted() {
      this.$store.dispatch('getCurrentUser')
    },
    methods: {

        heyTravis(){
          this.$store.dispatch('getCurrentUser')

        },

      logOut() {

        this.$http.get("/api/v1/auth/logout")
          .then(() => {
                console.log('logout successfully')
          })
          .catch();

      },

      async login() {
        // function navigate(ms) {
        //   return new Promise(resolve => setTimeout(resolve, ms));
        // }

        try {
          const { data } = await this.$http.post("/api/v1/auth/login", this.form);

          this.notification.success = `welcome back`;
          // localStorage.setItem("token", data.token);
          console.log(`user data ${data.token}`);
          // await navigate(3000);
          // this.$router.push({name: 'AddBootcamp'});

        } catch (e) {

          this.notification.error = "Invalid Details";
        }

      }


    }

  };
</script>

<style scoped>

</style>
