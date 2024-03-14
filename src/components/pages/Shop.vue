<script setup>
import { ref } from 'vue'
import CharacterCard from '../common/CharacterCard.vue'
import BackButton from '../common/BackButton.vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
  <div class="px-[10vh]">
    <BackButton path="home"/>
    <div
      class="flex justify-center relative  top-[15vh] h-[72vh] border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
      <div
        class="absolute top-[-6vh] w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
        <h1 class="text-center text-[6vh] text-black">
          SHOP
        </h1>
      </div>
      <div class="flex items-center gap-[3.5vh] ">
        <div v-for="character in currentUser.characters">
          <CharacterCard :heroId="character" />
          <div class="flex justify-center p-4">
            <button @click="" class=" bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  w-[15vh] h-[5vh] gap-3">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>