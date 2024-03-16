<script setup>
import { ref } from 'vue'
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
    <div class="absolute top-[4vh] xl:top-[2vh] right-1 px-[2vh] xl:px-[4vh] bg-gradient-to-t from-[#436850] to-[#ADBC9F]  w-[14vh] h-[8vh] xl:w-[30vh] xl:h-[11vh] text-[2.5vh] xl:text-[4vh]
            flex flex-col justify-center text-black shadow-lg  border-[0.5vh] border-lime-950 rounded-[50vh] ">
        <div class="flex ">
            <img src="/Common/Coin.png" alt="Coin" class="w-[4vh] xl:w-[6vh]">
            <h1>{{ currentUser.gold }}</h1>
        </div>
    </div>    
</template>

<style scoped></style>