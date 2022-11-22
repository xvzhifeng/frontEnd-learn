<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <aim />
              </el-icon>Tools
            </template>
            <el-menu-item-group>
              <template #title>Top</template>
              <el-menu-item index="1-1">
                <RouterLink to="/todo_list">todo-list</RouterLink>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="About">
              <el-menu-item index="1-3">
                <RouterLink to="/about">About</RouterLink>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
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
        <el-row :gutter="20">
          <el-col :span="10">
          </el-col>
          <el-col :span="10">
          </el-col>
          <el-col :span="1">
            <div>
              <el-icon @click="logout" >
              <Promotion />
              </el-icon>
          </div>
          </el-col>
          <el-col :span="2">
            <el-link type="primary" @click="logout">Logout</el-link>
            <!-- <span @click="logout">Logout</span> -->
          </el-col>
          <el-col :span="1">
            <span>Sumu</span>
          </el-col>
        </el-row>
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
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Aim, Promotion } from '@element-plus/icons-vue'
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
  Cookies.set("username", '')

  router.go("/")
}
</script>

<style scoped>
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
