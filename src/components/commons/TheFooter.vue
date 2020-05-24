<template>
    <div class="has-background-dark">
        <div class="section has-text-grey">
            <div class="container">
                <div class="columns">
                    <div class="column is-6 has-text-left">
                        <h3 class="is-size-6 has-text-left has-text-white has-text-weight-bold">Address</h3>
                        <p>{{config.address}}</p>
                        <p>{{config.telephone}}</p>
                        <p>{{config.email}}</p>

                    </div>
                    <div class="column is-2 has-text-left">
                        <h3 class="is-size-6 has-text-left has-text-white has-text-weight-bold">Public</h3>
                            <ul>
                                <li><router-link :to="{name:'AllBootcamps'}">All bootcamps</router-link></li>
                                <li><router-link :to="{name:'login'}">Login</router-link></li>

                            </ul>
                    </div>
                    <div class="column is-2 has-text-left">
                        <h3 class="is-size-6 has-text-left has-text-danger has-text-weight-bold">Admin routes</h3>
                            <ul class="has-text-danger">
                                <li ><router-link :to="{name:'AddBootcamp'}" class="has-text-danger">Add bootcamp</router-link></li>
                                <li ><router-link :to="{name:'AllBootcampX'}" class="has-text-danger">All bootcamps</router-link></li>


                                <li>item</li>
                            </ul>
                    </div>
                    <div class="column is-2 has-text-left">
                        <h3 class="is-size-6 has-text-left has-text-white has-text-weight-bold">Explore</h3>
                            <ul>
                                <li>item</li>
                                <li>item</li>
                                <li><a class="has-text-grey" src="file:///Users/hibrid/hRoot/hScript/bootcamp/devcamper_project_resources/devcamper_theme/dist/index.html" target="_blank">item</a></li>
                                <li><a class="has-text-grey" href="https://maxcoach.thememove.com/main/" target="_blank">front</a></li>
                                <li><a class="has-text-grey" href="https://midone.left4code.com/" target="_blank">Admin</a></li>
                            </ul>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    data() {
      return {
        // key: value
      };
    },
    computed: {
      ...mapState(["config"])
    }

  };
</script>

<style scoped>

</style>
