
<template>
<div>
  <div class="root">
    <nav>
      <a @click="setActive('Home')" :class="{active: isActive('Home')}" href="/">Home</a>
      <a @click="setActive('Shop')" :class="{active: isActive('Shop')}" href="/shop">Shop</a>
    </nav>
  </div>
</div>
</template>



<script>
export default {
  props: [
    'btn_active'
  ],
  methods: {
    isActive: function(item) {
      return item === this.btn_active;
    },
    setActive: function(item) {
      this.btn_active = item;
    }
  }
}
</script>



<style scoped>

.root {
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Segoe UI';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: inline;
  position: absolute;
  left: 2vw;
  top: 2.8rem;
}

a {
  background: white;
  color: #7D7D7D;
  text-decoration: none;
  padding: 0.8rem 2rem;
}

nav :first-child {
  border-radius: 30px 0px 0px 30px;
}

nav :last-child {
  border-radius: 0px 30px 30px 0px;
}

.active {
  background: #38393D;
  color: white;
}

</style>