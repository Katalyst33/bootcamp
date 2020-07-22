<template>
    <div>

        <div class="section">
            <div class="container">

                <div class="columns is-mobile">


                    <div class="has-background-white has-text-left">
                        <div v-for="review in reviews.data" :key="review._id">
                            <h4 class="has-text-primary is-size-4 "> {{review.course.title}}</h4>
                            <img class="rating" :src="`/stars/stars-${review.rating}.svg`">
                            <p class="is-size-4"> {{review.title}}</p>
                            <p class="is-size-5"> {{review.text}}</p>
                            <p>{{review.createdAt | agoDate}}</p>

                        </div>



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
        reviews: []
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

      this.fetchUserReviews();
    },
    methods: {
      fetchUserReviews() {

        this.$http.get(`/api/v1/course-reviews/user-reviews/`)
          .then(({ data }) => {
            this.reviews = data;
            this.loaded = true;
          })
          .catch((e) => {
            console.log(e);
            return e;
          });

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
    .rating{
        height: 20%;
        width: 40%;
    }
</style>


