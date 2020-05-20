<template>
    <div>
<div class="columns">
    <div class="column is-2 has-background-primary">
<div class="has-text-white py-5">
  <ul>
      <li class="has-background-white has-text-dark py-2">item</li>
      <li>item</li>
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
  export default {

  };
</script>

<style scoped>

</style>
