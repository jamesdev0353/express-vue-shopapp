<template>
  <div>
    <br />
    <div class="row">
      <div class="col-md-3 col-1"></div>
      <div class="col-md-6 col-10">
        <input
          class="form-control search-big"
          type="search"
          v-model="search"
          placeholder="Пошук..."
          autofocus
        />
      </div>
      <div class="col-md-3 col-1"></div>
    </div>
    <br />
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <td
            colspan="5"
            class="text-left"
            style="color: black; font-size: 20px"
          >
            Загальна сума
          </td>
          <td class="text-left" style="color: black; font-size: 20px">
            {{ subtotal }}
          </td>
        </tr>
        <th scope="col">Логін покупця</th>
        <th scope="col text-right">Назва товару</th>
        <th scope="col">Статус</th>
        <th scope="col text-right">Ціна</th>
        <th scope="col text-right">Кількість</th>
        <th scope="col text-right">Сума замовлення</th>
        <th scope="col text-right">Область</th>
        <th scope="col text-right">Місто</th>
        <th scope="col text-right">Поштове відділеня</th>
      </thead>
      <tbody>
        <tr v-for="(product, k) in filterByTerm" :key="k">
          <td>
            {{ product.email }}
          </td>

          <td>
            {{ product.name }}
          </td>

          <td>
            <div v-if="product.status == 1">
              <select aria-label="Default select example">
                <option selected>Замовлений</option>
                <option value="2">Завершений</option>
              </select>
            </div>
            <div v-else-if="product.status == 2">
              <select aria-label="Default select example">
                <option selected>Завершений</option>
                <option value="1">Замовлений</option>
              </select>
            </div>
          </td>

          <td>
            {{ product.price }}
          </td>
          <td>
            {{ product.count }}
          </td>
          <td>{{ product.count * product.price }}</td>
          <td>
            {{ product.region }}
          </td>
          <td>
            {{ product.city }}
          </td>

          <td>
            {{ product.delivery_address }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="clearfix"></div>
    <div class="col-md-12 mb-2"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product_subtotal: 0,
      products: [],
      search: "",
    };
  },

  async created() {
    try {
      const res = await axios.get("/api/admin/solditems");
      this.products = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    filterByTerm() {
      return this.products.filter((product) => {
        return (
          product.region.toLowerCase().includes(this.search.toLowerCase()) ||
          product.city.toLowerCase().includes(this.search.toLowerCase()) ||
          product.delivery_address
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          product.email.toLowerCase().includes(this.search.toLowerCase()) ||
          product.name.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },

    subtotal: function () {
      return this.products.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0);
    },
  },
  methods: {},
};
</script>

<style>
.search-big {
  width: 100% !important;
}
body {
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 300;
}
.main-title {
  font-weight: 500;
}
.btn-success,
.panel-success {
  background-color: #27c24c !important;
  border-color: #27c24c !important;
  color: #fff !important;
}
.submit_btn {
  min-width: 150px;
  max-width: 250px;
  font-size: 1.2rem;
  height: 60px;
  margin-top: 20px;
  padding: 20px;
}
.submit_btn i {
  padding-right: 10px;
}
</style>