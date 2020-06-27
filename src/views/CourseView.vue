<template>
    <div>
        <h1>Course View</h1>

        <template v-if="loaded">
            <json-view :data="data" />
        </template>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        reviews:[],
        loaded: false,

      };
    },

    mounted() {
      this.fetchReviews();
    },

    methods:{
      fetchReviews() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/courses/${code}/reviews`)
          .then(({ data }) => {
            this.reviews = data;
            this.loaded = true;
            console.log(this.reviews)
          })
          .catch();
      },

    },

  };
</script>

<style scoped>

</style>
