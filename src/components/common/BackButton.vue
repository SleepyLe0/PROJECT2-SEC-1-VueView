<script setup>
const props = defineProps({
    path: {
        type: String,
    }
})
</script>

<template>
    <div class="absolute top-[2vh] left-[2vh]">
        <router-link :to="`/${props.path}`">
            <img src="/Common/BackButton.png" alt="back" class="w-[15vw] md:w-[10vh]">
        </router-link>
    </div>
</template>

<style scoped>

</style>