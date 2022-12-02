<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import Cookies from 'js-cookie'
import TodoDetail from "../components/TodoDetail.vue"
import AddTodo from "../components/AddTodo.vue"
import { uuid } from 'vue-uuid';
let user = ref(Cookies.get("username"))
const show = ref(true)
const items = ref(['1', '2', '3'])
const item = ref("")
const selectTag = ref("")
const searchValue = ref("")
const detailOutput = ref("")
const dialogDetail = ref(false)
const dialogFormVisible = ref(false)
const STORAGE_KEY = 'vue-memo'
interface Memo {
  id: string
  date: string
  name: string
  detail: string
  kind: string
  tag: string
}
let tableData: Memo[] = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

const tags = (t: string) => {
  if (t == 'Inprogress') {
    return 'success'
  } else if (t == 'Discard') {
    return "info"
  } else if (t == "Plan") {
    return "warning"
  } else {
    return ""
  }
}

let add_todo = () => {
  if (item.value) {
    items.value.push(item.value)
    item.value = ""
    Cookies.set("todos", items.value)
  }
}

let show_detail = (item: Memo) => {
  detailOutput.value = item.detail
  dialogDetail.value = true
  console.log(item.id)
}

function done_todo(item: Memo) {
  // console.log(user)
  // items.value = items.value.filter((x) => {
  //   return x != user
  // })
  // Cookies.set("todos", items.value)
  tableData.forEach((v, i, a) => {
    if (v.id == item.id) {
      a[i].tag = "Completed"
    }
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData))
}

let close = () => {
  dialogDetail.value = false
}
onMounted(() => {
  let tableData = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
})

let show_add_todo = () => {
  dialogFormVisible.value = true
}
let add_cancel = () => {
  dialogFormVisible.value = false
}
function getCurDate() {
  return new Date().toJSON().substr(0, 10);
};
let add_todo_data = (M: Memo) => {
  tableData.push({
    id: uuid.v1(), date: getCurDate(), name: M.name, detail: M.detail, kind: M.kind, tag: M.tag
  })
  M.name = ""
  M.detail = ""
  M.kind = ""
  M.tag = ""
  M.id = ""
  dialogFormVisible.value = false
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData))
}

let tableDataFilter = computed(() => {
  return tableData.filter((x: Memo) => {
    return x.name.includes(searchValue.value) && x.tag.includes(selectTag.value)
  })
})
</script>

<template>
  <el-button class="fixed top-100 right-10" type="success" plain @click="show_add_todo">Add</el-button>
  <div class="todo">
    <div class="text-center w-full" @click="show_add_todo">
      <h1 class="text-2xl py-4 text-center">{{ user }} Todo List</h1>
    </div>
    <div class="flex flex-row items-start w-full">
      <div class="ml-5">
        <el-input v-model="searchValue" class="w-14 m-2" placeholder="Name something" :prefix-icon="Search" />
      </div>
      <div class="ml-5 mt-2">
        <el-select v-model="selectTag" placeholder="Please select a Type">
          <el-option label="Plan" value="Plan" />
          <el-option label="Discard" value="Discard" />
          <el-option label="Completed" value="Completed" />
          <el-option label="Inprogress" value="Inprogress" />
        </el-select>
      </div>
    </div>
    <div>
      <div @keydown.enter="add_todo">
        <!-- <label class="py-3"> add todo </label> -->
        <!-- <input v-model="item" class="border-b-4 border-blue-300"/> -->
        <!-- <el-input v-model="item" placeholder="Please todo ..." /> -->
        <!-- <button @click="add_todo"> add </button> -->
      </div>
      <!-- <div class="button_box">
        <button @click="show = !show">Toggle List</button>
        <button @click="items.pop()">Pop Number</button>
        <button @click="items.reverse()">Reverse List</button>
      </div> -->

    </div>

    <div class="mt-3 w-full pl-5 pr-5 ">
      <el-scrollbar>
        <div v-if="show && tableDataFilter.length" v-for="item of tableDataFilter">
          <el-card class="box-card mt-3 p-0">
            <div class="grid grid-rows-1 grid-flow-col gap-4">
              <div class="col-span-9" @click="show_detail(item)">
                <span>{{ item.name }}</span>
              </div>
              <div class="col-span-1">
                <el-tag :type="tags(item.tag)">{{ item.tag }}</el-tag>
              </div>
              <div class="col-span-1">
                <el-button type="success" plain class="self-end w-14" @click="done_todo(item)">Done</el-button>
              </div>

            </div>
          </el-card>

        </div>

        <!-- <ul v-if="show && items.length">
<li v-for="item of items">{{ item }} <button @click="rm_todo(item)">X</button></li>
</ul> -->
        <p v-else-if="items.length">List is not empty, but hidden.</p>
        <p v-else>List is empty.</p>
      </el-scrollbar>
    </div>
    <TodoDetail :detail="detailOutput" :dialog-detail="dialogDetail" @close="close" />
    <AddTodo :dialog-form-visible="dialogFormVisible" @add_cancel="add_cancel" @add_todo_data="add_todo_data"></AddTodo>
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