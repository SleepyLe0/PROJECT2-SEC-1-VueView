<script setup>
import LevelSelected from '../level/LevelSelected.vue'
import { userAccounts } from '../../../data/db.json'
import { ref } from 'vue'

// const props = defineProps({
//     currentUser: {
//         type: Object,
//         required: true
//     }
// })

const user = ref(userAccounts[1])
</script>

<template>
    <div class="w-screen h-screen bg-black bg-opacity-50">
        <LevelSelected :levels="user.levels"/>
    </div>
</template>

<style scoped>

</style>