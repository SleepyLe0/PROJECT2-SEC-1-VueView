<script setup>
import { computed } from 'vue'
import levels from '../../data/levels'
import router from '../../router'

const emits = defineEmits(['return'])
const props = defineProps({
  gameResult: {
    type: Boolean,
    required: true
  },
  level: {
    type: Number,
    required: true
  }
})

const reward = computed(() => {
  return levels.find(level => level.id === props.level).reward
})
</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
    <div class="w-[90vw] h-[80vh] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
      <div class="w-full h-full bg-[#EDDEAA] flex flex-col justify-center items-center gap-[5vh] p-[2vh]">
        <h1 class="text-[10vh] font-extrabold bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
          {{ gameResult ? 'Victory' : 'Defeated' }}
        </h1>
        <div v-if="props.gameResult" class="flex items-center gap-[1vh]">
          <img src="/Common/Coin.png" alt="" class="w-[10vh]">
          <h1 class="text-[7vh] text-black">{{ `+${reward}` }}</h1>
        </div>
        <div class="flex flex-col gap-[5vh] text-black md:flex-row text-[2vh]">
          <button @click="$emit('return')"
          class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
            Back to Level
          </button>
          <button @click="router.push({ path: '/home' })"
          class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
            Home
          </button>
          <button v-if="props.gameResult && props.level < 5" @click="$emit('return', props.level)"
          class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
            Next Level
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>