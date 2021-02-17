<template>
  <div style="min-height: 100vh">
    <br />
    <div class="form-group">
      <div class="d-flex justify-content-end">
        <input
          type="form-control"
          v-model="search"
          placeholder="Пошук"
          height="35"
          width="200"
          autofocus
        />

        <a
          :href="'/admin/additem/' + this.$route.params.cat"
          class="btn btn-info"
        >
          Додати товар
          <i class="far fa-trash-alt"></i>
        </a>
      </div>
    </div>
    <br />
    <br />
    <table class="table table-striped">
      <thead>
        <th scope="col">id</th>
        <th scope="col">Назва</th>
        <th scope="col">Бренд</th>
        <th scope="col">Опис</th>
        <th scope="col text-right">Зображення</th>
        <th scope="col text-right">Ціна</th>
        <th scope="col text-right">Кількість</th>
        <th scope="col"></th>
      </thead>
      <tbody>
        <tr v-for="product in filterList" :key="product.id">
          <td>
            {{ product.id }}
          </td>

          <td>
            {{ product.name }}
          </td>

          <td>
            {{ product.brand }}
          </td>

          <td>
            {{ product.description }}
          </td>

          <td>
            <img
              :src="product.img"
              class="image product-img"
              alt="img"
              width="75"
              height="100"
              style="object-fit: contain"
            />
          </td>

          <td>
            {{ product.price }}
          </td>

          <td>
            {{ product.count }}
          </td>

          <td>
            <a :href="'/admin/edit/' + product.id" class="btn btn-info">
              Редагувати
              <i class="far fa-edit"></i>
            </a>
          </td>
          <td>
            <a
              :href="'/api/admin/delete/' + product.id"
              onclick="return confirm('Ви дійсно хочете видалити даний товар?');"
              class="btn btn-danger"
            >
              Видалити
              <i class="far fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-right">Загальна сума</td>
          <td class="text-right">{{ product_subtotal }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- <div class="clearfix"></div> -->
    <!-- <div class="col-md-12 mb-2">
      <button type="button" class="btn btn-info" @click="addNewRow">
        Додати
        <i class="fas fa-plus-circle"></i>
      </button>
    </div>

    <div class="col-md-12 mb-2">
      <button
        type="button"
        class="btn btn-info"
        @click="$router.push({ name: 'Adminadditem' })"
      >
        Додати товар
        <i class="fas fa-plus-circle"></i>
      </button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      search: "",
    };
  },

  async created() {
    try {
      const res = await axios.get(
        "/api/admin/categories/" + this.$route.params.cat
      );
      this.products = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    filterList() {
      return this.products.filter((post) => {
        return (
          post.name.toLowerCase().includes(this.search.toLowerCase()) ||
          post.brand.toLowerCase().includes(this.search.toLowerCase()) ||
          post.description.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },

  methods: {
    addNewRow() {
      this.products.push({
        name: "",
        brand: "",
        description: "",
        price: "",
        warranty: "",
        weight: "",
        count: "",
        made_in: "",
        total: 0,
      });
    },

    deleteRow(index, product) {
      var indx = this.products.indexOf(product);
      console.log(indx, index);
      if (indx > -1) {
        this.products.splice(indx, 1);
      }
      this.calculateTotal();
    },
    calculateLineTotal(product) {
      var total_p = parseFloat(product.price) * parseFloat(product.count);
      if (!isNaN(total_p)) {
        product.total = total_p.toFixed(2);
      }
      this.calculateTotal();
    },
    calculateTotal() {
      var subtotal;
      subtotal = this.products.reduce(function (sum, product) {
        var lineTotal = parseFloat(product.total);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
      }, 0);

      this.product_subtotal = subtotal.toFixed(2);
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
.trashIconContainer {
  vertical-align: middle !important;
  padding-top: 10px;
  text-align: center;
}

.trashIconContainer i {
  color: #e74c3c;
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