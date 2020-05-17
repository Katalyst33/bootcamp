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
    import axios from "axios"
  export default {

    data() {
      return {
        notification:{
          error:null,
          success:null,
        },
        error:null,
        form: {
          email: 'admin@gmail.com',
          password:'123456'
        }
      };
    },


    methods: {

      async login() {
        function navigate(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        try {
          const {data} = await axios.post('/api/v1/auth/login', this.form);

          this.notification.success = `welcome back`;
          localStorage.setItem('token', data.token);
          await navigate(3000);
          this.$router.push({name: 'AddBootcamp'});

        } catch (e) {

          this.notification.error = 'Invalid Details'
        }

      },


    },

  };
</script>

<style scoped>

</style>
