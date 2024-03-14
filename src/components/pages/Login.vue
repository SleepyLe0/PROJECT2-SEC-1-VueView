<script setup>
import { ref } from 'vue'
import { getAllUsers } from '../../libs/fetchapi'
import  router  from '../../router'

const username = ref('')
const password = ref('')
const errors = ref([])

const onLogin = async () => {
    try {
        const users = await getAllUsers()
        const user = users.find(u => u.username === username.value && u.password === password.value)
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            console.log('Logged in successfully:', user)
            router.push({ path: '/home' })
        } else {
            errors.value.push('Invalid username or password')
        }
    } catch (error) {
        console.error('Error logging in:', error)
        errors.value.push('Error logging in. Please try again later.')
    }
}
</script>


<template>
    <div class="relative w-screen h-screen flex justify-center items-center">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[3vh] right-[3vh] px-[1.25vh] py-[.125vh]">
        <form class="bg-slate-500 rounded-xl p-8 w-full m-[30vh]" @submit.prevent="onLogin()">
            <div class="text-[60px] text-white">Login</div>

            <div class="mb-4">
                <hr class=" opacity-50 pb-[1vh]">

                <label for="username" class="text-white block mb-2">Username</label>
                <input type="text" id="username" name="username"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    v-model="username">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.username">{{ errors.username }}</div>
            </div>
            <div class="mb-4">
                <label for="password" class="text-white block mb-2">Password</label>
                <input type="password" id="password" name="password"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    v-model="password">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.password">{{ errors.password }}</div>
            </div>
            
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline ">
                Login
            </button>
            <div class="strike">
                <span>Or</span>
            </div>
            <div class="inline-block ">
                <p class="inline">Not register yet? </p>
                <router-link to="/signup">
                    <p class="inline pb-3 hover:text-blue-700 ">Sign Up</p>
                </router-link>
            </div>

        </form>
    </div>
</template>

<style scoped>
.strike {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
}

.strike>span {
    position: relative;
    display: inline-block;
}

.strike>span:before,
.strike>span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: white;
}

.strike>span:before {
    right: 100%;
    margin-right: 15px;
}

.strike>span:after {
    left: 100%;
    margin-left: 15px;
}
</style>