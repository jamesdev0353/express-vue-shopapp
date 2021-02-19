<template>
  <div class="home">
    <h2>Статистика продаж по категріям</h2>
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <h2>Статистика продаж по дням</h2>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions1"
      :series="series1"
    ></apexchart>
  </div>
</template>

<script>
//import PieChart from "../components/PieChart.vue";

export default {
  data: () => {
    return {
      series1: [
        {
          name: "Техніка",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15],
        },
        {
          name: "Одяг",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32],
        },
      ],
      chartOptions1: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [5, 7, 5],
          curve: "straight",
          dashArray: [0, 8, 5],
        },
        title: {
          text: "",
          align: "left",
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6,
          },
        },
        xaxis: {
          categories: [
            "01 Лют",
            "02 Лют",
            "03 Лют",
            "04 Лют",
            "05 Лют",
            "06 Лют",
            "07 Лют",
            "08 Лют",
            "09 Лют",
            "10 Лют",
            "11 Лют",
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                },
              },
            },
          ],
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
      series: [12000, 2900],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Техніка", "Одяг"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      this.$router.back();
    }
  },
  components: {
    //    PieChart,
  },
};
</script>