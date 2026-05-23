<script setup>
import { getAllUsers, getUserById, updateUser } from '../../libs/FetchAPI'
import router from '../../router'
import HowToPlay from '../welcome/HowToPlay.vue'


const authentication = async () => {
    try {
        const users = await getAllUsers()
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? undefined
        if (currentUser === undefined) router.push({ path: '/login' })
        else {
            const isUserExist = users.some(user => user.id === currentUser.id)
            if (!isUserExist) router.push({ path: '/login' })
            else {
                const user = await getUserById(currentUser.id)
                if (user.isActive) router.push({ path: '/login' })
                else {
                    user.isActive = true
                    await updateUser(user)
                    localStorage.setItem('currentUser', JSON.stringify(user))
                    router.push({ path: '/home' })
                }
            }
        }
    } catch(error) {
        console.log(`error :${error}`)
    }
}
</script>

<template>
    <div class="text-black flex flex-col gap-5 h-screen justify-center items-center text-[6.5vh] xl:text-[8vh] rounded-lg">
        <img src="/Common/Logo.png" alt="logo"
            class="absolute top-[4.5vh] md:top-[3vh] right-[2vh] md:right-[3vh] w-[20vh] md-w-0 anim-slam-down"
            style="animation-delay: 0.2s">
        <button @click="authentication" class="btn-epic">
            <div class="flex justify-center items-center rounded-full w-[30vh] xl:w-[40vh] h-[11vh] xl:h-[15vh] bg-gradient-to-t from-red-900 to-orange-300 border-4 border-orange-200 anim-slam-in anim-pulse-glow"
                style="animation-delay: 0.45s">
                <h1>Play</h1>
            </div>
        </button>
        <div class="anim-slam-in" style="animation-delay: 0.65s">
            <HowToPlay />
        </div>
    </div>
</template>

<style scoped></style>