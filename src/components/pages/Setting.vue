<script setup>
import BackButton from '../common/BackButton.vue'
import EditingAccount from '../setting/EditingAccount.vue'
import { ref } from 'vue'
import { updateUser, deleteUser } from '../../libs/FetchAPI'
import router from '../../router'


const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
const settingPage = ref('setting')
const confirmPassword = ref('')
const showCurrentPassword = ref(true)

const toggleShowCurrentPassword = () => {
  showCurrentPassword.value = !showCurrentPassword.value
}

const confirmUpdate = async (newPassword) => {
  try {
    currentUser.value.password = newPassword
    await updateUser(currentUser.value)
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    settingPage.value = 'setting'
    console.log('Password updated successfully')
  } catch(error) {
    console.log(`error: ${error}`)
  }
}

const confirmLogout = async () => {
  try {
    currentUser.value.isActive = false
    await updateUser(currentUser.value)
    localStorage.removeItem('currentUser')
    router.push('/')
  } catch(error) {
    console.log(`error: ${error}`)
  }
}

const confirmDelete = async () => {
  try {
    if (confirmPassword.value === currentUser.value.password) {
    await deleteUser(currentUser.value.id)
    console.log('Account deleted successfully')
    localStorage.removeItem('currentUser')
    router.push('/')
  } else {
    console.log('password is incorrect')
  }
  } catch (error) {
    console.log(`error: ${error}`)
  }
}
</script>

<template>
  <div v-if="settingPage === 'setting'" class="px-[6vh]">
    <BackButton path="Home" />
    <div
      class="flex justify-center relative top-[18vh] h-[72vh] border-[1.5vh] lg:border-[2vh] border-[#332222] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
      <div
        class="absolute top-[-6vh] w-[25vh] lg:w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
        <h1 class="text-center text-[5vh] lg:text-[6vh] text-black">
          Setting
        </h1>
      </div>
      <div
        class="flex flex-col items-center justify-center absolute top-[20vh] text-[3vh] gap-5 text-black sm:text-[5vh]">
        <button @click="settingPage = 'edit'" class=" hover:text-lime-200">Editing Password</button>
        <button @click="settingPage = 'confirmLogout'" class=" hover:text-lime-200">Log Out</button>
        <button @click="settingPage = 'confirmDelete'" class=" hover:text-lime-200">Delete Account</button>
      </div>
    </div>
  </div>

  <div v-else-if="settingPage === 'confirmDelete'" class="min-h-screen flex justify-center items-center bg-[#45483D] bg-opacity-70">
  <div class="max-w-md w-full mx-auto p-8 bg-slate-500 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-white mb-8">Delete Account</h2>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <label for="confirmPassword" class="text-white">Your Password:</label>
        <div class="relative">
        <input v-model="confirmPassword" :type="showCurrentPassword ? 'text' : 'password'" id="confirmPassword"  class="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full h-full" />
        <button @click="toggleShowCurrentPassword" class="top-2 right-2 focus:outline-none absolute">
              <img v-if="showCurrentPassword" src="/Icon/visible.png" alt="Hide" class="w-full h-full ">
              <img v-else src="/Icon/invisible.png" alt="Show" class="w-full h-full ">
            </button>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-8">
      <button @click="confirmDelete" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">Confirm</button>
      <button @click="settingPage = 'setting'" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
    </div>
  </div>
</div>


<div v-else-if="settingPage === 'confirmLogout'" class="min-h-screen flex justify-center items-center bg-[#45483D] bg-opacity-70">
  <div class="max-w-md w-full mx-auto p-8 bg-slate-500 rounded-lg shadow-lg flex flex-col justify-center items-center">
    <h2 class="text-3xl font-bold text-white mb-8">Confirm Log Out?</h2>
    <div class="flex gap-4">
      <button @click="confirmLogout" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4">
        Confirm
      </button>
      <button @click="settingPage = 'setting'" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Cancel
      </button>
    </div>
  </div>
</div>



  <EditingAccount v-else
  :updateUser="confirmUpdate" 
  @close="() => settingPage = 'setting'"/>
</template>


<style scoped></style>
