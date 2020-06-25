<template>
    <div id="app">
<!--        <TheNavBar v-if="!isAdminPage"/>-->
        <TheNavBar3 v-if="!isAdminPage"/>
        <router-view v-if="loaded"/>
        <TheFooter/>

    </div>
</template>

<script>

  // import TheNavBar from "./components/commons/TheNavBar";
  import TheNavBar3 from "./components/commons/TheNavBar3";
  import TheFooter from "./components/commons/TheFooter";
  import { mapState } from "vuex";

  export default {
    components: {
      // TheNavBar,
      TheNavBar3,
      TheFooter
    },
    data() {
      return {

        loaded: true,
        userDetail: null
      };
    },

    computed: {

      ...mapState(["user"]),

      isAdminPage(){
        const pages = ["AllBootcampX","ManageReviews","AllBootcampX","AllUsers","UpdateUser","AddBootcamp","ManageBootcamp"]
        return pages.includes(this.$route.name);

      }

    },
    mounted() {
      this.getMe();
    },

    methods: {
      async getMe() {
        try {
       await this.$store.dispatch("getCurrentUser");
        // await console.log('get me data', data)

        } catch (error) {
          // return console.log('get me error',error)
        }
      }
    },



  };


</script>


<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Khula:wght@300;400;600;700;800&display=swap');

    #app {
        font-family: 'Khula', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
    }


    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>

