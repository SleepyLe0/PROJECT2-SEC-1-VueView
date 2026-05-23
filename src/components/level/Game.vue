<script setup>
import { ref, watch, computed } from 'vue'
import { monsterEasy, monsterHard } from '../../libs/MonsterDifficult'
import heros from '../../data/heros'
import monsters from '../../data/monsters'
import ActionButton from './ActionButton.vue'
import Character from './Character.vue'
import HealthBar from './HealthBar.vue'
import PauseScreen from './PauseScreen.vue'
import ActionCutscene from './ActionCutscene.vue'

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
const showTurnAnnounce = ref(false)
const showFireEffect = ref(false)
const showIceEffect = ref(false)
const showLeafEffect = ref(false)
const showCutscene = ref(false)
const cutsceneData = ref({ attacker: 'player', attackPoints: 0, defensePoints: 0, willHit: false, willBlock: false })
const attackerChar = ref('')
const attackMoveChar = ref(false)
const hitCharacter = ref(false)
const gamePause = ref(false)
const pauseDeny = ref(false)
const calculate = ref({
    damageResult: 0
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

const retry = () => {
    turn.value = 1
    phase.value = 1
    gamePause.value = false
    player.value = {
        currentHP: hero.value.hp,
        skillPoint: 1,
        character: hero.value,
        action: { attack: 0, defense: 0, charge: 0 },
        isHit: false,
        isBlock: false
    }
    enemy.value = {
        currentHP: monster.value.hp,
        skillPoint: 1,
        character: monster.value,
        action: { attack: 0, defense: 0, charge: 0 },
        isHit: false,
        isBlock: false
    }
}

const skillAction = (action) => {
    player.value.skillPoint--
    player.value.action[action]++
    if (action === 'charge') {
        showLeafEffect.value = false
        requestAnimationFrame(() => {
            showLeafEffect.value = true
            setTimeout(() => { showLeafEffect.value = false }, 800)
        })
    }
    if (player.value.skillPoint === 0) phase.value++
}

const startNewTurn = () => {
    turn.value++
    phase.value = 1
}

const playerActionTurn = () => {
    pauseDeny.value = false
    if (turn.value >= 4) player.value.skillPoint = 4
    else player.value.skillPoint = turn.value
    const chargeBonus = player.value.action.charge
    player.value.skillPoint += chargeBonus
    player.value.action.charge = 0
    if (chargeBonus > 0) {
        showLeafEffect.value = false
        requestAnimationFrame(() => {
            showLeafEffect.value = true
            setTimeout(() => { showLeafEffect.value = false }, 900)
        })
    }
    if (turn.value > 1) {
        showTurnAnnounce.value = true
        setTimeout(() => { showTurnAnnounce.value = false }, 1200)
    }
}

const enemyActionTurn = () => {
    if (turn.value >= 4) enemy.value.skillPoint = 4
    else enemy.value.skillPoint = turn.value
    const chargeBonus = enemy.value.action.charge
    enemy.value.skillPoint += chargeBonus
    enemy.value.action.charge = 0
    if (turn.value === 1) enemy.value.skillPoint++
    setTimeout(() => {
        if (props.level < 3) monsterEasy(enemy.value)
        else monsterHard(enemy.value, player.value, turn.value)
        phase.value++
    }, 3000)
}

const calculateActionTurn = (actor) => {
    const attacker = (actor === 'player') ? player.value : enemy.value
    const defender = (actor === 'enemy') ? player.value : enemy.value
    pauseDeny.value = true

    // Capture before zeroing
    const atkPoints = attacker.action.attack
    const defPoints = defender.action.defense
    const willHit = atkPoints > defPoints
    const willBlock = atkPoints <= defPoints && atkPoints > 0

    if (willHit) {
        calculate.value.damageResult = (atkPoints - defPoints) * attacker.character.attack
        defender.currentHP = defender.currentHP - calculate.value.damageResult <= 0
            ? 0
            : defender.currentHP - calculate.value.damageResult
    }
    attacker.action.attack = 0
    defender.action.defense = 0

    if (atkPoints > 0) {
        // Show P5-style action cutscene immediately
        cutsceneData.value = { attacker: actor, attackPoints: atkPoints, defensePoints: defPoints, willHit, willBlock }
        showCutscene.value = true

        setTimeout(() => {
            showCutscene.value = false

            // Trigger attacker dash
            attackerChar.value = actor
            attackMoveChar.value = true
            setTimeout(() => { attackMoveChar.value = false }, 1)

            // Impact fires 200ms after dash starts
            setTimeout(() => {
                hitCharacter.value = true
                if (willHit) {
                    defender.isHit = true
                    showFireEffect.value = true
                    setTimeout(() => { showFireEffect.value = false }, 1600)
                } else if (willBlock) {
                    defender.isBlock = true
                    showIceEffect.value = true
                    setTimeout(() => { showIceEffect.value = false }, 1600)
                }
                setTimeout(() => { hitCharacter.value = false }, 1)
                setTimeout(() => {
                    defender.isHit = false
                    defender.isBlock = false
                    if (defender.currentHP === 0) phase.value = -1
                    else phase.value++
                }, 2400)
            }, 200)
        }, 1200)
    } else {
        setTimeout(() => {
            if (defender.currentHP === 0) phase.value = -1
            else phase.value++
        }, 400)
    }
}

const gameEnd = () => {
    if (player.value.currentHP === 0) props.beatStage()
    else {
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
        <!-- Leaf effect overlay (charge) -->
        <div v-if="showLeafEffect" class="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            <div class="leaf-screen-flash"></div>
            <div class="leaf-vignette"></div>
            <div class="leaf-wisp" style="left:6%;animation-delay:0s"></div>
            <div class="leaf-wisp" style="left:20%;animation-delay:0.06s"></div>
            <div class="leaf-wisp" style="left:38%;animation-delay:0.12s"></div>
            <div class="leaf-wisp" style="left:55%;animation-delay:0.08s"></div>
            <div class="leaf-wisp" style="left:72%;animation-delay:0.04s"></div>
            <div class="leaf-wisp" style="left:88%;animation-delay:0.1s"></div>
            <div class="edge-flash edge-flash-leaf"></div>
        </div>

        <!-- Fire effect overlay (hit) -->
        <div v-if="showFireEffect" class="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            <div class="white-impact-frame"></div>
            <div class="impact-lines impact-lines-fire"></div>
            <div class="fire-screen-flash"></div>
            <div class="fire-vignette"></div>
            <div class="fire-shockwave"></div>
            <div class="fire-shockwave fire-shockwave-2"></div>
            <div class="fire-shockwave fire-shockwave-3"></div>
            <div class="slash" style="--angle:-25deg"></div>
            <div class="slash" style="--angle:15deg;width:70px;opacity:0.75"></div>
            <div class="slash" style="--angle:-60deg;width:50px;opacity:0.5"></div>
            <div class="flame-bar" style="left:33%;height:42%"></div>
            <div class="flame-bar" style="left:44%;height:58%;animation-delay:0.04s"></div>
            <div class="flame-bar" style="left:54%;height:46%;animation-delay:0.08s"></div>
            <div class="flame-bar" style="left:28%;height:31%;animation-delay:0.06s"></div>
            <div class="flame-bar" style="left:63%;height:36%;animation-delay:0.02s"></div>
            <div class="fire-spark" style="--sx:-55px;--sy:-45px;background:#FF4400"></div>
            <div class="fire-spark" style="--sx:52px;--sy:-52px;background:#FF8800"></div>
            <div class="fire-spark" style="--sx:-42px;--sy:48px;background:#FFCC00;width:8px;height:8px"></div>
            <div class="fire-spark" style="--sx:60px;--sy:40px;background:#FF4400;width:4px;height:4px"></div>
            <div class="fire-spark" style="--sx:-68px;--sy:10px;background:#FF6600;width:7px;height:7px"></div>
            <div class="fire-spark" style="--sx:30px;--sy:62px;background:#FFAA00;width:5px;height:5px"></div>
            <div class="fire-spark" style="--sx:-80px;--sy:-20px;background:#FFFFFF;width:4px;height:4px;animation-delay:0.05s"></div>
            <div class="fire-spark" style="--sx:75px;--sy:-35px;background:#FF2200;width:5px;height:5px;animation-delay:0.08s"></div>
            <div class="edge-flash edge-flash-fire"></div>
        </div>

        <!-- Ice effect overlay (block) -->
        <div v-if="showIceEffect" class="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            <div class="white-impact-frame"></div>
            <div class="impact-lines impact-lines-ice"></div>
            <div class="ice-screen-flash"></div>
            <div class="ice-vignette"></div>
            <div class="ice-ring"></div>
            <div class="ice-ring ice-ring-2"></div>
            <div class="ice-ring ice-ring-3"></div>
            <div class="frost-overlay"></div>
            <div class="ice-spark" style="--sx:-58px;--sy:-44px"></div>
            <div class="ice-spark" style="--sx:52px;--sy:-52px;background:#FFFFFF;width:4px;height:4px"></div>
            <div class="ice-spark" style="--sx:-44px;--sy:50px;background:#88DDFF"></div>
            <div class="ice-spark" style="--sx:62px;--sy:42px;width:7px;height:7px"></div>
            <div class="ice-spark" style="--sx:-72px;--sy:8px;background:#FFFFFF;width:3px;height:3px"></div>
            <div class="ice-spark" style="--sx:28px;--sy:64px;background:#AAEEFF;width:5px;height:5px"></div>
            <div class="ice-spark" style="--sx:-85px;--sy:-20px;background:#00FFFF;width:6px;height:6px;animation-delay:0.06s"></div>
            <div class="ice-spark" style="--sx:80px;--sy:-40px;background:#FFFFFF;width:4px;height:4px;animation-delay:0.09s"></div>
            <div class="edge-flash edge-flash-ice"></div>
        </div>

        <!-- Action cutscene -->
        <transition name="cutscene">
            <ActionCutscene v-if="showCutscene"
                :attacker="cutsceneData.attacker"
                :attackPoints="cutsceneData.attackPoints"
                :defensePoints="cutsceneData.defensePoints"
                :willHit="cutsceneData.willHit"
                :willBlock="cutsceneData.willBlock"
            />
        </transition>

        <!-- Turn announcement -->
        <transition name="turn-announce">
            <div v-if="showTurnAnnounce" class="absolute inset-0 z-[35] pointer-events-none flex items-center justify-center">
                <h1 class="turn-text">TURN {{ turn }}</h1>
            </div>
        </transition>

        <transition name="pop-screen">
            <div v-if="gamePause" class="absolute z-50 w-full h-full bg-black bg-opacity-80">
                <PauseScreen
                @close="() => gamePause = false"
                @retry="retry"
                @exit="props.beatStage"/>
            </div>
        </transition>

        <div v-if="!calculateWidth" class="absolute flex w-screen justify-between gap-[3vh] z-10"
        :class="screenRation ? 'top-[3vh] px-[5vh]' : ''">
            <HealthBar char="player"
            :character="player"
            :turn="turn">
                {{ player.currentHP }}
            </HealthBar>
            <button @click="gamePause = true" v-if="screenRation" class="w-[45vh] flex justify-center items-center p-[3vh] bg-[#56443b] rounded-lg"
            :class="pauseDeny ? 'pointer-events-none' : ''">
                <h1 class="text-[4vh] font-bold text-[#FCE6AE]">Turn {{ turn }}</h1>
            </button>
            <HealthBar char="enemy"
            :character="enemy"
            :turn="turn">
                {{ enemy.currentHP }}
            </HealthBar>
        </div>
        <div v-else class="absolute flex w-screen gap-[3vh] z-10"
        :class="screenRation ? 'top-[3vh] px-[5vh]' : ''">
            <HealthBar v-if="phase === 1 || phase === 4" char="player"
            :character="player"
            :turn="turn">
                {{ player.currentHP }}
            </HealthBar>
            <HealthBar v-if="phase === 2 || phase === 3" char="enemy"
            :character="enemy"
            :turn="turn">
                {{ enemy.currentHP }}
            </HealthBar>
        </div>

        <div v-if="!calculateWidth" class="relative w-screen flex items-center bg-center bg-cover"
        :style="{ 'background-image': `url(/Background/Stage${props.level}.png)` }"
        :class="screenRation ? 'h-screen' : 'h-[60vh]'">
            <Character class="absolute left-[5vh]"
            char="player"
            :character="player"
            :hitChar="hitCharacter"
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"
            :isAttacking="attackMoveChar && attackerChar === 'player'"/>
            <Character class="absolute right-[5vh]"
            char="enemy"
            :character="enemy"
            :hitChar="hitCharacter"
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"
            :isAttacking="attackMoveChar && attackerChar === 'enemy'"/>
        </div>
        <div v-else class="relative w-screen flex justify-center items-center h-[50vh] bg-[url(/Background/Stage2.png)] bg-cover transition-all duration-100 ease-in-out"
        :class="phase === 1 || phase === 4 ? 'bg-left' : phase === 2 || phase === 3 ? 'bg-right' : 'bg-center'">
            <Character v-if="phase === 1 || phase === 4"
            char="player"
            :character="player"
            :hitChar="hitCharacter"
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"
            :isAttacking="attackMoveChar && attackerChar === 'player'"/>
            <Character v-if="phase === 2 || phase === 3"
            char="enemy"
            :character="enemy"
            :hitChar="hitCharacter"
            :hitDamage="calculate.damageResult"
            :screenRatio="screenRation"
            :calculateWidth="calculateWidth"
            :isAttacking="attackMoveChar && attackerChar === 'enemy'"/>
        </div>

        <div class="absolute bottom-0">
            <button @click="gamePause = true" v-if="!screenRation" class="w-full flex justify-center bg-[#56443b]"
            :class="pauseDeny ? 'pointer-events-none' : ''">
                <h1 class="text-[4vh] font-bold text-[#FCE6AE]">Turn {{ turn }}</h1>
            </button>
            <div class="flex justify-center items-center bg-gradient-to-r from-[#251F1F] to-[#393646] p-[5vh] overflow-hidden"
            :class="screenRation ? 'w-fit h-fit rounded-tr-lg' : !calculateWidth ? 'w-screen h-[40vh]' : 'w-screen h-[55vh]'">
                <div class="flex gap-[2vh] h-fit"
                :class="calculateWidth ? 'flex-col' : 'flex-row', phase === 1 ? '' : 'opacity-50 pointer-events-none'">
                    <ActionButton v-for="action in ['Charge', 'Defense', 'Attack']"
                    :actionPoint="player.action[action.toLowerCase()]"
                    :actionText="`${action.toLowerCase()}`"
                    :image="`/Skill/${action}.png`"
                    :responsive="calculateWidth"
                    @action="skillAction"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pop-screen-enter-from,
.pop-screen-leave-to {
    opacity: 0;
}
.pop-screen-enter-active,
.pop-screen-leave-active {
    transition: all .5s ease;
}

/* ── Cutscene transition ── */
.cutscene-enter-from { opacity: 0; }
.cutscene-enter-active { transition: opacity 0.15s ease; }
.cutscene-leave-to { opacity: 0; }
.cutscene-leave-active { transition: opacity 0.22s ease; }

/* ── White impact frame ── */
@keyframes white-frame-anim {
    0%   { opacity: 1; }
    20%  { opacity: 1; }
    50%  { opacity: 0; }
    100% { opacity: 0; }
}
.white-impact-frame {
    position: absolute; inset: 0;
    background: white;
    animation: white-frame-anim 0.2s ease-out forwards;
    z-index: 5;
}

/* ── Impact lines (starburst) ── */
@keyframes impact-lines-anim {
    0%   { opacity: 0.85; transform: scale(0.7); }
    25%  { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0; transform: scale(1.6); }
}
.impact-lines {
    position: absolute; inset: 0;
    animation: impact-lines-anim 0.65s ease-out forwards;
    transform-origin: center;
    z-index: 4;
}
.impact-lines-fire {
    background: repeating-conic-gradient(
        rgba(255, 150, 0, 0.26) 0deg 4deg,
        transparent 4deg 14deg
    );
}
.impact-lines-ice {
    background: repeating-conic-gradient(
        rgba(0, 200, 255, 0.26) 0deg 3deg,
        transparent 3deg 13deg
    );
}

/* ── Edge flash ── */
@keyframes edge-flash-anim {
    0%   { opacity: 0.8; }
    15%  { opacity: 0.6; }
    50%  { opacity: 0; }
    100% { opacity: 0; }
}
.edge-flash {
    position: absolute; inset: 0;
    animation: edge-flash-anim 0.5s ease-out forwards;
}
.edge-flash-fire {
    background:
        radial-gradient(ellipse at bottom left, rgba(255,80,0,0.55) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(255,150,0,0.5) 0%, transparent 50%);
}
.edge-flash-ice {
    background:
        radial-gradient(ellipse at top left, rgba(0,180,255,0.5) 0%, transparent 45%),
        radial-gradient(ellipse at bottom right, rgba(0,100,255,0.5) 0%, transparent 45%),
        radial-gradient(ellipse at top right, rgba(100,220,255,0.35) 0%, transparent 40%),
        radial-gradient(ellipse at bottom left, rgba(0,150,255,0.35) 0%, transparent 40%);
}
.edge-flash-leaf {
    background:
        radial-gradient(ellipse at left, rgba(0,200,60,0.45) 0%, transparent 45%),
        radial-gradient(ellipse at right, rgba(50,220,80,0.45) 0%, transparent 45%);
}

/* ── Fire effects ── */
@keyframes fire-flash-anim {
    0%   { opacity: 0; }
    4%   { opacity: 0.52; }
    18%  { opacity: 0; }
    100% { opacity: 0; }
}
.fire-screen-flash {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, #FFB800 0%, #FF4400 50%, #CC1100 100%);
    animation: fire-flash-anim 0.85s ease forwards;
}
@keyframes fire-vignette-anim {
    0%   { opacity: 0; }
    5%   { opacity: 0.72; }
    32%  { opacity: 0; }
    100% { opacity: 0; }
}
.fire-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 110%, rgba(255,90,0,0.7) 0%, rgba(200,50,0,0.5) 40%, transparent 68%);
    animation: fire-vignette-anim 0.95s ease forwards;
}
@keyframes shockwave-anim {
    0%   { transform: translate(-50%, -50%) scale(0); opacity: 0.9; }
    100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
}
.fire-shockwave {
    position: absolute; top: 50%; left: 50%;
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 3px solid #FF6600;
    animation: shockwave-anim 0.7s ease-out forwards;
}
.fire-shockwave-2 {
    border-color: #FFAA00; border-width: 2px;
    animation-duration: 0.9s; animation-delay: 0.1s;
}
.fire-shockwave-3 {
    border-color: rgba(255,200,0,0.4); border-width: 1px;
    animation-duration: 1.1s; animation-delay: 0.2s;
}
@keyframes slash-anim {
    0%   { transform: translate(-50%, -50%) scaleX(0) rotate(var(--angle)); opacity: 1; }
    40%  { transform: translate(-50%, -50%) scaleX(1) rotate(var(--angle)); opacity: 0.8; }
    100% { transform: translate(-50%, -50%) scaleX(1.3) rotate(var(--angle)); opacity: 0; }
}
.slash {
    position: absolute; top: 50%; left: 50%;
    width: 120px; height: 3px;
    background: linear-gradient(to right, transparent, #ffffff, #ff6600, transparent);
    animation: slash-anim 0.4s ease-out forwards;
}
@keyframes flame-rise-anim {
    0%   { transform: scaleY(0); opacity: 0.95; }
    48%  { transform: scaleY(1); opacity: 0.85; }
    100% { transform: scaleY(1.18); opacity: 0; }
}
.flame-bar {
    position: absolute; bottom: 0;
    width: 20px;
    background: linear-gradient(to top, rgba(255,55,0,0.92), rgba(255,155,0,0.55), transparent);
    border-radius: 50% 50% 0 0;
    animation: flame-rise-anim 0.85s ease-out forwards;
}
@keyframes spark-anim {
    0%   { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -50%) translate(var(--sx), var(--sy)) scale(0); opacity: 0; }
}
.fire-spark {
    position: absolute; top: 50%; left: 50%;
    width: 6px; height: 6px; border-radius: 50%;
    background: #FF7700;
    animation: spark-anim 0.8s ease-out forwards;
}

/* ── Ice effects ── */
@keyframes ice-flash-anim {
    0%   { opacity: 0; }
    4%   { opacity: 0.46; }
    20%  { opacity: 0; }
    100% { opacity: 0; }
}
.ice-screen-flash {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(150,255,255,0.88) 0%, rgba(0,150,255,0.7) 50%, rgba(0,0,100,0.9) 100%);
    animation: ice-flash-anim 0.85s ease forwards;
}
@keyframes ice-vignette-anim {
    0%   { opacity: 0; }
    6%   { opacity: 0.58; }
    28%  { opacity: 0; }
    100% { opacity: 0; }
}
.ice-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0,55,185,0.65) 100%);
    animation: ice-vignette-anim 0.95s ease forwards;
}
.ice-ring {
    position: absolute; top: 50%; left: 50%;
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 3px solid #00CCFF;
    animation: shockwave-anim 0.75s ease-out forwards;
}
.ice-ring-2 {
    border-color: rgba(200,255,255,0.72); border-width: 2px;
    animation-duration: 1s; animation-delay: 0.12s;
}
.ice-ring-3 {
    border-color: rgba(0,150,255,0.4); border-width: 1px;
    animation-duration: 1.2s; animation-delay: 0.22s;
}
@keyframes crack-anim {
    0%, 5% { opacity: 0; }
    8%      { opacity: 0.85; }
    40%     { opacity: 0.4; }
    100%    { opacity: 0; }
}
.frost-overlay {
    position: absolute; inset: 0;
    background:
        linear-gradient(34deg, transparent 48%, rgba(200,240,255,0.16) 49%, transparent 50%),
        linear-gradient(128deg, transparent 52%, rgba(150,220,255,0.12) 53%, transparent 54%),
        linear-gradient(200deg, transparent 45%, rgba(100,200,255,0.14) 46%, transparent 47%);
    animation: crack-anim 1s ease forwards;
}
.ice-spark {
    position: absolute; top: 50%; left: 50%;
    width: 5px; height: 5px; border-radius: 50%;
    background: #00EEFF;
    animation: spark-anim 0.9s ease-out forwards;
}

