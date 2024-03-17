<script setup>
import { ref } from 'vue'
import { getAllUsers } from '../../libs/FetchAPI'
import router from '../../router'

const username = ref('')
const password = ref('')
const errors = ref({ username: '', password: '' })

const onLogin = async () => {
    try {
        const users = await getAllUsers()
        const user = users.find(user => user.username === username.value)
        errors.value.username = ''
        errors.value.password = ''
        if (user !== undefined) {
            if (user.password === password.value) {
                localStorage.setItem('currentUser', JSON.stringify(user))
                console.log('Logged in successfully:', user.username)
                router.push({ path: '/home' })
            } else {
                errors.value.password = 'Password is incorrect'
            }
        } else {
            errors.value.username = 'Not found this username'
        }
    } catch (error) {
        console.log(`Log-in Error: ${error}`)
    }
}
const isPasswordHind = ref(true)
const onOffPassword = () => {
    isPasswordHind.value = !isPasswordHind.value
}
</script>


<template>
    <div class="relative w-screen h-screen flex justify-center items-center">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[3vh]">
        <form class="bg-slate-500 rounded-xl p-[3vh] w-full mx-[5vh] xl:mx-[30vh] " @submit.prevent="onLogin()">
            <div class="text-[60px] text-white sm:text-[45px]">Login</div>

            <div class="mb-[2vh]">
                <hr class=" opacity-50 pb-[1vh]">
                <label for="username" class="text-white block mb-2 ">Username</label>
                <input type="text" id="username" name="username" placeholder="Username"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    v-model="username">

                <div class="text-red-600 pt-[1vh]" v-if="errors.username !== ''">{{ errors.username }}</div>
            </div>
            <div class="mb-[2vh]">
                <label for="password" class="text-white block mb-2 ">Password</label>
                <div
                    class="flex flex-row w-full rounded-full border border-gray-300 relative focus:outline-none bg-white">
                    <input :type="isPasswordHind ? 'password' : 'text'" id="password" name="password" placeholder="Password"
                        class="w-full p-2 rounded-full" v-model="password">
                    <img @click="onOffPassword" class=" opacity-30 absolute  right-0 object-fill h-[40px] w-[40px]" 
                        :src="`/Icon/${isPasswordHind ? 'in' : ''}visible.png`" />

                </div>
                <div class=" text-red-600 pt-[1vh]" v-if="errors.password !== ''">{{ errors.password }}</div>
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

#username::placeholder {
    padding: 3vh;
}
</style>