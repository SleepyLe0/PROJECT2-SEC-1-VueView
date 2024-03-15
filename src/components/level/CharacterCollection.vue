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
    if (currentCharacterId.value === props.characters[props.characters.length - 1]) currentCharacterId.value = props.characters[0]
    else currentCharacterId.value++
}

const previousCharacter = () => {
    if (currentCharacterId.value === props.characters[0]) currentCharacterId.value = props.characters[props.characters.length - 1]
    else currentCharacterId.value--
}

const calculateWidth = computed(() => {
    const cardWidth = heightScreen.value * 26 / 100
    return widthScreen.value <= (props.characters.length * cardWidth) + 100
})
</script>

<template>
    <div v-if="calculateWidth" class="relative w-full h-full flex justify-center items-center text-black">
        <button class="flex justify-center items-center p-[3vh] shadow-lg bg-[#3C2A21] absolute left-0 rotate-180 border-[.25vh] border-black" 
            @click="previousCharacter">
            >>
        </button>
        <div class="flex flex-col gap-[2vh]">
            <CharacterCard :heroId="currentCharacterId" />
            <button class="bg-green-500 p-[1vh] rounded-lg border-[.25vh] border-black" @click="$emit('changeCharacter', currentCharacterId)">
                Confirm
            </button>
        </div>
        <button class="flex justify-center items-center p-[3vh] shadow-lg bg-[#3C2A21] absolute right-0 border-[.25vh] border-black" 
            @click="nextCharacter">
            >>
        </button>
    </div>
    <div v-else class="relative w-full h-full flex justify-center items-center gap-[2vh] overflow-hidden">
        <CharacterCard v-for="character in props.characters" class="cursor-pointer"
        :class="props.selectedCharacter === character ? 'border-[.5vh] border-[#49FF00] rounded-lg' : ''"
        :heroId="character" 
        @click="$emit('selectCharacter', character)"/>
        <button class="absolute top-[3vh] right-[3vh] p-[2vh] text-[3vh] text-black bg-[#49FF00] rounded-lg border-[.5vh] border-black"
            @click="$emit('changeCharacter')">
            Confirm
        </button>
    </div>
</template>

<style lang="scss" scoped>

</style>