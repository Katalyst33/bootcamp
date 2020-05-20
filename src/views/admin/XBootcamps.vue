<template>
    <div>
        <template v-if="loaded">


            <div class="section">
                <div class="container">
                    <table class="table is-fullwidth is-hoverable is-striped">
                        <thead>
                        <tr>
                            <th>Bootcamp Name</th>
                            <th>Ratings</th>
                            <th>Average Cost</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="bootcamp in bootcamps.data" :key="bootcamp._id">
                            <td>{{bootcamp.name}}</td>
                            <td>{{bootcamp.averageRating}}</td>
                            <td class="is-size-4"><span class="is-size-5 px-1">$</span>{{bootcamp.averageCost || '0.00'}}</td>
                            <td><router-link :to="{name:'ManageBootcamp' , params:{id:bootcamp._id}}" class="button is-success"><i class="fas fa-edit has-text-white px-2"></i>Manage</router-link></td>
                        </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </template>
        <template>
            <json-view :data="bootcamps"/>
        </template>

    </div>
</template>

<script>
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

</style>
