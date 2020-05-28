<template>
    <div>
<button @click="goBack" class="button is-dark">Go back</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // key: value
      };
    },
    methods:{
      goBack(){
        return this.$router.go(-1)
      },
    }

  };
</script>

<style scoped>

</style>
