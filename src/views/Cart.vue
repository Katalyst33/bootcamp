<template>
    <div id="cart">
        <div class="section">
            <div class="container">
                <div class="has-background-white px-5 py-5">
                    <h1 v-if="carts.length === 0" class="is-size-3 has-text-left"> Cart is Empty</h1>
                    <h1 v-else class="is-size-3 has-text-left"> {{carts.length}} course in cart</h1>
                    <div class="columns">
                        <div class="column">
                            <div class="table-container mt-5">
                                <table class="table is-fullwidth is-striped">
                                    <thead>
                                    <tr>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <template v-for="(course, cartIndex) in carts">
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
                                <PayStack :amount="totalItem"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import PayStack from "../components/PayStackTotal";
  import { mapGetters, mapState } from "vuex";

  export default {
    components: { PayStack },
    computed: {
      ...mapState(["carts"]),
      ...mapGetters(["coursesInCart", "coursesInCartWithPrices"]),

      totalItem() {
        let sum = 0;

        for (const item of this.carts) {
          sum += Number(item.tuition);

        }
        return sum;

      }
    },


    methods: {


      removeFromCart(course) {
        this.$store.commit("REMOVE_FROM_CART", course);
        this.$store.dispatch("addCartItem");
        this.$swal.fire({
          icon: "success",
          text: "Course has been removed from cart"
        });
      }

    }
  };
</script>

<style scoped>

    #cart {
        height: 100vh;
    }

</style>
