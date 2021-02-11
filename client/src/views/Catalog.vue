<template>
  <div class="catalog">
    <h2 class="mt-4 text-center">Каталог</h2>
    <b-container class="mt-4">
      <b-row class="ml-0 categories-b-row">
        <b-col class="my-3 col-lg-3 col-md-4 col-sm-6 col-12"  v-for="category of categories" :key="category.id" >
          <router-link to="/products">
            <div class="category">
              <img
                :src="category.img"
                class="image category-img"
                alt="category"
              />
              <div class="category-name">
                <h5>{{category.name}}</h5>
              </div>
            </div>
          </router-link>
        </b-col>
      </b-row>
      <b-row> </b-row>
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
      const res = await axios.get("api/categories");
      this.categories = res.data;
    }
    catch (e) {
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
  width: 40vh;
  height: 25vh;
  object-fit: cover;
  position: relative;
  border-radius: 50px;
  filter: brightness(20%);
}

.category {
  display: flex;
  flex-direction: column;
}

.category-name {
  width: 50%;
  text-align: left;
  position: absolute;
  color: white;
  margin: 15%;
}

.container {
  position: relative;
  text-align: center;
  padding: 0px;
}

@media (max-width: 768px) {
  .category-img {
      width: 70vh;
      height: 40vh;
  }

  .category-name {
  width: 50%;
  font-size: 10px;
  text-align: left;
  margin: 10%;
}
}
</style>