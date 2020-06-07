<template>
    <div>
        <!--        <h3 v-if="isUpdateCourse" class="is-size-3">{{bootcamp.data.name}} </h3>-->
        <!--        <h3 v-else class="is-size-3">{{bootcamp.data.name}} </h3>-->
        <div v-if="loaded" class="columns is-mobile mt-5">

            <div class="column is-three-fifths is-offset-one-fifth">
                <section class="has-background-white px-5 py-5 has-text-left">
                    <GoBack/>

                    <h3 v-if="isUpdateCourse" class="is-size-3">{{course.data.bootcamp.name}} </h3>
                    <h3 v-if="loadedBootcamp" class="is-size-3">{{bootcamp.data.name}} </h3>

                    <p v-if="isUpdateCourse" class="is-size-5 has-text-primary has-text-weight-bold">Edit Course</p>
                    <p v-else class="is-size-5 has-text-primary has-text-weight-bold">Add a new Course</p>

                    <div class="field my-4">
                        <label class="label">Course Title:</label>
                        <div class="control">
                            <input v-model="course.data.title" class="input" type="text" placeholder="Course title">
                        </div>
                    </div>
                    <div class="field my-4">
                        <label class="label">Duration:(Weeks)</label>
                        <div class="control">
                            <input v-model="course.data.weeks" class="input" type="number" placeholder="Duration"
                                   number>
                        </div>
                    </div>
                    <div class="field my-4">
                        <label class="label">Course Tuition:</label>
                        <div class="control">
                            <input v-model="course.data.tuition" class="input" type="number"
                                   placeholder="Course Tuition" number>
                        </div>
                    </div>

                    <div class="control">
                        <label class="label">Minimum Skill level</label>
                        <div class="select">
                            <select v-model="course.data.minimumSkill">
                                <option disabled value="null">Click to select</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div class="field my-4">
                        <div class="control">
                            <textarea v-model="course.data.description" class="textarea"
                                      placeholder="Course description Summary"></textarea>
                            <small>No more than 500 characters</small>
                        </div>
                    </div>

                    <div class="control">
                        <label class="check-box">
                            <input v-model="course.data.scholarshipAvailable" type="checkbox">
                            <span class="checkmark"></span>
                            Scholarship Available
                        </label>
                    </div>

                    <button v-if="isUpdateCourse" @click="updateCourse" class="button is-primary px-5 mt-4">Update
                        Course
                    </button>

                    <button v-else @click="newCourse" class="button is-primary px-5 mt-4">Add Course</button>


                </section>

            </div>
        </div>
        <h1>Course</h1>

    </div>
</template>

<script>

    import GoBack from "../../components/commons/GoBack";
  import Chance from "chance";

  const chance = new Chance;
  export default {
    components:{
      GoBack
    },
    data() {
      return {
        loaded: false,
        loadedBootcamp:false,
        bootcamp: [],
        course: {
          data: {
            weeks: chance.integer({ min: 2, max: 7 }),
            description: chance.paragraph({ sentences: 2 }),
            tuition: chance.integer({ min: 1000, max: 3000 }),
            minimumSkill: ["beginner", "intermediate", "advanced"][chance.integer({ min: 0, max: 2 })],
            scholarshipAvailable: [true, false][chance.integer({ min: 0, max: 1 })]

          }
        }

      };
    },

    computed: {
      isUpdateCourse() {
        return ["UpdateCourse"].includes(this.$route.name);
      },
      /* eslint-disable no-unused-vars */

      newCourseData() {
        const { _id, id, ...other } = this.course.data;
        return other;
      }
      /* eslint-disable no-unused-vars */

    },

    mounted() {


      this.makeRequest();
    },

    methods: {

      async fetchBootcamp() {

        try {
          const code = this.$route.params.id;
          const { data } = await this.$http.get(`/api/v1/bootcamps/${code}`);
          this.bootcamp = data;
          this.loadedBootcamp =true;


        } catch (e) {
          return e;
        }

      },
      fetchCourse() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/courses/${code}`)
          .then(({ data }) => {
            this.course = data;
            this.loaded = true;
          })
          .catch();
      },

      async newCourse() {
        const code = this.$route.params.id;
        try {
          await this.$http.post(`/api/v1/bootcamps/${code}/courses/`, this.course.data);
          await this.$swal.fire({
            icon: "success",
            text: "Course was  added Successfully"
          });
          await this.$router.push({ name: "ManageCourse" });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });

        }
      },

      async updateCourse() {
        try {
          const code = this.$route.params.id;
          await this.$http.put(`/api/v1/courses/${code}`, this.newCourseData);
          await this.$swal.fire({
            icon: "success",
            text: "Course was Updated Successfully, you will now be redirected"
          });
          await this.$router.push({ name: "ManageCourse" });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });
        }
      },


      makeRequest() {
        if (this.isUpdateCourse) {
          this.fetchCourse();
        } else {
          this.fetchBootcamp();
          this.loaded = true;
        }
      }

    }

  };
</script>

<style scoped>
    /* The container */
    .check-box {

        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .check-box input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #aaa8a8;
    }

    /* On mouse-over, add a grey background color */
    .check-box:hover input ~ .checkmark {
        background-color: #a1a0a0;
    }

    /* When the checkbox is checked, add a blue background */
    .check-box input:checked ~ .checkmark {
        background-color: #5e53a5;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .check-box input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .check-box .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
