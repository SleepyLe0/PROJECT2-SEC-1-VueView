<script setup>
import { ref } from 'vue'

const props = defineProps({
    char: {
        type: String,
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
    }
})

const blockDirection = ref(props.char === 'player' ? -1 : 1)

</script>

<template>
    <div class="transition-all duration-300 ease-in"
    :class="props.character.isHit ? 'hit' : props.character.isBlock ? 'blockHit' : props.character.currentHP === 0 ? 'rotate-90' : ''">
        <div class="relative flex justify-center items-center">
            <img :src="`/Character/${props.character.character.image}`" :alt="props.char" class="w-[28vh]" 
            :class="props.char === 'enemy' ? 'transform -scale-x-100' : ''">
            <transition name="damage">
                <div v-if="props.hitChar" class="absolute text-[5vh] font-bold text-white">
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

.dead {
    animation: dead 1s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.damage-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}

.damage-leave-active {
    transition: all 1s ease;
}

@keyframes hit {
    0% {
        transform: translateY(0);
    }

    20% {
        transform: translateY(-30px);
    }

    40% {
        transform: translateY(0);
    }

    60% {
        transform: translateY(-15px);
    }

    80% {
        transform: translateY(0);
    }
}

@keyframes block {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX( v-bind(blockDirection * 50 + "px"));
    }

    40% {
        transform: translateX(0);
    }

    60% {
        transform: translateX(v-bind(blockDirection * 30 + "px"));
    }

    80% {
        transform: translateX(0);
    }
}
</style>