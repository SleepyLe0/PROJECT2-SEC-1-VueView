<script setup>
import { ref } from 'vue'
import Basic from './components/Basic.vue'

const colorTheme = ref(true)
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen gap-10" :data-theme=" colorTheme ? 'light' : 'dark'">
    <h1 class="font-bold text-3xl">Tailwind CSS Test</h1>
    <input type="checkbox" class="toggle" v-model="colorTheme">
    <Basic>
      <template #greeting>Hello</template>
    </Basic>
  </div>
</template>

<style scoped>

</style>
