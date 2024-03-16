
<script setup>
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

import BackButton from "../common/BackButton.vue"
import Confirm from "../setting/Confirm.vue"
import EditingAccount from "../setting/EditingAccount.vue"
import { ref } from 'vue'
import { deleteUser } from "../../libs/FetchAPI"
import router from "../../router"

const settingPage = ref('setting')


const confirmLogout = () => {
  localStorage.removeItem('currentUser')
  router.push('/')
}


 const confirmDelete = async () => {
  try {
    const userId = currentUser.value.id
    if (userId) {
      await deleteUser(userId)
      console.log('Account deleted successfully')
      router.push('/')
    } else {
      console.error('No current user ID found')
    }
  } catch (error) {
    console.error('Error deleting account:', error)
  }
}
 



</script>

<template>
  <BackButton path="Home" />
  <div v-if="settingPage === 'setting'" class="flex flex-col justify-center items-center w-screen h-screen gap-5">
    <div class="text-black text-6xl bg-[#45483D] bg-opacity-70">
      <p class="text-lime-200">Setting</p>
    </div>
    <div class="flex flex-col justify-center items-center text-black text-6xl bg-[#45483D] bg-opacity-70 gap-5">
      <p @click="settingPage = 'edit'" class="text-lime-200 hover:text-black">Editing Password</p>
      <p class="text-lime-200 hover:text-black">Mute music</p>
      <p @click="settingPage = 'confirmLogout'"  class="text-lime-200 hover:text-black">log out</p>
      <p @click="settingPage = 'confirmDelete'" class="text-lime-200 hover:text-black">Delete Account</p>

    </div>
  </div>

  <div v-else-if="settingPage=== 'confirmDelete'" class="w-full h-full flex justify-center items-center bg-[#45483D] bg-opacity-70 gap-5">
  
      <button @click="confirmDelete"
      class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 ">
      Confirm</button>
      <button 
      @click="settingPage = 'setting'" 
      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 ">
      Cancel</button>
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

  <EditingAccount v-else   @cancel="settingPage = 'setting'"/>
</template>


<style scoped>

</style>
