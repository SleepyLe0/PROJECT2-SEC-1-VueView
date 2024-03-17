<script setup>
import { ref, computed } from 'vue'
import ActionButton from './ActionButton.vue'

const props = defineProps({
    player: {
        type: Object,
        required: true
    },
    enemy: {
        type: Object,
        required: true
    },
    action: {
        type: Function,
        required: true
    },
    turnPhase: {
        type: Object,
        required: true
    },
    screenRatio: {
        type: Boolean,
        required: true
    },
    calculateWidth: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div class="absolute bottom-0">
        <div class="flex w-screen"
        :class="props.screenRatio ? '' : 'bg-[#56443b]'">
            <div class="bg-[#3C2A21] rounded-r-lg"
            :class="props.screenRatio ? 'w-[40vh]' : 'w-full'">
                <h1 class="flex justify-center text-[#FCE6AE] font-bold"
                :class="props.turnPhase.phase === 1 ? '' : 'opacity-50', 
                props.calculateWidth ? 'text-[5vw] px-[5vw]' : 'text-[5vh] px-[7vh]'">
                    {{ props.player.skillPoint }} / {{ props.turnPhase.turn > 4 ? 4 : props.turnPhase.turn }}
                </h1>
            </div>
            <div class="w-full flex justify-center items-center">
                <h1 v-if="!props.screenRatio" class="text-[#FCE6AE] font-bold"
                :class="props.calculateWidth ? 'text-[5vw] px-[5vw]' : 'text-[5vh] px-[7vh]'">
                    Turn {{ props.turnPhase.turn }}
                </h1>
            </div>
        </div>
        <div class="flex justify-center items-center bg-gradient-to-r from-[#251F1F] to-[#393646] p-[5vh] overflow-hidden"
        :class="props.screenRatio ? 'w-fit h-fit rounded-tr-lg' : !props.calculateWidth ? 'w-screen h-[40vh]' : 'w-screen h-[55vh]'">
            <div class="flex gap-[2vh] h-fit" 
            :class="props.calculateWidth ? 'flex-col' : 'flex-row', props.turnPhase.phase === 1 ? '' : 'opacity-50 pointer-events-none'">
                <ActionButton :actionPoint="props.player.action.charge" 
                actionText="charge"
                image="/Skill/Charge.png"
                :responsive="props.calculateWidth"
                @action="props.action"/>
                <ActionButton :actionPoint="props.player.action.defense" 
                actionText="defense"
                image="/Skill/Defense.png" 
                :responsive="props.calculateWidth"
                @action="props.action"/>
                <ActionButton :actionPoint="props.player.action.attack" 
                actionText="attack"
                image="/Skill/Attack.png"
                :responsive="props.calculateWidth"
                @action="props.action"/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>