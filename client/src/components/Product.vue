<template>
  <div>
    <b-row>
      <column class="col-lg-3 col-md-4 col-sm-6 col-6 product" v-for="product of products" :key="product.id">
        <router-link class="text-dark" :to="'/products/' + product.id">
          <img :src="product.img" class="image img-prod" />
          <p>
            <b>{{ product.name }}</b>
          </p>
          <p>{{ product.price }} грн</p>
        </router-link>
      </column>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    subcategory_id: Number,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "/api/categories/" +
          this.$route.params.category_id +
          "/" +
          this.$route.params.subcategory_id
      );
      this.products = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.product {
  width: 100%;
}

.img-prod {
  width: auto;
  height: 190px;
  max-width: 170px;
}
p {
  text-align: center;
  margin: 0;
}

@media (max-width: 768px) {
  .img-prod {
  height: 170px;
  max-width: 140px;
}
}
</style>