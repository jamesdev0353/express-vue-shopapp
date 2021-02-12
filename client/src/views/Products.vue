<template>
  <div class="products-page">
    <b-container>
      <b-row>
        <b-column class="col-md-3 col-sm-12"> </b-column>
        <b-column class="col-md-9 col-sm-12 products">
          <h3 class="text-center">Товари</h3>
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
          <FilterName />
          <FilterValue />
        </b-column>

        <b-column class="col-md-9 col-sm-12 products">
          <Product v-bind:id="$route.params.subcategory_id" />
        </b-column>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import FilterValue from "@/components/FilterValue.vue";
import FilterName from "@/components/FilterName.vue";
import Product from "@/components/Product.vue";

export default {
  components: {
    FilterName,
    FilterValue,
    Product,
  },
  data() {
    var w = window.innerWidth;
    var check = false;
    if (w > 768) {
      check = true;
    }
    return {
      display: check,
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
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

.products {
  margin: 0 auto;
  width: 80%;
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
}
</style>