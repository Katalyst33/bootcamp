<template>

    <div>

        <div>


            <table v-if="loaded" class="table is-bordered is-fullwidth mt-5">
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
                        <i @click="RemoveEnrollment(index)" class="fas fa-trash has-text-danger"></i>
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
          this.loaded= true
        } catch (e) {
          return e;
        }
      },

      RemoveEnrollment(id){
        console.log(id, "Removed")
      }

    }

  };
</script>

<style scoped>

</style>
