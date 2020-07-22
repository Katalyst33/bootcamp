<!--suppress ALL -->
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
                                    <h1 class="is-size-3 has-text-weight-bold is-capitalized">
                                        {{course.data.title}}</h1>
                                    <p>{{course.data.description}}.</p>
                                    <p><i class="fal fa-hourglass-half pr-2"></i>Course Duration: {{course.data.weeks}}
                                        Weeks </p>
                                    <p><i class="fal fa-user-hard-hat pr-2"></i>Skill level:{{course.data.minimumSkill}}
                                    </p>
                                    <p><i class="far fa-user-edit pr-2"></i>Published by: {{course.data.user.name}}</p>
                                    <p>Last Updated: {{course.data.createdAt | formattedDate}}</p>
                                    <template v-if="user">
                                        <button v-if="!course.data.enrolled" @click="enrollCourse(course.data._id)"
                                                class="button is-primary  my-3 px-5">Enroll
                                        </button>
                                        <button v-else class="button is-primary my-3"
                                                :disabled="course.data.enrolled">you are Enrolled
                                        </button>
                                    </template>
                                </div>
                            </div>

                            <h4 class="is-size-4 py-2 mt-5">Course Reviews</h4>




                            <div class="my-3 has-background-white px-5">
                                <div v-for="review in reviews.data" :key="review._id">
                                    <ReviewsComponent :ago-date="review.createdAt | agoDate" :course="course"
                                                  :delete-review="deleteReview" :review="review"
                                                  :user="user"/>

                                    <hr class="has-background-grey-lighter">
                                </div>
                            </div>


                            <div class="mt-5">
                                <!--                                <h3 class="is-size-4">Pay with Paystack.</h3>-->
                                <!--                                <PayStack :ref-id="course.data._id" :amount="course.data.tuition"/>-->
                            </div>
                        </div>
                        <div class="column is-4 ">

                            <div class="has-background-white  is-size-6 px-5 py-5">
                                <div class="has-background-white py-3 has-text-left is-size-5">
                                    <div class="price-tag">
                                        <p class="is-size-1 has-text-weight-bold has-text-centered"
                                           :class="{'strike  has-text-grey':course.data.isFree}"
                                        >
                                            ${{course.data.tuition}}
                                        </p>
                                        <p v-if="course.data.isFree" class="dot">free</p>
                                    </div>

                                    <p class=" is-capitalized"><i class="fad fa-users pr-2"></i>Students:<span
                                            class="is-capitalized is-size-4">5</span></p>


                                    <p class="py-1"><i class="fas fa-calendar-check pr-2 has-text-success"></i>Starts:{{course.data.startDate
                                        | formattedDate}}</p>
                                    <p class="py-1"><i class="fas fa-calendar-times has-text-danger"></i>
                                        Ends:{{course.data.endDate | formattedDate}}</p>
                                    <p class="py-1"><i class="fad fa-comment-lines pr-2"></i>Reviews:{{reviews.count}}
                                    </p>
                                    <p class=" is-capitalized"><i class="fad fa-users pr-2"></i>Students:<span
                                            class="is-capitalized is-size-4">5</span></p>
                                    <p> Scholarship :<span v-if="course.data.scholarshipAvailable">Available</span>
                                        <span v-else>Not Available</span></p>


                                </div>
                                <hr class="has-background-grey-lighter">


                                <div class="pb-5">
                                    <br>
                                    <template v-if="!course.data.isFree">
                                        <template v-if="!course.data.isFree">
                                            <button v-if="coursesInCart.includes(course.data._id)"
                                                    @click.prevent="removeFromCart(course.data)"
                                                    class="button is-danger  is-fullwidth is-large is-primary">
                                                Remove from cart
                                            </button>
                                            <button v-else
                                                    @click.prevent="addToCart(course.data)"
                                                    class="button is-success is-fullwidth is-large  is-primary ">
                                                Add to Cart
                                            </button>
                                        </template>
                                        <button @click="buyNow"
                                                class="button is-primary is-fullwidth  is-large is-outlined my-4">Buy
                                            Now
                                        </button>

                                    </template>


                                </div>
                                <div class=" my-3 py-3">
                                    <h1 class="is-size-5 has-text-left"> Enrolled Students
                                    </h1>
                                    <template v-if="course.data.enrolled">
                                        <router-link v-if="user"
                                                     :to="{name:'AddReview' , params:{courseId:course.data._id}}"
                                                     class="button is-fullwidth is-primary is-pulled-left">Add Review
                                        </router-link>
                                    </template>
                                    <template v-if="!course.data.enrolled">
                                        <button class="button is-primary" disabled>Add review</button>
                                        <p class="has-text-danger">You must be enrolled to drop a review</p>
                                    </template>


                                    <div class="has-text-left">
                                        <template v-for="(enrollment, index) in enrollments.data">
                                            <div :key="enrollment._id">
                                                <p class="is-capitalized">{{index + 1}}. {{enrollment.user.name}}</p>

                                            </div>
                                        </template>
                                    </div>

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
  import { agoDate, formattedDate } from "../utils";
  import { mapGetters, mapState } from "vuex";
  import ReviewsComponent from "./ReviewsComponent";


  export default {
    components: { ReviewsComponent },
    data() {
      return {
        reviews: [],
        loaded: false,
        course: [],
        loadedReview: false,
        loadedEnrollment: false,
        enrollments: [],
        isOwner: false

      };
    },
    computed: {
      ...mapState(["user"]),

      ...mapGetters(["coursesInCart"]),
      isEnrolled() {
        return true;
      }


    },


    filters: {
      formattedDate,
      agoDate
    },


    mounted() {
      this.fetchAll();

    },

    methods: {


      //fetch all data
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
        this.$http.get(`/api/v1/courses/${code}/course-reviews`)
          .then(({ data }) => {
            this.reviews = data;
            this.loadedReview = true;

          })
          .catch();
      },
      fetchCourseEnrollments() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/courses/${code}/enrollment`)
          .then(({ data }) => {
            this.enrollments = data;
            this.loadedEnrollment = true;
          })
          .catch();
      },

      //fetch all data
      fetchAll() {
        this.fetchReviews();
        this.fetchCourse();
        this.fetchCourseEnrollments();
      },

      enrollCourse(code) {
        this.$http.post(`/api/v1/courses/${code}/enrollment`);
        this.fetchAll();
        this.$swal.fire({
          icon: "success",
          text: "You have successfully enrolled for this course",
          imageAlt: "Custom image"
        });
      },
      addToCart(course) {

        this.$store.commit("PUSH_TO_CART", course);
        this.$store.dispatch("addCartItem");

        this.$swal.fire({
          icon: "success",
          text: "Course has been added to cart"
        });


      },

      removeFromCart(course) {
        this.$store.commit("REMOVE_FROM_CART", course);
        this.$store.dispatch("addCartItem");
        this.$swal.fire({
          icon: "success",
          text: "Course has been removed from cart"
        });
      },

      buyNow() {
        this.addToCart();
      },

      addReview(code) {
        // this.$router.push({name:'AddReview', params:{courseId:}})
        console.log("COURSE ID", code);
      },

      deleteReview2(code) {
        console.log(code);
        this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,

          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
          .then((code) => {
            console.log("SEconad code", code);
            // this.$http.delete(`/api/v1/course-reviews/${code}/`);

          })
          .then((result) => {
            if (result.value) {
              this.$swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              );
            }
          });
      },

      async deleteReview(code) {
        await this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
        const data = await this.$http.delete(`/api/v1/course-reviews/${code}/`);
        if (data) {
          this.$swal.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        }
        this.fetchAll();



      }


    }

  };
</script>

<style scoped>

    .review {
        display: flex;
    }

    .user-info {
        display: flex;
    }

    .strike {
        text-decoration: line-through;
    }

    .price-tag {
        display: flex;
    }

    .dot {
        background: #64d797;
        color: #ffffff;
        /*font-size: 10px;*/
        height: 22px;
        width: 70px;
        line-height: 25px;
        text-align: center;
        -webkit-border-radius: 10%;
        -moz-border-radius: 10%;
        border-radius: 10%;

    }
</style>
