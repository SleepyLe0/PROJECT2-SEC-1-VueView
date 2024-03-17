<script setup>
const emits = defineEmits(['action'])
const props = defineProps({
    actionPoint: {
        type: Number,
        required: true
    },
    actionText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    responsive: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <button class="w-full h-fit flex justify-center" @click="$emit('action', props.actionText)"
    :class="props.actionText === 'charge' && props.actionPoint === 4 ? 'pointer-events-none opacity-50' : ''">
        <div class="relative">
            <img :src="props.image" alt="action"
            :class="props.responsive ? 'w-[15vh]' : 'w-[20vh]'">
            <h1 class="absolute -bottom-[4vh] -left-[1vh] text-[#FCE6AE] text-[5vh]">
                {{ props.actionPoint }}
            </h1>
        </div>
    </button>
</template>

<style scoped></style>