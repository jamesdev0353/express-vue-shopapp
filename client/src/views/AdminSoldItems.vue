<template>
  <div class="container-fluid" style="min-height: 100vh">
    <br />
    <section id="charting-demo">
      <h1>Статистика продаж</h1>
      <demo-chart :chart-data="datacollection1"></demo-chart>
    </section>

    <section id="charting-demo">
      <h1>Статистика категорій по продажам</h1>
      <pie-chart :chart-data="datacollection"></pie-chart>
    </section>

    <section id="charting-demo">
      <h1>Статистика категорій по кількості продаж</h1>
      <pie-chart :chart-data="datacollection2"></pie-chart>
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
import axios from "axios";
import PieChart from "../components/PieChart.vue";
import DemoChart from "../components/DemoChart.vue";

export default {
  components: { DemoChart, PieChart },
  data() {
    return {
      product_subtotal: 0,
      products: [],
      search: "",
      income: null,
      count: null,
      date: null,
      datacollection: null,
      incomeCat: null,
      datacollection1: null,
      datacollection2: null,
      orderCout: null,
      name1: null,
      orderCount: null,
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
    this.fillData1();
    this.fillData2();
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
        .get("/api/admin/ordersChart/categories")
        .then((response) => {
          let results = response.data;
          let incomeresult = results.map((a) => a.income);
          let nameresult = results.map((a) => a.name);
          this.income = incomeresult;
          this.name = nameresult;
          this.datacollection = {
            labels: this.name,
            datasets: [
              {
                label: "Дохід",
                data: this.income,
                //backgroundColor: Array.from({ length: len }, () =>
                //this.randomCol()),

                backgroundColor: [
                  "#f9ca24",
                  "#f0932b",
                  "#eb4d4b",
                  "#6ab04c",
                  "#7ed6df",
                  "#e056fd",
                  "#686de0",
                  "#30336b",
                  "#95afc0",
                  "#22a6b3",
                  "#be2edd",
                  "#4834d4",
                  "#130f40",
                  "#535c68",
                ],
              },
            ],
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    randomCol() {
      let r = Math.floor(Math.random() * 200);
      let g = Math.floor(Math.random() * 200);
      let b = Math.floor(Math.random() * 200);
      var color = "rgb(" + r + ", " + g + ", " + b + ")";
      return color;
    },

    fillData1() {
      axios
        .get("/api/admin/ordersChart")
        .then((response) => {
          let results = response.data;
          let incomeresult = results.map((a) => a.income);
          let countresult = results.map((a) => a.orderCount);
          let dateresult = results.map((a) => a.date);
          this.income = incomeresult;
          this.date = dateresult;
          this.count = countresult;
          this.datacollection1 = {
            labels: this.date,
            datasets: [
              {
                label: "Дохід",
                backgroundColor: "#f87979",
                data: this.income,
              },
              {
                label: "Кількість товарів",
                backgroundColor: "#5bf8bf",
                data: this.count,
              },
            ],
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fillData2() {
      axios
        .get("/api/admin/ordersChart/categories")
        .then((response) => {
          let results = response.data;
          let countresult = results.map((a) => a.orderCount);
          let dateresult = results.map((a) => a.name);
          this.name = dateresult;
          this.orderCount = countresult;
          this.datacollection2 = {
            labels: this.name,
            datasets: [
              {
                label: "Кількість",
                backgroundColor: [
                  "#f9ca24",
                  "#f0932b",
                  "#eb4d4b",
                  "#6ab04c",
                  "#7ed6df",
                  "#e056fd",
                  "#686de0",
                  "#30336b",
                  "#95afc0",
                  "#22a6b3",
                  "#be2edd",
                  "#4834d4",
                  "#130f40",
                  "#535c68",
                ],
                data: this.orderCount,
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