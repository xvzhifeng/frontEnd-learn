<script setup>
import {ref} from 'vue'
let count = ref(0)
let increase = () => {
  console.log("test")
  count.value += 1
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="() => {count =count + 1}">{{count}}</h1>
    <button @click="increase"> test </button>
  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
