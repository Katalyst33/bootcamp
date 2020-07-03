<template>
    <div id="account">
        <h3 class="has-text-left is-size-3 font-weight-bold pl-5 py-3">{{currentRouteName}}</h3>
    <hr class="has-background-grey mx-5 my-0">
        <div class="columns">
            <div class="column is-narrow-desktop">
             <div class="vl px-5 has-text-left">
                <p class="py-3 is-size-4 has-text-weight-bold"> <router-link :to="{name:'UpdateAccount'}" >Account Info</router-link>
                </p>
                 <p class="py-3 is-size-4 has-text-weight-bold"> <router-link :to="{name:'Enrollments'}" >Enrollments</router-link>
                 </p>
                 <p class="py-3 is-size-4 has-text-weight-bold"> <router-link :to="{name:'Reviews'}" >Reviews</router-link>
                 </p>
                 <p class="py-3 is-size-4 has-text-weight-bold"> <router-link :to="{name:'Transactions'}" >Transactions</router-link>
                 </p>


             </div>


            </div>
            <div class="column">
                <router-view></router-view>

            </div>
        </div>




    </div>
</template>

<script>
  export default {
    data() {
      return {
        // key: value
      };
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  };
</script>

<style scoped>
    #account{
     height: 100vh;
    }
    .vl {
        border-right: 1px solid #c9c7c7;
        height: 500px;
    }



    @media screen and (max-width: 1023px) {
        .vl{
            border-right: 1px solid #c9c7c7;
            height: auto;
        }
    }
</style>
