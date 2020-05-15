<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>
        <h3 class="has-text-warning">All Bootcamps</h3>

        <div v-for="(bootcamp, index) in bootcamps.data" :key="index">

            <p>{{index}}</p>
            <p>{{bootcamp.name}}</p>
            <img :src="`uploads/${bootcamp.photo}`">
        </div>
        <!--    <div
                    v-for="bootcamp in bootcamps"

                    v-bind:key="bootcamp._id"
            >

              <div v-for="(bootcamp, index) in bootcamp"
                   :bootcamp="bootcamp"
                   :index="index"
                   :key="bootcamp._id">
                <p>{{bootcamp.name}}</p>
                <p>{{bootcamp.email}}</p>
                <img :src="`uploads/${bootcamp.photo}`" >




              </div>
              </div>-->

    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "HelloWorld",
    props: {
      msg: String
    },
    data() {
      return {
        bootcamps: [],
        error: ""
      };
    },

    mounted() {
      this.fetchBootcamp();
    },

    methods: {


      fetchBootcamp() {

        axios.get("/api/v1/bootcamps/")
          .then(({ data }) => {
            this.bootcamps = data;
            this.loaded = true;

          })
          .catch();

      }
    }
  };


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
