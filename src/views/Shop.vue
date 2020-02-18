<template>
<div>
  <div class="root-shop">
    <div class="blank"></div>

    <Menu btn_active="Shop"></Menu>

    <div @click="clickCart()" class="btn-cart">
      <img class="logo-cart" height=80 src="../assets/logo-cart.svg" alt="Panier">
    </div>
    
    <ul class="categories">
      <li :class="{active: is_cat_active === category}" @click="setActiveCat(category)" :key="category.id" v-for="category in cats"><a>{{ category }}</a></li>
    </ul>

    <div class="products-container">
      <div class="product" :key="prod.id" v-for="prod in prods_current" >
        <a >{{ prod.title }}</a>    
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
  },
  data: function() {
    return {
      cats: [],
      is_cat_active: '',
      prods_list: '',
    }
  },
  methods: {
    clickCart: function () {
      // to do
    },
    setActiveCat: function(string) {
      this.is_cat_active = string;
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
    // Retrieving Products (public folder)
    fetch('./products.json')
      .then(r => r.json())
      .then(json => {
        this.prods_list = json
        // Initializing Categories
        const prods = JSON.parse(JSON.stringify(this.prods_list));
        for(let index in prods) {
          this.cats.push(prods[index].category);
        }
        this.is_cat_active = this.cats[0] ? this.cats[0] : '';
        console.log(this.cats);    
      })
      .catch(error => console.warn("L'opération fetch sur les products n'a pas abouti : " + error));
  }
}
</script>



<style scoped>

.blank {
  height: 1px;
  width: 1px;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  width: 85vw;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.product {
  width: 400px;
  background: white;
  margin: 30px 30px;
}

.root-shop {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

</style>