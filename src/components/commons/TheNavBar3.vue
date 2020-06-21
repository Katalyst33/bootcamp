<template>
    <div>
        <nav>
            <ul :class="toggleMenu" class="menu has-text-primary ">
                <li class="logo"><router-link  to="/">  <img class="logo__img pr-2 " src="/logo.png"><span
                        class="has-text-weight-bold is-size-4 ">Dev</span><span>Bootcamp</span></router-link></li>
                <li class="item"><router-link to="/" >Home</router-link></li>
                <li class="item"><router-link :to="{name:'AllBootcamps'}">Browse Bootcamps</router-link></li>

                <li :class="dropDown" class="item has-submenu">
                    <a @click="dropToggle"  tabindex="1">Plans <i class="fas fa-angle-down px-2"></i></a>
                    <ul class="submenu">
                        <li class="subitem"><a href="#">Freelancer</a></li>
                        <li class="subitem"><a href="#">Startup</a></li>
                        <li class="subitem"><a href="#">Enterprise</a></li>
                    </ul>
                </li>
                <li class="item"><a href="#">Contact</a>
                </li>
                <li class="item button__custom  is-primary px-3"><button class="button is-primary">signup</button></li>
                <li class="item button__custom  is-primary px-3"><button class="button is-success">Login</button></li>
                <li @click="menuToggle" class="toggle pr-5"><a href="#"><i :class=toggleIcon></i></a></li>
            </ul>
        </nav>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        toggleMenu: {
          "active": false
        },
        toggleIcon: {
          "fas fa-bars": true,
          "fas fa-times": false
        },
        dropDown: {
          "submenu-active":false,
        }

      };
    },


    methods: {
      menuToggle() {
        this.toggleMenu["active"] = !this.toggleMenu["active"];
        this.toggleIcon["fas fa-bars"] = !this.toggleIcon["fas fa-bars"];
        this.toggleIcon["fas fa-times"] = !this.toggleIcon["fas fa-times"];

      },

      dropToggle() {
        this.dropDown["submenu-active"] = !this.dropDown["submenu-active"];

      }
    }

  };
</script>

<style scoped>

    .logo__img{
        height:25px ;

    }

    nav {
        background: white;
    }

    a {
        color: #5e53a5;
        text-decoration: none;
    }

    .menu,
    .submenu {
        list-style-type: none;
    }

    .logo {
        font-size: 20px;
        padding: 7.5px 10px 7.5px 0;
    }

    .item {
        padding: 10px;
    }

    .item.button {
        padding: 9px 5px;
    }

    /* Mobile menu */
    .menu {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .menu li a {
        /*background-color: #42b983;*/
        display: block;
        padding: 15px 5px;
    }

    .menu li.subitem a {
        /*background-color: #f15622;*/
        padding: 15px;
    }

    .toggle {
        order: 1;
        font-size: 20px;
        /*background-color: #5e53a5;*/
    }

    .item {
        order: 3;
        width: 100%;
        text-align: center;
        display: none;
    }

    .active .item {
        display: block;
    }

    .button.secondary { /* divider between buttons and menu links */
        border-bottom: 1px #444 solid;
    }

    /* Submenu up from mobile screens */

    .submenu {
        display: none;
    }

    .submenu-active .submenu {
        display: block;


    }


    .submenu-active {

        border-radius: 3px;
    }


    /*Tablet menu*/

    @media all and (min-width: 700px){

        .menu{
            justify-content: center;

        }

        .logo{
            flex: 1;
            align-items: flex-start;
            justify-content: left;
        }
        .item.button__custom{
            width:auto;
            order: 1;
            display: block;
        }
        .toggle{
            flex: 1;
            text-align: right;
            order: 2;
        }
        /* Button up from tablet screen */
        .menu li.button a {
            padding: 10px 15px;
            margin: 5px 0;
        }





    }

    /* Desktop menu */
    @media all and (min-width: 960px) {
        .menu {
            align-items: flex-start;
            flex-wrap: nowrap;
            background: none;
        }


        .logo {
            order: 0;
            /*margin-left: -25%;*/
            display: flex;
            /*align-items: flex-start;*/
            /*justify-content: left;*/


        }
        .item {
            order: 1;
            position: relative;
            display: block;
            width: auto;
        }
        .button__custom {
            /*order: 2;*/
        }
        .submenu-active .submenu {
            display: block;
            position: absolute;
            left: 0;
            top: 68px;
            background: white;
            z-index: 1;
        }
        .toggle {
            display: none;
        }
        .submenu-active {
            border-radius: 0;
        }




    }


</style>
