<!--
<template>
    <div>
        <div class="section">
            <div class="container">
                <h1 class="is-size-3 py-2">Enrolled users</h1>

                <template v-if="loaded">
                    <div class="table-container">
                        <table class="table is-fullwidth is-striped">
                            <thead>
                            <tr>
                                <th>S/n</th>
                                <th>Name</th>
                                <th>Boot camp</th>
                                <th>Course</th>
                                <th>Paid Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(enrollment, index) in enrollments.data" :key="enrollment._id">
                            <td>{{index + 1}}</td>
                                <td>{{enrollment.user.name}}</td>
                                <td>{{enrollment.bootcamp.name}}</td>
                                <td>{{enrollment.course.title}}</td>
                                <td>unpaid</td>

                            </tr>

                            </tbody>

                        </table>
                    </div>

                </template>

            </div>
        </div>


        <template>
            <json-view :data="enrollments.data" />
        </template>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        loaded: false,
        enrollments: [],

      };
    },

    mounted() {
      this.fetchEnrollments()
    },

    methods:{
      async fetchEnrollments() {
        try {
          const { data } = await this.$http.get("/api/v1/enrollments");
          this.enrollments = data;
          this.loaded = true;
        } catch (e) {
         return e;
        }
      },


    }

  };
</script>

<style scoped>

</style>
-->

<template>
  <div>
    <h1 class="is-size-1 has-text-weight-bold has-background-danger">
      Enrolled Users
    </h1>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
