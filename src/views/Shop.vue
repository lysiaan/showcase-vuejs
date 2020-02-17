
<template>

<div>
  <div class="root">
    <Menu btn_active="Shop"></Menu>

    <div class="root">

      <div class="btn-cart">
        <img class="logo-cart" height=80 src="../assets/logo-cart.svg" alt="Panier">
      </div>

    </div>
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
  background: #FFCC00;
  min-height: 100vh;
}

.btn-cart {
  height: 100px;
  width: 130px;
  background: #E3B600;
  border-radius: 30px 0px 0px 30px;
  position: absolute;
  right: 0;
  top: 4rem;
  cursor: pointer;
}

.logo-cart {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

</style>