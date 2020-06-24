<template>
    <div class="bootcamp">
        <template v-if="loaded">
            <div class="section">
                <div class="container">
                    <h1 class="has-text-weight-bold is-size-3">All Bootcamps</h1>
                <div class="table-container ">
                    <table class="table is-fullwidth is-striped  ">
                        <thead>
                        <tr>
                            <th>S/n</th>
                            <th>Bootcamp Name</th>
                            <th>Ratings</th>
                            <th>Average Cost</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(bootcamp, index) in bootcamps.data" :key="bootcamp._id">
                            <td class="has-text-weight-bold">{{index + 1}} .</td>
                            <td>{{bootcamp.name}}</td>
                            <td>{{bootcamp.averageRating | roundOff}}</td>
                            <td class="is-size-4"><span class="is-size-5 px-1">$</span>{{bootcamp.averageCost  }}</td>
                            <td><router-link :to="{name:'ManageBootcamp' , params:{id:bootcamp._id}}" class="button is-primary"><i class="fas fa-edit has-text-white px-2"></i>Manage</router-link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                </div>
            </div>
        </template>


    </div>
</template>

<script>
  import {roundOff} from "../../utils"
  export default {
    data() {
      return {
        loaded: false,
        bootcamps: [],
        courses:null,
      };
    },

    mounted() {
      this.fetchBootcamp();
    },

    filters:{
      roundOff,
    },

    methods: {

      async fetchBootcamp() {

        try {
          const { data } = await this.$http.get("/api/v1/bootcamps/");
          this.bootcamps = data;
          this.loaded= true;
        } catch (e) {
          console.log(e);
        }

      },



    }

  };
</script>

<style scoped>
.bootcamp{
    height: 100vh;
}
</style>
