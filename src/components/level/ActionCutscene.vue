<script setup>
defineProps({
    attacker: { type: String, required: true },
    attackPoints: { type: Number, default: 0 },
    defensePoints: { type: Number, default: 0 },
    willHit: { type: Boolean, default: false },
    willBlock: { type: Boolean, default: false },
})
</script>

<template>
    <div class="p5-root">
        <!-- Pitch black base -->
        <div class="p5-base"></div>

        <!-- Radial speed lines from center -->
        <div class="p5-speed" :class="willHit ? 'speed-fire' : willBlock ? 'speed-ice' : 'speed-leaf'"></div>

        <!-- Diagonal accent lines -->
        <div class="p5-diag p5-diag-1" :class="willHit ? 'diag-fire' : willBlock ? 'diag-ice' : 'diag-leaf'"></div>
        <div class="p5-diag p5-diag-2" :class="willHit ? 'diag-fire2' : willBlock ? 'diag-ice2' : 'diag-leaf2'"></div>

        <!-- Scattered diamonds -->
        <div v-for="n in 8" :key="n" class="p5-gem" :class="[`gem-pos-${n}`, willHit ? 'gem-fire' : willBlock ? 'gem-ice' : 'gem-leaf']"></div>

        <!-- ATTACK banner — slides in from left -->
        <div class="p5-banner p5-banner-atk" :class="willHit ? 'bnr-fire' : willBlock ? 'bnr-ice' : 'bnr-leaf'">
            <img src="/Skill/Attack.png" class="p5-bnr-icon">
            <span class="p5-bnr-word">ATTACK</span>
            <span class="p5-bnr-count">× {{ attackPoints }}</span>
        </div>

        <!-- DEFENSE banner — slides in from right -->
        <div v-if="defensePoints > 0" class="p5-banner p5-banner-def" :class="willHit ? 'bnr-fire' : willBlock ? 'bnr-ice' : 'bnr-leaf'">
            <span class="p5-bnr-count">× {{ defensePoints }}</span>
            <span class="p5-bnr-word">DEFENSE</span>
            <img src="/Skill/Defense.png" class="p5-bnr-icon">
        </div>

        <!-- THE BIG OUTCOME TEXT -->
        <div class="p5-outcome-wrap">
            <h1 class="p5-outcome" :class="willHit ? 'out-fire' : willBlock ? 'out-ice' : 'out-leaf'">
                {{ willHit ? 'STRIKE!' : willBlock ? 'BLOCKED!' : 'CHARGED!' }}
            </h1>
        </div>
    </div>
</template>

<style scoped>
/* ── Root ── */
.p5-root {
    position: absolute;
    inset: 0;
    z-index: 45;
    overflow: hidden;
    pointer-events: none;
}
.p5-base {
    position: absolute;
    inset: 0;
    background: #030303;
}

