<script setup></script>

<template>
  <div id="app">
    <header>
      <h1>THE FINAL COUNTDOWN</h1>
    </header>

    <nav class="nav-bar">
      <router-link to="/">Countdown</router-link>
      <router-link to="/countup">Countup</router-link>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

header h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: blueviolet;
}

.nav-bar {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.nav-bar a {
  text-decoration: none;
  font-weight: bold;
  color: #4f46e5;
  font-size: 1.1rem;
}

.nav-bar a.router-link-active {
  color: #e53e3e;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
