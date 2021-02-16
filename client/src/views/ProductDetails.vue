<template>
  <div class="details">
    <div class="container">
      <div class="row">
        <div class="col col-lg-8 col-12">
          <h4 class="my-4">{{ product.name }}</h4>
          <!-- <h5 class="text-left">{{ product.brand }}</h5> -->
          <img :src="product.img" class="image img-prod" />
        </div>
        <div class="col col-lg-4 col-12 mt-5">
          <h3 class="mt-5 ml-2">{{ product.price }} грн</h3>
          <button @click="addToCart()" class="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-bag-fill"
              viewBox="0 2 20 16"
            >
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Купити
          </button>
          <p>
            {{ product.description }}
          </p>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col col-lg-8 col-12">
          <h4 class="text-center my-4">Характеристики</h4>
          <table class="table">
            <tr v-for="spec of product.specs" :key="spec.id">
              <td class="key">{{ spec.name }}</td>
              <td class="value">{{ spec.value }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "/api/products/" + this.$route.params.product_id
      );
      this.product = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods:
  {
    addToCart() {
      axios.post("/api/add/" + this.$route.params.product_id)
      this.$router.push({ name: 'Cart' })
    }
  }
};
</script>

<style scoped>
.details {
  min-height: 100vh;
}

.img-prod {
  object-fit: contain;
  max-height: 60vh;
}

.button {
  margin: 0;
  margin-top: 10px;
  width: 20vh;
  padding: 10px 10px;
}

h3,
h4 {
  text-align: left;
}

p {
  margin: 0;
  margin-top: 20px;
  text-align: left;
}

.key {
  margin: 0;
  text-align: left;
}

.value {
  margin: 0;
  text-align: right;
}

@media (max-width: 767px) {
  .details {
    padding: 0 15px;
  }
}
</style>