<script setup>
import { computed } from 'vue'
import heros from '../../data/heros'
import monsters from '../../data/monsters'

const props = defineProps({
    level: {
        type: Number,
        required: true
    },
    character: {
        type: Number,
        required: true
    }
})

const hero = computed(() => {
    return heros.find(hero => hero.id === props.character)
})

const monster = computed(() => {
    return monsters.find(monster => monster.level === props.level)
})
</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <img :src="`/Character Icon/${hero.image}`" alt="hero">
        <img :src="`/Character Icon/${monster.image}`" alt="monster">
    </div>
</template>

<style scoped>

</style>