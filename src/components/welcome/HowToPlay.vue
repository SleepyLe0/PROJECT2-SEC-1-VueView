<script setup>
import { ref } from 'vue'
const showModal = ref(false)
</script>

<template>
     <button @click="showModal = true" class="flex justify-center items-center rounded-full text-[3vh] 
     xl:text-[4vh] w-[25vh] xl:w-[30vh] h-[7vh] xl:h-[10vh] bg-gradient-to-t from-red-900 to-orange-300 border-4 border-orange-200 transition duration-300 
     ease-in-out transform hover:scale-105">How to play</button>
      <transition name="pop-up">
        <div v-if="showModal" class="chakra-petch-regular fixed flex inset-0 items-center justify-center ">
          <div class="border-[1.5vh] lg:border-[2vh] border-[#332222] bg-gradient-to-b from-[#757A69] to-[#87946c] rounded-lg p-8 w-[40vh] lg:w-[90vh] max-h-[90vh] overflow-auto" >
            <div class="flex justify-between items-center border-b-2 border-y-stone-700 pb-2 lg:border-b-4 text-[3vh]">
              <h3 class=" font-semibold text-[3.5vh] lg:text-[6vh]">How to Play</h3>
              <button class="w-[3vh] flex items-center lg:text-[4.5vh]" @click="showModal = false"> X </button>
            </div >
            <div class="text-[1.5vh] lg:text-[2vh]">
              <p class="pt-[1vh] text-[2vh] font-semibold lg:pt-[2.5vh] lg:text-[3vh]">เกม Turn-Based คืออะไร...</p>
               <p >เกม Turn-Based จะมีการโจมตีกัน เป็นแนวเกมที่ผู้เล่นจะทำการเล่นเป็นรอบๆ (Turn) ตามลำดับ  โดยจะมีการโจมตีสลับกันระหว่างผู้เล่นและ
                                    ฝ่ายตรงข้าม การเล่น Turn-Based จะต้องวางแผนให้ดีในการเล่นแต่ละ Turn เพื่อเอาชนะฝ่ายตรงข้าม  </p>

              <p class="text-[2vh] font-semibold lg:pt-[2.5vh] lg:text-[3vh]">กติกาเกม </p>
              
              <p> เกมจะเล่นเป็น Turn โดยจะแบ่งเป็น Turn ของผู้เล่นและ Turn ของศัตรู ซึ่งตอนเริ่มเกมทั้งสองฝั่งจะได้รับ  skill point 
                                    1 point โดย skill point สูงสุดที่จะได้รับตอนเริ่ม turn จะเพิ่มขึ้นตามจำนวน Turn ที่เล่นสูงสุด 4
                                    point และ Skill point ที่ได้รับมาจะสามารถนำมาใช้ Action ในแต่ละ Turn และใน Turn แรกคนที่ออก Action ทีหลังจะได้รับโบนัส Skill Point เพิ่ม 1 Point</p>

                <p class="text-[2vh] font-semibold lg:pt-[2.5vh] lg:text-[3vh]">วิธีการเล่นเกม</p>
                <p >ในแต่ละ  Turn ของผู้เล่นสามารถใช้ได้ 3 ปุ่ม โดยจะมี Attack Button, Defense Button, และ 
                    Charge Button โดยการกดปุ่มหนึ่งครั้ง จะใช้ Skill Point 1 Point ซึ่งแต่ละ Action มีดังนี้</p> 
                    <div class="flex flex-col p-[1.4vh]">
                      <div class="flex justify-center py-[1vh]"><img src="/Skill/Attack.png" alt="Attack" class="w-[14vh]" ></div>
                      <p class="text-[1.5vh] font-semibold py-[0.5vh] lg:text-[2vh]">Attack Button :</p>
                      <p >จะเพิ่มจำนวน Attack ของผู้เล่นซึ่งการ Attack จะแสดงผลหลังจากจบ Turn ผู้เล่น</p>
                      <p >เมื่อจบ Turn ของผู้เล่นจะนำ Attack Point ของผู้เล่นไปคูณกับ ATK ของตัวละครเพื่อสร้างความเสียหายต่อศัตรู</p>
                 
                      <div class="flex justify-center py-[1vh]"><img src="/Skill/Defense.png" alt="Defense" class="w-[14vh]" ></div>
                      <p class="text-[1.5vh] font-semibold py-[0.5vh] lg:text-[2vh]">Defense Button :</p>
                      <p >จะเพิ่มจำนวน Defense ของผู้เล่นซึ่งการ Defense จะแสดงผลหลังจากศัตรู Action เสร็จ</p>
                      <p >เมื่อจบ Turn ของศัตรูจะนำ Defense Point ของผู้เล่นไปลบ Attack Point ของศัตรู</p>

                      <div class="flex justify-center py-[1vh]"><img src="/Skill/Charge.png" alt="Charge" class="w-[14vh]" ></div>
                      <p class="text-[1.5vh] font-semibold py-[0.5vh] lg:text-[2vh]">Charge Button :</p>
                      <p >จะเพิ่มจำนวน Charge  ของผู้เล่น ซึ่งการ Charge  จะแสดงผลเมื่อเริ่ม Turn ถัดไปของผู้เล่น</p>
                      <p >ในการ Charge แต่ละครั้งจะเป็นการเพิ่ม Skill Point ใน Turn ถัดไปของผู้เล่น</p>
                      <p >Charge Point มีได้มากสุดแค่ 4 ครั้งต่อ Turn</p>
                    </div> 
                    <p>และในแต่ละ Turn เราจะต้องใช้ Skill Point ให้ครบก่อนถึงจะจบ Turn ได้ หากฝ่ายใดเลือดหมดก่อนก็จะถือเป็นฝ่ายแพ้ ดังนั้นผู้เล่นจะต้องใช้กลยุทธ์อย่างชาญฉลาดในการเลือกใช้ปุ่มเพื่อคว้าชัยชนะในเกมนี้ </p>
            </div>
          </div>
        </div>
      </transition>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch&display=swap');

.chakra-petch-regular {
  font-family: "Chakra Petch", sans-serif;
}

.pop-up-enter-from,
.pop-up-leave-to {
  opacity: 0;
}

.pop-up-enter-active,
.pop-up-leave-active {
  transition: all .5s ease-in-out;
}

</style>