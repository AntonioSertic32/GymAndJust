<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Workouts />
  </div>
</template>

<script>
import Workouts from './components/Workouts.vue'

export default {
  name: 'App',
  components: {
    Workouts
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



