import Vue from 'vue'
import App from './App.vue'
import Shop from './views/Shop'
import NotFound from './views/NotFound'

Vue.config.productionTip = false;

const routes = {
  '/': App,
  '/shop': Shop,
};


// Filtre global de formattage appliqué aux v-bind ou aux mustaches {{ }}
Vue.filter('formatPriceGlobal', function(number) {
  let returned = number.toString(); 
  const splitted = returned.split('.');
  if (splitted[1]) {
    splitted[1].length > 0 && splitted[1].length < 2 ?
      returned = returned + '0' : '';
  } else {
    returned = splitted[0] + '.00';
  }
  return returned;
});


new Vue({


  data: {
    currentRoute: window.location.pathname,
  },

  computed: {
    currentComponent() {
      return routes[this.currentRoute] || NotFound;
    }
  },

  render: function(h) {
    return h(this.currentComponent); 
  },
}).$mount('#app')
