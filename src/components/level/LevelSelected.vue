<script setup>
import LevelButton from './LevelButton.vue'
import BackButton from '../common/BackButton.vue'

const props = defineProps({
    levels: {
        type: Array,
        required: true
    },
    action: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <BackButton path="home" />
        <div class="flex flex-col justify-center items-center gap-[2vh]">
            <h1 class="text-[10vh] bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent anim-slam-down"
                style="animation-delay:0.15s">
                LEVEL
            </h1>
            <div class="w-[90vw] h-[70vh] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411]">
                <div class="w-full h-full bg-[#EDDEAA] grid grid-cols-1 xl:grid-cols-5 gap-[2vh] p-[2vh]">
                    <div v-for="(level, i) in props.levels" :key="level.id"
                        class="anim-slam-up" :style="`animation-delay:${0.3 + i * 0.08}s`">
                        <LevelButton :level="level" @changeLevel="action" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>