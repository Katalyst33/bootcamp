<template>
    <div>

        <div class="section">
            <div class="container ">


                <h1 v-if="isRegister" class="is-size-3 has-text-danger">Registration form</h1>
                <h1 v-else class="is-size-3 has-text-danger">login form</h1>

                <section class="my-5">
                    <div class="columns is-mobile">
                        <div class="column is-half is-offset-one-quarter has-background-white">
                            <section class="has-text-left py-3 px-3">
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

                                <router-link :to="{name:'ResetPassword'}"
                                             class="has-text-weight-bold has-text-primary pl-2">Forgot Password ?
                                </router-link>
                                <div v-if="isRegister" class="field px-3">
                                    <label class="label">User Role:</label>
                                    <div class="control box-border p-3">
                                        <label class="radio-btn">Regular User (Browse, Write reviews, etc)
                                            <input v-model="form.role" value="user" type="radio" checked="checked"
                                                   name="answer">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radio-btn">
                                            Bootcamp Publisher
                                            <input v-model="form.role" value="publisher" type="radio" name="answer">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                <p v-if="isRegister" class="has-text-danger"> * You must be affiliated with the bootcamp
                                    in
                                    some way in order
                                    to add it to DevCamper.
                                </p>
                            </section>
                            <div class="field is-grouped my-5 ml-4 ">

                                <button v-if="isRegister" @click="signUp" class="button is-primary is-fullwidth">Sign
                                    up
                                </button>

                                <button v-else @click="login" class="button is-primary  ">Login <i v-if="spinner"
                                                                                                   class=" ml-2 fad fa-spinner-third fa-spin is-size-4"></i>
                                </button>


                            </div>


                        </div>
                    </div>
                </section>
            </div>
        </div>


    </div>
</template>

<script>

  import { mapState } from "vuex";

  export default {

    data() {
      return {
        spinner: false,
        error: null,
        form: {
          email: "admin@gmail.com",
          password: "123456",
          role: "user"
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
      async login() {
        const data = await this.$http.post("/api/v1/auth/login", this.form);

        if (data) {
          await this.$store.dispatch("getCurrentUser");
          await this.$store.dispatch("getCartItem");
          await this.$router.push({ name: "Home" });
        }

      },




      async signUp() {

        try {
          await this.$http.post("/api/v1/auth/register", this.form);
          await this.$swal.fire({
            icon: "success",
            text: "YOu have successfully Registered, you will be redirected shortly"
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
