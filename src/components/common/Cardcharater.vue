<script setup>
import heros from '../../assets/heros'
</script>

<template>
  <div class="flex text-black justify-center items-center gap-2 ">
    <div v-for="hero in heros" :key="hero.id"
      class=" bg-gradient-to-b from-[#6C5F5B] to-[#DAC0A3] border-2 border-black   flex flex-col justify-center items-center rounded-lg w-[26vh] h-[32vh] ">
      <div class="w-[15vh] h-[15vh]">
        <img :src="hero.image" alt="" />
      </div>
      <div class="flex flex-col justify-start p-1 pt-4 text-[2vh]">
        <h2>NAME: {{ hero.name }}</h2>
        <p>HP: {{ hero.hp }}</p>
        <p>Attack: {{ hero.attack }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>