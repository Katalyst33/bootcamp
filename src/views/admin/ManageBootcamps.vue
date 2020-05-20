<template>
    <div>
        <section v-if="loaded" class="has-background-white">
            <h1 class="is-size-3">Manage bootcamp</h1>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-128x128">
                                <img :src="`/uploads/${bootcamp.data.photo}`" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <div class="has-background-success">
                                        <p class="has-text-white has-text-weight-bold is-size-4 px-2">
                                            {{bootcamp.data.averageRating}}</p>
                                    </div>
                                </div>
                                <div class="media-content">

                                    <!--                                                {{bootcamp._id}}-->

                                    <router-link :to="{name:'Bootcamp' , params:{id:bootcamp.data._id}}"
                                                 class="title is-4 has-text-primary">{{bootcamp.data.name}}
                                    </router-link>
                                </div>
                            </div>

                            <div class="content">
                                <p class="has-text-justified">
                                    {{bootcamp.data.description}}
                                </p>
                            </div>
                            <div class="is-clearfix">
                                <div class="is-pulled-left">
                                    <p class=" has-text-weight-bold has-text-left  is-rounded">
                                        <i class="fad fa-map-marker-alt"></i> {{bootcamp.data.location.city}},
                                        {{bootcamp.data.location.state}}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="my-5">
                        <div class="file has-name is-right">
                            <label class="file-label">

                                <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label">
        Choose a file…
      </span>
    </span>
                                <span class="file-name">
      Screen Shot 2017-07-29 at 15.54.25.png
    </span>
                            </label>

                        </div>
                        <button @click="uploadPhoto" class="button is-dark my-3 ">Uplaod Photo</button>
                    </div>

                </div>
            </div>


            <div class="button">Edit Bootcamp</div>
            <div class="button">Manage Courses</div>
            <div class="button">Remove bootcamp</div>

            <p>* You can only add one bootcamp per account</p>
            <p>* You must be affiliated with the bootcamp in some way in
                order to add it to the Dev camp</p>
        </section>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        bootcamp: [],
        loaded: false
      };
    },

    mounted() {
      this.fetchBootcamp();
    },
    methods: {
      async fetchBootcamp() {
        try {
          const code = this.$route.params.id;
          const { data } = await this.$http.get("/api/v1/bootcamps/" + code);
          this.bootcamp = data;
          this.loaded = true;

        } catch (e) {
          return e;
        }
      },

      async uploadPhoto() {

        try {
          const code = this.$route.params.id;
          await this.$http.post(`/api/v1/bootcamps/${code}/photo`);

        } catch {
          return;
        }


      }

    }


  };

</script>

<style scoped>

</style>
