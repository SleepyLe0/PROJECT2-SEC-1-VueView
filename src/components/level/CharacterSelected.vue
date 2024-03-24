<script setup>
import { computed } from 'vue'
import levels from '../../data/levels'
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
    selectedCharacter: {
        type: Number,
        required: true
    },
    action: {
        type: Object,
        required: true
    }
})

const monster = computed(() => {
    return monsters.find(monster => monster.level === props.level)
})

const reward = computed(() => {
    return levels.find(level => level.id === props.level).reward
})

</script>

<template>
    <div class="w-screen h-[70vh] flex justify-center items-center">
        <BackButton @click="$emit('resetLevel')"/>
        <div class="flex flex-col justify-center items-center gap-[2vh]">
            <h1 class="text-[10vh] bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
                LEVEL {{ props.level }}
            </h1>
            <div class="p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
                <div class="bg-[#EDDEAA] flex p-[2vh]">
                    <img :src="`/Character/${monster.image}`" alt="monster" class="w-[20vh] md:w-[30vh]">
                    <div class="flex flex-col gap-[1vh] justify-center text-[2vh] md:text-[3vh] text-black">
                        <h1>Name : {{ monster.name }}</h1>
                        <h1>HP : {{ monster.hp }}</h1>
                        <h1>ATK : {{ monster.attack }}</h1>
                        <div class="flex items-center gap-[1vh]">
                            <img src="/Common/Coin.png" alt="" class="w-[4vh]">
                            <h1>{{ reward }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 bg-[#45483D] w-screen h-[40vh] flex justify-center items-center">
            <CharacterCollection :characters="props.characters" :selectedCharacter="props.selectedCharacter"
            @changeCharacter="props.action.changeCharacter"
            @selectCharacter="props.action.selectCharacter"/>
        </div>
    </div>
</template>

<style scoped>

</style>