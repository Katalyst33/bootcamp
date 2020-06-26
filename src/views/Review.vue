<template>
    <div>
        <div v-if="loaded === true" class="section">
            <div class="container has-text-left">
                <GoBack/>
                <h1 class="is-size-3 has-text-weight-bold pt-3">
                    {{bootcamp.data.name}} Reviews
                </h1>
                <p>Here what people have to say about {{bootcamp.data.name}}</p>
                <div class="columns">

                    <div class="column is-8 has-text-left">


                      <template v-for="(review, index) in reviews.data">
                          <div :key="index">
                              <section class="box my-3">
                                  <h1 class="is-size-3 has-text-weight-bold">{{review.title}}</h1>
                                  <hr class="m-0">
                                  <p class="is-size-4 py-2">Average Rating: <span
                                          class="has-text-weight-bold has-text-success">{{review.rating }}</span></p>
                                  <p>
                                      {{review.text}}
                                  </p>
                                  <h3 class="is-size-5 has-text-grey py-3 is-italic">Written By <span class="has-text-weight-bold">{{review.user.name}}</span></h3>
                                  <h5>{{review.createdAt}}</h5>
                              </section>
                          </div>
                      </template>

                    </div>
                    <div class="column is-4 has-text-left">
                        <section class="box">
                            <h1 class="is-size-3 has-text-weight-bold">Rating: <span class="has-text-success">{{bootcamp.data.averageRating | roundOff}}</span>
                            </h1>

                            <router-link :to="{name:'AddReview', params:{id:bootcamp.data._id}}" class="button is-dark mt-5">{{bootcamp.data._id}}</router-link>

                        </section>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import GoBack from "../components/commons/GoBack";

  import {roundOff} from "../utils"

  export default {
    components: {
      GoBack
    },
    data() {
      return {
        loaded: false,
        reviews:[],
        bootcamp:null,
        user:null,
      };
    },

    computed:{

    },
    filters:{
      roundOff

    },
    mounted() {
      this.fetchReviews()
      this.fetchBootcamp()
    },
    methods: {

      async fetchReviews() {
        try {
          const code = this.$route.params.id;
         const {data} =await this.$http.get(`/api/v1/bootcamps/${code}/reviews/`);
            this.reviews = data;
            this.loaded = true;
        } catch (e) {
          return e;
        }
      },

      async fetchBootcamp() {
        try {
          const code = this.$route.params.id;
          const {data} =await this.$http.get(`/api/v1/bootcamps/${code}`);
          this.bootcamp = data;
        } catch (e) {
          return e;
        }
      },




    }
  };
</script>

<style scoped>

</style>
