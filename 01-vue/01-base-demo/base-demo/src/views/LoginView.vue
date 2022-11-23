<!--
跟 Vue 说 Hello World！
-->

<script setup>

import { ref, onMounted } from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import Cookies from 'js-cookie'
import router from "../router/index"
const username = ref("")
const password = ref("")

function login() {
  console.log(username.value)
    if(username.value == "xuzhif" && password.value == "xuzhif") {
      Cookies.set('username', username.value)
      Cookies.set('password', password.value)
      Cookies.set("login", true)
      router.go("/")
    }
    return
}
onMounted(() => {
  username.value = Cookies.get("username")
  password.value = Cookies.get("password")
  console.log(username.value)
})
</script>

<template>
  <div class="login bg-gradient-to-r from-cyan-500 to-blue-500">
    <div class="login_box w-500 h-1/2 shadow-md rounded-md backdrop-opacity-60 bg-gradient-to-r to-sky-500 from-indigo-500"  @keydown.enter="login">
      <div class="flex flex-col items-center justify-center z-50">
        <div class="flex  px-4 py-2">
          <el-input  class="w-64 rounded-md" v-model="username" placeholder="Please input" :prefix-icon="User"/>
        </div>
        <div class="flex  px-4 py-2">
          <el-input  class="w-64 rounded-md" v-model="password" type="password" :prefix-icon="Lock" placeholder="Please input password" show-password />
        </div>
        <div class="flex  py-2">
          <el-button color="#626aef" plain class="w-64 rounded-md m-0 hover:placeholder-cyan-500 text-gray-600" @click="login">Login</el-button>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
body {
  margin: 0;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
}

.login_box {
  display: flex;
}
</style>