<template>
    <div>
        <h1 class="text-danger is-size-3 has-text-weight-bold">Course View</h1>
        <hr class="has-background-dark">
        <h1 class="is-size-5 has-text-danger has-text-weight-bold">Course Details</h1>

        <template v-if="loaded">
            <json-view :data="course.data"/>
        </template>
        <h1 class="is-size-5 has-text-danger has-text-weight-bold">Course Reviews</h1>

        <template v-if="loaded">
            <json-view :data="data"/>
        </template>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        reviews: [],
        loaded: false,
        course: []

      };
    },

    mounted() {
      this.fetchReviews();
      this.fetchCourse();
    },

    methods: {
      fetchCourse() {
        const code = this.$route.params.id;
        this.$http.get("/api/v1/courses/" + code)
          .then(({ data }) => {
            this.course = data;
            this.loaded = true;
          })
          .catch();
      },

      fetchReviews() {
        const code = this.$route.params.id;
        this.$http.get(`/api/v1/courses/${code}/reviews`)
          .then(({ data }) => {
            this.reviews = data;
            this.loaded = true;
            console.log(this.reviews);
          })
          .catch();
      }

    }

  };
</script>

<style scoped>

</style>
