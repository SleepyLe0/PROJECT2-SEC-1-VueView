<script setup>
import { ref } from 'vue'
import BackButton from '../common/BackButton.vue'
import CharacterCard from '../common/CharacterCard.vue'
import CharacterControlButton from './CharacterControlButton.vue'

const emits = defineEmits(['resetLevel'])
const props = defineProps({
    characters: {
        type: Array,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
})

const currentCharacterId = ref(props.characters[0])

const nextCharacter = () => {
    if (currentCharacterId.value === props.characters[props.characters.length - 1]) currentCharacterId.value = props.characters[0]
    else currentCharacterId.value++
}

const previousCharacter = () => {
    if (currentCharacterId.value === props.characters[0]) currentCharacterId.value = props.characters[props.characters.length - 1]
    else currentCharacterId.value--
}

</script>

<template>
    <div class="w-screen h-[70vh] flex justify-center items-center">
        <BackButton @click="$emit('resetLevel')"/>
        <div class="flex flex-col justify-center items-center gap-[2vh]">
            <h1 class="text-[10vh] bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
                LEVEL {{ props.level }}
            </h1>
            <div class="w-[40vh] h-[40vh] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
                <div class="w-full h-full bg-[#EDDEAA] flex justify-center items-center p-[2vh]">
                    <img src="/Character/Hero/Archer.png" alt="monster">
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 bg-[#45483D] w-screen h-[35vh] flex justify-center items-center">
            <div class="relative w-full h-full flex justify-center items-center">
                <div class="absolute left-0">
                    <CharacterControlButton @buttonFunc="previousCharacter">B</CharacterControlButton>
                </div>
                <CharacterCard :heroId="currentCharacterId" />
                <div class="absolute right-0">
                    <CharacterControlButton @buttonFunc="nextCharacter">N</CharacterControlButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>