<template>
    <div>
        <Breadcrumbs/>
        <template>
            <div v-if="loaded === true" class="section">
                <div class="container">
                    <div class="columns">


                        <div class="column is-8 has-text-left">
                            <template>
                                <div>
                                    <div class="has-text-left">
                                        <h1 class="is-size-2 has-text-weight-semibold">{{bootcamp.data.name}}</h1>
                                        <p class="py-3">{{bootcamp.data.description}}</p>
                                        <h4 class="is-size-5 has-text-weight-semibold ">Average Course Cost:<span
                                                class="has-text-primary">${{bootcamp.data.averageCost | thousand_separator}}</span>
                                        </h4>
                                    </div>
                                    <hr>
                                    <div v-if="courses.data">
                                        <template v-for="(course, index) in courses.data">
                                            <div :key="index">
                                                <div class="my-3">
                                                    <div class="box">
                                                        <div class="title-area">
                                                            <h1 class="is-size-3 has-text-weight-bold has-text-primary is-capitalized px-3">
                                                                {{course.title}}</h1>
                                                            <h1 v-if="course.enrolled" class="is-size-4 has-text-success"><i class="fas fa-star is-size-3"></i>
                                                                Enrolled</h1>
                                                        </div>
                                                        <hr class="line">
                                                        <div class="px-3 py-4">
                                                            <h3 class="is-size-5 has-text-weight-semibold">Duration:
                                                                {{course.weeks}} weeks</h3>
                                                            <p class="py-2">{{course.description}}</p>
                                                            <ul class="py-2 has-text-weight-semibold">
                                                                <li class="my-2"><i
                                                                        class="fad fa-money-bill-wave pr-2"></i>Cost:<span
                                                                        class="is-size-5 has-text-weight-semibold">${{course.tuition | thousand_separator}}</span>
                                                                </li>
                                                                <li class="my-2"><i
                                                                        class="fad fa-lightbulb-on pr-2"></i>Skill
                                                                    Required:
                                                                    <span class="is-size-5 has-text-weight-semibold">{{course.minimumSkill}}</span>
                                                                </li>
                                                                <li class="my-2"><i
                                                                        class="fad fa-graduation-cap pr-2"></i>Scholarship
                                                                    Available:
                                                                    <i v-if="course.scholarshipAvailable === true "
                                                                       class="fas fa-check-circle has-text-success is-size-4"></i>
                                                                    <i v-else
                                                                       class="fas fa-times-circle  has-text-danger  is-size-4 px-3"></i>

                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <router-link :to="{name:'ViewCourse', params:{id:course._id}} "
                                                                         class="button is-grey is-outlined is-primary "> View Details
                                                            </router-link>
                                                            <router-link v-if="!course.isFree" :to="{name:'Cart'} "
                                                                         class="button is-danger  is-primary is-pulled-right"> Add to Cart
                                                            </router-link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </template>
                                    </div>

                                    <div v-else>
                                        <h4 class="is-size-3">No courses available...</h4>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div class="column is-4">
                            <div class="box">
                                <img :src="`/uploads/${bootcamp.data.photo}`">

                                <p class="has-text-left has-text-dark "><span
                                        class="px-2 is-size-3 has-text-success font-weight-bold ">{{bootcamp.data.averageRating | roundOff}}</span>
                                    Rating</p>
                                <ul class="has-text-left">
                                    <hr>

                                    <li><i class="fas fa-home-alt pr-2"></i>Housing:
                                        <i v-if="bootcamp.data.housing === 'true'"
                                           class="fas fa-check-circle has-text-success is-size-4 px-3"></i>
                                        <i v-else class="fas fa-times-circle has-text-danger is-size-4"></i>
                                    </li>
                                    <hr>
                                    <li><i class="fad fa-user-cog pr-2"></i>Job Assistance:
                                        <i v-if="bootcamp.data.jobAssistance === true"
                                           class="fas fa-check-circle has-text-success is-size-4 px-3"></i>
                                        <i v-else class="fas fa-times-circle has-text-danger is-size-4"></i>
                                    </li>
                                    <hr>
                                    <li><i class="fas fa-industry-alt pr-2"></i>Job Guarantee:
                                        <i v-if="bootcamp.data.jobGuarantee === true"
                                           class="fas fa-check-circle has-text-success is-size-5 px-3"></i>
                                        <i v-else class="fas fa-times-circle has-text-danger is-size-4"></i>
                                    </li>
                                    <hr>
                                    <li>Accepts GI Bill:
                                        <i v-if="bootcamp.data.acceptGi === true"
                                           class="fas fa-check-circle has-text-success is-size-4 px-3"></i>
                                        <i v-else class="fas fa-times-circle has-text-danger is-size-4"></i>
                                    </li>
                                    <hr>
                                </ul>

                                <router-link :to="{name:'Reviews', params:{id:bootcamp.data._id}} "
                                             class="button is-dark my-2 mx-3">Read Reviews
                                </router-link>
                                <router-link :to="{name:'AddReview', params:{id:bootcamp.data._id}}"
                                             class="button is-dark my-2">Write a Review
                                </router-link>
                                <button class="button is-dark my-2 mx-2">Visit Website</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </template>


    </div>
</template>

<script>

  import { roundOff, thousand_separator } from "../utils";

  export default {
    data() {
      return {
        viewCourse: false,
        loaded: false,
        bootcamp: [],
        courses: []
      };
    },
    filters: {
      roundOff,
      thousand_separator
    },

    computed: {
      isEnrolled() {
        return true;

      }
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




    }

  };
</script>

<style scoped>
    .box-border {
        border-style: solid;
        border-color: #d7d7d7;
        border-width: 1px;
        border-radius: 10px;
        background-color: #ffffff;
    }

    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }

    .line {
        margin: 0;
    }

    .title-area{
        display: flex;
        justify-content: space-between;
    }

</style>
