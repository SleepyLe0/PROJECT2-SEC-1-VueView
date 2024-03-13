<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="text-black flex h-screen justify-center items-center text-6xl rounded-lg  ">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[3vh] right-[3vh] px-[1.25vh] py-[.125vh]">
        <div class=" flex justify-center items-center rounded-full w-[30vh] h-[10vh] bg-gradient-to-t from-red-900 to-orange-300  border-4 border-orange-200  ">
            <router-link to="/login">Play</router-link>
        </div>
        <RouterView/>
    </div>
</template>

<style scoped>

</style>