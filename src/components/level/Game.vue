<script setup>
import { ref, watch, computed } from 'vue'
import { monsterEasy } from '../../libs/MonsterDifficult'
import heros from '../../data/heros'
import monsters from '../../data/monsters'
import ActionBar from './ActionBar.vue'
import Character from './Character.vue'
import HealthBar from './HealthBar.vue'
import CalculateScreen from './CalculateScreen.vue'

const props = defineProps({
    level: {
        type: Number,
        required: true
    },
    character: {
        type: Number,
        required: true
    },
    beatStage: {
        type: Function,
        required: true
    }
})

const hero = computed(() => {
    return heros.find(hero => hero.id === props.character)
})

const monster = computed(() => {
    return monsters.find(monster => monster.level === props.level)
})

const screenRation = computed(() => {
    return widthScreen.value >= heightScreen.value * 150 / 100
})

const calculateWidth = computed(() => {
    return widthScreen.value <= heightScreen.value * 25 / 100 * 3
})

const widthScreen = ref(window.innerWidth)
const heightScreen = ref(window.innerHeight)
window.onresize = () => {
    widthScreen.value = window.innerWidth
    heightScreen.value = window.innerHeight
}
const turn = ref(1)
const phase = ref(1)
const hitCharacter = ref(false)
const calculate = ref({ 
    damageResult: 0,
    screen: false
})
const player = ref({
    currentHP: hero.value.hp,
    skillPoint: 1,
    character: hero.value,
    action: { attack: 0, defense: 0, charge: 0 },
    isHit: false,
    isBlock: false
})
const enemy = ref({
    currentHP: monster.value.hp,
    skillPoint: 1,
    character: monster.value,
    action: { attack: 0, defense: 0, charge: 0 },
    isHit: false,
    isBlock: false
})

const skillAction = (action) => {
    player.value.skillPoint--
    player.value.action[action]++
    if (player.value.skillPoint === 0) phase.value++
}

const startNewTurn = () => {
    turn.value++
    phase.value = 1
    if (turn.value > 4) {
        player.value.skillPoint = 4
        enemy.value.skillPoint = 4
    } else {
        player.value.skillPoint = turn.value
        enemy.value.skillPoint = turn.value
    }
}

const playerActionTurn = () => {
    player.value.skillPoint += player.value.action.charge
    player.value.action.charge = 0
}

const enemyActionTurn = () => {
    enemy.value.skillPoint += enemy.value.action.charge
    enemy.value.action.charge = 0
    if (turn.value === 1) enemy.value.skillPoint++
    setTimeout(() => {
        monsterEasy(enemy.value)
        console.log(enemy.value.action)
        phase.value++
    }, 1500)
}

const calculateActionTurn = (actor) => {
    const attacker = (actor === 'player') ? player.value : enemy.value
    const defender = (actor === 'enemy') ? player.value : enemy.value
    calculate.value.screen = true
    setTimeout(() => {
        calculate.value.screen = false
        if (attacker.action.attack > defender.action.defense) {
            calculate.value.damageResult = (attacker.action.attack - defender.action.defense) * attacker.character.attack
            defender.currentHP = defender.currentHP - calculate.value.damageResult <= 0 ? 0 : defender.currentHP - calculate.value.damageResult
            defender.isHit = true
            hitCharacter.value = true
        } else if (attacker.action.attack <= defender.action.defense && attacker.action.attack > 0) {
            defender.isBlock = true
            hitCharacter.value = true
        } 
        attacker.action.attack = 0
        defender.action.defense = 0
        setTimeout(() => {
            hitCharacter.value = false
        }, 1)
        setTimeout(() => {
            defender.isHit = false
            defender.isBlock = false
            if (defender.currentHP === 0) phase.value = -1
            else phase.value++
        }, 1500)
    }, 2000)
}

const hpPercentage = (char) => {
    return char.currentHP / char.character.hp * 100
}

const gameEnd = () => {
    if (player.value.currentHP === 0) {
        console.log('Enemy Win!')
        props.beatStage()
    } else {
        console.log('Player Win!') 
        setTimeout(() => {
            props.beatStage(props.level)
        }, 1000)
    }
}

