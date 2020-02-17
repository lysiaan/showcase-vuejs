<template>
<div> 
  <div class="root">
    <Menu btn_active="Home"></Menu>
    <img class="logo" src="../assets/logo-home.svg" alt="logo">
  </div>
</div>
</template>



<script>
import Menu from '../components/Menu';
export default {
  components: {
    Menu,
  }
}
</script>



<style scoped>
.root {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FFCC00;
  color: #2c3e50;
  min-height: 100vh;
}

.logo {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

</style>