<script setup>
import CharacterCard from '../common/CharacterCard.vue'
</script>

<template>
    <div class=" flex flex-col justify-center  relative mx-[10vh] mt-[15vh]  h-[72vh] border-[1vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
        <div class="absolute px-[14vh] py-4 -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#332222] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
            <h1 class=" text-center text-5xl text-black">Inventory </h1>
        </div>
        <CharacterCard />
    </div>
</template>

<style scoped></style>