/* ── Speed lines ── */
.p5-speed {
    position: absolute;
    inset: 0;
    transform-origin: center;
    animation: p5-speed-expand 0.28s ease-out 0.04s both;
}
@keyframes p5-speed-expand {
    from { transform: scale(0.55); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
}
.speed-fire { background: repeating-conic-gradient(rgba(255,70,0,0.18) 0deg 2.5deg, transparent 2.5deg 9deg); }
.speed-ice  { background: repeating-conic-gradient(rgba(0,170,255,0.18) 0deg 2.5deg, transparent 2.5deg 9deg); }
.speed-leaf { background: repeating-conic-gradient(rgba(40,200,80,0.18) 0deg 2.5deg, transparent 2.5deg 9deg); }

/* ── Diagonal cut lines ── */
.p5-diag {
    position: absolute;
    inset: -10%;
    animation: p5-diag-slash 0.18s ease-out 0.06s both;
    transform-origin: center;
}
@keyframes p5-diag-slash {
    from { opacity: 0; transform: scaleX(0); }
    to   { opacity: 1; transform: scaleX(1); }
}
.diag-fire  { background: linear-gradient(135deg, transparent 48.2%, rgba(255,60,0,0.8) 48.2%, rgba(255,60,0,0.8) 51%, transparent 51%); }
.diag-ice   { background: linear-gradient(135deg, transparent 48.2%, rgba(0,190,255,0.8) 48.2%, rgba(0,190,255,0.8) 51%, transparent 51%); }
.diag-leaf  { background: linear-gradient(135deg, transparent 48.2%, rgba(40,215,80,0.8) 48.2%, rgba(40,215,80,0.8) 51%, transparent 51%); }
.diag-fire2 { background: linear-gradient(135deg, transparent 52.5%, rgba(255,150,0,0.38) 52.5%, rgba(255,150,0,0.38) 53.8%, transparent 53.8%); }
.diag-ice2  { background: linear-gradient(135deg, transparent 52.5%, rgba(100,220,255,0.38) 52.5%, rgba(100,220,255,0.38) 53.8%, transparent 53.8%); }
.diag-leaf2 { background: linear-gradient(135deg, transparent 52.5%, rgba(120,255,140,0.38) 52.5%, rgba(120,255,140,0.38) 53.8%, transparent 53.8%); }
.p5-diag-2 { animation-delay: 0.09s; }

/* ── Diamonds ── */
.p5-gem {
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(45deg) scale(0);
    animation: p5-gem-pop 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes p5-gem-pop {
    0%  { transform: rotate(45deg) scale(0); opacity: 0; }
    62% { transform: rotate(45deg) scale(1.35); opacity: 1; }
    to  { transform: rotate(45deg) scale(1); opacity: 0.9; }
}
.gem-fire { background: #FF5500; box-shadow: 0 0 7px #FF3300; }
.gem-ice  { background: #00CCFF; box-shadow: 0 0 7px #0088FF; }
.gem-leaf { background: #44FF66; box-shadow: 0 0 7px #00CC44; }
.gem-pos-1 { top: 10%; left: 7%;  animation-delay: 0.05s; }
.gem-pos-2 { top: 14%; right: 11%; animation-delay: 0.09s; width: 7px; height: 7px; }
.gem-pos-3 { top: 48%; left: 3%;  animation-delay: 0.07s; width: 14px; height: 14px; }
.gem-pos-4 { top: 43%; right: 4%; animation-delay: 0.11s; }
.gem-pos-5 { bottom: 16%; left: 9%;  animation-delay: 0.06s; width: 8px; height: 8px; }
.gem-pos-6 { bottom: 12%; right: 8%; animation-delay: 0.1s;  width: 12px; height: 12px; }
.gem-pos-7 { top: 28%; left: 2%;  animation-delay: 0.08s; width: 6px; height: 6px; }
.gem-pos-8 { bottom: 28%; right: 3%; animation-delay: 0.12s; width: 6px; height: 6px; }

/* ── Banners ── */
.p5-banner {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 1.5vh;
    padding: 1.4vh 3.5vh 1.4vh 4vh;
    z-index: 15;
    clip-path: polygon(0 0, 100% 0, calc(100% - 2vh) 100%, 0 100%);
    max-width: 72%;
}
.p5-banner-atk {
    top: 22%;
    left: 0;
    animation: p5-slide-from-left 0.26s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}
.p5-banner-def {
    bottom: 22%;
    right: 0;
    clip-path: polygon(2vh 0, 100% 0, 100% 100%, 0 100%);
    animation: p5-slide-from-right 0.26s cubic-bezier(0.22, 1, 0.36, 1) 0.14s both;
}
@keyframes p5-slide-from-left {
    from { transform: translateX(-115%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
}
@keyframes p5-slide-from-right {
    from { transform: translateX(115%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
}
.bnr-fire { background: rgba(220, 30, 0, 0.95);  border-top: 3px solid #FF9900; border-bottom: 3px solid #FF9900; }
.bnr-ice  { background: rgba(0, 60, 190, 0.95);   border-top: 3px solid #00DDFF; border-bottom: 3px solid #00DDFF; }
.bnr-leaf { background: rgba(0, 110, 35, 0.95);   border-top: 3px solid #66FF88; border-bottom: 3px solid #66FF88; }

.p5-bnr-icon { width: 5.5vh; height: 5.5vh; object-fit: contain; filter: drop-shadow(0 0 4px rgba(255,255,255,0.6)); }
.p5-bnr-word {
    font-size: 2.2vh;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: 0.18em;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.7);
}
.p5-bnr-count {
    font-size: 3.8vh;
    font-weight: 900;
    font-style: italic;
    color: #FFFFFF;
    text-shadow: 2px 2px 0 rgba(0,0,0,0.6);
    margin-left: auto;
}

/* ── THE BIG OUTCOME TEXT ── */
.p5-outcome-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
}
.p5-outcome {
    font-size: 13vh;
    font-weight: 900;
    font-style: italic;
    letter-spacing: -0.02em;
    transform: skewX(-8deg) rotate(-2deg);
    -webkit-text-stroke: 4px rgba(0, 0, 0, 0.85);
    animation: p5-outcome-slam 0.24s cubic-bezier(0.22, 1, 0.36, 1) 0.17s both;
}
@keyframes p5-outcome-slam {
    from {
        opacity: 0;
        transform: skewX(-8deg) rotate(-2deg) scale(2.5) translateX(-50px);
        letter-spacing: 0.25em;
    }
    to {
        opacity: 1;
        transform: skewX(-8deg) rotate(-2deg) scale(1) translateX(0);
        letter-spacing: -0.02em;
    }
}
.out-fire { color: #FF4400; text-shadow: 5px 5px 0 #000, 0 0 22px #FF3300, 0 0 50px rgba(255,60,0,0.5); }
.out-ice  { color: #00DDFF; text-shadow: 5px 5px 0 #000, 0 0 22px #00AAFF, 0 0 50px rgba(0,180,255,0.5); }
.out-leaf { color: #44FF66; text-shadow: 5px 5px 0 #000, 0 0 22px #22CC44, 0 0 50px rgba(50,200,80,0.5); }
</style>
