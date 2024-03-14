<script setup>
import { computed } from 'vue'
import monsters from '../../data/monsters'
import BackButton from '../common/BackButton.vue'
import CharacterCollection from './CharacterCollection.vue'

const emits = defineEmits(['resetLevel'])
const props = defineProps({
    characters: {
        type: Array,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    action: {
        type: Function,
        required: true
    }
})

const monster = computed(() => {
    return monsters.find(monster => monster.level === props.level)
})

</script>

<template>
    <div class="w-screen h-[70vh] flex justify-center items-center">
        <BackButton @click="$emit('resetLevel')"/>
        <div class="flex flex-col justify-center items-center gap-[2vh]">
            <h1 class="text-[10vh] bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
                LEVEL {{ props.level }}
            </h1>
            <div class="w-[30vh] h-[30vh] xl:w-[50vw] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
                <div class="w-full h-full bg-[#EDDEAA] flex justify-center items-center p-[2vh]">
                    <img :src="`/Character Icon/${monster.image}`" alt="monster">
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 bg-[#45483D] w-screen h-[40vh] flex justify-center items-center">
            <CharacterCollection :characters="props.characters" @changeCharacter="props.action"/>
        </div>
    </div>
</template>

<style scoped>

</style>