<template>
  <div class="container-root-cart">
    <transition name="cart-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <div v-if="is_cart_deployed" class="root-cart">
        <div class="container-btn-close">
          <a @click="$emit('toggle-deployed', !deployed)" class="btn-close">X</a>
        </div>
        <div class="container-prods">
          <div class="separator">
          </div>
          <div v-if="cart_elems.length === 0">
            <div class="container-empty">
              <a class="empty">Aucun article dans le panier</a>
            </div>
          </div>
          <div :key="elem.prod.id" v-for="elem in cart_elems" class="prod">	
            <div class="container-prod-title">
              <a class="prod-title">{{ elem.prod.title }}</a><br>
            </div>
            <div class="container-qte-btns">
              <div class="container-prod-quantity">
                <a>qte : {{ elem.quantity }}</a>
              </div>
              <div class="container-btns-qte">
                <a class="btn-change-qte minus">-</a>
                <a class="btn-change-qte">+</a>
              </div>
            </div>
            <div class="separator">
            </div>
          </div>
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
      cart_elems: []
    }
  },
  mounted: function() {
    this.container = document.querySelector('.container-root-cart');
  },
  methods: {
    addProdToCart: function(prod) {
      const cart_elem = this.findProdInCart(prod); 
      if (cart_elem) {
        // Add quantity by one
        console.log('on incrémente cette prod de 1');
        cart_elem.quantity++;
      } else {
        console.log('cette prod est nouvellement ajoutée');
        const new_cart_elem = {
          prod: prod,
          quantity: 1
        }
        this.cart_elems.push(new_cart_elem);
      }
      console.log(this.cart_elems);
    },
    findProdInCart: function(prod) {
      for (let index = 0; index < this.cart_elems.length; index++) {
        if (prod === this.cart_elems[index].prod) {
          return this.cart_elems[index];
        }
      }
      return false;
    }
  },
  computed: {
    is_cart_deployed: function() {
      return this.deployed;
    },
  },
  watch: {
    // Is the cart-deployment-button over or under the cart-container ?
    // (need to considerate the animation timing)
    is_cart_deployed: function() {
      if (this.deployed === true) {
        this.container.style.zIndex = '50'
      } else {
        setTimeout(() => {
          this.container.style.zIndex = '30'
        }, 300);
      }
    }
  },
}
</script>



<style scoped>

.btn-change-qte {
  border: 1px solid white;
  padding: 1px 10px !important;
  padding-bottom: 4px !important;
  cursor: pointer;
  margin-right: 8px;
}

.minus {
  padding-left: 12px !important;
  padding-right: 12px !important;
}

.container-btns-qte {
  display: inline-block;
  width: 49%;
}

.empty {
  font-style: italic;
}

.container-empty {
  margin-top: 30px;
}

.separator {
  height: 1px;
  background: white;
  width: 80%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.container-prods {
  color: white;
  margin-top: 30px;
  font-size: 1.3em;
}

.container-prod-quantity {
  margin-bottom: 30px;
  display: inline-block;
  width: 49%;
}

.container-prod-title {
  margin-top: 30px;
  margin-bottom: 6px;
}

.prod a {
  padding-left: 30px;
}

.prod {
  text-align: left;
}

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

.container-btn-close {
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