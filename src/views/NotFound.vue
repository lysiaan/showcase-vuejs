
<template>

<div>
  <Menu></Menu>

  <div class="root">
    <h2>Error ! This page doesn't exist</h2>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>