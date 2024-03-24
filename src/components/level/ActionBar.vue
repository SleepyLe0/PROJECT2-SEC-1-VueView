<script setup>
import ActionButton from './ActionButton.vue'

const props = defineProps({
    player: {
        type: Object,
        required: true
    },
    action: {
        type: Function,
        required: true
    },
    phase: {
        type: Number,
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
        <div class="flex justify-center items-center bg-gradient-to-r from-[#251F1F] to-[#393646] p-[5vh] overflow-hidden"
        :class="props.screenRatio ? 'w-fit h-fit rounded-tr-lg' : !props.calculateWidth ? 'w-screen h-[40vh]' : 'w-screen h-[55vh]'">
            <div class="flex gap-[2vh] h-fit" 
            :class="props.calculateWidth ? 'flex-col' : 'flex-row', props.phase === 1 ? '' : 'opacity-50 pointer-events-none'">
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