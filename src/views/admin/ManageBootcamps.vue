<template>
    <div>
        <div class="mt-5" v-if="loaded">
            <h1 class="is-size-3">Manage bootcamp</h1>
            <div class="columns is-mobile">
                <div class="column is-half-desktop is-offset-one-quarter-desktop px-0 px-sm-5">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image">
                                <img v-if="!newImg" :src="`/img/assets/${bootcamp.data.photo}`" alt="Placeholder image">
                                <img v-else :src="imageData" alt="Placeholder image">
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
                    <div class="section">

                    <form @submit.prevent="sendFile" enctype="multipart/form-data">

                        <div class="columns">
                            <div class="column is-half is-offset-one-quarter">
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
                                                    accept="image/*"/>

                                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-uploader"></i>
                            </span>
                            <span class="file-label is-size-5 has-text-primary has-text-weight-bold">
                                Choose a file...
                            </span>
                                            <span class="image-preview" xv-if="imageData.length > 0">
                                <img class="preview" :src="imageData">
                            </span>

                                             </span>
                                            <span v-if="file" class="file-name">{{file.name}}</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="field">
                                    <button class="button is-primary mt-4" :disabled="uploadBtn">Upload File</button>
                                </div>

                                <article class="media">
                                    <figure class="media-left">
                                        <div class="image">


                                        </div>
                                    </figure>

                                    <div class="media-content">
                                        <div class="content">

                                        </div>
                                    </div>
                                </article>





                            </div>
                        </div>
                    </form>

                    </div>

                </div>
            </div>

            <!--           image uploader-->



            <!--           image uploader-->

            <!--           image uploader-->
            <router-link :to="{name:'ManageCourse',params:{id:bootcamp.data._id} }"  class="button  is-success has-text-white  mx-3">Manage Courses</router-link>
            <router-link :to="{name:'UpdateBootcamp',params:{id:bootcamp.data._id} }" class="button is-success has-text-white mx-3">Edit Boootcamp</router-link>
            <div @click="deleteBootcamp" class="button is-danger mx-3">Remove bootcamp</div>

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
        newImg:false,
        uploadBtn:true,
        imageData:'',
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

        } catch (e) {
          return e;
        }
      },

      // photoupload
      selectFile(event) {

        const file = this.$refs.file.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const MAX_SIZE = 700000;
        const tooLarge = file.size > MAX_SIZE;

        if (allowedTypes.includes(file.type) && !tooLarge) {
          this.file = file;
          this.error = false;
          this.message = "";
          this.newImg = true;
          this.uploadBtn=false;
          let input = event.target;
          if(input.files && input.files[0]){
            let reader = new FileReader()
            reader.onload = (e) =>{
              this.imageData = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
          }

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

      },
      async deleteBootcamp(){
        try {
          const code = this.$route.params.id;
          await  this.$http.delete("/api/v1/bootcamps/" + code)
          await this.$swal.fire({
            icon: "success",
            text: "Bootcamp has been deleted"
          });
          await this.$router.push({name:'AllBootcampX'})
        }catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });
        }
      },
    }


  };

</script>

<style scoped>

</style>
