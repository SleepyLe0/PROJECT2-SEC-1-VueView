<script setup>
const props = defineProps({
    username: {
        type: String,
        default: 'guest'
    }
})
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-5">
        <h1 class="text-5xl">This is Basic Component.</h1>
        <div class="text-4xl flex gap-3">
            <slot name="greeting"></slot>
            <h2>{{ props.username }}</h2>
        </div>        
    </div>
</template>

<style lang="scss" scoped>

</style>