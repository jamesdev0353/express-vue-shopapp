<template>
  <div class="container-fluid" style="min-height: 100vh">
    <br />
    <section id="charting-demo">
      <h1>Статистика</h1>
      <demo-chart :chart-data="datacollection"></demo-chart>
    </section>
    <br />
    <div class="row">
      <div class="mx-auto col-4">
        <input
          class="form-control search-big"
          type="search"
          v-model="search"
          placeholder="Пошук..."
          autofocus
        />
      </div>
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
            {{ subtotal }} грн.
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
        <th scope="col text-right">Дата</th>
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
            <select
              class="form-control"
              v-if="product.status == 1"
              @change="onChangeStatus($event, product.id)"
              style="background: #ff9800; color: #fff"
            >
              <option value="1" selected>Замовлений</option>
              <option value="2">Завершений</option>
            </select>
            <select
              class="form-control"
              v-else-if="product.status == 2"
              @change="onChangeStatus($event, product.id)"
              style="background: #4caf50; color: #fff"
            >
              <option value="1">Замовлений</option>
              <option value="2" selected>Завершений</option>
            </select>
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

          <td>
            {{ product.date }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DemoChart from "../components/DemoChart.vue";
import axios from "axios";
export default {
  components: { DemoChart },
  data() {
    return {
      product_subtotal: 0,
      products: [],
      search: "",
      price: null,
      name: null,
      date: null,
      datacollection: null,
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

  mounted() {
    this.fillData();
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
  methods: {
    async onChangeStatus(event, order_id) {
      await axios.put("/api/admin/solditems/" + order_id, {
        status: event.target.value,
      });

      const res = await axios.get("/api/admin/solditems");
      this.products = res.data;
    },

    fillData() {
      axios
        .get("/api/admin/solditems")
        .then((response) => {
          let results = response.data;
          let priceresult = results.map((a) => a.price);
          let nameresult = results.map((a) => a.name);
          let dateresult = results.map((a) => a.date);
          this.price = priceresult;
          this.date = dateresult;
          this.name = nameresult;
          this.datacollection = {
            labels: this.date,
            datasets: [
              {
                label: "Ціна",
                backgroundColor: "#f87979",
                data: this.price,
              },
              {
                label: "Назва товару",
                backgroundColor: "#5bf8bf",
                data: this.name,
              },
            ],
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
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

option {
  color: #000 !important;
  background: #fff;
}
</style>