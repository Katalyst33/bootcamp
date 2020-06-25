<template>
    <div>

        <div class="section">
            <div class="container">
                <div class="has-text-left">
                    <h1 class="is-size-2">Add bootcamp</h1>
                    <p>Important: you must be affiliated with a bootcamp to add to Devcamper</p>

                </div>

                <div class="columns mt-5  has-text-left">

                    <div class="column has-background-white mx-2">
                        <div>
                            <h1 class="is-size-4">Location & Contact</h1>
                            <p>If multiple locations, use the ,main or largest</p>
                        </div>
                        <section class="py-3 px-2">
                            <div class="field">
                                <label class="label">Name:</label>
                                <div class="control">
                                    <input v-model="bootcamp.data.name" class="input" type="text"
                                           placeholder="Bootcamp name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Address:</label>
                                <div class="control">
                                    <input v-model="computedAddress" class="input" type="text"
                                           placeholder="Street, city, state, etc">
                                    <small class="has-text-danger">Street, city, state, etc</small>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Phone number:</label>
                                <div class="control">
                                    <input v-model="bootcamp.data.phone" class="input" type="text"
                                           placeholder="Phone number ?">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Email:</label>
                                <div class="control">
                                    <input v-model="bootcamp.data.email" class="input" type="text"
                                           placeholder="youremail@domain.com">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Website:</label>
                                <div class="control">
                                    <input v-model="bootcamp.data.website" class="input" type="text"
                                           placeholder="http://www.website.com">
                                </div>
                            </div>


                        </section>

                    </div>
                    <div class="column has-background-white mx-2">
                        <h1 class="is-size-3">Other information</h1>
                        <section class="py-3 px-2">


                            <div class="field">
                                <label class="label">Description:</label>
                                <div class="control">
                                    <textarea v-model="computedDescription" class="textarea"
                                              placeholder="Description (What you offer)"></textarea>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Careers:</label>
                                <small class="has-text-danger is-hidden-touch">hold Shift key and click to select
                                    multiple</small>
                                <div class="control">
                                    <div class="select is-multiple">
                                        <select v-model="bootcamp.data.careers" multiple size="6">
                                            <option disabled value="null">Click to select</option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="Mobile Development">Mobile Development</option>
                                            <option value="UI/UX">UI/UX</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="Business">Business</option>
                                            <option value="Other">Other</option>

                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div class="field py-3">
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="bootcamp.data.housing" type="checkbox">
                                        <span class="checkmark"></span>
                                        Housing
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="bootcamp.data.jobAssistance" type="checkbox">
                                        <span class="checkmark"></span>
                                        Job Assistance
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="bootcamp.data.jobGuarantee" type="checkbox">
                                        <span class="checkmark"></span>
                                        Job Guarantee
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="bootcamp.data.acceptsGi" type="checkbox">
                                        <span class="checkmark"></span>
                                        Accepts GI Bill
                                    </label>
                                </div>
                            </div>


                            <div class="field is-grouped">
                                <div class="control">
                                    <template>
                                        <button v-if="isUpdateBootcamp" @click="updateBootcamp"
                                                class="button is-primary  mr-4">Update Bootcamp
                                        </button>
                                        <button v-else @click="newBootcamp" class="button is-primary mr-4">Add
                                            bootcamp
                                        </button>
                                    </template>


                                </div>


                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
  import Chance from "chance";

  const chance = new Chance;
  export default {
    data() {

      return {
        bootcamp: {
          data: {
            name: "",
            address: null,
            phone: chance.phone(),
            email: chance.email(),
            website: chance.url(),
            description: chance.paragraph({ sentences: 2 }),
            careers: [],
            housing: [true, false][chance.integer({ min: 0, max: 1 })],
            jobAssistance: [true, false][chance.integer({ min: 0, max: 1 })],
            jobGuarantee: [true, false][chance.integer({ min: 0, max: 1 })],
            acceptsGi: [true, false][chance.integer({ min: 0, max: 1 })]
          }
        },
        message: null

      };
    },

    watch: {
      newAddress() {
        this.bootcamp.data.address = this.computedAddress;
      }
    },

    computed: {
      computedAddress() {
        return `${chance.street({ country: "us" })},${chance.city()}, ${chance.state({ country: "us" })}`;
      },

      isUpdateBootcamp() {
        return ["UpdateBootcamp"].includes(this.$route.name);
      },

      computedDescription() {
        return `${this.bootcamp.data.name} ${chance.paragraph({ sentences: 2 })}`;
      },
      /* eslint-disable no-unused-vars */

      newBootcampData() {
        const { _id, id, ...other } = this.bootcamp.data;
        return other;
      }
      /* eslint-disable no-unused-vars */

    },

    mounted() {

      this.makeRequest();

    },

    methods: {

      changeAddress() {
        this.bootcamp.data.address = this.computedAddress;
      },


      async newBootcamp() {
        try {
          await this.changeAddress();
          const { data: { bootcamp } } = await this.$http.post("/api/v1/bootcamps/", this.newBootcampData);
             this.$swal.fire({
            icon: "success",
            text: "Bootcamp created Successfully"
          });

          await this.$router.push({ name: "ManageBootcamp", params: { id: bootcamp._id } });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });

        }
      },

      async updateBootcamp() {
        try {
          const code = this.$route.params.id;
          await this.$http.put(`/api/v1/bootcamps/${code}`, this.newBootcampData);
          await this.$swal.fire({
            icon: "success",
            text: "Bootcamp Updated Successfully, you will now be redirected"
          });

        } catch (error) {
          await this.$swal.fire({
            icon: "error",
            text: `${error.response.data.error}`
          });
        }
      },

      fetchBootcamp() {
        const code = this.$route.params.id;
        this.$http.get("/api/v1/bootcamps/" + code)
          .then(({ data }) => {
            this.bootcamp = data;
            this.loaded = true;
          })
          .catch();
      },


      makeRequest() {
        if (this.isUpdateBootcamp) {
          this.fetchBootcamp();
        }
      }


    }


  };
</script>

<style scoped>

    .bootcamp {
        height: 100vh;
    }

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
