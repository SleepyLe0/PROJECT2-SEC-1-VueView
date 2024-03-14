<script setup>
import heros from '../../data/heros'
import CharacterCard from '../common/CharacterCard.vue'
import { computed, defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({
    character: {
        type: Array,
        required: true
    }
})

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))

const characters = computed(() => {
    return heros.filter(hero => currentUser.value.characters.includes(hero.id))
})
</script>

<template>
    <div class="px-[6vh]">
        <div class="absolute top-[2vh] left-[2vh]">
            <router-link to="/home">
                <img src="/Common/BackButton.png" alt="back" class="w-[15vw] md:w-[10vh]">
            </router-link>
        </div>
        <div class="flex justify-center relative top-[15vh] h-[72vh] border-[1.5vh] lg:border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#131411]">
            <div class="absolute top-[-6vh] w-[25vh] lg:w-[50vh] h-[10vh] border-[#332222] border-[1vh] bg-gradient-to-b from-[#D9D9D9] to-[#737373]">
                <h1 class="text-center text-[5vh] lg:text-[6vh] text-black">Inventory </h1>
            </div>
            <div class="flex flex-wrap  items-center gap-[4vh] p-[10vh]">
            <div v-for="character in characters" :key="character.id">
                <CharacterCard :hero="character" />
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped></style>
