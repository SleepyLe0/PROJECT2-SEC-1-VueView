<script setup>
import { computed } from 'vue'

const props = defineProps({
    charBar: {
        type: String,
        validator(value) {
            return ['player', 'enemy'].includes(value)
        },
        required: true
    },
    hpPercentage: {
        type: Number,
        required: true
    }
})

const hpColor = computed(() => {
    if (props.hpPercentage > 50) return 'bg-green-500'
    else if (props.hpPercentage > 20) return 'bg-yellow-500'
    else return 'bg-red-700' 
})
</script>

<template>
    <div class="border-2 w-[50vh] p-5">
        <div class="relative flex overflow-hidden bg-black" :class="props.charBar === 'player' ? 'justify-start' : 'justify-end'">
            <div class="h-full flex transition-all ease-in-out duration-500"
                :class="hpColor, props.charBar === 'player' ? 'justify-start' : 'justify-end'"
                :style="{ width: props.hpPercentage + '%' }">
                <p class="w-[50vh] opacity-0">demo</p>
            </div>
            <h1 class="absolute w-full flex text-white" :class="props.charBar === 'player' ? 'justify-start' : 'justify-end'">
                <slot>{{ props.charBar }}</slot>
            </h1>
        </div>
    </div>

</template>

<style lang="scss" scoped></style>