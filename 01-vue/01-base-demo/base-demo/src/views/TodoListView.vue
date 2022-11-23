<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Cookies from 'js-cookie'
let user = ref(Cookies.get("username"))
const show = ref(true)
const items = ref(['1', '2', '3'])
const item = ref("")


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]


let add_todo = () => {
  if (item.value) {
    items.value.push(item.value)
    item.value = ""
    Cookies.set("todos", items.value)
  }
}

function rm_todo(user: string) {
  console.log(user)
  items.value = items.value.filter((x) => {
    return x != user
  })
  Cookies.set("todos", items.value)
}

onMounted(() => {
  items.value = Cookies.get("todos").split(",")
})
</script>

<template>
  <div class="todo">
    <h1>{{ user }} Todo List</h1>
    <div>
      <div @keydown.enter="add_todo">
        <label> add todo : </label>
        <input v-model="item" />
        <button @click="add_todo"> add </button>
      </div>
      <div class="button_box">
        <button @click="show = !show">Toggle List</button>
        <button @click="items.pop()">Pop Number</button>
        <button @click="items.reverse()">Reverse List</button>
      </div>

      <ul v-if="show && items.length">
        <li v-for="item of items">{{ item }} <button @click="rm_todo(item)">X</button></li>
      </ul>
      <p v-else-if="items.length">List is not empty, but hidden.</p>
      <p v-else>List is empty.</p>
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: grid;
  justify-items: center;
}
.button_box {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

button {
  margin-left: 1rem;
}
</style>