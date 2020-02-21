<template>
  <div class="container-root-cart">
    <transition name="cart-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <div v-if="is_cart_deployed" class="root-cart">
        <div class="btn-close-container">
          <a @click="$emit('toggle-deployed', !deployed)" class="btn-close">X</a>
        </div>
      </div>
    </transition>
  </div>
</template>



<script>
import "animate.css/source/_base.css";
import "animate.css/source/sliding_entrances/slideInRight.css";
import "animate.css/source/sliding_exits/slideOutRight.css";

export default {
  name: "Cart",
  props: ['deployed'],
  data: function() {
    return {
      container: null,
      zindex: '30',
    }
  },
  mounted: function() {
    this.container = document.querySelector('.container-root-cart');
  },
  computed: {
    is_cart_deployed: function() {
      return this.deployed;
    },
    container_zindex_style: function() {
      return this.deployed === true ? 'z-index: 50;' : 'z-index: 30;'
    }
  },
  watch: {
    // Is the cart button over or under the cart-container ?
    // (need to considerate the animation timing)
    container_zindex_style: function() {
      if (this.deployed === true) {
        this.container.style.zIndex = '50'
      } else {
        setTimeout(() => {
          this.container.style.zIndex = '30'
        }, 300);
      }
    }
  },
  methods: {

  }
}
</script>



<style scoped>

.container-root-cart {
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
}

.root-cart {
  background: rgba(0,0,0, 0.7);
  animation-duration: 300ms;
  /* position: absolute; */
  height: 100%;
  width: 100%;
  z-index: 51;
}

.btn-close-container {
  text-align: left;
  padding-top: 20px;
}

.btn-close {
  color: white;
  position: block;
  font-size: 2em;
  margin-left: 20px;
  cursor: pointer;
}

.container-root-cart {
  overflow:hidden;
}

</style>