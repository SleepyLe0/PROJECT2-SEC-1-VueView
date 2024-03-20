<script setup>
import { ref, computed } from 'vue'
import CharacterCard from '../common/CharacterCard.vue'

const emits = defineEmits(['changeCharacter', 'selectCharacter'])
const props = defineProps({
    characters: {
        type: Array,
        required: true
    },
    selectedCharacter: {
        type: Number,
        required: true
    }
})

const widthScreen = ref(window.innerWidth)
const heightScreen = ref(window.innerHeight)

window.onresize = () => {
    widthScreen.value = window.innerWidth
    heightScreen.value = window.innerHeight
}

const currentCharacterId = ref(props.characters[0])

const nextCharacter = () => {
    const currentCharacterIndex = props.characters.findIndex(character => character === currentCharacterId.value)
    if (currentCharacterIndex === props.characters.length - 1) currentCharacterId.value = props.characters[0]
    else currentCharacterId.value = props.characters[currentCharacterIndex + 1]
}

const previousCharacter = () => {
    const currentCharacterIndex = props.characters.findIndex(character => character === currentCharacterId.value)
    if (currentCharacterIndex === 0) currentCharacterId.value = props.characters[props.characters.length - 1]
    else currentCharacterId.value = props.characters[currentCharacterIndex - 1]
}

const calculateWidth = computed(() => {
    const cardWidth = heightScreen.value * 28 / 100
    return widthScreen.value <= (props.characters.length * cardWidth) || widthScreen.value * 120 / 100 <= heightScreen.value
})
</script>

<template>
    <div v-if="calculateWidth" class="relative w-full h-full flex justify-center items-center text-black">
        <button class="flex justify-center items-center absolute left-0" 
        :class="props.characters.length === 1 ? 'pointer-events-none opacity-50' : ''"
        @click="previousCharacter">
            <img src="/Common/LeftButton.png" alt="button" class="w-[7vh]">
        </button>
        <div class="flex flex-col gap-[2vh]">
            <CharacterCard :heroId="currentCharacterId" />
            <button class="bg-[#49FF00] p-[1vh] rounded-lg border-[.25vh] border-black" 
            @click="$emit('changeCharacter', currentCharacterId)">
                Confirm
            </button>
        </div>
        <button class="flex justify-center items-center absolute right-0" 
        :class="props.characters.length === 1 ? 'pointer-events-none opacity-50' : ''"
        @click="nextCharacter">
            <img src="/Common/RightButton.png" alt="button" class="w-[7vh]">
        </button>
    </div>
    <div v-else class="relative w-full h-full flex justify-center items-center gap-[2vh]">
        <CharacterCard v-for="character in props.characters" class="cursor-pointer"
        :class="props.selectedCharacter === character ? 'border-[.5vh] border-[#49FF00] rounded-lg' : ''"
        :heroId="character" 
        @click="$emit('selectCharacter', character)"/>
        <button class="absolute -top-[10vh] right-[3vh] p-[2vh] text-[3vh] text-black bg-[#49FF00] rounded-lg border-[.5vh] border-black"
        :class="props.selectedCharacter === 0 ? 'pointer-events-none opacity-50' : ''"
        @click="$emit('changeCharacter')">
            Confirm
        </button>
    </div>
</template>

<style lang="scss" scoped>

</style>