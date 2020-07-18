<!--suppress ALL -->
<template>
    <div>

        <div  class="section">
            <div class="container">
                <div id="reviews" class="columns is-mobile my-5 has-text-left">
                    <div class="column is-three-fifths-desktop is-offset-one-fifth-desktop">
                        <div class="px-4 py-4 mx-0 mx-sm-5 has-background-white">
                            <GoBack class="my-1"/>
                            <template v-if="isUpdateReview">
                                <h1 class="is-size-4 ">Edit a Review for</h1>
                                <h1 v-if="loaded" class="is-size-3 has-text-weight-bold py-2">
                                    {{review.data.course.title}} course</h1>

                            </template>
                            <template v-else>
                                <h1 class="is-size-4 ">Write a Review for</h1>
                                <h1 v-if="courseLoaded" class="is-size-3 has-text-weight-bold py-2">
                                    {{course.data.title}} course</h1>

                            </template>


                            <p class="is-size-5">You must have enrolled in this course to review</p>

                            <div class="mt-5">
                                <h1 class="has-text-left is-size-4"> Rating: {{review.data.rating}}<span
                                        class="has-text-primary has-text-weight-bold">rating</span></h1>
                                <range-slider
                                        class="slider "
                                        min="1"
                                        max="5"
                                        step="0.5"
                                        v-model="review.data.rating">
                                </range-slider>

                                <div class="field">
                                    <label class="label">Review Title:</label>
                                    <div class="control">
                                        <input v-model="review.data.title" class="input" type="text"
                                               placeholder="Review Title">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Message:</label>
                                    <div class="control">
                                <textarea v-model="review.data.text" class="textarea"
                                          placeholder="Write an honest review about the course"
                                          rows="10"/>
                                    </div>
                                </div>

                                <div class="has-text-centered py-3">
                                    <button v-if="isUpdateReview" @click="updateReview"
                                            class="button is-medium is-primary px-5 lg-btn ">Update Review
                                    </button>
                                    <button v-else @click="addReview" class="button is-medium is-primary px-5 lg-btn ">
                                        Submit Review
                                    </button>

                                </div>


                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
  import GoBack from "../components/commons/GoBack";
  import RangeSlider from "vue-range-slider";
  import "../scss/rangeSlider.scss";

  export default {
    components: {
      GoBack, RangeSlider
    },
    data() {
      return {
        review: {
          data: {
            title: null,
            text: null,
            rating: 0
          }
        },
        loaded: false,
        courseLoaded: false,
        course: null
      };
    },
    computed: {
      isUpdateReview() {
        return ["UpdateReview"].includes(this.$route.name);
      }
    },
    mounted() {
      this.fetchItems();
      // this.fetchCourse()
    },

    methods: {

      fetchCourse() {
        const code = this.$route.params.courseId;
        this.$http.get("/api/v1/courses/" + code)
          .then(({ data }) => {
            this.course = data;
            this.courseLoaded = true;
          })
          .catch();
      },

      async addReview() {
        try {
          const code = this.$route.params.courseId;
          await this.$http.post(`/api/v1/courses/${code}/course-review`, this.review.data);
          await this.$swal.fire({
            icon: "success",
            text: "Review was  added Successfully"
          });


          await this.$router.push({ name: "ViewCourse", params: { id: code } });
        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });

        }
      },


      fetchReview() {
        const code = this.$route.params.reviewId;
        this.$http.get(`/api/v1/course-reviews/${code}`)
          .then(({ data }) => {
            this.review = data;
            this.loaded = true;
          })
          .catch();
      },

      updateReview() {
        const code = this.$route.params.reviewId;
        this.$http.put(`/api/v1/course-reviews/${code}`, this.review.data);
        this.$router.push({ name: "ViewCourse", params: { id: this.review.data.course._id } });
      },

      fetchItems() {
        if (this.isUpdateReview) {
          this.fetchReview();

        } else {
          this.fetchCourse();

        }
      }


    }

  };
</script>

<style scoped>
    #reviews {
        height: 100%;
    }

    .slider {
        /* overwrite slider styles */
        width: 100%;
    }

    .range-slider-fill {
        background-color: #5e53a5;
    }

    .lg-btn {
        width: 70%;
    }
</style>



