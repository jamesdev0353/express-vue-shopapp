<template>
  <div class="products-page">
    <b-container>
      <b-row>
        <b-column class="col-md-3 col-sm-12"> </b-column>
        <b-column class="col-md-9 col-sm-12 products">
          <h3 class="text-center mt-4">Товари</h3>
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
          <div v-for="spec of specs"
          :key="spec.name">
            <h6>{{spec.name}}</h6>
        
        <div v-for="value of spec.value"
          :key="value">
            <input type="checkbox" @change="newFilter(spec.name, value, $event)"/>
            <span>{{value}}</span>
          </div>
        </b-column>

        <b-column class="col-md-9 col-sm-12 products">
          <Product v-bind:subcategory_id="$route.params.subcategory_id" />
        </b-column>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import axios from "axios";
export default {
  components: {
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
      specs: [],
      checked: [],
    };
  },
  async created() {
    window.addEventListener("resize", this.myEventHandler);
    const res = await axios.get(
      "/api/specs/" + this.$route.params.subcategory_id
    );
    this.specs = res.data;
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
    newFilter(name, value, event) {
      if (event.target.checked) {
        this.checked.push([name, value]);
      } else {
        for (let i = 0; i < this.checked.length; i++) {
          if (this.checked[i][0] == name && this.checked[i][1] == value) {
            this.checked.splice(i, 1);
          }
        }
      }
      this.checked.sort(this.sortFunction);
      console.log(this.checked);
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
input {
  margin-right: 1rem;
  margin-left: 1rem;
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