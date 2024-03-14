<script setup>
import SignupValidations from '../../libs/SignUpValidations';
import { addUser } from '../../libs/fetchapi';
import {  ref } from 'vue';

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errors = ref([]);
const gold = ref(100);
const level = ref([
  { id: 1, unlock: true },
  { id: 2, unlock: false },
  { id: 3, unlock: false },
  { id: 4, unlock: false },
  { id: 5, unlock: false }
]);


const character = ref([]);

const onSignup = async () => {
    let validations = new SignupValidations(username.value, password.value, confirmPassword.value);
    errors.value = validations.checkValidations();
    if (errors.value.length) {
        return false;
    }
    try {
        const id = {
            username: username.value,
            password: password.value,
            gold: gold.value,
            levels: level.value,
            character: character.value
        };
        await addUser(id);
    } catch (error) {
        console.error('Error signing up:', error);
    }
}

</script>


<template>
    <div class="relative w-screen h-screen flex justify-center items-center">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[3vh] right-[3vh] px-[1.25vh] py-[.125vh]">
        <form class="bg-slate-500 rounded-xl p-8 w-full max-w-md" @submit.prevent="onSignup()">
            <div class="text-[60px] text-white">SignUp</div>
            <div class="mb-4">
                <hr class=" opacity-50 pb-[1vh]">
                <label for="username" class="text-white block mb-2">Username</label>
                <input type="text" id="username" name="username"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Username" v-model.trim="username">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.username">{{ errors.username }}</div>
            </div>
            <div class="mb-4">
                <label for="Password" class="text-white block mb-2">Password</label>
                <input type="password" id="Password" name="Password"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="New password" v-model.trim="password">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.password">{{ errors.password }}</div>
            </div>
            <div class="mb-4">
                <label for="ConfirmPassword" class="text-white block mb-2">Confirm Password</label>
                <input type="password" id="ConfirmPassword" name="ConfirmPassword"
                    class="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Confirm password" v-model="confirmPassword">
                <div class=" text-red-600 pt-[1vh]" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
            </div>
            <div class="flex justify-center gap-3">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline ">
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