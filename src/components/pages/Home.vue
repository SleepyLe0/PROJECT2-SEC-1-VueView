<script setup>

</script>

<template>
    <div class="flex  h-screen p-[10vh]  ">
        <div class="absolute top-[4vh] left-[4vh]">
            <img src="/Common/Logo.png" alt="logo" class="w-[70vh]">
        </div>
        <div class="flex items-end">
            <div class=" flex flex-col p-[7vh] text-black text-6xl bg-[#45483D] bg-opacity-70 gap-[3vh] ">
                <div class="text-lime-200  hover:text-black"><router-link to="/level">Play game</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/inventory">Inventory</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/shop">Shop</router-link></div>
                <div class="text-lime-100  hover:text-black"><router-link to="/setting">Setting</router-link></div>
            </div>
        </div>
        <div
            class="absolute top-[10vh] right-0 px-[4vh] bg-white w-[50vh] h-[20vh] text-[4vh] flex flex-col justify-center">
            <h1>UserName</h1>
            <img src="/Common/Coin.png" alt="Coin" class="w-[6vh]">
        </div>
    </div>
</template>

<style scoped></style>