<template>
    <div class="about">
        <div @click="animator" class="button">run</div>

        <div class="box a">a</div>
        <div class="box b">b</div>
        <div class="">
            <div class="box c">c</div>
            <div class="ghost g">c</div>
        </div>

        <div class="box d">d</div>
        <div class="box e">e</div>

    </div>
</template>


<script>

  import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

  gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin);
  export default {

    components: {},
    data() {
      return {
        // key: value
      };
    },
    mounted() {
      this.animator();
    },

    methods: {
      animator() {
        gsap.to(".c", {
          scrollTrigger: {
            trigger: ".c",
            start: "top center",
            end: "top 100px",
            scrub: 1,
            pin:true,
            markers: true,
            toggleActions: "restart pause resume none"
          },
          x: 1300,
          rotation: 360,
          duration: 3
        });

      }
    }


  };
</script>

<style scoped>
    .box {
        background-color: chocolate;
        height: 120px;
        width: 120px;
        text-align: center;
        line-height: 150%;
        margin-bottom: 40%;
        font-size: 300%

    }

    .ghost {
        background-color: #c9bdb4;
        height: 120px;
        width: 120px;
        text-align: center;
        line-height: 150%;
        margin-bottom: 40%;
        margin-top: -40%;
        font-size: 300%


    }


</style>
