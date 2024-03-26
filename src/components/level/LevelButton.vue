<script setup>
const emits = defineEmits(['changeLevel'])
const props = defineProps({
    level: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <button class="w-full h-full flex justify-center items-center bg-gradient-to-t from-[#737373] to-[#D9D9D9]" @click="$emit('changeLevel', props.level.id)"
        :class="props.level.unlock ? '' : 'opacity-50 pointer-events-none'">
        <div class="flex flex-col">
            <h1 v-if="!props.level.isClear" class="text-[5vh] text-black">Level {{ props.level.id }}</h1>
            <h1 v-else class="text-[5vh] text-black opacity-50">Clear {{ props.level.id }}</h1>
        </div>
    </button>
</template>

<style scoped>

</style>