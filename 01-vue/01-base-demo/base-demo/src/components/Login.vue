<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import router from "../router/index"
import Cookies from "js-cookie"
let message = ref<string>('Hello Vue')
let username: Ref<string> = ref('')
let password: Ref<String> = ref('')
let status: Ref<string> = ref('')
let isRed = ref(true)
let already_login_user: Ref<string[]> = ref([])
let change = () => {
    if (message.value == 'Hello world') {
        message.value = 'Hello Vue'
    } else {
        message.value = 'Hello world'
    }

    console.log("click")
}

function toggleRed() {
    isRed.value = !isRed.value
}

function login() {
    if (already_login_user.value.includes(username.value)) {
        status.value = 'already login'
        return
    }
    if (username.value != "" && password.value == "123456") {
        status.value = 'validate'
        message.value = `hello ${username.value}`

        Cookies.set('username', username.value)
        Cookies.set("login", true)
        already_login_user.value.push(username.value)
        router.push("/todo_list")
        router.go("/")
    } else {
        status.value = 'invalidate'
    }
}

function rm_login_user(user: string) {
    console.log(user)
    already_login_user.value = already_login_user.value.filter((x) => {
        return x != user
    })
}
watch(status, (newStatus, oldStatus) => {
    console.log(newStatus)
    console.log(oldStatus)
})

/*
    watch 监控对于引用类型，无法获取前后的值，如下list所示，new 和 old 会输出一样的值。
*/
watch(already_login_user.value, (newAlready_login_user, old) => {
    console.log(newAlready_login_user)
    console.log(old)
})

onMounted(()=>{

})

</script>

<template>
    <div @keydown.enter="login">
        <h1 @click="change">{{ message }}</h1>
        <div>
            <span> username: </span>
            <input v-model="username" id="input_01" @change="toggleRed" />
        </div>
        <div>
            <span>password: </span>
            <input v-model="password" />
        </div>
        <input type="button" value="login" @click="login" />
        <p :class="{ red: isRed }" @click="toggleRed"> login status: {{ status }}</p>
        <ul v-if="already_login_user.length">
            <li v-for="user of already_login_user">
                {{ user }}
                <button @click="rm_login_user(user)">X</button>
            </li>
        </ul>
    </div>
</template>

<style>
.red {
    color: red;
}
</style>
