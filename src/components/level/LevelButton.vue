<script setup>
const props = defineProps({
    level: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <button class="w-full h-full flex justify-center items-center bg-gradient-to-t from-[#737373] to-[#D9D9D9]"
        :class="props.level.unlock ? '' : 'opacity-50 pointer-events-none'">
        <h1 class="text-[5vh] text-black">Level {{ props.level.id }}</h1>
    </button>
</template>

<style scoped>

</style>