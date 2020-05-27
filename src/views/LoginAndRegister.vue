<template>
    <div>

        <div class="section">

            <div class="container"><h1>Login here !!!</h1>
                {{user}}
                <h1 class="is-size-3 has-text-danger">login form</h1>
                <h1 v-if="isRegister" class="is-size-3 has-text-danger">Registration form</h1>

                <div class="columns is-mobile">
                    <div class="column is-half is-offset-one-quarter">
                        <section class="has-text-left">
                            <div v-if="isRegister" class="field">
                                <label class="label">Name:</label>
                                <div class="control">
                                    <input v-model="form.name" class="input" type="text"
                                           placeholder="your name">
                                </div>
                            </div>
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
                            <div v-if="isRegister" class="field px-3">
                                <label class="label">User Role:</label>
                                <div class="control box-border p-3">
                                    <label class="radio-btn">Regular User (Browse, Write reviews, etc)
                                        <input type="radio" checked="checked" name="answer">
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-btn">
                                        Bootcamp Publisher
                                        <input type="radio" name="answer">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <p v-if="isRegister" class="has-text-danger"> * You must be affiliated with the bootcamp in
                                some way in order
                                to add it to DevCamper.
                            </p>
                        </section>
                        <div class="field is-grouped mt-5">
                            <p class="control">
                                <button @click="login" class="button is-primary">Login</button>
                            </p>

                            <p class="control">
                                <button @click="logOut" class="button is-danger">Log Out</button>
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
        error: null,
        form: {
          email: "admin@gmail.com",
          password: "123456"
        }
      };
    },

    computed: {
      ...mapState(["user"]),

      isRegister() {
        return ["register"].includes(this.$route.name);
      }
    },



    methods: {


      async logOut() {

        try {
          await this.$http.get("/api/v1/auth/logout");
          console.log("logout successfully");
          await this.$store.dispatch("getCurrentUser");
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

        try {
          await this.$http.post("/api/v1/auth/login", this.form);
          await this.$swal.fire({
            icon: "success",
            text: "Welcome back, you will be redirected shortly",
            imageAlt: "Custom image"
          });
          await this.$store.dispatch("getCurrentUser");
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
    .radio-btn {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 20px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .radio-btn input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #a7a3a3;
        border-radius: 50%;
    }


    /* On mouse-over, add a grey background color */
    .radio-btn:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .radio-btn input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .radio-btn input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .radio-btn .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }

    .box-border {
        border-style: solid;
        border-color: #d7d7d7;
        border-width: 1px;
        border-radius: 10px;
        background-color: #ffffff;
    }


</style>
