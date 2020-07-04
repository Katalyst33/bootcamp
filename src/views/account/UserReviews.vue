<template>
    <div>

        <div class="section">
            <div class="container">

                <div class="columns is-mobile">
                    <div class="column is-three-fifths is-offset-one-fifth">

                        <template v-for="enrollment in enrollments.data">
                            <div :key="enrollment._id">
                                <div class="has-background-white has-text-left ">

                                    <router-link :to="{name:'ViewCourse' , params:{id:enrollment.course._id}}" class="is-size-4 is-capitalized has-text-weight-bold underline">
                                        {{enrollment.course.title}}</router-link>
                                    <p class="is-size-5"> {{enrollment.text}}</p>
                                    <p class="is-size-5">Rating {{enrollment.rating}}</p>
                                    <p class="is-size-6"><i class="fal fa-clock"></i> {{enrollment.createdAt | agoDate}}
                                    </p>
                                    <div class="actions pt-2">
                                        <a class="underline"> <i class="fas fa-edit pr-2"></i>Edit</a>
                                        <a class="px-4 underline"><i class="fas fa-trash pr-2"></i>Delete</a>
                                    </div>
                                </div>
                                <hr class="has-background-grey">
                            </div>
                        </template>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from "vuex";
  import { formattedDate, agoDate } from "../../utils";


  export default {
    data() {
      return {
        enrollments: []
      };
    },

    filters: {
      formattedDate,
      agoDate
    },

    computed: {

      ...mapState(["user"])
    },

    mounted() {

      this.fetchEnrollments();
    },
    methods: {
      fetchEnrollments() {

        this.$http.get(`/api/v1/course-reviews/${this.user._id}/`)
          .then(({ data }) => {
            this.enrollments = data;
            this.loaded = true;
          })
          .catch();

      }
    }
  };
</script>

<style scoped>
    .actions {
        display: flex;
    }

    .underline {
        text-decoration: underline;
        color: #5e53a5;
    }
</style>


