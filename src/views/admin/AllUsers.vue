<template>
    <div>
<div class="container">
    <div class="section">
        <h1 class="is-size-3 has-text-weight-bold py-2">All users</h1>

        <template v-if="loaded">
            <div class="table-container">
                <table class="table is-fullwidth  is-bordered is-striped">
                    <thead>
                    <tr>
                        <th>S/n</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>User Role</th>
                        <th>Date Added</th>
                        <th>last login</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(user, index) in users.data" :key="user._id">
                        <td>{{index + 1}}</td>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.role}}</td>
                        <td>{{user.createdAt}}</td>
                        <td>{{user.createdAt}}</td>
                        <td><router-link :to="{name:'UpdateUser' , params:{id:user._id}}"  class="button is-primary"><i class="fad fa-edit mx-2"></i>edit</router-link></td>





                    </tr>
                    </tbody>
                </table>
            </div>
        </template>

        <template>
            <json-view :data="users" />
        </template>
    </div>

</div>

    </div>
</template>

<script>
  export default {

    data() {
      return {
        loaded: false,
        users: [],

      };
    },
    mounted() {
      this.allUsers()
    },
    methods:{

      async allUsers() {

        try {
          const { data } = await this.$http.get("/api/v1/users/");
          this.users = data;
          this.loaded= true;
        } catch (e) {
          console.log(e);
        }

      },
    }

  };
</script>

<style scoped>



</style>
