<script setup>
import { RouterView } from 'vue-router';
import Guideline from './Guideline.vue';
</script>

<template>
  <div class="font-main">
    <!-- Remove this line after you understand guideline -->
    <RouterView/>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.font-main {
  font-family: "MedievalSharp", cursive;
}
</style>
