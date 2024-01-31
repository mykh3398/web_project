<template>
  <div id="app">
    <HeadNav />
    <div class="main-content">
      <router-view />
    </div>
    <FootNav class="footer"/>
  </div>
</template>

<script>
import HeadNav from './components/HeadNav.vue';
import FootNav from './components/FootNav.vue';

export default {
  name: 'App',
  components: {
    HeadNav,
    FootNav
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px; 
  box-sizing: border-box; 
}

.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
}
</style>
