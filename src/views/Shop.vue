<template>
<div>
  <div class="root">
    <div class="blank"></div>

    <Menu btn_active="Shop"></Menu>

  <!-- <button @click="load_main = !load_main">
    Permuter
  </button> -->

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
        </div>
      </transition>
    </div>


    <ul class="categories">
      <li :class="{active: is_cat_active === category}" @click="setActiveCat(category)" :key="category.id" v-for="category in cats"><a>{{ category }}</a></li>
    </ul>

      <transition-group name="product-list"
        enter-active-class="animated zoomIn"
        tag="div"
        v-bind:class="'products-container'">
        <div class="product" :key="prod.id" v-for="prod in prods_current" >
          <div class="prod-thumbnail"></div>
          <a class="prod-title">{{ prod.title }}</a>
          <div class="prod-details">
            <div class="prod-detail details-left">
              <div class="details-left-contained">
                <div class="prod-available">    
                  <div class="prod-available-icon"></div>
                  <span class="prod-available-text">en stock</span>
                </div>
                <div class="prod-price">
                  <a>{{ prod.price | formatPriceGlobal }} €</a>
                  <!-- On peux aussi utiliser un filtre local du composant : -->
                  <!-- <a>{{ prod.price | formatPrice }} €</a> -->
                </div>
              </div>
            </div>
            <div class="prod-detail details-right">
              <div class="prod-icon-cart">
                <img src="../assets/logo-add.svg" alt="">
              </div>
            </div>
          </div>
        </div>

      </transition-group>

  </div>
</div>
</template>



<script>

import Menu from '../components/Menu';
import "animate.css/source/_base.css";
import "animate.css/source/bouncing_entrances/bounceIn.css";
import "animate.css/source/zooming_entrances/zoomIn.css";
import "animate.css/source/bouncing_entrances/bounceInRight.css";

// Dans le cas d'une récupération de fichier qui ne serait pas
// dans le dossier  public, utilier require :
// const test = require('../assets/test.json');
// console.log(test);

export default {
  components: {
    Menu,
  },
  data: function() {
    return {
      cats: [],
      is_cat_active: '',
      prods_list: '',
      load_main: false,
    }
  },
  methods: {
    clickCart: function () {
      // to do
    },
    setActiveCat: function(string) {
      this.is_cat_active = string;
    },
  },
  filters: {
    // Add '0' in the case of single decimal digit, and '.00' if no decimal
    formatPrice: function(number) {
      let returned = number.toString(); 
      const splitted = returned.split('.');
      if (splitted[1]) {
        splitted[1].length > 0 && splitted[1].length < 2 ?
          returned = returned + '0' : '';
      } else {
        returned = splitted[0] + '.00';
      }
      return returned;
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

.details-right {
  position: relative;
  height: 100%;
}

.prod-icon-cart {
  height: 100px;
  width: 100px;
  background: #4FAA5E;
  border-radius: 20px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.prod-price {
  font-weight: bolder;
  font-size: 1.8em;
  color: #38393D;
  margin-top: 12px;
}

.details-left-contained {
  height: 74px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.prod-available-icon {
  height: 16px;
  width: 16px;
  background: #5CC86E;
  border-radius: 20px;
  display: inline-block;
  position: relative;
  top: 3px;
  margin-right: 10px;
}

.prod-available-text {
  text-transform: uppercase;
  color: #5CC86E;
  font-weight: bold;
}

.prod-detail {
  width: 50%;
  height: 200px;
}

.prod-details {
  display: flex;
}

.prod-title {
  text-transform: uppercase;
  background: #38393D;
  color: white;
  display: block;
  padding: 10px 5px;
  font-weight: bold;
}

.prod-thumbnail {
  height: 180px;
  width: 100%;
  background: #DFDFDF;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  width: 82vw;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}

.product {
  width: 330px;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  margin: 30px 30px;
  font-family: 'Segoe UI';
  border-radius: 10px;
  overflow: hidden;
}

.root {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #FFCC00;
  min-height: 100vh;
  
}

.btn-cart-container {
  position: absolute;
  width: 160px;
  top: 4rem;
  right: 0;
  overflow: hidden;
}

.btn-cart {
  height: 100px;
  /* We give him an abusive width and position
  in match with bounce-from-right animation (animate.css) */
  width: 190px;
  position: relative;
  right: -20px;
  background: #E3B600;
  border-radius: 30px 0px 0px 30px;
  cursor: pointer;
}

.logo-cart {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-80%, -50%);
}

.categories {
  font-size: 1.2em;
  color: #a67400;
  margin-top: 100px;
}

.categories > li {
  display: inline-block;
  padding: 8px 8px 6px 8px;
  cursor: pointer;
  margin-left: 10px !important;
  margin-right: 10px !important;
}

.categories > li.active {
  color: #38393D;
  font-weight: bold;
  border: 2px solid #38393D;
  border-radius: 20px;
}

/* body {
  overflow: hidden
} */

</style>