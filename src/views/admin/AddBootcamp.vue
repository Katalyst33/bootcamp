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
                                    <input v-model="form.bootcampName" class="input" type="text"
                                           placeholder="Bootcamp name ?">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Address:</label>
                                <div class="control">
                                    <input v-model="form.address" class="input" type="text"
                                           placeholder="Bootcamp address ?">
                                    <small class="has-text-danger">Street, city, state, etc</small>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Phone number:</label>
                                <div class="control">
                                    <input v-model="form.phoneNumber" class="input" type="text"
                                           placeholder="Bootcamp name ?">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Email:</label>
                                <div class="control">
                                    <input v-model="form.email" class="input" type="text" placeholder="Bootcamp name ?">
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Website:</label>
                                <div class="control">
                                    <input v-model="form.website" class="input" type="text"
                                           placeholder="Bootcamp name ?">
                                </div>
                            </div>


                        </section>

                    </div>
                    <div class="column has-background-white mx-2">
                        <h1 class="is-size-3">Other infomation</h1>
                        <section class="py-3 px-2">


                            <div class="field">
                                <label class="label">Description:</label>
                                <div class="control">
                                    <textarea v-model="form.description" class="textarea"
                                              placeholder="Description (What you offer)"></textarea>
                                </div>
                            </div>


                            <div class="field">
                                <label class="label">Careers:</label>
                                <small class="has-text-danger is-hidden-touch">hold Shift key and click to select
                                    multiple</small>
                                <div class="control">
                                    <div class="select is-multiple">
                                        <select v-model="form.careers" multiple size="6">
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
                                        <input v-model="form.housing" type="checkbox">
                                        <span class="checkmark"></span>
                                        Housing
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="form.jobAssistance" type="checkbox">
                                        <span class="checkmark"></span>
                                        Job Assistance
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="form.jobGuarantee" type="checkbox">
                                        <span class="checkmark"></span>
                                        Job Guarantee
                                    </label>
                                </div>
                                <div class="control">
                                    <label class="check-box">
                                        <input v-model="form.acceptsGi" type="checkbox">
                                        <span class="checkmark"></span>
                                        Accepts GI Bill
                                    </label>
                                </div>
                            </div>


                            <div class="field is-grouped">
                                <div class="control">
                                    <button @click="newBootcamp" class="button is-link">Submit</button>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>
        <hr class="has-background-warning">

        <template>
            <json-view :data="form"/>
        </template>


    </div>
</template>

<script>
    import axios from "axios"
  export default {
    data() {
      return {
        message:null,
        form: {
          bootcampName: null,
          address: null,
          phoneNumber: null,
          email: null,
          website: null,
          description: null,
          careers: [],
          housing: false,
          jobAssistance: false,
          jobGuarantee: false,
          acceptsGi: false
        }
      };
    },

    methods:{


      async newBootcamp() {
       /* function navigate(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }*/

        try {
          await axios.post('/api/v1/bootcamps/', this.form);
          // this.traderCode = data;


          this.message = 'Trader Created Successfully ';
          console.log(this.message)
          // await navigate(2000);
          // return this.$router.push({name: 'editTrader', params:{id:this.traderCode.data.createdTraders.code}});

        } catch (err) {
          this.message = err;
        }


      },
    },


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
