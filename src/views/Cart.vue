<template>
    <div id="cart">
        <div class="section">
            <div class="container">
                <div class="has-background-white px-5 py-5">
                    <h1 v-if="cart.length === 0" class="is-size-3 has-text-left"> Cart is Empty</h1>
                    <h1 v-else class="is-size-3 has-text-left"> {{cart.length}} course in cart</h1>


                    <div class="columns">
                        <div class="column">
                            <div class="table-container mt-5">
                                <table class="table is-fullwidth is-striped">
                                    <thead>
                                    <tr>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-for="(course, cartIndex) in cart">
                                        <tr :key="cartIndex">
                                            <td class="py-3">{{course.title}}</td>
                                            <td class="py-3 is-size-5 has-text-weight-bold">{{course.tuition}}</td>
                                            <td class="py-3">
                                                <a @click="removeFromCart(course)">
                                                    <i class="fa fa-trash has-text-danger" aria-hidden="true"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="column is-4">
                            <div class="mt-3 has-text-left">

                                <h3 class="is-size-4">Total:</h3>
                                <h1 class="is-size-1 has-text-weight-bold">{{totalItem}}</h1>
                                <button @click="checkout" class="button is-success is-fullwidth is-large">Checkout
                                </button>
                            </div>
                        </div>
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
      ...mapGetters(["coursesInCart", "coursesInCartWithPrices"]),

      totalItem: function(){
        let sum = 0;
        this.cart.forEach(function(item) {
          sum += (parseFloat(item.tuition));
        });

        return sum;
      }



    },
    mounted() {
      console.log(this.cartItem())
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
        // console.log(this.coursesInCartWithPrices);


      },

      TotalCart(cartItems) {
        return cartItems.reduce((a, b) => a + b, 0);
      },


      cartItem() {
        for (const course of this.cart) {
          // return course.tuition;
         return this.TotalCart([course.tuition])

        }
      }


    }
  };
</script>

<style scoped>

    #cart {
        height: 100vh;
    }

</style>
