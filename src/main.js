import Vue from 'vue'
import App from './App.vue'
import Shop from './views/Shop'
import NotFound from './views/NotFound'

Vue.config.productionTip = false;

const routes = {
  '/': App,
  '/shop': Shop,
};

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
