<script setup>

</script>

<template>
 <div class="w-full h-full flex justify-center items-center bg-[#45483D] bg-opacity-70 gap-5">
      <button @click="$emit('confirmed')"
      class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 ">
      Confirm</button>
      <button 
      @click="$emit('cancel')" 
      class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 ">
      Cancel</button>
  </div>
</template>

<style scoped>

</style>