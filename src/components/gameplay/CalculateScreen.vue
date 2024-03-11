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
    }
})
</script>

<template>
    <div class="flex w-full h-full justify-around items-center">
        <div class="relative w-[30vh] h-[30vh] flex justify-center items-center text-5xl text-white"
            :class="props.attackChar === 'player' ? 'bg-red-700' : 'bg-blue-700'">
            <h1>{{ props.attackChar === 'player' ? 'Attack' : 'Defense' }}</h1>
            <h1 class="absolute -bottom-3 -left-3 font-bold">
                {{ props.attackChar === 'player' ? props.attackPoint : props.defensePoint }}
            </h1>
        </div>
        <div class="relative w-[30vh] h-[30vh] flex justify-center items-center text-5xl text-white"
            :class="props.attackChar === 'enemy' ? 'bg-red-700' : 'bg-blue-700'">
            <h1>{{ props.attackChar === 'enemy' ? 'Attack' : 'Defense' }}</h1>
            <h1 class="absolute -bottom-3 -left-3 font-bold">
                {{ props.attackChar === 'enemy' ? props.attackPoint : props.defensePoint }}
            </h1>
        </div>
    </div>
</template>

<style scoped></style>