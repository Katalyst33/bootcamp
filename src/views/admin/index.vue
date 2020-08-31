<template>
  <div class="admin">
    <header class="header has-background-dark px-2 py-3">
      <router-link to="/" class="has-text-white is-size-4"><img class="logo__img" src="/admin-logo.png"> Devcamper
        Admin
      </router-link>
      <ul class="actions">
        <li @click="menuToggle" class="mx-3 is-hidden-desktop"><a><i class=" is-size-3 has-text-white"
                                                                     :class=toggleIcon></i></a></li>
      </ul>

    </header>

    <div class="columns is-mobile">
      <div class="column is-narrow-desktop  has-background-dark" :class="toggleMenu">
        <div class="menu " :class="toggleMenu">
          <div class="has-text-primary  py-5 admin">

            <ul class="" v-for="(link, id) in links" :key="id">
              <li @click="menuToggle(id)" class="nav-item">
                <router-link :to="{name:link.route}" class="has-text-white">
                  <i :class="link.icon" class="is-size-3"></i><br>
                  {{link.title}}
                </router-link>
              </li>
            </ul>

          </div>
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
      links: [
        {
          route: "AddBootcamp",
          title: "Add Bootcamp",
          icon: "fal fa-layer-plus"

        },
        {
          route: "AllBootcampX",
          title: "All  Bootcamps",
          icon: "fal fa-warehouse"
        },
        {
          route: "AllUsers",
          title: "All Users",
          icon: "fal fa-users"
        },
        {
          route: "AllEnrollments",
          title: "Enrolled User",
          icon: "fal fa-user-tag"
        },
        {
          route: "ManageReviews",
          title: "Reviews",
          icon: "fal fa-quote-left"
        },
        {
          title: "Logout",
          route: "ManageReviews",
          icon: "fal fa-sign-out-alt has-text-danger"
        }
      ],
      toggleMenu: {
        "is-hidden-touch": true
      },
      toggleIcon: {
        "fas fa-bars": true,
        "fas fa-times": false
      },
    };
  },
  mounted() {
    //get last array
    // this.lastArray();
  },



  methods: {
    lastArray() {

      let lastItem = this.links[this.links.length - 1];
      console.log(lastItem.title);
      if(lastItem){
        console.log("TRUE")
        this.link.icon = 'fal fa-sign-out-alt has-text-danger'
      }

    },

    menuToggle(id) {
      this.toggleMenu["is-hidden-touch"] = !this.toggleMenu["is-hidden-touch"];
      this.toggleIcon["fas fa-bars"] = !this.toggleIcon["fas fa-bars"];
      this.toggleIcon["fas fa-times"] = !this.toggleIcon["fas fa-times"];

      if (id === 5) {
        this.logOut();
      }
    },

    async logOut() {
      function timerInterval() {
        setInterval(() => {
          const content = this.$swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = this.$swal.getTimerLeft();
            }
          }
        }, 100);
      }


      try {
        await this.$http.get("/api/v1/auth/logout");
        await this.$store.commit("SET_USER");
        await this.$store.dispatch("getCurrentUser");
        await this.$swal.fire({
          icon: "error",
          text: "logout successfully, you will be redirected shortly",
          timer: 2000,
          timerProgressBar: true,
          onBeforeOpen: () => {
            this.$swal.showLoading();

          },
          onClose: () => {
            clearInterval(timerInterval);
          }
        });

        await this.$router.push({ name: "Home" });

      } catch (error) {
        await this.$swal.fire({
          icon: "error",
          text: `${error.response.data.error}`
        });
      }
    }
  }
};
</script>

<style scoped>

.header {
  display: flex;
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-grow: 8;

}

.main {
  display: flex;
  justify-items: center;
}


.menu {

  flex-grow: 1;
}

.page-content {
  flex-grow: 10;
}

.logo {
  font-size: 20px;
  /*padding: 7.5px 10px 7.5px 0;*/
}

.logo__img {
  height: 25px;
}

.item {
  padding: 10px;
  color: #ffffff;
}

.nav-menu {
  height: 100%;
}

.nav-item {
  border-bottom: 1px solid #ffffff;
  padding: 10px 10px;
}

/* Extra small devices (portrait phones, less than 576px)*/
@media (max-width: 576px) {

  .menu {

    flex-grow: 0;
  }

  .page-content {
    flex-grow: 0;
    background-color: #5e53a5;
  }
}


</style>
