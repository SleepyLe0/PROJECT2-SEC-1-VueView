<script setup>
import { ref } from 'vue'
import CharacterCard from '../common/CharacterCard.vue'
import BackButton from '../common/BackButton.vue'
import heros from '../../data/heros'
import { updateUser } from '../../libs/FetchAPI'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

const isConfirmationVisible = ref(false)

const isErrorMessageVisible = ref(false)

const selectedHero = ref('')
const conFirmBuyHero = (hero) => {
  selectedHero.value = hero
  isConfirmationVisible.value = true
}

const cancelBuy = () => {
  isConfirmationVisible.value = false
}

const confirmBuy = async () => {
  try {
    const newGold = currentUser.value.gold - heros.find(hero => hero.id === selectedHero.value).price
    if (newGold >= 0) {
      currentUser.value.gold = newGold
      currentUser.value.characters.push(selectedHero.value)
      await updateUser(currentUser.value)
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
      isConfirmationVisible.value = false
    } else {
      isErrorMessageVisible.value = true
      setTimeout(() => {
        isErrorMessageVisible.value = false
      }, 2000)
    }
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

</script>

<template>
  <div class="px-[6vh]">
    <BackButton path="home" />
    <div class="absolute top-[4vh] xl:top-[2vh] right-1 px-[2vh] xl:px-[4vh] bg-gradient-to-t from-[#436850] to-[#ADBC9F] w-[14vh] h-[8vh] xl:w-[30vh] xl:h-[11vh] text-[2.5vh] xl:text-[4vh]
            flex flex-col justify-center text-black shadow-lg border-[0.5vh] border-lime-950 rounded-[50vh]
            anim-slide-right" style="animation-delay:0.1s">
      <div class="flex">
        <img src="/Common/Coin.png" alt="Coin" class="w-[4vh] xl:w-[6vh]">
        <h1>{{ currentUser.gold }}</h1>
      </div>
    </div>
    <div class="flex justify-center relative top-[18vh] h-[72vh] border-[1.5vh] lg:border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
      <div class="absolute top-[-6vh] w-[25vh] lg:w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373] anim-slam-down"
          style="animation-delay:0.2s">
        <h1 class="text-center text-[5vh] lg:text-[6vh] text-black">SHOP</h1>
      </div>
      <div class="flex flex-wrap items-center justify-center xl:justify-start pt-[5vh] p-[2vh] xl:p-[7vh] overflow-auto h-[65vh] gap-3">
        <div v-for="(character, i) in heros" :key="character.id">
          <div v-if="!currentUser.characters.includes(character.id)"
              class="anim-slam-up" :style="`animation-delay:${0.4 + i * 0.07}s`">
            <CharacterCard :heroId="character.id" />
            <div class="flex justify-center p-4">
              <button @click="conFirmBuyHero(character.id)"
                class="flex justify-center items-center bg-[#49FF00] text-black font-bold rounded w-[15vh] h-[5vh] gap-2 btn-epic">
                <img src="/Common/Coin.png" alt="Coin" class="w-[4vh]">
                {{ character.price }} $
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isConfirmationVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gradient-to-b from-[#9EA392] to-[#757A69] border-[#332222] border-4 rounded-lg w-[80%] max-w-[400px] font-main modal-slam">
        <div class="flex justify-center items-center ">
          <h2 class="text-2xl font-bold text-black p-[1.5vh] ">Confirmation</h2>
        </div>
        <div v-for="character in heros" :key="character.id">
          <div v-if="character.id === selectedHero">
            <CharacterCard :heroId="character.id" />
          </div>
        </div>
        <div class="flex justify-center gap-3 p-[1.5vh]">
          <button @click="confirmBuy"
            class="bg-[#49FF00] hover:bg-green-600 text-black font-bold rounded focus:outline-none w-[10vh] h-[5vh] ">
            Confirm
          </button>
          <button @click="cancelBuy"
            class="bg-[#FF1700] hover:bg-red-600 text-black font-bold rounded focus:outline-none w-[10vh] h-[5vh]">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="isErrorMessageVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-gradient-to-b from-[#9EA392] to-[#757A69] border-[#332222] border-4 rounded-lg w-[80%] max-w-[300px] font-main modal-slam">
        <div class="flex justify-center items-center ">
          <h2 class="text-2xl font-bold text-black p-[1.5vh] ">Not enough gold</h2>
        </div>
        <div class="flex justify-center gap-3 p-[1.5vh]">
          <p class="text-black p-[1.5vh]">Not enough gold to buy this hero</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes modal-drop {
  from { opacity: 0; transform: translateY(-60px) scale(0.9); }
  70%  { transform: translateY(4px) scale(1.02); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-slam {
  animation: modal-drop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
</style>
