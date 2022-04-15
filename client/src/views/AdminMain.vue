<template>
  <div
      class="container mb-4"
      style="margin-left: 150px auto; max-width: 1200px; min-height: 100%"
  >
    <div class="mx-auto col-4">
          <a
            type="button"
            class="sold-button px-auto"
            @click="$router.push({ name: 'Adminsolditems' })"
          >
            Повернутись до замовлень
          </a>
    </div>
    <section id="charting-demo">
      <h1>Статистика продаж</h1>
      <demo-chart :chart-data="datacollection1"></demo-chart>
    </section>

    <br />
    <br />
    <section id="charting-demo">
      <h1>Статистика категорій по продажам</h1>
      <pie-chart :chart-data="datacollection"></pie-chart>
    </section>

    <br />
    <br />
    <section id="charting-demo">
      <h1>Статистика категорій по кількості продаж</h1>
      <pie-chart :chart-data="datacollection2"></pie-chart>
    </section>

    <br />
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
      datacollection: null,
      datacollection1: null,
      datacollection2: null,
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
    if (localStorage.getItem("token") == null) {
      this.$router.back();
    }

    this.fillData();
    this.fillData1();
    this.fillData2();
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
body {
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: 300;
}
.main-title {
  font-weight: 500;
}

.sold-button {
  background-color: #00a0a0;
  color: white;
  border-radius: 50px;
  border: none;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  line-height: 2em;
  padding: 7px 20px;
  width: fit-content;
}

.sold-button:hover {
  background-color: #008585;
  color: white !important;
}

h1 {
  margin-top: 4vh;
  color: rgb(70, 70, 70);
  font-size: 32px;
}

</style>