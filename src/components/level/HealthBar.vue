<script setup>
import { computed } from 'vue'

const props = defineProps({
    char: {
        type: String,
        validator(value) {
            return ['player', 'enemy'].includes(value)
        },
        required: true
    },
    hpPercentage: {
        type: Number,
        required: true
    },
    atk: {
        type: Number,
        required: true
    }
})

const hpColor = computed(() => {
    if (props.hpPercentage > 50) return 'from-[#06FF00]'
    else if (props.hpPercentage > 20) return 'from-[#FFE400]'
    else return 'from-[#FF1700]' 
})
</script>

<template>
    <div class="w-full flex flex-col font-extrabold">
        <div class=" w-full flex bg-black" :class="props.char === 'player' ? 'justify-start' : 'justify-end'">
            <div class="relative h-[8vh] flex transition-all ease-in-out duration-500 bg-gradient-to-b to-white"
                :class="hpColor, props.charBar === 'player' ? 'justify-start' : 'justify-end'"
                :style="{ width: props.hpPercentage + '%' }">
                <h1 class="absolute w-full h-full flex items-center text-black text-[3vh] px-[3vh]" 
                :class="props.char === 'player' ? 'justify-start' : 'justify-end'">
                    <slot>{{ props.charBar }}</slot>
                </h1>
            </div>
        </div>
        <div class="w-full flex"
        :class="props.char === 'player' ? 'justify-start' : 'justify-end'">
            <div class="bg-[#D9D9D9] px-[3vh]"
            :class="props.char === 'player' ? 'rounded-r-lg' : 'rounded-l-lg'">
                <h1 class="text-black text-[3vh]">ATK : {{ props.atk }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>