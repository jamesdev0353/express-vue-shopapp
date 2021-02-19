<template>
  <div class="details">
    <div class="container">
      <div class="row">
        <div class="col col-lg-8 col-12">
          <h4 class="mt-3 mb-5">{{ product.name }}</h4>
          <!-- <h5 class="text-left">{{ product.brand }}</h5> -->
          <img :src="product.img" class="image img-prod" />
        </div>
        <div class="col col-lg-4 col-12 mt-5">
          <h6 class="mt-5 ml-1" v-html="message"></h6>
          <h3 class="mt-1 ml-2">{{ product.price }} грн</h3>
          <button
            @click="addToCart()"
            class="button"
            :disabled="disabled"
          >
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
      message: '<span style="color: green">В наявності<span>',
      disabled: false,
      allow_buy: true
    };
  },

  async created() {
    try {
      const res = await axios.get(
        "/api/products/" + this.$route.params.product_id
      );
      this.product = res.data;

      if (this.product.count == 0) {
        this.disabled = true;
        this.allow_buy = false
        this.message = '<span style="color: red">Немає в наявності<span>';
      } else if (this.product.count < 10) {
        this.message =
          '<span style="color: rgb(226, 155, 0)">Закінчується<span>';
      } else if (localStorage.getItem("token") == null) {
        this.disabled = true;
        this.message =
          '<span style="color: #9C27B0">Увійдіть для покупки<span>';
      }
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addToCart() {
      if (this.allow_buy)
      {
      await axios.post(
        "/api/orders/" + this.$route.params.product_id,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      location.href = "/cart";
      //this.$router.push({ name: "Cart" });
      }
    },
  },
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

button:disabled {
  background-color: rgb(207, 207, 207);
  color: rgb(136, 136, 136);
  pointer-events: none;
}

.button {
  margin: 0;
  margin-top: 10px;
  width: 20vh;
  padding: 10px 10px;
}

h3,
h4,
h6 {
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