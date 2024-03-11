<script setup>
const props = defineProps({
    char: {
        type: String,
        required: true
    },
    hitTrigger: {
        type: Boolean,
        required: true
    },
    blockTrigger: {
        type: Boolean,
        required: true
    },
    hitChar: {
        type: Boolean,
    },
    hitDamage: {
        type: Number,
    }
})

</script>

<template>
    <div class="absolute flex justify-center items-center w-[30vh] h-[30vh]" :class="{ hit: props.hitTrigger }, 
        props.char === 'player' ? { pBlock: props.blockTrigger } : { eBlock: props.blockTrigger },
        props.char === 'player' ? 'bg-green-700 left-[30vh]' : 'bg-red-900 right-[30vh]'">
        <div class="relative w-full h-full flex justify-center items-center">
            <slot>{{ props.char }}</slot>
            <transition name="action">
                <div v-if="props.hitChar" class="absolute text-5xl font-bold text-white">
                    {{ props.hitTrigger ? '-' + props.hitDamage : props.blockTrigger ? 'Block' : '' }}
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.hit {
    animation: hit 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.pBlock {
    animation: playerBlock 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.eBlock {
    animation: enemyBlock 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.action-leave-to {
    transform: translateY(-100px);
    opacity: 0;
}

.action-leave-active {
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

@keyframes playerBlock {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-30px);
    }

    40% {
        transform: translateX(0);
    }

    60% {
        transform: translateX(-15px);
    }

    80% {
        transform: translateX(0);
    }
}

@keyframes enemyBlock {
    0% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(30px);
    }

    40% {
        transform: translateX(0);
    }

    60% {
        transform: translateX(15px);
    }

    80% {
        transform: translateX(0);
    }
}
</style>