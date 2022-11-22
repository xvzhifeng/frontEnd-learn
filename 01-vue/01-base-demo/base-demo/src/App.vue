<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Cookies from 'js-cookie'
import { onMounted } from 'vue';
import router from './router';
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
let isLogin = Cookies.get('login')
console.log(Cookies.get('login'))
onMounted(() => {
  router.push("/todo_list")
})
</script>

<template>
  <div v-if="isLogin">
    <div style="width: 100%;">
      <HomeView />
    </div>
  </div>
  <div v-else>
    <LoginView />
  </div>


  <!-- <header>
      <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="isLogin" to="/todo_list">todo-list</RouterLink>
        <RouterLink v-else to="/login">Login</RouterLink>  
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div><RouterView /></div> -->
</template>

<!-- <style scoped>
header {
  line-height: 1.5; 
  max-height: 100vh; 
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    width: 100%;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
