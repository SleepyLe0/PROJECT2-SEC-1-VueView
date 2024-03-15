<script setup>
const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
const path = currentUser === undefined ? '/login' : '/home'
</script>

<template>
    <div class="text-black flex h-screen justify-center items-center  text-[6.5vh] xl:text-[8vh] rounded-lg  ">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[4.5vh]  md:top-[3vh]  right-[2vh] md:right-[3vh] w-[20vh] md-w-0">
        <router-link :to="path">
            <div class=" flex justify-center items-center rounded-full  w-[30vh] xl:w-[40vh] h-[11vh] xl:h-[15vh] bg-gradient-to-t from-red-900 to-orange-300  border-4 border-orange-200  ">
                <h1>Play</h1>
            </div>
        </router-link>
    </div>
</template>

<style scoped></style>