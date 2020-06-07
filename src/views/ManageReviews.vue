<template>
    <div>

        <section v-if="loaded" class="section ">
        <div class="container">
            <div class="columns is-mobile">
                <div class="column is-three-fifths-desktop
is-offset-one-fifth-desktop ">
                    <h1>Manage Reviews</h1>

                    <table class="table is-fullwidth is-striped is-hoverable">
                        <thead>
                        <tr>
                            <th>Bootcamp Name</th>
                            <th>Ratings</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(review, index) in reviews.data" :key="index">
                            <td>{{review.bootcamp.name}}</td>
                            <td>{{review.rating}}</td>
                            <td>
                                <div class="buttons">
                                    <router-link :to="{name:'UpdateReview' ,params:{id:review._id}}"
                                                 class="button is-success has-text-white"><i
                                            class="fas fa-edit"></i>
                                    </router-link>
                                    <button @click="deleteReviews(review._id)"
                                            class="button is-danger has-text-white"><i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        </section>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        reviews: [],
        loaded: false
      };
    },

    mounted() {
      this.fetchReviews();
    },

    methods: {

      async fetchReviews() {
        try {

          const { data } = await this.$http.get(`/api/v1/reviews/`);
          this.reviews = data;
          this.loaded = true;
        } catch (e) {
          return e;
        }
      },

      async deleteReviews(code) {
        try {
          await this.$http.delete(`/api/v1/reviews/${code}`);
          await this.fetchReviews();


        } catch (e) {
          return e;
        }

      }

    }

  };
</script>

<style scoped>

</style>
