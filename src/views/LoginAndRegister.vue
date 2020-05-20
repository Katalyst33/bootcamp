<template>
    <div>

        <div class="section">
            {{notification.error}}
            {{notification.success}}
            <div class="container"><h1>Login here !!!</h1>
                {{user}}
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
                        </section>
                        <div class="field is-grouped mt-5">
                            <p class="control">
                                <button @click="login" class="button is-primary">Login</button>
                            </p>
                            <p class="control">
                                <button @click="checkUser" class="button is-warning">Check user</button>
                            </p>

                        </div>


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

  import { mapState } from "vuex";

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
      ...mapState(["user"])
    },

    mounted() {
    },

    methods: {


      async logOut() {

        try {
          await this.$http.get("/api/v1/auth/logout");
          console.log("logout successfully");
          await this.$store.commit("SET_USER");

        } catch (e) {
          return e;
        }


      },
      checkUser() {
        this.$http.get("/api/v1/auth/me")
          .then(({ data }) => {
            console.log(data);
          })
          .catch(({ data }) => {
            console.log(data);
          });
      },


      async login() {

        await this.$swal.fire({
          icon: 'success',
          text: 'login successfully, you will be redirected shortly',
          imageAlt: "Custom image",
        })
        try {
          await this.$http.post("/api/v1/auth/login", this.form);
          this.notification.success = "Welcome back";
          await this.$store.dispatch("getCurrentUser");
        } catch (error) {
          this.notification.error = error.response.data.error;
        }

      }

    }

  };
</script>

<style scoped>

</style>
