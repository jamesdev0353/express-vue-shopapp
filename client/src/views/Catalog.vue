<template>
  <div class="catalog">
    <h2 class="mt-4 text-center">Каталог</h2>
    <b-container class="mt-4">
      <b-row class="categories-b-row">
        <b-col
          class="my-3 col-lg-3 col-md-4 col-sm-6 col-12"
          v-for="category of categories"
          :key="category.id"
        >
          <router-link :to="'/categories/' + category.id">
            <div class="category">
              <img
                :src="category.img"
                class="image category-img"
                alt="category"
              />
              <div
                class="category-name d-flex justify-content-center align-items-center"
              >
                <h5>{{ category.name }}</h5>
              </div>
            </div>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("/api/categories");
      this.categories = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
.catalog {
  min-height: 100vh;
}
.category-img {
  height: 160px;
  object-fit: cover;
  position: relative;
  border-radius: 50px;
  margin-bottom: -120px;
  filter: brightness(40%);
}

.category {
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
  transition: transform .5s, filter 1.5s ease-in-out;
  filter: grayscale(0%);
}

.category:hover {
  filter: grayscale(80%);
  transform: scale(1.1);
}

.category-name {
  color: white;
  z-index: 1000;
  min-height: 80px;
}

.category-name h5 {
  margin: 0;
}

a:hover {
  text-decoration: none;
}

.container {
  position: relative;
  text-align: center;
}

@media (max-width: 768px) {
  .category {
    margin-bottom: 110px;
  }

  .category-img {
    height: 260px;
    margin-bottom: -170px;
  }

  .category-name h5 {
    font-size: 1.5rem;
  }
}
</style>