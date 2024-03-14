<script setup>
const emits = defineEmits(['buttonFunc'])
</script>

<template>
    <button class="flex justify-center items-center p-[3vh] shadow-lg bg-[#3C2A21]" @click="$emit('buttonFunc')">
        <slot></slot>
    </button>
</template>

<style scoped>

</style>