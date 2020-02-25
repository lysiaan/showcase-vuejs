<template>
<div>
  <div class="root">
  <!-- <div @click="closeCart" class="root"> -->
    <div class="blank"></div>
    <Menu current_page="Shop"></Menu>
    <!-- Méthode la moins propre, en tweakant le hook mounted avec variable :  -->
    <!-- <transition name="custom-classes-transition" enter-active-class="animated bounceIn">
      <div v-if="load_main === true" @click="clickCart()" class="btn-cart">
        <img class="logo-cart" height=80 src="../assets/logo-cart.svg" alt="Panier">
      </div>
    </transition> -->
    <!-- Méthode dédiée à cette tâche, avec appear -->
    <div class="btn-cart-container">
      <transition 
        appear appear-active-class="animated bounceInRight">
        <div @click="clickCart()" class="btn-cart">
          <img class="logo-cart" height=80 src="../assets/logo-cart.svg" alt="Panier">
          <span class="total-quantity">{{ total_quantity }}</span>
        </div>
      </transition>
    </div>
    <Cart ref="refCart" :deployed="is_cart_deployed" v-on:toggle-deployed="is_cart_deployed = $event" v-on:total_quantity="total_quantity = $event"></Cart>
    <ul class="categories">
      <li :class="{active: is_cat_active === category}" @click="setActiveCat(category)" :key="category.id" v-for="category in cats"><a>{{ category }}</a></li>
    </ul>
    <transition-group name="product-list"
      v-on:before-enter="beforeEnterProd"
      v-on:enter="enterProd"
      tag="div"
      v-bind:class="'products-container'">
      <Product v-on:add-prod-to-cart="addProdToCart($event)" :data-index="index" :key="prod.id" v-for="(prod, index) in prods_current"
        :prod="prod"
      ></Product>
    </transition-group>
  </div>
</div>
</template>



<script>

import Menu from '../components/Menu';
import Product from '../components/Product';
import Cart from '../components/Cart';
import "animate.css/source/_base.css";
import "animate.css/source/bouncing_entrances/bounceInRight.css";
import "animate.css/source/attention_seekers/heartBeat.css";
// import "animate.css/source/bouncing_entrances/bounceIn.css";
// import "animate.css/source/zooming_entrances/zoomIn.css";

// Dans le cas d'une récupération de fichier qui ne serait pas
// dans le dossier  public, utilier require :
// const test = require('../assets/test.json');
// console.log(test);

