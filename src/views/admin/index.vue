<template>
    <div class="admin">
        <div class="columns">
            <div class="column is-2  ">
                <div class="has-text-primary has-background-white py-5 admin">
                    <ul>
                        <li>
                            <router-link :to="{name:'AddBootcamp'}" class="has-text-danger">Add Bootcamp
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'AllBootcampX'}" class="has-text-danger">All Bootcamps
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'ManageReviews'}" class="has-text-danger">Reviews
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="column is-10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
  export default {};
</script>

<style scoped>

    .admin{
        /*height: 100vh;*/
    }

</style>
