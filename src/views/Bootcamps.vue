<template>
    <div>
        <h1 class="is-size-1 has-text-primary">
            All Bootcamps here
        </h1>

        <div class="section">
            <div class="">
                <div class="columns">
                    <div class="column">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="/img/null-devcamp-dark.png" alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <div class="has-background-success">
                                            <p class="has-text-white has-text-weight-bold is-size-4 px-2">6.7</p>
                                        </div>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4 has-text-primary">Devworks Bootcamp</p>

                                    </div>
                                </div>

                                <div class="content">
                                    <p class="has-text-justified">
                                        Web Development, UI/UX, Mobile Development.
                                    </p>
                                </div>
                              <div class="is-clearfix">
                                  <div class="is-pulled-left">
                                      <p class=" has-text-weight-bold has-text-left  is-rounded"  >
                                          <i class="fad fa-map-marker-alt"></i>  Boston, MA
                                      </p>
                                  </div>
                              </div>

                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png"
                                         alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png"
                                                 alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>

                                <div class="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                    <a href="#">#css</a> <a href="#">#responsive</a>
                                    <br>
                                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png"
                                         alt="Placeholder image">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png"
                                                 alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>

                                <div class="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                    <a href="#">#css</a> <a href="#">#responsive</a>
                                    <br>
                                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {

        devCamps: [
          {
            image: null,
            name: null,
            rating:null,

          }
        ]
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

<style scoped>

</style>
