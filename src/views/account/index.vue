<template>
    <div id="account">
     <div class="section bo">
         <div class="container">
             <div class="box">
                 <h3 class="has-text-left is-size-3 font-weight-bold pl-5 py-3">{{currentRouteName}}</h3>
                 <div class="">
                     <div class="">

                      <!-- <div class="tabs pl-5">
                         <ul>
                           <li >   <router-link :to="{name:'UpdateAccount'}">Account Info</router-link></li>
                           <li :class="activeTab" class="has-text-weight-bold">   <router-link :to="{name:'Enrollments'}">Enrollments</router-link></li>
                           <li  class="has-text-weight-bold" >   <router-link :to="{name:'AllReviews'}">Reviews</router-link></li>
                           <li class="has-text-weight-bold">   <router-link :to="{name:'Transactions'}">Transactions</router-link></li>

                         </ul>
                       </div>-->
                       <div class="tabs pl-5">
                         <ul v-for="(link, id) in links" :key="id">
                           <li :class="activeTab === id ? 'is-active':'' " @click="activeTab = id"><router-link :to="{name:link.route}">{{link.title}}</router-link></li>

                         </ul>
                       </div>
                     </div>
                     <div class="">
                         <div>
                             <router-view></router-view>
                         </div>

                     </div>
                 </div>
             </div>
         </div>
     </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {

        activeTab: 0,
        links:[
          {
            route:'UpdateAccount',
            title:'Account Info'
          },
          {
            route:'Enrollments',
            title:'Enrollments'
          },
          {
            route:'AllReviews',
            title:'Reviews'
          },
          {
            route:'Transactions',
            title:'Transactions'
          },
        ]

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
    #account {
        height: 100vh;
    }



    @media screen and (max-width: 1023px) {
        .vl {
            border-right: 1px solid #c9c7c7;
            height: auto;
        }
    }
</style>
