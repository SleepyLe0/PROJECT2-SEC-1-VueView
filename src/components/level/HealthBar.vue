<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    char: {
        type: String,
        validator(value) {
            return ['player', 'enemy'].includes(value)
        },
        required: true
    },
    character: {
        type: Object,
        required: true
    },
    turn: {
        type: Number,
        required: true
    }
})

const hpPercentage = computed(() => {
    return props.character.currentHP / props.character.character.hp * 100
})

const hpColor = computed(() => {
    if (hpPercentage.value > 50) return 'from-[#06FF00]'
    else if (hpPercentage.value > 20) return 'from-[#FFE400]'
    else return 'from-[#FF1700]'
})

const hpFlash = ref(false)
watch(() => props.character.currentHP, (newVal, oldVal) => {
    if (newVal < oldVal) {
        hpFlash.value = false
        requestAnimationFrame(() => {
            hpFlash.value = true
            setTimeout(() => { hpFlash.value = false }, 600)
        })
    }
})
</script>

<template>
    <div class="w-full flex flex-col font-extrabold">
        <div class="w-full flex bg-black" :class="props.char === 'player' ? 'justify-start' : 'justify-end'">
            <div class="relative h-[8vh] flex transition-all ease-in-out duration-500 bg-gradient-to-b to-gray-700"
                :class="[hpColor, props.char === 'player' ? 'justify-start' : 'justify-end', hpFlash ? 'hp-flash' : '']"
                :style="{ width: hpPercentage + '%' }">
                <h1 class="absolute w-full h-full flex items-center text-white text-[3vh] px-[3vh]"
                :class="props.char === 'player' ? 'justify-start' : 'justify-end'">
                    <slot>{{ props.char }}</slot>
                </h1>
            </div>
        </div>
        <div class="w-full flex"
        :class="props.char === 'player' ? 'flex-row' : 'flex-row-reverse'">
            <div class="flex w-fit bg-[#3C2A21]"
            :class="props.char === 'player' ? 'flex-row rounded-r-lg' : 'flex-row-reverse rounded-l-lg'">
                <div class="bg-[#D9D9D9] px-[3vh]"
                :class="props.char === 'player' ? 'rounded-r-lg' : 'rounded-l-lg'">
                    <h1 class="text-black text-[3vh]">ATK : {{ props.character.character.attack }}</h1>
                </div>
                <div class="px-[3vh]">
                    <h1 class="text-[#FCE6AE] text-[3vh]">{{ `${props.character.skillPoint} / ${props.turn > 4 ? 4 : props.turn}` }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes hp-flash-anim {
    0%   { filter: brightness(1); }
    15%  { filter: brightness(3) saturate(0); }
    35%  { filter: brightness(1.8) hue-rotate(340deg) saturate(2); }
    60%  { filter: brightness(1.3); }
    100% { filter: brightness(1); }
}

.hp-flash {
    animation: hp-flash-anim 0.6s ease;
}
</style>
