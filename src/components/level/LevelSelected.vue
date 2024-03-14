<script setup>
import LevelButton from './LevelButton.vue'
import BackButton from '../common/BackButton.vue'

const props = defineProps({
    levels: {
        type: Array,
        required: true
    },
    buttonFunc: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <BackButton path="home" />
        <div class="flex flex-col justify-center items-center gap-[2vh]">
            <h1 class="text-[10vh] bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
                LEVEL
            </h1>
            <div
                class="w-[80vw] h-[70vh] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
                <div class="w-full h-full bg-[#EDDEAA] grid grid-cols-1 xl:grid-cols-5 gap-[2vh] p-[2vh]">
                    <LevelButton v-for="level in props.levels" :level="level" @changeLevel="buttonFunc" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>