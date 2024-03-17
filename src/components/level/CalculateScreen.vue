<script setup>
const props = defineProps({
    attackChar: {
        type: String,
        required: true,
        validator(value) {
            return ['player', 'enemy'].includes(value)
        }
    },
    attackPoint: {
        type: Number,
        required: true
    },
    defensePoint: {
        type: Number,
        required: true
    },
    screenRatio: {
        type: Boolean,
        required: true
    },
    calculateWidth: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div class="flex w-full h-full justify-around items-center"
    :class="!props.screenRatio ? 'flex-col' : props.attackChar === 'player' ? 'flex-row' : 'flex-row-reverse'">
        <div class="relative flex justify-center items-center text-5xl text-white">
            <img src="/Skill/Attack.png" alt="" class="w-[30vh] h-[30vh]">
            <h1 class="absolute -bottom-3 -left-3 font-bold">
                {{ props.attackPoint }}
            </h1>
        </div>
        <div class="relative flex justify-center items-center text-5xl text-white">
            <img src="/Skill/Defense.png" alt="" class="w-[30vh] h-[30vh]">
            <h1 class="absolute -bottom-3 -left-3 font-bold">
                {{ props.defensePoint }}
            </h1>
        </div>
    </div>
</template>

<style scoped></style>