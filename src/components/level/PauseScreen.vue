<script setup>
const emits = defineEmits(['close', 'retry', 'exit'])
</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
        <div class="w-[90vw] h-[80vh] p-[1vh] bg-gradient-to-b from-[#757A69] to-[#131411] transition-all duration-300 ease-in-out">
            <div class="w-full h-full bg-[#EDDEAA] flex flex-col justify-center items-center gap-[5vh] p-[2vh]">
                <h1 class="text-[10vw] md:text-[10vh] font-extrabold bg-gradient-to-t from-[#630707] to-[#FFC582] bg-clip-text text-transparent">
                    Game Pause
                </h1>
                <div class="flex flex-col gap-[5vh] text-black md:flex-row text-[2vh]">
                    <button @click="$emit('close')"
                        class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
                        Continue
                    </button>
                    <button @click="$emit('retry')"
                        class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
                        Retry
                    </button>
                    <button @click="$emit('exit')"
                        class="w-[20vh] p-[2vh] bg-gradient-to-t from-[#737373] to-[#D9D9D9] rounded-lg">
                        Exit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>