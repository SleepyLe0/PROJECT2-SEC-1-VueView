<script setup>
const props = defineProps({
    actionVar: {
        type: Number,
        required: true
    },
    actionFunc: {
        type: Function
    }
})
</script>

<template>
    <button v-if="props.actionFunc !== undefined" class="flex relative justify-center items-center w-[15vh] h-[15vh] text-[3vh] bg-base-200" @click="props.actionFunc">
        <slot></slot>
        <h1 class="absolute -bottom-[2.5vh] -left-[1vh] text-[5vh]">
            {{ props.actionVar }}
        </h1>
    </button>
    <button v-else class="flex relative justify-center items-center w-[15vh] h-[15vh] text-[3vh] bg-base-200 pointer-events-none">
        <slot></slot>
        <h1 class="absolute -bottom-[2.5vh] -left-[1vh] text-[5vh]">
            {{ props.actionVar }}
        </h1>
    </button>
</template>

<style scoped></style>