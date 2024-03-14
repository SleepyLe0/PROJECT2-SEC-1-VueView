<script setup>
import { ref } from 'vue'
import LevelSelected from '../level/LevelSelected.vue'
import CharacterSelected from '../level/CharacterSelected.vue'

const changeLevel = (level) => {
  selectedLevel.value = level
}

const resetLevel = () => {
  selectedLevel.value = 0
}

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const selectedLevel = ref(0)
</script>

<template>
  <div class="w-screen h-screen bg-black bg-opacity-50">
    <LevelSelected v-if="selectedLevel === 0" :levels="currentUser.levels" :buttonFunc="changeLevel"/>
    <CharacterSelected v-else :characters="currentUser.characters" :level="selectedLevel" @resetLevel="resetLevel"/>
  </div>
</template>

<style scoped>

</style>