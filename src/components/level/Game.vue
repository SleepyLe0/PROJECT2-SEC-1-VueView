<script setup>
import { ref, watch, computed } from 'vue'
import { monsterEasy } from '../../libs/MonsterDifficult'
import heros from '../../data/heros'
import monsters from '../../data/monsters'
import ActionBar from './ActionBar.vue'
import Character from './Character.vue'

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

const widthScreen = ref(window.innerWidth)
const heightScreen = ref(window.innerHeight)

window.onresize = () => {
    widthScreen.value = window.innerWidth
    heightScreen.value = window.innerHeight
}

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
            console.log(player.value.currentHP)
            console.log(enemy.value.currentHP)
        }, 1500)
    }, 2000)
}

const gameEnd = () => {
    if (player.value.currentHP === 0) {
        console.log('Enemy Win!')
    } else {
        props.beatStage(props.level)
        console.log('Player Win!') 
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
        <!-- <transition name="calculate-screen">
            <div v-if="calculateScreen" class="absolute z-50 w-full h-full bg-black bg-opacity-80">
                <CalculateScreen :attackChar="playerTurn ? 'player' : 'enemy'" 
                :attackPoint="playerTurn ? playerAction.attack : enemyAction.attack" 
                :defensePoint="playerTurn ? enemyAction.defense : playerAction.defense"/>
            </div>
        </transition> -->

        <!-- top screen -->
        <!-- <div class="absolute flex w-screen justify-between top-[3vh] text-[5vh] p-10">
            <HealthBar charBar="player" :hpPercentage="playerChar.currentHp / playerChar.maxHp * 100">
                {{ playerChar.currentHp }}
            </HealthBar>
            <div class="font-bold bg-base-300 p-5 rounded-full">
                <h1>Turn {{ turn }}</h1>
            </div>
            <HealthBar charBar="enemy" :hpPercentage="enemyChar.currentHp / enemyChar.maxHp * 100">
                {{ enemyChar.currentHp }}
            </HealthBar>
        </div> -->

        <!-- main screen -->
        <div v-if="!calculateWidth" class="relative w-screen flex items-center bg-[url(/Background/Stage2.png)] bg-center bg-cover"
        :class="screenRation ? 'h-screen' : 'h-[70vh]'">
            <Character class="absolute left-[3vh]"
            char="player" 
            :character="player"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"/>
            <Character class="absolute right-[3vh]"
            char="enemy" 
            :character="enemy"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"/>
        </div>
        <div v-else class="relative w-screen flex justify-center items-center h-[50vh] bg-[url(/Background/Stage2.png)] bg-cover transition-all duration-100 ease-in-out"
        :class="phase === 1 || phase === 4 ? 'bg-left' : phase === 2 || phase === 3 ? 'bg-right' : 'bg-center'">
            <Character v-if="phase === 1 || phase === 4"
            char="player" 
            :character="player"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"/>
            <Character v-if="phase === 2 || phase === 3"
            char="enemy" 
            :character="enemy"
            :hitChar="hitCharacter" 
            :hitDamage="calculate.damageResult"/>
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

</style>