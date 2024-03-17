<script setup>
const props = defineProps({
    path: {
        type: String,
    }
})
</script>

<template>
    <div v-if="props.path !== undefined" class="absolute top-[2vh] left-[2vh]">
        <router-link :to="`/${props.path}`">
            <img src="/Common/BackButton.png" alt="back" class="w-[15vw] md:w-[10vh]">
        </router-link>
    </div>
    <button v-else class="absolute top-[2vh] left-[2vh]">
        <img src="/Common/BackButton.png" alt="back" class="w-[15vw] md:w-[10vh]">
    </button>
</template>

<style scoped>

</style>