<template class = "body">
  <el-container class="layout-container-demo" style="height: 100%">

    <el-aside width="200px" class="border-r-2 h-full" background-color="#545c64">
      <el-scrollbar class="h-full side">
        <el-menu :default-openeds="['1']" active-text-color="#ffd04b" background-color="#545c64"
          class="el-menu-vertical-demo" default-active="2" text-color="#fff">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <aim />
              </el-icon>Tools
            </template>
            <el-menu-item-group>
              <template #title>Top</template>
              <el-menu-item index="1-1">
                <RouterLink to="/todo_list" class="w-full h-full">Todo-list</RouterLink>
              </el-menu-item>
              <el-menu-item index="1-2">
                <RouterLink to="/memo" class="w-full h-full">Memo</RouterLink>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="About">
              <el-menu-item index="1-3">
                <RouterLink to="/about" class="w-full h-full">About</RouterLink>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="border-l-2 h-full">
      <el-header>
        <!-- <div>
          <el-icon @click="logout" style="margin-right: 80px; margin-top: 1px">
            <Promotion />
          </el-icon>
          <p>Logout</p>
        </div>
        <div>
          <span>Sumu</span>
        </div> -->
        <div class="flex flex-row justify-end">
          <div class="py-3 px-2 flex flex-row items-center">
            <el-icon @click="logout" class="m-1">
              <Promotion />
            </el-icon>
            <el-link type="primary" @click="logout">Logout</el-link>
          </div>
          <div class="py-3 px-2 flex flex-row items-center">
            <el-icon class="m-1">
              <User />
            </el-icon>
            <label>Sumu</label>
          </div>
        </div>
      </el-header>

      <el-main>
        <!-- <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar> -->
        <RouterView />
      </el-main>
      <el-footer class="text-center">Copyright © 2022 xuzhif</el-footer>
    </el-container>
  </el-container>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Aim, Promotion, User } from '@element-plus/icons-vue'
import Cookies from "js-cookie"
import router from "../router/index"
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))

let logout = () => {
  Cookies.set("login", '')
  router.go("/")
}
</script>

<style >
.side {
  background-color: #545c64
}

body {
  height: 100vh;
}

.layout-container-demo .el-header {
  position: relative;
  /* background-color: var(--el-color-primary-light-7); */
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  /* background: var(--el-color-primary-light-8); */
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
