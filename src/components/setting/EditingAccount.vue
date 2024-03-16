<script setup>
import { ref } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))


</script>
<template>
  <div class="w-full h-full flex justify-center items-center bg-[#45483D] bg-opacity-70">
    <div class="max-w-md w-full mx-auto p-8 bg-slate-500 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold text-white mb-8">Account</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="username" class="text-white">Username:</label>
          <input v-model="currentUser.username" id="username" type="text" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-white">Password:</label>
          <input v-model="currentUser.password" id="password" type="password" class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div class="flex justify-end mt-8">
        <button @click="updateUserAccount" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">Confirm</button>
        <button @click="$emit('cancel')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>