watch(phase, () => {
    if (phase.value === 1) playerActionTurn()
    else if (phase.value === 2) calculateActionTurn('player') 
    else if (phase.value === 3) enemyActionTurn()
    else if (phase.value === 4) calculateActionTurn('enemy')
    else if (phase.value === 5) startNewTurn()
    else if (phase.value === -1) gameEnd()
})
</script>

<template>
    <div class="relative w-screen h-screen overflow-hidden flex">
        <!-- calculate screen -->
        <transition name="calculate-screen">
            <div v-if="calculate.screen" class="absolute z-50 w-full h-full bg-black bg-opacity-80">
                <CalculateScreen :attackChar="phase === 2 ? 'player' : 'enemy'" 
                :attackPoint="phase === 2 ? player.action.attack : enemy.action.attack" 
                :defensePoint="phase === 2 ? enemy.action.defense : player.action.defense"
                :screenRatio="screenRation"
                :calculateWidth="calculateWidth"/>
            </div>
        </transition>

        <!-- top screen -->
        <div v-if="!calculateWidth" class="absolute flex w-screen justify-between gap-[3vh] z-10"
        :class="screenRation ? 'top-[3vh] px-[5vh]' : ''">
            <HealthBar char="player" 
            :hpPercentage="hpPercentage(player)"
            :atk="player.character.attack">
                {{ player.currentHP }}
            </HealthBar>
            <div v-if="screenRation" class="w-[45vh] flex justify-center items-center p-[3vh] bg-[#56443b] rounded-lg">
                <h1 class="text-[4vh] font-bold text-[#FCE6AE]">Turn {{ turn }}</h1>
            </div>
            <HealthBar char="enemy" 
            :hpPercentage="hpPercentage(enemy)"
            :atk="enemy.character.attack">
                {{ enemy.currentHP }}
            </HealthBar>
        </div>
        <div v-else class="absolute flex w-screen gap-[3vh] z-10"
        :class="screenRation ? 'top-[3vh] px-[5vh]' : ''">
            <HealthBar v-if="phase === 1 || phase === 4" char="player" 
            :hpPercentage="hpPercentage(player)"
            :atk="player.character.attack">
                {{ player.currentHP }}
            </HealthBar>
            <HealthBar v-if="phase === 2 || phase === 3" char="enemy" 
            :hpPercentage="hpPercentage(enemy)"
            :atk="enemy.character.attack">
                {{ enemy.currentHP }}
            </HealthBar>
        </div>

        <!-- main screen -->
        <div v-if="!calculateWidth" class="relative w-screen flex items-center bg-[url(/Background/Stage2.png)] bg-center bg-cover"
        :class="screenRation ? 'h-screen' : 'h-[60vh]'">
            <Character class="absolute left-[15vh]"
            char="player" 
            :character="player"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"/>
            <Character class="absolute right-[15vh]"
            char="enemy" 
            :character="enemy"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"/>
        </div>
        <div v-else class="relative w-screen flex justify-center items-center h-[50vh] bg-[url(/Background/Stage2.png)] bg-cover transition-all duration-100 ease-in-out"
        :class="phase === 1 || phase === 4 ? 'bg-left' : phase === 2 || phase === 3 ? 'bg-right' : 'bg-center'">
            <Character v-if="phase === 1 || phase === 4"
            char="player" 
            :character="player"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"/>
            <Character v-if="phase === 2 || phase === 3"
            char="enemy" 
            :character="enemy"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"/>
        </div>

        <ActionBar 
        :player="player" 
        :enemy="enemy" 
        :action="skillAction"
        :turnPhase="{ turn: turn, phase: phase }"
        :screenRatio="screenRation"
        :calculateWidth="calculateWidth"/>
    </div>
</template>

<style scoped>
.calculate-screen-enter-from,
.calculate-screen-leave-to {
    opacity: 0;
}

.calculate-screen-enter-active,
.calculate-screen-leave-active {
    transition: all .5s ease;
}
</style>