
<script setup>
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

import BackButton from "../common/BackButton.vue";
import Confirm from "../setting/Confirm.vue";
import EditingAccount from "../setting/EditingAccount.vue";
import { ref } from 'vue';
import { deleteUser } from "../../libs/FetchAPI";
import router from "../../router";

const settingPage = ref('setting')




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
      <p class="text-lime-200 hover:text-black">log out</p>
      <p @click="settingPage = 'confirm'" class="text-lime-200 hover:text-black">Delete Account</p>

    </div>
  </div>

  <Confirm v-else-if="settingPage === 'confirm'"
         @confirmed="confirmDelete"
         @cancel="settingPage = 'setting'"/>

  <EditingAccount v-else 
        @cancel="settingPage = 'setting'"/>

</template>


<style scoped>

</style>
