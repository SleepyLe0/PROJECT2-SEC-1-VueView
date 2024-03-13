<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="flex items-center h-screen pl-[10vh] ">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[9vh]    py-[.125vh] w-[45vh]  ">
        <div class=" flex flex-col justify-start p-[7vh] text-black text-6xl bg-[#45483D] bg-opacity-70 "   >
        <div class="text-lime-200 "><router-link to="/level">Play game</router-link></div>
        <div class="text-lime-100"><router-link to="/inventory">Inventory</router-link></div>
        <div class="text-lime-100"><router-link to="/shop">Shop</router-link></div>
        <div class="text-lime-100"><router-link to="/setting">Setting</router-link></div>
       </div>
        <RouterView/> 
        <div class="absolute top-[3vh] right-[3vh] px-[1.25vh] py-[.125vh] box-border bg-white w-[35vh] h-[10vh] text-2xl">
            <h1>UserName</h1>
            <p>gold</p>
        </div>
    </div>

   
</template>

<style scoped>

</style>