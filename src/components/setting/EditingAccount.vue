
<script setup>
import { updateUser } from "../../libs/FetchAPI"
import { ref } from 'vue'
import router from "../../router"
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const currentPassword = ref('')
const newPassword = ref('')

const updatePassword = async () => {
  try {
    if (currentPassword.value === currentUser.value.password) {    
      currentUser.value.password = newPassword.value  
      const updatedUser = await updateUser(currentUser.value)     
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))   
      router.push('/home')  
      console.log('Password updated successfully')
    } else {     
      console.log('Old password is incorrect')
    }
  } catch (error) {
    console.error('Error updating password:', error)
  }
}
</script>

<template>
  <div class="w-full h-full flex justify-center items-center bg-[#45483D] bg-opacity-70">
    <div class="max-w-md w-full mx-auto p-8 bg-slate-500 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-white mb-8">Change Password</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="currentPassword" class="text-white">Your Password:</label>
          <input v-model="currentPassword" id="currentPassword" type="password" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div class="flex flex-col">
          <label for="newPassword" class="text-white">New Password:</label>
          <input v-model="newPassword" id="newPassword" type="password" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div class="flex justify-end mt-8">
        <button @click="updatePassword"  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">Confirm</button>
        <button @click="$emit('cancel')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
