<script setup>
import LevelSelected from '../level/LevelSelected.vue'
import { ref } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-50">
        <LevelSelected :levels="currentUser.levels"/>
    </div>
</template>

<style scoped>

</style>