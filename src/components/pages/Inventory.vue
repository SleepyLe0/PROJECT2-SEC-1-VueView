<script setup>
import heros from '../../data/heros'
import CharacterCard from '../common/CharacterCard.vue'
</script>

<template>
    <div class="px-[6vh]">
    <div class=" flex justify-center relative  top-[15vh] h-[72vh] border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
        <div class="absolute top-[-6vh] w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
            <h1 class=" text-center text-[6vh] text-black">Inventory </h1>
        </div>
        <div class="flex flex-wrap gap-[3vh]"> 
          <CharacterCard v-for="hero in heros" :hero="hero"/>       
        </div>
    </div>
    </div>
</template>

<style scoped></style>