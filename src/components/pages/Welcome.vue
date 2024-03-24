<script setup>
import { getUserById } from '../../libs/FetchAPI'
import router from '../../router'

const authentication = async () => {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
        if (currentUser === undefined) router.push({ path: '/login' })
        else {
            const user = await getUserById(currentUser.id)
            if (user.isActive) router.push({ path: '/login' })
            else {
                user.isActive = true
                localStorage.setItem('currentUser', JSON.stringify(user))
                router.push({ path: '/home' })
            }
        }
    } catch(error) {
        console.log(`error :${error}`)
    }
}
</script>

<template>
    <div class="text-black flex h-screen justify-center items-center  text-[6.5vh] xl:text-[8vh] rounded-lg">
        <img src="/Common/Logo.png" alt="logo" class="absolute top-[4.5vh]  md:top-[3vh]  right-[2vh] md:right-[3vh] w-[20vh] md-w-0">
        <button @click="authentication">
            <div class=" flex justify-center items-center rounded-full  w-[30vh] xl:w-[40vh] h-[11vh] xl:h-[15vh] bg-gradient-to-t from-red-900 to-orange-300  border-4 border-orange-200  ">
                <h1>Play</h1>
            </div>
        </button>
    </div>
</template>

<style scoped></style>