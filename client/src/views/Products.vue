<template>
  <div class="products-page">
    <b-container>
      <div v-if="displayProducts == 1"></div>
      <div class="text-center empty" v-if="displayProducts == 2">
        <h2>В цій категорії товарів немає</h2>
        <img class="mt-2 empty-category mr-4" src="@/assets/empty-cart.svg" />
        <button @click="$router.go(-1)" class="mt-3 button start">
          Повернутися назад
        </button>
      </div>
      <b-row v-if="displayProducts == 3">
        <b-column class="col-md-3 col-sm-12"> </b-column>
        <b-column class="col-md-9 col-sm-12 products">
          <h3 class="text-center mb-3">Товари</h3>
          <button @click="showOthers()" class="filters-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-sliders"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
              />
            </svg>
            Фільтри
          </button>
        </b-column>
      </b-row>
      <b-row>
        <b-column v-if="display" class="col-md-3 col-sm-12 mt-2 filters">
          <div v-for="spec of specs" :key="spec.name">
            <h6>{{ spec.name }}</h6>

            <div v-for="value of spec.value" :key="value">
              <label>
                <input
                  type="checkbox"
                  @change="newFilter(spec.name, value, $event)"
                />
                {{ value }}
              </label>
            </div>
          </div>
        </b-column>

        <b-column class="col-md-9 col-sm-12 products">
          <div>
            <b-row class="row-products">
              <column
                class="col-lg-3 col-md-4 col-sm-6 col-6 product"
                v-for="product of products"
                :key="product.id"
              >
                <router-link class="text-dark" :to="'/products/' + product.id">
                  <img :src="product.img" class="image img-prod" />
                  <p class="mt-2">
                    <b>{{ product.name }}</b>
                  </p>
                  <p class="mt-1">{{ product.price }} грн</p>
                </router-link>
              </column>
            </b-row>
          </div>
        </b-column>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var w = window.innerWidth;
    var check = false;
    if (w > 768) {
      check = true;
    }
    return {
      display: check,
      specs: [],
      checked: {
        names: [],
        values: [],
      },
      products: [],
      displayProducts: 1,
    };
  },
  async created() {
    window.addEventListener("resize", this.myEventHandler);
    const res = await axios.get(
      "/api/specs/" + this.$route.params.subcategory_id
    );
    this.specs = res.data;
    try {
      const res = await axios.get(
        "/api/categories/" +
          this.$route.params.category_id +
          "/" +
          this.$route.params.subcategory_id
      );
      this.products = res.data;
      if (this.products.length != 0) {
        this.displayProducts = 3;
      } else {
        this.displayProducts = 2;
      }
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    showOthers: function () {
      this.display = !this.display;
    },
    myEventHandler(e) {
      if (e.type == "resize") {
        var w = window.innerWidth;
        if ((w > 768) & (this.display == false)) {
          this.showOthers();
        } else if ((w < 768) & (this.display == true)) {
          this.showOthers();
        }
      }
    },
    sortFunction(a, b) {
      if (a[0] === b[0]) {
        return 0;
      } else {
        return a[0] < b[0] ? -1 : 1;
      }
    },
    async newFilter(name, value, event) {
      if (event.target.checked) {
        this.checked.names.push(name);
        this.checked.values.push(value);
      } else {
        this.checked.names.splice(
          this.checked.names.findIndex((e) => e === name),
          1
        );
        this.checked.values.splice(
          this.checked.values.findIndex((e) => e === value),
          1
        );
      }

      let res = await axios.post("/api/products", {
        names: this.checked.names.join(),
        values: this.checked.values.join(),
      });

      console.log(res.json());
    },
  },
};
</script>

<style scoped>
.products-page {
  min-height: 100vh;
}

.filters {
  display: inline-block;
  text-align: start;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

p {
  font-size: medium;
  margin: 0;
}

label {
  cursor: pointer;
}

.products {
  margin: 0 auto;
  width: 80%;
}

.row-products {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.empty {
  margin-top: 20vh;
}

.product {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 280px;
}

.start {
  margin: auto;
}
.empty-category {
  max-height: 20vh;
}

.filters-button {
  margin-bottom: 10px;
  padding: 5px;
  border: 0;
  background-color: rgb(238, 238, 238);
  color: rgb(97, 97, 97);
  width: 100%;
}

@media (min-width: 767px) {
  .filters-button {
    display: none;
  }

  .filters {
    display: inline-block;
  }
}

@media (max-width: 767px) {
  .filters {
    margin-left: 30px;
  }

  .product {
    padding: 0;
  }

  .row-products {
    margin-left: -30px;
    margin-right: -30px;
  }
}
</style>