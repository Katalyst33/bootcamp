<template>
    <div>
        <div class="mt-5" v-if="loaded">
            <h1 class="is-size-3">Manage bootcamp</h1>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image">
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


                </div>
            </div>

            <!--           image uploader-->
            <div class="section">

                <form @submit.prevent="sendFile" enctype="multipart/form-data">

                    <div class="columns">
                        <div class="column is-half is-offset-one-quarter">
                            <article class="media">
                                <figure class="media-left">
                                    <div class="image">

                                        <div v-if="message"
                                             :class="`message ${error ? 'is-danger': 'is-success'}`"
                                        >
                                            <div class="message-body">{{message}}</div>
                                        </div>

                                        <div class="field">

                                            <div class="file is-boxed ">
                                                <label class="file-label">

                                                    <input
                                                            type="file"
                                                            ref="file"
                                                            @change="selectFile"
                                                            class="file-input"
                                                    />

                                                    <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-uploader"></i>
                            </span>
                            <span class="file-label is-size-4 has-text-primary has-text-weight-bold">
                                Choose a file...
                            </span>

                                             </span>
                                                    <span v-if="file" class="file-name">{{file.name}}</span>
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <div class="field">
                                            <button class="button is-primary mt-4">Upload File</button>
                                        </div>
                                    </div>
                                </div>
                            </article>



                        </div>
                    </div>
                </form>

            </div>
            <!--           image uploader-->

            <!--           image uploader-->
            <div class="button mx-3 is-dark">Manage Courses</div>
            <router-link :to="{name:'UpdateBootcamp',params:{id:bootcamp.data._id} }" class="button is-dark mx-3">Edit Boootcamp</router-link>
            <div  class="button is-danger mx-3">Remove bootcamp</div>

            <p>* You can only add one bootcamp per account</p>
            <p>* You must be affiliated with the bootcamp in some way in
                order to add it to the Dev camp</p>
        </div>
    </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        bootcamp: [],
        loaded: false,
        file: "",
        message: "",
        error: false
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
          console.log('bootcamp detail',data)

        } catch (e) {
          return e;
        }
      },

      // photoupload
      selectFile() {
        const file = this.$refs.file.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const MAX_SIZE = 700000;
        const tooLarge = file.size > MAX_SIZE;

        if (allowedTypes.includes(file.type) && !tooLarge) {
          this.file = file;
          this.error = false;
          this.message = "";
        } else {
          this.error = true;
          this.message = tooLarge ? `Too large. Max size is ${MAX_SIZE / 1000}kb ` : "only images are allowed";
        }

      },

      async sendFile() {
        const formData = new FormData();
        formData.append("file", this.file);
        try {
          const code = this.$route.params.id;

          await this.$http.put(`/api/v1/bootcamps/${code}/photo`, formData);
          this.message = "File has been uploaded";
          this.error = false;
          this.file = "";

        } catch (err) {
          this.message = err.response.data.error;
          this.error = true;

        }

      }
    }


  };

</script>

<style scoped>

</style>
