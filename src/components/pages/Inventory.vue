<script setup>
import { ref } from 'vue'
import CardInventory from '../inventory/CardInventory.vue'

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')))
</script>

<template>
   <CardInventory :characters="currentUser.characters"/>
</template>

<style scoped></style>