<script setup>
import { RouterView } from 'vue-router'
import { userAccounts } from '../data/db.json'

localStorage.setItem('currentUser', JSON.stringify(userAccounts[1]))
</script>

<template>
  <div class="font-main w-screen h-screen overflow-hidden bg-[url('/Background/Castle.jpg')] bg-center bg-cover">
    <transition name="change-page">
      <RouterView />
    </transition>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.font-main {
  font-family: "MedievalSharp", cursive;
}

.change-page-enter-from,
.change-page-leave-to {
  opacity: 0;
}

.change-page-enter-active,
.change-page-leave-active {
  transition: all .5s ease-in-out;
}
</style>
