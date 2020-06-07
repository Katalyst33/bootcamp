<template>
    <div>

        <div class="section">
            <div class="container">
                <div id="reviews" class="columns is-mobile my-5 has-text-left">
                    <div class="column is-three-fifths-desktop is-offset-one-fifth-desktop">
                        <div class="px-4 py-4 mx-0 mx-sm-5 has-background-white">
                            <GoBack class="my-1"/>
                            <h1 class="is-size-3 has-text-weight-bold py-2">DevWorks Bootcamp</h1>
                            <h1 v-if="isUpdateReview" class="is-size-3 ">Edit a Review</h1>
                            <h1 v-else class="is-size-3 ">Write a Review</h1>
                            <p class="is-size-5">You must have attended and graduated this bootcamp to review</p>

                            <div class="mt-5">
                                <h1 class="has-text-left is-size-4"> Rating: <span
                                        class="has-text-primary has-text-weight-bold">{{review.data.rating}}</span></h1>
                                <range-slider
                                        class="slider "
                                        min="1"
                                        max="10"
                                        step="1"
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
                                   <button @click="addReview" class="button is-medium is-primary px-5 lg-btn ">Submit Review</button>

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
        }
      };
    },
    computed: {
      isUpdateReview() {
        return ["UpdateReview"].includes(this.$route.name);
      }
    },

    methods: {
      async addReview() {
        try {
          const code = this.$route.params.id;
          await this.$http.post(`/api/v1/bootcamps/${code}/reviews`, this.review.data);
          await this.$swal.fire({
            icon: "success",
            text: "Review was  added Successfully"
          });
          await this.$router.push({ name: "Reviews" });
        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });

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
    .lg-btn{
        width: 70%;
    }
</style>
