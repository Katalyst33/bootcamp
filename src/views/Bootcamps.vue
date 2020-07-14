<template>
    <div>
        <div id="breadcrumbs">
            <Breadcrumbs  class="container"/>
        </div>
        <div class="container">

            <h1 class="is-size-1 has-text-primary">
                All Bootcamps here
            </h1>

            <div class="section">
                <div v-if="loaded">
                    <div class="columns is-multiline">
                        <div class="column is-4 px-2 " v-for="bootcamp in bootcamps.data" :key="bootcamp._id">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img :src="`/uploads/${bootcamp.photo}`" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <div class="has-background-success">
                                                <p class="has-text-white has-text-weight-bold is-size-4 px-2">
                                                    {{bootcamp.averageRating | roundOff}}</p>
                                            </div>
                                        </div>
                                        <div class="media-content">

                                            <router-link :to="{name:'Bootcamp' , params:{id:bootcamp._id}}"
                                                         class="title is-4 has-text-primary">{{bootcamp.name}}
                                            </router-link>
                                        </div>
                                    </div>

                                    <div class="content">
                                        <p class="has-text-justified text-contain">
                                            {{bootcamp.description}}
                                        </p>
                                    </div>
                                    <div class="is-clearfix">
                                        <div class="is-pulled-left">
                                            <p class=" has-text-weight-bold has-text-left  is-rounded">
                                                <i class="fad fa-map-marker-alt"></i> {{bootcamp.location.city}},
                                                {{bootcamp.location.state}}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>

                <hr>

            </div>
        </div>
    </div>
</template>

<script>
  import { roundOff, thousand_separator } from "../utils";


  export default {
    data() {
      return {
        loaded: false,
        bootcamps: null,
        bootId: null

      };
    },


    mounted() {
      this.fetchBootcamp();

      //    console.log(`route area ${this.$route.params.id}`)

    },

    filters: {
      roundOff,
      thousand_separator
    },


    methods: {


      fetchBootcamp() {

        this.$http.get("/api/v1/bootcamps/")
          .then(({ data }) => {
            this.bootcamps = data;
            this.loaded = true;
          })
          .catch();

      }
    }

  };
</script>

<style scoped>


</style>
