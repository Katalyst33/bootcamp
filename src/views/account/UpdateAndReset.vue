<template>
    <div>
        <div class="section">
            <div class="container">


                <div class="columns is-mobile">
                    <div class="column is-three-fifths-desktop is-three-fifths-tablet is-offset-one-fifth-desktop is-offset-one-fifth-tablet has-background-white has-text-left">
                        <GoBack class="py-2"/>

                        <div v-if="isUpdatePassword">

                            <h1 class="is-size-3">Update Password</h1>
                        </div>

                        <div v-if="isUpdateAccount">

                            <h1 class="is-size-4 has-text-weight-bold">Manage Account</h1>
                        </div>

                        <div v-if="isResetPassword">
                            <h1 class="is-size-3 py-3">Reset and Update Password</h1>
                            <p class="py-1">Use this form to reset your password using the registered email address.</p>
                        </div>

                        <template v-if="isUpdatePassword">
                            <div class="field pb-3">
                                <label class="label">Current Password:</label>
                                <div class="control">
                                    <input v-model="form.currentPassword" class="input" type="email"
                                           placeholder="Your Current Password">
                                </div>
                            </div>

                            <div class="field pb-3">
                                <label class="label">New Password:</label>
                                <div class="control">
                                    <input v-model="form.newPassword" class="input" type="email"
                                           placeholder="Your New password">
                                </div>
                            </div>
                            <div class="field pb-3">
                                <label class="label">Confirm New Password:</label>
                                <div class="control">
                                    <input v-model="form.confirmNewPassword" class="input" type="email"
                                           placeholder="Confirm new password">
                                </div>
                            </div>
                        </template>

                        <template v-if="isUpdateAccount">
                            <div class="field pb-3">
                                <label class="label">Name:</label>
                                <div class="control">
                                    <input v-model="updateProfileForm.name" class="input" type="email"
                                           placeholder="your name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Enter Email:</label>
                                <div class="control">
                                    <input v-model="updateProfileForm.email" class="input" type="email"
                                           placeholder="Email Address">
                                </div>
                            </div>
                        </template>

                        <template v-if="isResetPassword">
                            <div class="field">
                                <label class="label">Enter Email:</label>
                                <div class="control">
                                    <input v-model="form.email" class="input" type="email" placeholder="Email Address">
                                </div>
                            </div>
                        </template>

                        <section class="my-4">

                            <button v-if="isResetPassword" @click="forgotPassword" class="button is-primary">Reset
                                Password
                            </button>

                            <div v-if="isUpdateAccount" class="columns">
                                <div class="column">
                                    <button @click="updateAccount" class="button is-primary">Update</button>
                                </div>
                                <div class="column">
                                    <router-link :to="{name:'UpdatePassword'}" class="pt-5">Update
                                        Password
                                    </router-link>
                                </div>
                            </div>

                            <button v-if="isUpdatePassword" @click="updatePassword" class="button is-primary">
                              Update Password
                            </button>

                        </section>


                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
  import GoBack from "../../components/commons/GoBack";
  import { mapState } from "vuex";


  export default {
    components: {
      GoBack
    },
    data() {
      return {

        form: {
          name: null,
          email: null,
          currentPassword: null,
          newPassword: null,
          confirmNewPassword: null
        },

        updateProfileForm: {
          name: null,
          email: null
        }

      };
    },



    computed: {

      ...mapState(["user"]),


      isUpdateAccount() {
        return ["UpdateAccount"].includes(this.$route.name);
      },

      isResetPassword() {
        return ["ResetPassword"].includes(this.$route.name);
      },

      isUpdatePassword() {
        return ["UpdatePassword"].includes(this.$route.name);
      },
      /* eslint-disable no-unused-vars */

      newFormData() {
        const { email, confirmNewPassword, ...other } = this.form;
        return other;
      }
      /* eslint-disable no-unused-vars */

    },

    mounted() {
      this.updateProfileForm = {
        name: this.user.name,
        email: this.user.email
      };


    },

    methods: {



      async forgotPassword() {

        try {
          await this.$http.post(`/api/v1/auth/forgotpassword`, this.form);
          await this.$swal.fire({
            icon: "success",
            text: "Please check your inbox for password Reset link"
          });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });

        }

      },

      async updateAccount() {
        try {
          await this.$http.put("/api/v1/auth/updatedetails", this.updateProfileForm);
          this.$swal.fire({
            icon: "success",
            text: "Account updated Successfully"
          });
          this.$store.dispatch("getCurrentUser");
        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });
        }
      },

      async updatePassword() {
        try {
          await this.$http.put(`/api/v1/auth/updatepassword`, this.newFormData);

          await this.$swal.fire({
            icon: "success",
            text: "Account updated Successfully"
          });
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

</style>
