<template>
    <div>

        <h1 class="is-size-1 has-text-weight-bold">Edit user</h1>

        <div class="columns is-mobile">
            <div class="column is-three-fifths-desktop is-offset-one-fifth-desktop has-background-white mx-5 py-5 px-5">
                <div class="field">
                    <label class="label has-text-left">Name:</label>
                    <div class="control">
                        <input v-model="user.name" class="input" type="text" placeholder="Text input">
                    </div>
                </div>
                <div class="field">
                    <label class="label has-text-left">Email:</label>
                    <div class="control">
                        <input v-model="user.email" class="input" type="text" placeholder="Text input">
                    </div>
                </div>
                <label class="label">User Role:</label>
                <div class="control box-border p-3">
                    <label class="radio-btn">Regular User (Browse, Write reviews, etc)
                        <input v-model="user.role" value="user" type="radio"
                               name="answer">
                        <span class="checkmark"></span>
                    </label>
                    <label class="radio-btn">
                        Bootcamp Publisher
                        <input v-model="user.role" value="publisher" type="radio" name="answer">
                        <span class="checkmark"></span>
                    </label>
                    <label class="radio-btn">
                        Admin
                        <input v-model="user.role" value="admin" type="radio" name="answer">
                        <span class="checkmark"></span>
                    </label>
                </div>

            </div>
        </div>

        <template>
            <json-view :data="user.data"/>
        </template>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        user:{
          data:{

          }

        },
        loaded: false
      };
    },
    mounted() {
      this.fetchUser();
    },
    methods: {
      fetchUser() {
        const code = this.$route.params.id;
        this.$http.get("/api/v1/users/" + code)
          .then(({ data }) => {
            this.user = data;
            this.loaded = true;
          })
          .catch();
      }

    }

  };
</script>

<style scoped>
    .radio-btn {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 20px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default radio button */
    .radio-btn input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #a7a3a3;
        border-radius: 50%;
    }


    /* On mouse-over, add a grey background color */
    .radio-btn:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .radio-btn input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .radio-btn input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .radio-btn .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: white;
    }

    .box-border {
        border-style: solid;
        border-color: #d7d7d7;
        border-width: 1px;
        border-radius: 10px;
        background-color: #ffffff;
    }


</style>
