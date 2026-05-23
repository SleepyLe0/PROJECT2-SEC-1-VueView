<script setup>
import SignUpValidations from '../../libs/SignUpValidations'
import router from '../../router'
import levels from '../../data/levels'
import { addUser,getAllUsers } from '../../libs/FetchAPI'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const isPasswordHind = ref(true)
const isConfirmPasswordHind = ref(true)
const onOffPassword = (x) => {
    if(x === 'isPasswordHind') x = isPasswordHind
    else x = isConfirmPasswordHind
    x.value = !x.value
}

const onSignup = async () => {
    const validations = new SignUpValidations(username.value, password.value, confirmPassword.value)
    errors.value = await validations.checkValidations()
    const users = await getAllUsers()
    console.log(users)
    let countError = 0
    for (const error in errors.value) {
        if (errors.value[error].length > 0) countError++
    }
    if (countError > 0) return false
    try {
        const newUser = {
            id: `${users.length === 0 ? 1 : Number(users[users.length - 1].id) + 1}`,
            username: username.value,
            password: password.value,
            gold: 0,
            levels: levels,
            characters: [ 1 ],
            isActive: false
        }
        await addUser(newUser)
        router.push({ path: '/login' })
    } catch (error) {
        console.log(`Sign-up Error: ${error}`)
    }
}

</script>


<template>
    <div class="relative w-screen h-screen flex justify-center items-center">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[3vh] anim-slam-down" style="animation-delay:0.15s">
        <form class="bg-slate-500 rounded-xl p-[3vh] w-full mx-[5vh] xl:mx-[30vh] anim-slide-up" style="animation-delay:0.3s" @submit.prevent="onSignup()">
            <div class="text-[60px] text-white">SignUp</div>
            <div class="mb-4">
                <hr class=" opacity-50 pb-[1vh]">
                <label for="username" class="text-white block mb-2">Username</label>
                <input type="text" id="username" name="username"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Username" v-model.trim="username">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.username !== ''">{{ errors.username }}</div>
            </div>
            <div class="mb-4">
                <label for="password"  class="text-white block mb-2">Password</label>
                <div
                    class="flex flex-row w-full rounded-full border border-gray-300 relative focus:outline-none bg-white">
                    <input :type="isPasswordHind ? 'password' : 'text'" name="Password" id="password" class="w-full p-2 rounded-full"
                        placeholder="New password" v-model.trim="password">
                    <img @click="onOffPassword('isPasswordHind')" class=" opacity-30 absolute  right-0 object-fill h-[40px] w-[40px]"
                        :src="`/Icon/${isPasswordHind ? 'in' : ''}visible.png`" />
                </div>
                <div class=" text-red-600 pt-[1vh]" v-if="errors.password !== ''">{{ errors.password }}</div>

            </div>

            <div class="mb-4">
                <label for="ConfirmPassword" class="text-white block mb-2">Confirm Password</label>
                <div class=" text-red-600 pt-[1vh]" v-if="errors.confirm !== ''">{{ errors.confirm }}</div>
                <div
                    class="flex flex-row w-full rounded-full border border-gray-300 relative focus:outline-none bg-white">
                    
                <input :type="isConfirmPasswordHind ? 'password' : 'text'" id="ConfirmPassword" name="ConfirmPassword"
                class="w-full p-2 rounded-full"                    placeholder="Confirm password" v-model="confirmPassword">
                <img @click="onOffPassword('isConfirmPasswordHind')" class=" opacity-30 absolute  right-0  h-[40px] w-[40px]"
                    :src="`/Icon/${isConfirmPasswordHind ? 'in' : ''}visible.png`" /></div>

            </div>
            <div class="flex justify-center gap-3">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline">
                    Sign Up
                </button>
                <router-link to="/login"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline">
                    Cancel
                </router-link>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>