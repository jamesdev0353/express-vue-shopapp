<template>
  <div style="padding-bottom: 100px; margin-top: -40px">
    <div class="main-page">
      <img src="@/assets/background.png" class="image back" alt="background" />

      <div class="main-container">
        <router-link to="/categories" class="button">Каталог</router-link>
      </div>
    </div>
    <div class="search-block col-6 mt-5 mx-auto">
      <input
        class="form-control"
        placeholder="Пошук товарів..."
        v-model="search"
        autofocus
      />
    </div>
    <div class="container">
      <div class="row mt-4 row-products">
        <span v-for="product in filterList" :key="product" class="all-products">
          <column
            class="col-lg-3 col-md-4 col-sm-6 col-6 product"
            v-if="display"
          >
            <router-link class="text-dark text center" :to="'/products/' + product.id">
              <img :src="product.img" class="image img-prod" />
              <p class="mt-2 products">
                <b>{{ product.name }}</b>
              </p>
              <p class="mt-1 products">{{ product.price }} грн</p>
            </router-link>
          </column>
        </span>
      </div>
    </div>
    <div v-if="filterList.length == 0" class="text-center mt-5">
      За вашим запитом товарів не знайдено
    </div>
    <div v-if="display == false">
      <div class="category-1 text-center" v-for="item of items" :key="item">
        <router-link :to="'/categories/' + item.category_id">
          <h4
            class="text-dark title"
            v-if="item.products.length != 0"
            style="display: inline-block"
          >
            <b>{{ item.name }}</b>
          </h4>
        </router-link>
        <div class="container" v-if="item.products.length != 0">
          <div class="row mt-4 row-products">
            <column
              class="col-lg-3 col-md-4 col-sm-6 col-6 product"
              v-for="product of item.products"
              :key="product"
            >
              <router-link class="text-dark" :to="'/products/' + product.id">
                <img :src="product.img" class="image img-prod" />
                <p class="mt-2 products">
                  <b>{{ product.name }}</b>
                </p>
                <p class="mt-1 products">{{ product.price }} грн</p>
              </router-link>
            </column>
          </div>
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
      all_items: null,
      items: null,
      search: "",
      all_products: [],
      display: false,
    };
  },
  mounted() {
    axios.get("/api/products").then((response) => {
      this.items = response.data;
    });

    axios.get("/api/products/all").then((response) => {
      this.all_products = response.data;
    });
  },
  computed: {
    filterList() {
      return this.all_products.filter((post) => {
        console.log(this.search);
        if (this.search == "") {
          this.display = false;
        } else {
          this.display = true;
        }
        return (
          post.name.toLowerCase().includes(this.search.toLowerCase()) ||
          post.brand.toLowerCase().includes(this.search.toLowerCase()) ||
          post.description.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
}
</script>

<style>
body {
  min-height: 100vh;
}

.wrapper {
  min-height: 100vh;
}

.back {
  width: 100%;
  position: relative;
}

.img-prod {
  margin: auto;
  object-fit: cover;
  width: 100%;
}

.products {
  font-size: medium;
  margin: 0;
}

.all-products {
  display: contents;
}

.row-products {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.product {
  height: 100%;
  margin-top: 20px;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 280px;
}

.product:hover {
  background: white;
  filter: brightness(90%);
  transform: scale(1.05);
}

b-row {
  align-items: center;
}

.main-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main-container {
  position: absolute;
  width: 100%;
}

.button {
  background-color: #4da9bdff;
  border: none;
  margin-left: 20%;
  margin-top: 12%;
  width: 35vh;
  border-radius: 50px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
}

.button:hover {
  background-color: rgb(46, 136, 156);
  color: white !important;
  text-decoration: none;
}

.category-1,
.category-2 {
  margin: auto;
  margin-top: 20px;
  width: 70%;
  position: relative;
}

.title {
  text-align: center;
  position: relative;
  line-height: 60px;
}

.title::after {
  content: "";
  background: #4da9bdff;
  padding: 5px 80px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .button {
    margin: 0 auto;
    width: 25vh;
    padding: 7px 20px;
  }
  .main-container {
    position: relative;
  }
  p {
    font-size: small;
  }
}
</style>
