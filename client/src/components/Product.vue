<template>
  <div>
    <b-row v-for="product of products" :key="product.id">
      <column class="col-lg-3 col-md-4 col-sm-6 col-6 product">
      <router-link class="text-dark" to="/product-details">         
        <img :src="product.img" class="image img-prod" />
        <p><b>{{product.name}}</b></p>
        <p>{{product.price}} грн</p>
      </router-link>
      </column>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data() {
    return {
       products: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("api/products");
      this.products = res.data;
    }
    catch (e) {
      console.error(e);
    }
  },
};

</script>

<style scoped>
.product {
  width: 100%;
}

p {
  text-align: center;
  margin: 0;
}

</style>