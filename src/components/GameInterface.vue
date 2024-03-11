<script setup>
import { ref, watch } from 'vue'
import ActionButton from './gameplay/ActionButton.vue'
import HealthBar from './gameplay/HealthBar.vue'

const maxSkillPoint = 4
const turn = ref(1)
const actionPerTurn = ref(0)
const turnDirection = ref(true)
const turnPhase = ref(1)
const playerTurn = ref(false)
const enemyTurn = ref(false)
const skillPoint = ref(0)
const enemySkillPoint = ref(0)
const disableChargePoint = ref(false)
const playerCurrentHp = ref(0)
const enemyCurrentHp = ref(0)
const playerAction = ref({
    charge: 0,
    defense: 0,
    attack: 0
})
const enemyAction = ref({
    charge: 0,
    defense: 0,
    attack: 0
})
const playerChar = ref({
    maxHp: 100,
    currentHp: 100,
    attack: 20
})
const enemyChar = ref({
    maxHp: 50,
    currentHp: 50,
    attack: 30
})

const gameStart = () => {
    turnPhase.value = 1
    if (turn.value > 4) {
        skillPoint.value = maxSkillPoint
        enemySkillPoint.value = maxSkillPoint
    } else {
        skillPoint.value = turn.value
        enemySkillPoint.value = turn.value
    }
}

const playerActionTurn = () => {
    playerTurn.value = true
    disableChargePoint.value = false
    skillPoint.value += playerAction.value.charge
    playerAction.value.charge = 0
}

const enemyActionTurn = () => {
    enemyTurn.value = true
    enemySkillPoint.value += enemyAction.value.charge
    enemyAction.value.charge = 0
    if (turn.value === 1) {
        enemySkillPoint.value++
    }
    const actionSet = []
    for (let i = 0; i < enemySkillPoint.value; i++) {
        actionSet.push(Math.floor(Math.random() * 3) + 1)
    }
    setTimeout(() => {
        actionSet.forEach(action => {
            if (action === 1) enemyAction.value.attack++
            else if (action === 2) enemyAction.value.defense++
            else enemyAction.value.charge++
            enemySkillPoint.value--
        })
        nextAction()
    }, 1500)
}

const calculateActionTurn = (char) => {
    playerTurn.value = false
    enemyTurn.value = false
    let actor, actorStatus, nonActor, nonActorStatus
    if (char === 'player') {
        actor = playerAction.value
        nonActor = enemyAction.value
        actorStatus = playerChar.value
        nonActorStatus = enemyChar.value
    } else {
        actor = enemyAction.value
        nonActor = playerAction.value
        actorStatus = enemyChar.value
        nonActorStatus = playerChar.value
    }
    const calculateAttack = actor.attack - nonActor.defense
    if (calculateAttack > 0) nonActorStatus.currentHp -= (calculateAttack * actorStatus.attack)
    nonActorStatus.currentHp = nonActorStatus.currentHp <= 0 ? 0 : nonActorStatus.currentHp
    setTimeout(() => {
        playerCurrentHp.value = playerChar.value.currentHp
        enemyCurrentHp.value = enemyChar.value.currentHp
        nextAction()
        actor.attack = 0
        nonActor.defense = 0
    }, 2000)
}

const nextAction = () => {
    if (turnPhase.value === 3) turnDirection.value = false
    if (turnPhase.value === 1) turnDirection.value = true
    if (turnDirection.value) turnPhase.value++
    else turnPhase.value--
    if (actionPerTurn.value === 3) {
        turn.value++
        actionPerTurn.value = 0
        gameStart()
    } else actionPerTurn.value++
}

const gameEnd = () => {
    if (playerChar.value.currentHp > enemyChar.value.currentHp) console.log('Player Win')
    else console.log('Enemy Win')
}

const chargePointAction = () => {
    skillPoint.value--
    playerAction.value.charge++
    if (playerAction.value.charge === 4) {
        disableChargePoint.value = true
    }
}

const defensePointAction = () => {
    skillPoint.value--
    playerAction.value.defense++
}

const attackPointAction = () => {
    skillPoint.value--
    playerAction.value.attack++
}

watch(skillPoint, () => {
    if (skillPoint.value === 0) nextAction()
})

watch([playerCurrentHp, enemyCurrentHp], () => {
    console.log(playerCurrentHp.value + ' ' + enemyCurrentHp.value)
    if (playerCurrentHp.value <= 0 || enemyCurrentHp.value <= 0) turnPhase.value = 4
})

watch(turnPhase, (newValue, oldValue) => {
    if (turnPhase.value === 1) playerActionTurn()
    else if (turnPhase.value === 2) newValue - oldValue > 0 ? calculateActionTurn('player') : calculateActionTurn('enemy')
    else if (turnPhase.value === 3) enemyActionTurn()
    else gameEnd()
},{ immediate: true })

gameStart()

</script>

<template>
    <div class="relative w-screen h-screen overflow-hidden flex justify-center">
        <div class="absolute flex w-screen justify-between top-[3vh] text-[5vh] p-10">
            <HealthBar charBar="player" :hpPercentage="playerChar.currentHp / playerChar.maxHp * 100">
                {{ playerChar.currentHp + ' / ' + playerChar.maxHp }}
            </HealthBar>
            <div class="font-bold bg-base-300 p-5 rounded-full">
                <h1>Turn {{ turn }}</h1>
            </div>
            <HealthBar charBar="enemy" :hpPercentage="enemyChar.currentHp / enemyChar.maxHp * 100">
                {{ enemyChar.currentHp + ' / ' + enemyChar.maxHp }}
            </HealthBar>
        </div>
        <div class="relative w-screen h-screen bg-slate-300 -z-10">
            <div class="absolute">

            </div>
        </div>
        <div class="absolute bottom-0">
            <div class="flex justify-center w-screen">
                <div v-if="playerTurn" class="flex w-full items-center text-5xl font-bold p-[5vh]">
                    {{ skillPoint }} / {{ turn > 4 ? maxSkillPoint : turn }}
                </div>
                <div v-if="enemyTurn" class="flex w-full justify-end items-center text-5xl font-bold p-[5vh]">
                    {{ enemySkillPoint }} / {{ turn > 4 ? maxSkillPoint : turn }}
                </div>
            </div>
            <div class="flex justify-between w-screen h-[20vh] bg-base-300 p-[5vh]">
                <div class="flex gap-10 justify-center items-center" :class="playerTurn ? '' : 'opacity-50 pointer-events-none'">
                    <ActionButton :actionVar="playerAction.charge" :actionFunc="chargePointAction" :class="disableChargePoint ? 'pointer-events-none opacity-50' : ''">charge</ActionButton>
                    <ActionButton :actionVar="playerAction.defense" :actionFunc="defensePointAction">defense</ActionButton>
                    <ActionButton :actionVar="playerAction.attack" :actionFunc="attackPointAction">attack</ActionButton>
                </div>
                <div class="flex gap-10 justify-center items-center" :class="enemyTurn ? '' : 'opacity-50 pointer-events-none'">
                    <ActionButton :actionVar="enemyAction.attack">attack</ActionButton>
                    <ActionButton :actionVar="enemyAction.defense">defense</ActionButton>
                    <ActionButton :actionVar="enemyAction.charge">charge</ActionButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>