/* ── Leaf effects (charge) ── */
@keyframes leaf-flash-anim {
    0%   { opacity: 0; }
    5%   { opacity: 0.35; }
    22%  { opacity: 0; }
    100% { opacity: 0; }
}
.leaf-screen-flash {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(100,255,120,0.5) 0%, rgba(0,180,50,0.28) 50%, transparent 100%);
    animation: leaf-flash-anim 0.8s ease forwards;
}
@keyframes leaf-vignette-anim {
    0%   { opacity: 0; }
    8%   { opacity: 0.48; }
    32%  { opacity: 0; }
    100% { opacity: 0; }
}
.leaf-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 25%, rgba(0,95,28,0.45) 100%);
    animation: leaf-vignette-anim 0.8s ease forwards;
}
@keyframes leaf-float-anim {
    0%   { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0.9; }
    50%  { transform: translateY(-30vh) rotate(195deg) scale(1.8); opacity: 0.65; }
    100% { transform: translateY(-58vh) rotate(390deg) scale(0.28); opacity: 0; }
}
.leaf-wisp {
    position: absolute; bottom: 4%;
    width: 13px; height: 20px;
    background: radial-gradient(ellipse, rgba(80,255,100,0.82) 0%, rgba(0,180,58,0.28) 100%);
    border-radius: 0 50% 50% 50%;
    animation: leaf-float-anim 0.9s ease-out forwards;
}

/* ── Turn announcement ── */
@keyframes turn-slam-anim {
    0%   { opacity: 0; transform: scale(1.6); letter-spacing: 0.3em; }
    25%  { opacity: 1; transform: scale(1); letter-spacing: 0.05em; }
    70%  { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(0.85); }
}
.turn-text {
    font-size: 10vh;
    font-weight: 900;
    color: #FCE6AE;
    text-shadow: 0 0 16px #D4860A, 0 0 32px #8B4500, 0 0 60px rgba(212,134,10,0.4);
    animation: turn-slam-anim 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    letter-spacing: 0.05em;
}
.turn-announce-enter-active,
.turn-announce-leave-active {
    transition: opacity 0.1s ease;
}
.turn-announce-enter-from,
.turn-announce-leave-to {
    opacity: 0;
}
</style>
