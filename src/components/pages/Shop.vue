<script setup>
import { ref } from 'vue'
import CharacterCard from '../common/CharacterCard.vue'
import BackButton from '../common/BackButton.vue'
import coin from '../shop/coin.vue';
import heros from '../../data/heros';

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

const isConfirmationVisible = ref(false)

const selectedHero = ref(null)

const conFirmBuyHero = (hero) => {
  selectedHero.value = hero
  isConfirmationVisible.value = true
}

const cancelBuy = () => {
  isConfirmationVisible.value = false
}

const confirmBuy = () => {
  console.log("Buying")
  isConfirmationVisible.value = false
}

</script>

<template>
  <div class="px-[10vh]">
    <BackButton path="home" />
    <coin />
    <div
      class="flex justify-center relative  top-[15vh] h-[72vh] border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
      <div
        class="absolute top-[-6vh] w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
        <h1 class="text-center text-[6vh] text-black">
          SHOP
        </h1>
      </div>
      <div class="flex items-center gap-[3.5vh] ">
        <div v-for="character in heros">
          <div v-if="!currentUser.characters.includes(character.id)">
            <CharacterCard :heroId="character.id" />
            <div class="flex justify-center p-4">
              <button @click="conFirmBuyHero"
                class="flex justify-center items-center bg-[#49FF00] text-black font-bold rounded  w-[15vh] h-[5vh] gap-2">
                <img src="/Common/Coin.png" alt="Coin" class="w-[4vh]">
                100 $
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <teleport to="body">
      <div v-if="isConfirmationVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-gradient-to-b from-[#757A69] to-[#131411] rounded shadow-md">
          <div class="flex justify-end mt-4">
            <button @click="confirmBuy"
              class="bg-[#49FF00] text-black font-bold rounded px-4 py-2">Buy</button>
            <button @click="cancelBuy"
              class="bg-[#FF1700] text-white font-bold rounded px-4 py-2 mr-4">Cancel</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped></style>