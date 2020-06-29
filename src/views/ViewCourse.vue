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
                                    <p>Published by: {{course.data.user.name}}</p>
                                    <p>Enrolled:{{course.data.enrolled}} </p>


                                </div>
                            </div>


                            <div class="my-3 has-background-white px-5">
                                <h4 class="is-size-4 py-4">Course Reviews</h4>
                                <div v-for="review in reviews.data" :key="review._id">




                                    <div class="columns">
                                        <div class="column is-2 has-text-left">
                                            <p>by {{review.user.name}}</p>
                                            <p>{{review.createdAt | formattedDate}}</p>
                                        </div>
                                        <div class="column has-text-left">
                                            rating:{{review.rating}}
                                            <p>{{review.title}}</p>
                                            <p>{{review.text}}</p>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            </div>
                            <div class="column is-4 ">
                                <div class="has-background-white">

                                    <h3 class="is-size-5 is-capitalized">number of students:<span
                                            class="is-capitalized is-size-4">5</span></h3>
                                    <h3 class="is-size-5 is-capitalized">number of reviews:<span
                                            class="is-capitalized is-size-4">5</span></h3>

                                    <p class="py-1">Enrollment Starts:{{course.data.startDate | formattedDate}}</p>
                                    <p class="py-1">Enrollment Ends:{{course.data.endDate | formattedDate}}</p>
                                    <p class="py-1">Number of Reviews:{{reviews.count}}</p>

                                </div>
                                <div class="has-background-white my-3 px-5 py-3">
                                    <h1 class="is-size-4"> Enrolled Students
                                    </h1>
                                    <div class="has-text-left">
                                        <p>james anthony</p>
                                    </div>

                                </div>
                            </div>
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

        <template v-if="loadedReview">
            <json-view :data="reviews.data"/>
        </template>

    </div>
</template>

<script>
  import { formattedDate } from "../utils";

  export default {
    data() {
      return {
        reviews: [],
        loaded: false,
        course: [],
        loadedReview: false

      };
    },

    filters: {
      formattedDate
    },


    mounted() {
      this.fetchReviews();
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
        this.$http.get(`/api/v1/courses/${code}/course-review`)
          .then(({ data }) => {
            this.reviews = data;
            this.loadedReview = true;
          })
          .catch();
      }

    }

  };
</script>

<style scoped>

</style>
