<template>
    <div v-if="loaded">
        <div class="columns is-mobile my-5">
            <div class="column is-three-fifths is-offset-one-fifth">
                <section class="has-background-white px-5 has-text-left">
                   <GoBack class="pt-4"/>
                    <h1 class="is-size-3 py-3">Manage Courses</h1>
                    <div class="columns">
                        <div class="column is-4">
                            <figure class="image is-128x128">
                                <img :src="`/uploads/${bootcamp.data.photo}`">
                            </figure>
                        </div>
                        <div class="column is-8">
                            <h1 class="is-size-4 has-text-primary">{{bootcamp.data.name}}</h1>
                            <span class="mr-5  has-text-primary has-text-weight-bold"><i
                                    class="fas fa-map-marker-alt pr-2"></i>{{bootcamp.data.location.city}},
                                            {{bootcamp.data.location.state}}
                                </span><span class="ml-5 has-text-success has-text-weight-bold">Rating {{bootcamp.data.averageRating}}</span>
                            <p class="">{{bootcamp.data.description}}</p>
                            <router-link :to="{name:'AddCourse', params:{id:bootcamp.data._id}}"
                                         class="button is-primary my-3">Add Bootcamp Course
                            </router-link>
                        </div>
                    </div>

                    <section class="section">
                        <table class="table is-fullwidth is-striped is-hoverable">
                            <thead>
                            <tr>
                                <th>Course Title</th>

                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(course, index) in courses.data" :key="index">
                                <td>{{course.title}}</td>
                                <td>
                                    <div class="buttons">
                                        <router-link :to="{name:'UpdateCourse', params:{id:course._id}}"
                                                     class="button is-success has-text-white"><i
                                                class="fas fa-edit"></i>
                                        </router-link>
                                        <button @click="deleteCourse(course._id)"
                                                class="button is-danger has-text-white"><i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>


                            </tr>
                            </tbody>
                        </table>
                    </section>


                </section>
            </div>
        </div>

       <!-- <template>
            <json-view :data="bootcamp.data"/>
        </template>-->




    </div>
</template>

<script>
    import GoBack from "../../components/commons/GoBack";
  export default {
    components:{
      GoBack
    },
    data() {
      return {
        loaded: false,
        bootcamp: [],
        courses: []
      };
    },
    mounted() {
      this.fetchBootcamp();
      this.fetchCourses();
    },

    methods: {
      fetchBootcamp() {
        const code = this.$route.params.id;
        this.$http.get("/api/v1/bootcamps/" + code)
          .then(({ data }) => {
            this.bootcamp = data;
            this.loaded = true;
          })
          .catch();
      },
      fetchCourses() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/bootcamps/${code}/courses`)
          .then(({ data }) => {
            this.courses = data;
            this.loaded = true;
          })
          .catch();
      },
      async deleteCourse(code) {
        try {
          await this.$http.delete(`/api/v1/courses/${code}`);
          await this.fetchCourses()
          await this.$swal.fire({
            icon: "success",
            text: "Course has been deleted"
          });


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

</style>
