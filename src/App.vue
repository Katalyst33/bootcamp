<template>
    <div id="app">
        <!--        <TheNavBar v-if="!isAdminPage"/>-->
        <TheNavBar3 v-if="!isAdminPage"/>

   <!--      <transition
                 name="fade"
                 mode="out-in"
         >-->
        <router-view v-if="loaded"/>

<!--                </transition>-->
        <TheFooter/>

    </div>
</template>

<script>

  import TheNavBar3 from "./components/commons/TheNavBar3";
  import TheFooter from "./components/commons/TheFooter";
  import { mapState } from "vuex";

  export default {
    components: {
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

      ...mapState(["user", "carts"]),

      isAdminPage() {
        const pages = ["AllBootcampX", "ManageReviews", "AllBootcampX", "AllUsers", "UpdateUser", "AddBootcamp", "ManageBootcamp"];
        return pages.includes(this.$route.name);

      }

    },
    mounted() {
      this.getMe();


    },

    methods: {
      getMe() {
        if (this.user) {
          this.$store.dispatch("getCurrentUser");
          this.$store.dispatch("getCartItem");

        }
      }
    }

  };


</script>


<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.9s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

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

