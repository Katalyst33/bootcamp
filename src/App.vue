<template>
  <div id="app">
    <TheNavBar/>

    <router-view/>
    <TheFooter/>

  </div>
</template>

<script>
  import TheNavBar from "./components/commons/TheNavBar";
  import TheFooter from "./components/commons/TheFooter";
  export default {
components:{
  TheNavBar,
  TheFooter
},

    mounted() {
      this.$store.dispatch("getCurrentUser");
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

