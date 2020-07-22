<template>
    <div>

        <div class="section">
            <div class="container">

                <div class="columns is-mobile">
                    <div class="column is-three-fifths is-offset-one-fifth">

                     <p class="has-text-danger"> {{reviews}}</p>
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
          .catch((e) =>{
            console.log(e)
            return e
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
</style>


