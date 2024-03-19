<script setup>
import { ref } from 'vue'
import CharacterCard from '../common/CharacterCard.vue'
import BackButton from '../common/BackButton.vue'
import coin from '../shop/Coin.vue'
import heros from '../../data/heros'
import { updateUser } from '../../libs/FetchAPI'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

const isConfirmationVisible = ref(false)

const selectedHero = ref('')
const conFirmBuyHero = (hero) => {
  selectedHero.value = hero
  isConfirmationVisible.value = true
}

const cancelBuy = () => {
  isConfirmationVisible.value = false
}

const confirmBuy = async() => {
    if (selectedHero.value) {
        const newGold = currentUser.value.gold - 100;
        if (newGold >= 0) {
            currentUser.value.gold = newGold;
            currentUser.value.characters.push(selectedHero.value);
            await updateUser(currentUser.value)
            localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
            isConfirmationVisible.value = false;

        } else {
            console.log("Not enough gold to buy this hero.");
        }
    } else {
        console.log("No hero selected.");
    }
}

</script>

<template>
  <div class="px-[10vh]">
    <BackButton path="home" />
    <div class="absolute top-[4vh] xl:top-[2vh] right-1 px-[2vh] xl:px-[4vh] bg-gradient-to-t from-[#436850] to-[#ADBC9F]  w-[14vh] h-[8vh] xl:w-[30vh] xl:h-[11vh] text-[2.5vh] xl:text-[4vh]
            flex flex-col justify-center text-black shadow-lg  border-[0.5vh] border-lime-950 rounded-[50vh] ">
        <div class="flex ">
            <img src="/Common/Coin.png" alt="Coin" class="w-[4vh] xl:w-[6vh]">
            <h1>{{ currentUser.gold }}</h1>
        </div>
    </div>    
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
              <button @click="conFirmBuyHero(character.id)"
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