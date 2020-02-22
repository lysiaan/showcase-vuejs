
<template>
<div>
  <div class="root">
    <nav>
      <a @click="setCurrentPage('Home')" :class="{active: isCurrentPage('Home')}" href="/">Home</a>
      <a @click="setCurrentPage('Shop')" :class="{active: isCurrentPage('Shop')}" href="/shop">Shop</a>
    </nav>
  </div>
</div>
</template>



<script>
export default {
  props: [
    'current_page'
  ],
  methods: {
    isCurrentPage: function(page) {
      return page === this.current_page;
    },
    setCurrentPage: function(page) {
      this.current_page = page;
    }
  }
}
</script>



<style scoped>

.root {
  font-size: 1.1em;
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
  background: #f0f0f0;
  color: #959595;
  text-decoration: none;
  padding: 0.6rem 1.8rem;
  box-shadow: 0 0 10px rgba(0,0,0, 0.2);
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
  box-shadow: 0 0 10px rgba(0,0,0, 0.1);
}

</style>