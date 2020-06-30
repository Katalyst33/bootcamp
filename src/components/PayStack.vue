<template>
    <div>
        <template v-if="paymentComplete">
            <div class="message is-success">
                <div class="message-body">
                    {{paymentMessage}}
                </div>
            </div>
        </template>
        <template v-else>
            <form @submit.prevent="() => false" id="paymentForm">
                <div class="field">
                    <label for="email">Email Address</label>
                    <input v-model="form.email" class="input" type="email" id="email-address" required/>
                </div>
                <!--<div class="field">
                    <label for="amount">Amount</label>
                    <input v-model="form.amount" class="input" type="tel" id="amount" required/>
                </div>-->
                <div class="field">
                    <label for="first-name">First Name</label>
                    <input v-model="form.firstname" class="input" type="text" id="first-name"/>
                </div>
                <div class="field">
                    <label for="last-name">Last Name</label>
                    <input v-model="form.lastname" class="input" type="text" id="last-name"/>
                </div>
                <div class="form-submit">
                    <button class="button is-primary is-fullwidth has-text-weight-bold is-uppercase" type="submit"
                            @click="payWithPaystack"> Pay
                    </button>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    props: ["amount", "refId"],
    data() {
      return {
        form: {
          email: "",
          firstname: "",
          lastname: ""
        },

        paymentMessage: "",
        paymentComplete: false,
      };
    },

    computed: {
      ...mapState(["user"])
    },

    mounted() {
      const names = this.user.name.split(" ");
      this.form = {
        email: this.user.email,
        firstname: names[0],
        lastname: names[1]
      };
    },

    methods: {
      payWithPaystack() {
        let handler = window.PaystackPop.setup({
          key: "pk_test_840351d00d5d175b915893a1aebb01d9013326f2", // Replace with your public key
          ...this.form,
          amount: Number(this.amount) * 100,
          ref: this.refId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          // label: "Optional string that replaces customer email"
          onClose: function() {
            alert("Window closed.");
          },
          callback: (response) => {
            this.paymentMessage = "Payment complete! Reference: " + response.reference;
            this.paymentComplete = true;
          }
        });
        handler.openIframe();
      }
    }
  };
</script>

<style scoped>

</style>