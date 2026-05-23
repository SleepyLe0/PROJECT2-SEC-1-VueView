<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['action'])
const props = defineProps({
    actionPoint: {
        type: Number,
        required: true
    },
    actionText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    responsive: {
        type: Boolean,
        required: true
    }
})

const isClicked = ref(false)
const counterPop = ref(false)

const handleClick = () => {
    isClicked.value = false
    requestAnimationFrame(() => {
        isClicked.value = true
        setTimeout(() => { isClicked.value = false }, 500)
    })
    emits('action', props.actionText)
}

watch(() => props.actionPoint, () => {
    counterPop.value = false
    requestAnimationFrame(() => {
        counterPop.value = true
        setTimeout(() => { counterPop.value = false }, 400)
    })
})
</script>

<template>
    <button class="w-full h-fit flex justify-center btn-action"
    @click="handleClick"
    :class="[
        props.actionText === 'charge' && props.actionPoint === 4 ? 'pointer-events-none opacity-50' : '',
        isClicked ? 'btn-click' : ''
    ]">
        <div class="relative">
            <img :src="props.image" alt="action"
            :class="props.responsive ? 'w-[15vh]' : 'w-[20vh]'">
            <h1 class="absolute -bottom-[4vh] -left-[1vh] text-[#FCE6AE] text-[5vh]"
                :class="counterPop ? 'counter-pop' : ''">
                {{ props.actionPoint }}
            </h1>
        </div>
    </button>
</template>

<style scoped>
.btn-action {
    transition: filter 0.2s ease;
}
.btn-action:hover {
    filter: brightness(1.3) drop-shadow(0 0 8px rgba(212, 134, 10, 0.7));
}

@keyframes btn-click-anim {
    0%   { transform: scale(1); }
    15%  { transform: scale(0.82); }
    45%  { transform: scale(1.18); }
    65%  { transform: scale(0.96); }
    80%  { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@keyframes counter-pop-anim {
    0%   { transform: scale(1); color: #FCE6AE; }
    30%  { transform: scale(1.8); color: #FF9900; text-shadow: 0 0 10px #FF9900; }
    60%  { transform: scale(0.9); }
    100% { transform: scale(1); color: #FCE6AE; text-shadow: none; }
}

.btn-click {
    animation: btn-click-anim 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.counter-pop {
    animation: counter-pop-anim 0.4s ease both;
    display: inline-block;
}
</style>
