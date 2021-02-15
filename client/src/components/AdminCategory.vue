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
        </button>
      </div>
      <div v-for="i in category" v-bind:key="i">
        <div v-if="i.level === 0">
          <div class="form-group">
            <h2 class="mt-4 text-left">{{ i.name }}</h2>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-info"
                @click="$router.push({ name: 'Adminaddsubcategory' })"
              >
                Додати підкатегорію
              </button>
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
      const res = await axios.get("/admin/api/categories");
      this.category = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>


<style>
@media (max-width: 767px) {
  a {
    margin-top: 10px;
  }

  .auth-button {
    margin-left: 15 !important;
    align-self: center;
  }
}

.auth-button {
  background-color: #4da9bdff;
  border: none;
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-size: 17px;
  font-weight: 400;
  height: 30px;
  width: 100px;
  text-align: center;
  line-height: 2em;
}

.auth-button:hover {
  background-color: rgb(46, 136, 156);
  color: white !important;
}
</style>