export default {
  components: {
    Menu,
    Product,
    Cart,
  },
  data: function() {
    return {
      cats: [],
      is_cat_active: '',
      prods_list: '',
      load_main: false,
      is_cart_deployed: false,
      total_quantity: 0,
      elm_btn_cart_container: null,
    }
  },
  methods: {
    closeCart: function() {
      if (this.is_cart_deployed) {
        this.is_cart_deployed = false;
      }
    },
    addProdToCart: function(prod) {
      this.$refs.refCart.addProdToCart(prod);
      if (!this.is_cart_deployed) {
        this.elm_btn_cart_container.classList.add("animated", "heartBeat");
        setTimeout(()=>{this.elm_btn_cart_container.classList.remove("animated", "heartBeat")}, 300);
      }
    },
    clickCart: function () {
      this.is_cart_deployed = !this.is_cart_deployed;
      console.log(this.is_cart_deployed);
    },
    setActiveCat: function(string) {
      this.is_cat_active = string;
    },
    beforeEnterProd: function(el) {
      el.style.opacity = 0;
      el.style.left = '-40px';
    },
    enterProd: function(el) {
      // Apres avoir essayé d'appliquer des délais d'entrée sur
      // un transition-group avec des classes CSS (animate.css),
      // j'en conclus que cette feature n'est possible qu'en
      // utilisant plutôt des animations JS. En voici une
      // custom, sans faire appel à une quelconque librairie.
      // =====================================================
      // Custom animation : Opacity
      const delay = el.dataset.index * 100;
      setTimeout(() => {
        let opa = 0;
        let decrease = 0.02;
        const interval = setInterval(() => {
          opa += decrease;
          el.style.opacity = opa;
          decrease -= - 0.0002;
          // Check this for non infinite loop...
          // console.log(el.style.opacity);
          if (opa > 1) {
            clearInterval(interval);
          }
        }, 1);
      }, delay);
      // Custom animation : leftIn
      setTimeout(() => {
        let pos = 50;
        let decrease = 1;
        const interval = setInterval(() => {
          pos -= decrease;
          el.style.left = '-'+pos+'px';
          decrease -= 0.01;
          // Check this for non infinite loop...
          // console.log(el.style.left);
          if (pos < 0) {
            clearInterval(interval);
          }
        }, 1);
      }, delay);
    }
  },
  computed: {
    prods_current: function() {
      const prods = JSON.parse(JSON.stringify(this.prods_list));
      for(let index in prods) {
        if(prods[index].category === this.is_cat_active) {
          return prods[index].products; 
        }
      }
      return '';
    }
  },
  mounted: function() {
    this.elm_btn_cart_container = document.querySelector('.btn-cart-container');
    console.log(this.elm_btn_cart_container);
    this.load_main = true;
    // Retrieving Products (public folder)
    fetch("./products.json")
      .then(r => r.json())
      .then(json => {
        this.prods_list = json
        // Initializing Categories
        const prods = JSON.parse(JSON.stringify(this.prods_list));
        for(let index in prods) {
          this.cats.push(prods[index].category);
        }
        this.is_cat_active = this.cats[0] ? this.cats[0] : '';
      })
      .catch(error => console.warn("L'opération fetch sur les products n'a pas abouti : " + error));
  }
}
</script>



<style scoped>

/* .list-enter {
  opacity: 0;
}

.list-enter-active {
  transition: opacity .5s;
} */

.blank {
  height: 1px;
  width: 1px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  width: 78vw;
  padding-left: 10vw;
  /* position: relative;
  margin-left: auto;
  margin-right: auto; */
  margin-top: 100px;
  padding-bottom: 200px;
}

.root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #FFCC00;
  min-height: 100vh;
  position: relative;
}

.btn-cart-container {
  position: fixed;
  width: 160px;
  top: 4rem;
  right: 0;
  overflow: hidden;
  z-index: 40;
}

.total-quantity {
  color: white;
  border: 3px solid white;
  padding: 3px 8px;
  border-radius: 50px;
  background: #E3B600;
  z-index: 42;
  display: inline;
  position: relative;
  top: 9px;
  left: 10px;
  font-weight: bold;
  font-size: 1.1em;
}

.btn-cart img {
  z-index: 41;
  display: block;
}

.btn-cart {
  height: 100px;
  /* We give him an abusive width and position
  in match with bounce-from-right animation (animate.css) */
  width: 190px;
  position: relative;
  right: -20px;
  background: #E3B600;
  background: #ddb000;
  border-radius: 30px 0px 0px 30px;
  cursor: pointer;
  z-index: 40;
}

.logo-cart {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-80%, -50%);
}

.categories {
  font-size: 1.2em;
  color: #a67400;
  color: #b2b2b2;
  margin-top: 100px;
}

.categories > li {
  display: inline-block;
  padding: 14px 14px 12px 14px;
  cursor: pointer;
  margin-left: 10px !important;
  margin-right: 10px !important;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0, 0.2);
  background: #38393D;
  color: #afb0b6;
  background: #d7d7d7;
  color: #6f7179;
  letter-spacing: 2px;
  font-size: 0.9em;
  transition: 0.2s all ease;
}

.categories > li.active {
  color: rgb(61, 61, 61);
  color: rgb(110, 68, 68);
  font-size: 1em;
  color: rgb(22, 22, 22);
  background: rgb(246, 246, 246);
  color: white;
  background: #38393D;
  transform: scale(1.1);
  
  /* font-weight: bold; */
  /* border: 2px solid #38393D; */
  /* border-radius: 20px; */
}


</style>