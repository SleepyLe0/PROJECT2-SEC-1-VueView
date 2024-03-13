<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="font-main w-screen h-screen overflow-hidden bg-[url('/Background/Castle.jpg')] bg-center bg-cover">
    <RouterView/>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.font-main {
  font-family: "MedievalSharp", cursive;
}
</style>
