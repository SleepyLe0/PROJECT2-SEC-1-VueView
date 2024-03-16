<script setup>
import { ref } from 'vue'
import { updateUser } from '../../libs/FetchAPI'
import LevelSelected from '../level/LevelSelected.vue'
import CharacterSelected from '../level/CharacterSelected.vue'
import Game from '../level/Game.vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const currentPage = ref('levelSelected')
const selectedLevel = ref(0)
const selectedCharacter = ref(0)

const changeLevel = (level) => {
  selectedLevel.value = level
  currentPage.value = 'characterSelected'
}

const resetLevel = () => {
  selectedLevel.value = 0
  selectedCharacter.value = 0
  currentPage.value = 'levelSelected'
}

const changeCharacter = (character) => {
  if (character !== undefined) selectedCharacter.value = character
  currentPage.value = 'game'
}

const selectCharacter = (character) => {
  selectedCharacter.value = character
}

const finishStage = async (levelId) => {
  try {
    currentUser.value.levels.find(level => level.id === (levelId + 1)).unlock = true
    currentUser.value.gold += 20 * levelId
    await updateUser(currentUser.value)
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    resetLevel()
  } catch (error) {
    console.log(`error: ${error}`)
  }
}
</script>

<template>
  <div class="w-screen h-screen bg-black bg-opacity-50">
    <LevelSelected v-if="currentPage === 'levelSelected'" 
    :levels="currentUser.levels" 
    :action="changeLevel"/>
    <CharacterSelected v-else-if="currentPage === 'characterSelected'" 
    :characters="currentUser.characters" 
    :level="selectedLevel"
    :selectedCharacter="selectedCharacter"
    :action="{ selectCharacter, changeCharacter }"
    @resetLevel="resetLevel"/>
    <Game v-else 
    :level="selectedLevel" 
    :character="selectedCharacter"
    :beatStage="finishStage"/>
  </div>
</template>

<style scoped>

</style>