<template>
    <div>
        <div id="breadcrumbs">
            <Breadcrumbs class="container"/>
        </div>
        <div class="section">
            <div class="container">
                <template v-if="loaded">
                    <div class="columns">
                        <div class="column is-8 ">
                            <div class="has-background-dark has-text-white px-5 py-5">
                                <div class=" has-text-left is-size-5">
                                    <h1 class="is-size-3 has-text-weight-bold"> {{course.data.title}}</h1>
                                    <p>{{course.data.description}}.</p>
                                    <p><i class="fal fa-hourglass-half pr-2"></i>Course Duration: {{course.data.weeks}}
                                        Weeks </p>
                                    <p><i class="fal fa-user-hard-hat pr-2"></i>Skill level:{{course.data.minimumSkill}}
                                    </p>
                                    <p><i class="far fa-user-edit pr-2"></i>Published by: {{course.data.user.name}}</p>
                                    <p>Last Updated: {{course.data.createdAt | formattedDate}}</p>

                                    <p>Enrolled:{{course.data.enrolled}} </p>
                                </div>
                            </div>

                            <div class="my-3 has-background-white pl-2">
                                <h4 class="is-size-4 py-4">Course Reviews</h4>
                                <div v-for="review in reviews.data" :key="review._id">
                                    <div class="review">
                                        <div class="has-text-left user-info">
                                            <img class="profile__pix" src="/img/assets/user.png">
                                            <div class="pl-3">
                                                <p>{{review.createdAt | agoDate}}</p>

                                                <p class="has-text-weight-bold">by {{review.user.name}}</p>
                                            </div>
                                        </div>
                                        <div class="user-content has-text-left ml-5">
                                           <p class="is-size-5 has-text-weight-bold"> rating: {{review.rating}}</p>
                                            <p class="is-size-5 is-capitalized">{{review.title}}</p>
                                            <p class="is-size-6">{{review.text}}</p>
                                        </div>
                                    </div>
                                    <hr class="has-background-grey-lighter">
                                </div>
                            </div>




                            <div class="mt-5">
                                <h3 class="is-size-4">Pay with Paystack.</h3>
                                <PayStack :ref-id="course.data._id" :amount="course.data.tuition"/>
                            </div>
                        </div>
                        <div class="column is-4 ">

                            <div class="has-background-white px-5 is-size-6">
                                <div class="has-background-white py-3 has-text-left is-size-5">
                                    <p class="is-size-1 has-text-weight-bold has-text-centered">
                                        ${{course.data.tuition}} </p>

                                    <p class=" is-capitalized"><i class="fad fa-users pr-2"></i>Students:<span
                                            class="is-capitalized is-size-4">5</span></p>


                                    <p class="py-1"><i class="fas fa-calendar-check pr-2 has-text-success"></i>Starts:{{course.data.startDate | formattedDate}}</p>
                                    <p class="py-1"><i class="fas fa-calendar-times has-text-danger"></i> Ends:{{course.data.endDate | formattedDate}}</p>
                                    <p class="py-1"><i class="fad fa-comment-lines pr-2"></i>Reviews:{{reviews.count}}</p>
                                    <p class=" is-capitalized"><i class="fad fa-users pr-2"></i>Students:<span
                                            class="is-capitalized is-size-4">5</span></p>
                                    <p> Scholarship :<span v-if="course.data.scholarshipAvailable">Available</span> <span v-else>Not Available</span></p>


                                </div>
                                <hr class="has-background-grey-lighter">
                                <div class="has-background-white my-3 px-5 py-3">
                                    <h1 class="is-size-4"> Enrolled Students
                                    </h1>
                                    <div class="has-text-left">
                                        <p>james anthony</p>
                                    </div>

                                </div>
                                <hr class="has-background-grey-lighter">

                                <div class="py-5">
                                    <button v-if="!course.data.enrolled" @click="enrollCourse(course.data._id)"
                                            class="button is-primary is-outlined my-3 is-fullwidth">Enroll
                                    </button>
                                    <button v-else class="button is-success my-3 is-fullwidth"
                                            :disabled="course.data.enrolled">you are Enrolled
                                    </button>
                                    <br>
                                    <button class="button is-danger is-fullwidth" :disabled="course.data.isFree">Add to
                                        Cart Cart
                                    </button>
                                    <button class="button is-success is-fullwidth" disabled>Free</button>

                                </div>

                            </div>
                        </div>
                    </div>

                </template>
            </div>
        </div>


    </div>
</template>

<script>
  import { formattedDate, agoDate } from "../utils";
  import PayStack from "../components/PayStack";

  export default {
    components: { PayStack },
    data() {
      return {
        reviews: [],
        loaded: false,
        course: [],
        loadedReview: false

      };
    },

    filters: {
      formattedDate,
      agoDate
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
      },
      enrollCourse(code) {
        this.$http.post(`/api/v1/courses/${code}/enrollments`);
        this.$swal.fire({
          icon: "success",
          text: "You have successfully enrolled for this course",
          imageAlt: "Custom image"
        });
        this.fetchCourses();

      }


    }

  };
</script>

<style scoped>

    .review{
        display: flex;
    }
    .user-info{
        display: flex;
    }
.profile__pix{
    height: 50px;
    width: 50px;
}
</style>
