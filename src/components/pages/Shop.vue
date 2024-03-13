<script setup>
import heros from "../../assets/heros";
import Cardcharater from "../common/Cardcharater.vue";
const headBanner = "bg-gradient-to-b from-[#D9D9D9] to-[#737373]";
const outerContainer = "bg-gradient-to-b from-[#757A69] to-[#131411]";
</script>

<template>
  <div class="relative mx-8 mt-28 pt-16 h-[80vh] border-4 border-black " :class="outerContainer">
    <div
      class="absolute px-64 py-4 -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-black "
      :class="headBanner">
      <h1 class="font-main text-center text-5xl text-black">
        SHOP
      </h1>
    </div>   
    <div v-if="heros.pop()" > 
      <Cardcharater />
      </div>
  </div>
</template>

<style scoped></style>