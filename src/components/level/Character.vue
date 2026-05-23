<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    char: {
        type: String,
        validator(value) {
            return ['player', 'enemy'].includes(value)
        },
        required: true
    },
    character: {
        type: Object,
        required: true
    },
    hitChar: {
        type: Boolean,
    },
    hitDamage: {
        type: Number,
    },
    screenRatio: {
        type: Boolean,
        required: true
    },
    calculateWidth: {
        type: Boolean,
        required: true
    },
    isAttacking: {
        type: Boolean,
        default: false
    }
})

const blockDirection = ref(props.char === 'player' ? -1 : 1)
const attackDirection = ref(props.char === 'player' ? 1 : -1)
const dashAnim = ref(false)

watch(() => props.isAttacking, (val) => {
    if (val) {
        dashAnim.value = false
        requestAnimationFrame(() => {
            dashAnim.value = true
            setTimeout(() => { dashAnim.value = false }, 700)
        })
    }
})
</script>

<template>
    <div class="transition-all duration-300 ease-in"
    :class="[props.character.isHit ? 'hit' : props.character.isBlock ? 'blockHit' : '', dashAnim ? 'dashing' : '']">
        <div class="relative flex justify-center items-center">
            <img v-if="props.char === 'player'" :src="`/Character/${props.character.character.image}`" :alt="props.char"
            :class="props.calculateWidth ? 'w-[23vh]' : 'w-[28vh]'">
            <img v-else :src="`/Character/${props.character.character.image}`" :alt="props.char"
            class="transform -scale-x-90"
            :class="props.calculateWidth ? 'w-[25vh]' : 'w-[30vh]'">
            <transition name="damage">
                <div v-if="props.hitChar" class="absolute font-bold damage-num">
                    {{ props.character.isHit ? props.hitDamage * -1 : props.character.isBlock ? 'Block' : '' }}
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.hit {
    animation: hit 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.blockHit {
    animation: block 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.dashing {
    animation: dash-attack 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.damage-num {
    color: #FF2200;
    text-shadow: 0 0 12px #FF0000, 0 0 24px #FF4400;
    font-size: 6vh;
    font-weight: 900;
}

.damage-enter-from {
    transform: scale(0.2) rotate(-8deg);
    opacity: 0;
}
.damage-enter-active {
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}
.damage-leave-to {
    transform: translateY(-120px) scale(0.8);
    opacity: 0;
}
.damage-leave-active {
    transition: transform 1s ease, opacity 0.8s ease 0.2s;
}

@keyframes dash-attack {
    0%   { transform: translate(0, 0) scale(1); filter: brightness(1); }
    20%  { transform: translate(v-bind('attackDirection * 190 + "px"'), -8px) scale(1.1); filter: brightness(2) saturate(1.4); }
    38%  { transform: translate(v-bind('attackDirection * 130 + "px"'), 2px) scale(1.02); filter: brightness(1.3); }
    100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
}

@keyframes hit {
    0%   { transform: translateY(0) rotate(0deg); filter: brightness(1); }
    6%   { transform: translateY(-28px) rotate(-4deg); filter: brightness(3) saturate(0) contrast(2); }
    14%  { transform: translateY(8px) rotate(3deg); filter: brightness(2) hue-rotate(350deg) saturate(2); }
    24%  { transform: translateY(-14px) rotate(-2deg); filter: brightness(1.5); }
    36%  { transform: translateY(5px); filter: brightness(1.2); }
    50%  { transform: translateY(-6px); }
    65%  { transform: translateY(0); filter: brightness(1); }
    80%  { transform: translateY(-2px); }
    100% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
}

@keyframes block {
    0%   { transform: translateX(0) scale(1); filter: brightness(1); }
    8%   { transform: translateX(v-bind('blockDirection * 45 + "px"')) scale(0.9); filter: brightness(0.6) contrast(1.5); }
    18%  { transform: translateX(v-bind('blockDirection * -18 + "px"')) scale(1.04); filter: brightness(2.5) sepia(1); }
    30%  { transform: translateX(v-bind('blockDirection * 10 + "px"')) scale(0.97); filter: brightness(1.5); }
    44%  { transform: translateX(v-bind('blockDirection * -5 + "px"')) scale(1.01); filter: brightness(1.2); }
    58%  { transform: translateX(v-bind('blockDirection * 3 + "px"')); filter: brightness(1); }
    72%  { transform: translateX(v-bind('blockDirection * -1 + "px"')); }
    100% { transform: translateX(0) scale(1); filter: brightness(1); }
}
</style>
