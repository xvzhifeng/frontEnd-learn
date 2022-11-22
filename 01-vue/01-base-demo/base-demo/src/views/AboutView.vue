<script setup>
import {ref} from 'vue'
import router from "../router/index"
import Cookies from "js-cookie"
let count = ref(0)
let increase = () => {
  console.log("test")
  count.value += 1
}

let logout = () => {
  Cookies.set("login", '')
  Cookies.set("username", '')

  router.go("/")
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  
</template>

<style>
</style>
