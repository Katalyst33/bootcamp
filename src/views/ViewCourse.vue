<template>
    <div>
        <div class="section">
            <div class="container">
                <template v-if="loaded">
                    <div class="columns">
                        <div class="column is-8 ">
                            <div class="has-background-white px-5 py-3">
                                <div class=" has-text-left">
                                    <h1 class="is-size-4"> {{course.data.title}}</h1>
                                    <p>{{course.data.description}}.</p>
                                    <p>Course Duration:{{course.data.weeks}} </p>
                                    <p> Price:{{course.data.tuition}} </p>
                                    <p> Skill level:{{course.data.minimumSkill}} </p>
                                    <p> Scholarship :{{course.data.scholarshipAvailable}} </p>
                                    <p>Published: {{course.data.createdAt | formattedDate}}</p>
                                    <p>Published by: {{course.data.user}}</p>
                                    <p>Enrolled:{{course.data.enrolled}} </p>


                                </div>
                            </div>

                            <div class="has-background-white my-3 px-5 py-3">
                                <h1 class="is-size-4"> Enrolled Students
                                </h1>
                                <div class="has-text-left">
                                    <p>james anthony</p>
                                </div>

                            </div>

                        </div>
                        <div class="column is-4 ">
                            <div class="has-background-white">

                                <h3 class="is-size-5 is-capitalized">number of students:<span
                                        class="is-capitalized is-size-4">5</span></h3>
                                <h3 class="is-size-5 is-capitalized">number of reviews:<span
                                        class="is-capitalized is-size-4">5</span></h3>

                                <p class="py-2">Enrollment Starts:{{course.data.startDate | formattedDate}}</p>
                                <p class="py-2">Enrollment Ends:{{course.data.endDate | formattedDate}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="my-3 has-background-grey-lighter">
                        <h4 class="is-size-4 py-4">User Reviews</h4>
                    </div>
                </template>
            </div>
        </div>


        <h1 class="text-danger is-size-3 has-text-weight-bold">Course View</h1>
        <hr class="has-background-dark">
        <h1 class="is-size-5 has-text-danger has-text-weight-bold">Course Details</h1>

        <template v-if="loaded">
            <json-view :data="course.data"/>
        </template>
        <h1 class="is-size-5 has-text-danger has-text-weight-bold">Course Reviews</h1>



    </div>
</template>

<script>
  import { formattedDate } from "../utils";

  export default {
    data() {
      return {
        reviews: [],
        loaded: false,
        course: []

      };
    },

    filters: {
      formattedDate
    },


    mounted() {
      // this.fetchReviews();
      this.fetchCourse();
    },

    methods: {
      fetchCourse() {
        const code = this.$route.params.id;
        this.$http.get("/api/v1/courses/" + code)
          .then(({ data }) => {
            this.course = data;
            this.loaded = true;
          })
          .catch();
      },

      fetchReviews() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/courses/${code}/reviews`)
          .then(({ data }) => {
            this.reviews = data;
            this.loaded = true;
            console.log(this.reviews);
          })
          .catch();
      }

    }

  };
</script>

<style scoped>

</style>
