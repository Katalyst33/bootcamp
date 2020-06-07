<template>
    <div class="admin">
        <div class="columns">
            <div class="column is-2 has-background-white admin">
                <div class="has-text-primary py-5">
                    <ul>
                        <li>All Bootcamps</li>
                        <li class="py-3">Add Bootcamp</li>
                        <li>item</li>
                        <li>item</li>
                        <li>item</li>
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
        height: 100vh;
    }

</style>
