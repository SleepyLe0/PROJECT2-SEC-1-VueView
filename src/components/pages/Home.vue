<script setup>
import { ref } from 'vue'

const currentUser =ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
    <div class="flex justify-center xl:justify-start h-screen p-[4vh] xl:p-[10vh]">
        <div class="absolute top-[4vh] left-[4vh]">
            <img src="/Common/Logo.png" alt="logo" class=" w-[20vh] xl:w-[70vh]">
        </div>
        <div class="flex items-center xl:flex xl:items-end ">
            <div class=" flex flex-col xl:p-[7vh] p-[4vh] xl:text-6xl text-[4.5vh] bg-[#45483D] bg-opacity-70 gap-[3vh] ">
                <div class="text-lime-200  hover:text-black"><router-link to="/level">Play game</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/inventory">Inventory</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/shop">Shop</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/setting">Setting</router-link></div>
            </div>
        </div>
        <div
            class="absolute top-[4vh] xl:top-[10vh] right-0 px-[2vh] xl:px-[4vh] bg-gradient-to-t from-[#436850] to-[#ADBC9F]  w-[16vh] h-[10vh] xl:w-[38vh] xl:h-[16vh] text-[2.5vh] xl:text-[4vh]
            flex flex-col justify-center text-black shadow-lg  border-[0.5vh] border-lime-950 ">
            <h1 class=" ">{{ currentUser.username }}</h1>
            <div class="flex gap-[2.5vh]">
                <img src="/Common/Coin.png" alt="Coin" class="w-[4vh] xl:w-[6vh]">
                <h1>{{ currentUser.gold }}</h1>
            </div>
            
        </div>
    </div>
</template>

<style scoped></style>