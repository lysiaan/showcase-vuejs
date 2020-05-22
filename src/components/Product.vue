<template>
  <div class="product">
    <div class="prod-thumbnail">
      <img height=180 :src="image_path" alt="">
    </div>
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
          </div>
        </div>
      </div>
      <div class="prod-detail details-right">
        <div @click="$emit('add-prod-to-cart', prod)" class="prod-icon-cart">
          <img src="../assets/logo-add.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: ['prod'],
  computed: {
    image_path: function() {
      return "img/" + this.prod.image;
    }
  }
}
</script>



<style scoped>

.details-right {
  position: relative;
  height: 100%;
}

.prod-icon-cart {
  height: 90px;
  width: 90px;
  background: #4FAA5E;
  border-radius: 12px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.prod-icon-cart:hover {
  background: #9abe0a;
  background: #e9dd49;
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
  background: white;
}

.product {
  width: 330px;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  margin: 30px 30px;
  font-family: 'Segoe UI';
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

</style>