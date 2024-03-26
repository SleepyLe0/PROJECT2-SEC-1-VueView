<script setup>
import { ref } from 'vue'

const emits = defineEmits(['close'])
const props = defineProps({
  updateUser: {
    type: Function,
    required: true
  }
})
 
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const currentPassword = ref('')
const newPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
 
const updatePassword = async () => {
  try {
    if (currentPassword.value !== currentUser.value.password) {
      console.log('Old password is incorrect')
    } else if (newPassword.value.length < 6) {
      console.log('New password invalid')
    } else {
      props.updateUser(newPassword.value)
    }
  } catch (error) {
    console.log('Error updating password:', error)
  }
}
 
const toggleShowCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value
}
 
const toggleShowNewPassword = () => {
  showNewPassword.value = !showNewPassword.value
}
</script>
 
 
<template>
  <div class="min-h-screen flex justify-center items-center bg-[#45483D] bg-opacity-70">
    <div class="max-w-md w-full mx-auto p-8 bg-slate-500 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-white mb-8">Change Password</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="currentPassword" class="text-white">Your Password:</label>
          <div class="relative">
            <input v-model="currentPassword" :type="showCurrentPassword ? 'text' : 'password'" id="currentPassword" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <button @click="toggleShowCurrentPassword" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 focus:outline-none">
              {{ showCurrentPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div class="flex flex-col">
          <label for="newPassword" class="text-white">New Password:</label>
          <div class="relative">
            <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" id="newPassword" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            <button @click="toggleShowNewPassword" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 focus:outline-none">
              {{ showNewPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-8">
        <button @click="updatePassword" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">Confirm</button>
        <button @click="$emit('close')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
 
</style>
