<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column -is-8 has-text-left">
                        <div v-for="(bootcamp, index) in bootcamps" :key="index">



                            <div class="has-text-left">
                                <h1 class="is-size-2 has-text-weight-semibold">{{bootcamp.name}}</h1>
                                <p class="py-3">Devworks is a full stack JavaScript Bootcamp located in the heart of
                                    Boston that focuses
                                    on the technologies you need to get a high paying job as a web developer</p>
                                <h4 class="is-size-5 has-text-weight-semibold ">Average Course Cost:<span
                                        class="has-text-primary">$10,000</span></h4>
                            </div>

                            <div class="my-3">
                                <div class="box-border ">
                                    <div class="has-background-primary">
                                        <h1 class="is-size-4 has-text-weight-semibold has-text-white px-3 py-1">Front
                                            End Web Development</h1>
                                    </div>
                                    <div class="px-3 py-4">
                                        <h3 class="is-size-5 has-text-weight-semibold">Duration: 8 Weeks</h3>
                                        <p class="py-2">This course will provide you with all of the essentials to
                                            become a successful
                                            frontend web developer. You will learn to master HTML, CSS and front end
                                            JavaScript,
                                            along with tools like Git, VSCode and front end frameworks like Vue</p>
                                        <ul class="py-2 has-text-weight-semibold">
                                            <li class="my-2"><i class="fad fa-money-bill-wave pr-2"></i>Cost:<span
                                                    class="is-size-5 has-text-weight-semibold">$8,000 USD</span></li>
                                            <li class="my-2"><i class="fad fa-lightbulb-on pr-2"></i>Skill Required:
                                                <span class="is-size-5 has-text-weight-semibold">Beginner</span></li>
                                            <li class="my-2"><i class="fad fa-graduation-cap pr-2"></i>Scholarship
                                                Available: Yes
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="column is-4">
                        <div class="box">
                            <img src="/img/null-devcamp-dark.png">

                            <p class="has-text-left has-text-dark "><span
                                    class="px-2 is-size-3 has-text-success font-weight-bold ">8.8</span> Rating</p>
                            <ul class="has-text-left">
                                <hr>

                                <li><i class="fas fa-home-alt pr-2"></i>Housing:<i
                                        class="fas fa-check-circle has-text-success is-size-5 px-3"></i></li>
                                <hr>
                                <li><i class="fad fa-user-cog pr-2"></i>Job Assistance: <i
                                        class="fas fa-check-circle has-text-success is-size-5 px-3"></i></li>
                                <hr>

                                <li><i class="fas fa-users-cog pr-2"></i>Job Guarantee: <i
                                        class="fas fa-check-circle has-text-success is-size-5 px-3"></i></li>
                                <hr>
                                <li>Accepts GI Bill: <i class="fas fa-check-circle has-text-success is-size-5 px-3"></i>
                                </li>
                                <hr>
                            </ul>


                            <button class="button is-dark my-2">Read Reviews</button>
                            <button class="button is-dark my-2">Write a Review</button>
                            <button class="button is-dark my-2">Visit Website</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <hr>
        <template>
            <json-view :data="bootcamps.data"/>
        </template>

    </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        bootcamps: []
      };
    },

    mounted() {
      this.viewBootcamp();
    },

    methods: {
      viewBootcamp() {
        const code = this.$route.params.id;
        axios.get("/api/v1/bootcamps/" + code)
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
    .box-border {
        border-style: solid;
        border-color: #d7d7d7;
        border-width: 1px
    }

    .dot {
        height: 25px;
        width: 25px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }


</style>
