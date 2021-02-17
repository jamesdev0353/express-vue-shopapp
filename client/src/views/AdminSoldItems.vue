<template>
  <div>
    <br />
    <input type="form-control" v-model="search" placeholder="Пошук" autofocus />
    <br />
    <br />
    <table>
      <thead>
        <th scope="col">Логін покупця</th>
        <th scope="col text-right">Назва товару</th>
        <th scope="col">Статус</th>
        <th scope="col text-right">Ціна</th>
        <th scope="col text-right">Кількість</th>
        <th scope="col text-right">Сума замовлення</th>
      </thead>
      <tbody>
        <tr v-for="(product, k) in filterByTerm" :key="k">
          <td class="form-control">
            {{ product.username }}
          </td>

          <td>
            <input
              readonly
              class="form-control"
              type="text"
              v-model="product.name"
            />
          </td>

          <td>
            <div v-if="product.status === 'Замовлений'">
              <select class="form-control" aria-label="Default select example">
                <option selected>{{ product.status }}</option>
                <option value="1">В очікуванні</option>
                <option value="3">Завершений</option>
                <option value="4">Закритий</option>
              </select>
            </div>
            <div v-else-if="product.status === 'В очікуванні'">
              <select class="form-control" aria-label="Default select example">
                <option selected>{{ product.status }}</option>
                <option value="1">Замовлений</option>
                <option value="3">Завершений</option>
                <option value="4">Закритий</option>
              </select>
            </div>
            <div v-else-if="product.status === 'Завершений'">
              <select class="form-control" aria-label="Default select example">
                <option selected>{{ product.status }}</option>
                <option value="1">В очікуванні</option>
                <option value="3">Замовлений</option>
                <option value="4">Закритий</option>
              </select>
            </div>
            <div v-else-if="product.status === 'Закритий'">
              <select class="form-control" aria-label="Default select example">
                <option selected>{{ product.status }}</option>
                <option value="1">В очікуванні</option>
                <option value="3">Завершений</option>
                <option value="4">Замовлений</option>
              </select>
            </div>
          </td>

          <td>
            <input
              readonly
              class="form-control"
              type="text"
              v-model="product.price"
            />
          </td>
          <td>
            <input
              readonly
              class="form-control"
              type="text"
              v-model="product.count"
            />
          </td>
          <td class="form-control">{{ product.count * product.price }}</td>
        </tr>
      </tbody>
    </table>
    <div class="clearfix"></div>
    <div class="col-md-12 mb-2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          name: "Пральна машина",
          status: "Замовлений",
          username: "Fobos",
          price: 15,
          count: 10,
          total: 0,
        },
        {
          name: "Холодильник",
          status: "Замовлений",
          username: "Grant",
          price: 13,
          count: 2,
          total: 0,
        },
        {
          name: "Тостер",
          status: "Завершений",
          username: "Brant",
          price: 54,
          count: 43,
          total: 0,
        },
        {
          name: "Планшет",
          status: "Закритий",
          username: "Mrant",
          price: 10,
          count: 12,
          total: 0,
        },
      ],
      search: "",
    };
  },
  computed: {
    filterByTerm() {
      return this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(this.search.toLowerCase()) ||
          product.username.toLowerCase().includes(this.search.toLowerCase()) ||
          product.price.toLowerCase().includes(this.search.toLowerCase()) ||
          product.count.toLowerCase().includes(this.search.toLowerCase()) ||
          product.total.toLowerCase().includes(this.search.toLowerCase()) ||
          product.status.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    calculateLineTotal(product) {
      var total_p = parseFloat(product.price) * parseFloat(product.count);
      if (!isNaN(total_p)) {
        product.total = total_p.toFixed(2);
      }
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