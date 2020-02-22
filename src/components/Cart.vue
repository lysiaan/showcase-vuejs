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
          <transition-group name="prod-transition" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div :key="elem.prod.id" v-for="elem in cart_elems" class="prod">	
              <div class="container-prod-title">
                <a class="prod-title">{{ elem.prod.title }}</a><br>
              </div>
              <div class="container-qte-btns">
                <div class="container-prod-quantity">
                  <a :style="elem.quantity_style">qté : {{ elem.quantity }}</a>
                </div>
                <div class="container-btns-qte">
                  <a @click="removeProdFromCart(elem.prod)" class="btn-change-qte minus">-</a>
                  <a @click="addProdToCart(elem.prod)" class="btn-change-qte">+</a>
                </div>
                <div class="container-prod-total">
                  <a>{{ elem.total | formatPriceGlobal }} €</a>
                </div>
              </div>
              <div class="separator">
              </div>
            </div>
          </transition-group>
          <div class="container-total-price">
            <div class="tax">
              <a>Total HT</a>
            </div>
            <div class="total-price">
              <a>{{ total_price | formatPriceGlobal }} €</a>
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
      const result = this.findProdInCart(prod); 
      if (result) {
        // Add quantity by one
        console.log('on incrémente cette prod de 1');
        result.cart_elem.quantity++;
        this.updateProdTotal(result.cart_elem);
        this.hightlightProduct(result.cart_elem, true);
      } else {
        console.log('cette prod est nouvellement ajoutée');
        const new_cart_elem = {
          prod: prod,
          quantity: 1,
          total: prod.price,
          quantity_style: ''
        }
        this.cart_elems.push(new_cart_elem);
      }
      console.log(this.cart_elems);
    },
    removeProdFromCart: function(prod) {
      const result = this.findProdInCart(prod);
      console.log(result);
      if (result) {
        const cart_elem = result.cart_elem;
        if (cart_elem.quantity > 1) {
          cart_elem.quantity--;
          this.updateProdTotal(cart_elem);
          this.hightlightProduct(result.cart_elem, false);
        } else {
          this.cart_elems.splice(result.index, 1)
        }
      }
    },
    findProdInCart: function(prod) {
      for (let index = 0; index < this.cart_elems.length; index++) {
        if (prod.id === this.cart_elems[index].prod.id) {
          return {
            cart_elem: this.cart_elems[index],
            index: index
          };
        }
      }
      return false;
    },
    updateProdTotal: function(cart_elem) {
      // Arrondi à 2 chiffres après la virgule
      cart_elem.total = Math.round(cart_elem.prod.price * cart_elem.quantity * 100) / 100;
    },
    hightlightProduct: function(elem, direction) {
      if (!elem.quantity_style) {
        const style = direction ? "color: #31f00f" : "color: #f16841";
        elem.quantity_style = style;
        setTimeout( ()=>{elem.quantity_style = ""}, 500 );
      }
    }
  },
  computed: {
    is_cart_deployed: function() {
      return this.deployed;
    },
    total_price: function() {
      let result = 0;
      this.cart_elems.forEach(cart_elem => {
        result += cart_elem.total;
      });
      return Math.round(result * 100) / 100;
    }
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

.total-price {
  margin-top: 18px;
  font-size: 1.3em;
}

.tax a {
  font-size: 0.8em;
  color: #edd83f;
  font-style: italic;
}

.total-price a {
  border: 2px solid #edd83f;
  border-radius: 26px;
  padding: 6px 14px;
  color: #edd83f;
}

.container-total-price {
  margin-top: 40px;
}

.container-prod-total {
  margin-bottom: 24px;
}

.btn-change-qte {
  border: 1px solid #f16841;
  border: 1px solid white;
  padding: 1px 10px !important;
  padding-bottom: 4px !important;
  cursor: pointer;
  margin-right: 8px;
  user-select: none;
}

.btn-change-qte:hover {
  background: white;
  color: black;
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
  margin-bottom: 10px;
  display: inline-block;
  width: 49%;
}

.container-prod-title {
  margin-top: 30px;
  margin-bottom: 14px;
}

.container-prod-title a {
  font-weight: bold;
}

.prod a {
  padding-left: 30px;
}

.prod {
  text-align: left;
  animation-duration: 200ms;
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