<template>
    <div>
        <nav class="menu  has-background-warning">
            <div class="brand-items">
                <img class="logo" src="/logo.png">
                <h1 class="brand__name is-size-4  has-text-primary"><span
                        class="has-text-weight-bold">Dev</span><span>Bootcamp</span>
                </h1>
            </div>
            <ul class="menu__pages">
                <li>Home</li>
                <li>Browse Bootcamps</li>
            </ul>


           <div class="actions">
               <ul class="actions__item">
                   <li>
                       <button class="button is-primary mx-3">Sign up</button>
                   </li>
                   <li>
                       <button class="button is-primary px-3">login</button>
                   </li>
               </ul>
           </div>

        </nav>
    </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>

    .logo{
        height: 20%;
    }

    nav{
        display: flex;


        .brand-items{
            display: flex;
            flex-basis: 25%;
        }

        .menu__pages{
            display: flex;
            flex-basis: 50%;


        }

        .menu__pages li{
            margin-left: 10px;
        }

        .actions__item{
            display: flex;
        }
    }









</style>
