<template>
    <div>
        <div class="section">
            <div class="container">
                <div class="has-background-white px-5 py-5">
                    <h1 class="is-size-3">Cart Page</h1>

                    <div class="table-container mt-5">
                        <table class="table is-fullwidth">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(course, cartIndex) in cart">
                                <tr :key="cartIndex">
                                    <td>{{course.title}}</td>
                                    <td>{{course.tuition}}</td>
                                    <td>
                                        <a @click="removeFromCart(course)">
                                            <i class="fa fa-trash has-text-danger" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-3 has-text-left">
                        <button @click="checkout" class="button is-success">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex";

  export default {

    computed: {
      ...mapState(["cart"]),
      ...mapGetters(["coursesInCart", "coursesInCartWithPrices"])
    },

    methods: {
      removeFromCart(course) {
        this.$store.commit("REMOVE_FROM_CART", course);
        this.$swal.fire({
          icon: "success",
          text: "Course has been removed from cart"
        });
      },

      checkout() {
        console.log(this.coursesInCartWithPrices);
      }
    }
  };
</script>

<style scoped>


</style>
