<script setup>
import CharacterCard from '../common/CharacterCard.vue'
import heros from '../../data/heros'
</script>

<template>
  <div class="relative h-[80vh] border-4 border-black bg-gradient-to-b from-[#757A69] to-[#131411]">
    <div class="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-black 
      bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
      <h1 class="text-center text-5xl text-black">
        SHOP
      </h1>
    </div>
    <div class=" flex flex-wrap gap-3">
      <div v-for="hero in heros">
        <CharacterCard :hero="hero"/>
      </div>     
    </div>
<button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Buy Now
    </button>
 
  </div>
</template>

<style scoped></style>