<template>
    <div class="columns">
        <div class="column is-4 avatar">
            <img class="profile__pix" src="/img/assets/user.png">
            <div class="pl-3 has-text-left">
                <p class="is-capitalized">{{agoDate}}</p>

                <p class="has-text-weight-bold">{{review.user.name}}</p>
            </div>
        </div>
        <div class="column has-text-left">


            <div class="m-0 ml-md-3">
                <p class="is-size-5 has-text-weight-bold"> Rating: {{review.rating}}</p>
                <p class="is-size-5 is-capitalized">{{review.title}}</p>
                <p class="is-size-6 ">{{review.text}}</p>
                <template v-if="course.data.enrolled">
                    <template v-if="review.user._id === user._id ">
                        <a class="has-text-primary is-size-6">
                            <router-link
                                    :to="{name:'UpdateReview', params:{reviewId:review._id}}">
                                Edit <i class="fal fa-edit px-1"></i></router-link>
                            <span @click="deleteReview(review._id)"
                                  class="px-2">Delete<i
                                    class="far fa-trash-alt px-1"></i></span></a>

                    </template>

                </template>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: "ReviewsComponent",
    props: {
      agoDate: {},
      course: {},
      deleteReview: {},
      review: {},
      user: {}
    }
  };
</script>

<style  scoped>


    .review {
        display: flex;
    }
    .user-info {
        display: flex;
    }
    .avatar {
        display: flex;
    }
    .profile__pix {
        height: 50px;
        width: 50px;
        margin-left: 10px;
    }
</style>
