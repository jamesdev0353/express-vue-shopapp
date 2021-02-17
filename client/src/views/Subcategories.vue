<template>
  <div class="catalog">
    <h2 class="mt-4 text-center">Оберіть підкатегорію</h2>
    <b-container class="mt-4">
      <b-row class="categories-b-row">
        <b-col
          class="my-3 col-lg-3 col-md-4 col-sm-6 col-12"
          v-for="subcategory of subcategories"
          :key="subcategory.id"
        >
          <router-link 
            :to="
              '/categories/' + $route.params.category_id + '/' + subcategory.id
            "
          >
            <div class="category">
              <img
                :src="subcategory.img || require('@/assets/laptop.jpg')"
                class="image category-img"
                alt="category"
              />
              <div
                class="category-name d-flex justify-content-center align-items-center"
              >
                <h5>{{ subcategory.name }}</h5>
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
      subcategories: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        "/api/categories/" + this.$route.params.category_id
      );
      this.subcategories = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>