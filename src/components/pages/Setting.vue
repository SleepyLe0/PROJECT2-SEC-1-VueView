<script setup>
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

import BackButton from '../common/BackButton.vue'
import EditingAccount from '../setting/EditingAccount.vue'
import { ref } from 'vue'
import { deleteUser } from '../../libs/FetchAPI'
import router from '../../router'

const settingPage = ref('setting')

const confirmLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}

const confirmDelete = async () => {
  try {
    await deleteUser(currentUser.value.id)
    console.log('Account deleted successfully')
    confirmLogout()
  } catch (error) {
    console.log(`error: ${error}`)
  }
}

</script>

<template>
    <div v-if="settingPage === 'setting'" class="px-[6vh]">
      <BackButton path="Home"/>
      <div class="flex justify-center relative top-[18vh] h-[72vh] border-[1.5vh] lg:border-[2vh] border-[#332222] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
        <div class="absolute top-[-6vh] w-[25vh] lg:w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
          <h1 class="text-center text-[5vh] lg:text-[6vh] text-black">
            Setting
          </h1>        
        </div>
        <div class="flex flex-col items-center justify-center absolute top-[20vh] text-[3vh] gap-5 text-black sm:text-[5vh]">
          <p @click="settingPage = 'edit'" class=" hover:text-lime-200">Editing Password</p>
          <p class=" hover:text-lime-200">Mute music</p>
          <p @click="settingPage = 'confirmLogout'"  class=" hover:text-lime-200">log out</p>
          <p @click="settingPage = 'confirmDelete'" class=" hover:text-lime-200">Delete Account</p>
        </div>
      </div>
    </div>

  <div v-else-if="settingPage=== 'confirmDelete'" class="flex flex-col w-full h-full justify-center items-center bg-[#45483D] bg-opacity-70 gap-5">
    <p class="text-white text-2xl mb-4">Delete Account</p> 
      <div class="flex flex-row gap-5">
    <button @click="confirmDelete"
      class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 ">
      Confirm</button>
      <button 
      @click="settingPage = 'setting'" 
      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 ">
      Cancel</button>
    </div>
  </div>

  <div v-else-if="settingPage=== 'confirmLogout'" class="w-full h-full flex justify-center items-center bg-[#45483D] bg-opacity-70 gap-5">
      <button @click="confirmLogout"
      class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 ">
      Confirm</button>
      <button 
      @click="settingPage = 'setting'" 
      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 ">
      Cancel</button>
  </div>

  <EditingAccount v-else @cancel="settingPage = 'setting'"/>
</template>


<style scoped>

</style>
