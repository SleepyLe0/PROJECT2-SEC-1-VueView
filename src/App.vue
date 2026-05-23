<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="font-main w-screen h-screen overflow-hidden bg-[url(/Background/Castle.jpg)] bg-center bg-cover relative">
    <RouterView v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.font-main {
  font-family: "MedievalSharp", cursive;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.45s ease-out, transform 0.45s ease-out;
  position: absolute;
  inset: 0;
}
.page-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}
.page-enter-from {
  opacity: 0;
  transform: scale(1.03);
}
.page-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
