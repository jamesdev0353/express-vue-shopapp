<template>
  <div class="category">
    <h2 class="mt-4 text-center">Категорії</h2>
    <div class="container" style="margin-left: 150px auto">
      <div class="d-flex">
        <button
          type="button"
          class="btn btn-info mr-2"
          @click="$router.push({ name: 'Adminaddcategory' })"
        >
          Додати категорію
          <!--  <i class="far fa-plus-circle"></i> -->
        </button>
      </div>
      <div v-for="i in category" v-bind:key="i">
        <div v-if="i.level === 0">
          <div class="form-group">
            <h2 class="mt-4 text-left">{{ i.name }}</h2>
            <div class="d-flex justify-content-end">
              <a :href="'/admin/addsubcategory/' + i.id">
                <button type="button" class="btn btn-info">
                  Додати підкатегорію
                  <!-- <i class="far fa-plus-circle"></i> -->
                </button>
              </a>
            </div>
          </div>
        </div>
        <div v-for="j in category" v-bind:key="j.id">
          <div v-if="i.id === j.parent_id && j.level === 1">
            <div class="d-flex justify-content-center">
              <router-link :to="'/admin/categories/' + j.id" class="text-blue">
                <h5 class="mt-4 text-left">
                  {{ j.name }}
                </h5>
              </router-link>
            </div>
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
      category: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("/api/admin/categories");
      this.category = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>