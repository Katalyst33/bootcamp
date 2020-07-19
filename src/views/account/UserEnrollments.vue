<template>

    <div>

        <div>


            <table class="table is-bordered is-fullwidth">
                <thead>
                <tr>
                    <th>
                        S/n
                    </th>
                    <th>
                        Bootcamp name
                    </th>
                    <th>
                        Course name
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(enrollment, index) in enrollments.data" :key="enrollment.id">
                    <td>{{index + 1}}</td>
                    <td> {{enrollment.bootcamp.name}}</td>
                    <td> {{enrollment.course.title}}</td>
                    <td>
                        <i class="fas fa-trash has-text-danger"></i>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
  // import { formattedDate, agoDate } from "../utils";


  export default {
    data() {
      return {
        enrollments: null,
        loaded: false
      };


    },

    mounted() {
      this.fetchEnrollment();
    },
    methods: {

      async fetchEnrollment() {
        try {
          const { data } = await this.$http.get(`/api/v1/enrollments/user`);
          this.enrollments = data;
        } catch (e) {
          return e;
        }
      }
    }

  };
</script>

<style scoped>

</style>
