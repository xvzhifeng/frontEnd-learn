<script setup>
import { ref } from 'vue'
import Cookies from 'js-cookie'
let user = ref(Cookies.get("username"))
console.log(Cookies.get("username"))
</script>

<template>
  <h1>{{user}} Todo List</h1>
</template>