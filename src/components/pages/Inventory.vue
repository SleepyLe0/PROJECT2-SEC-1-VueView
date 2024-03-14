<script setup>
import CharacterCard from '../common/CharacterCard.vue'
</script>

<template>
    <div class=" flex justify-center relative  m-[15vh] h-[72vh] border-[1vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
        <div class="absolute mt-[-4vh] border-[#332222] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
            <h1 class=" text-center text-5xl text-black">Inventory </h1>
        </div>
        <div> 
            <CharacterCard />
        </div>
    </div>
</template>

<style scoped></style>