<template>
  <div class="container" style="min-height: 100vh">
    <br />
    <div class="row">
      <div class="col-10 mx-auto">
        <input
          class="form-control search"
          type="search"
          v-model="search"
          placeholder="Пошук..."
          autofocus
        />
        <router-link
          :to="'/admin/additem/' + this.$route.params.cat"
          class="ml-4 add-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-plus-circle-fill"
            viewBox="0 0 16 19"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
            />
          </svg>
          Додати товар
        </router-link>
        <button
            @click="deleteCategory($route.params.cat)"
            class="ml-4 add-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-plus-circle-fill"
              viewBox="0 0 16 19"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
              />
            </svg>
            Видалити підкатегорію
         </button>
      </div>
    </div>
    <br />
    <br />

    <table class="table table-striped text-left">
      <thead>
        <th scope="col">id</th>
        <th scope="col">Назва</th>
        <th scope="col">Бренд</th>
        <th scope="col">Опис</th>
        <th scope="col text-right">Зображення</th>
        <th scope="col text-right">Ціна</th>
        <th scope="col text-right">Кількість</th>
        <th scope="col"></th>
        <th scope="col"></th>
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
            <a :href="'/admin/specs/' + product.id" class="btn btn-light">
              Характеристики
              <i class="far fa-properties"></i>
            </a>
          </td>

          <td>
            <a :href="'/admin/edit/' + product.id" class="btn btn-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                />
              </svg>
            </a>
          </td>

          <td>
            <a
              class="btn btn-danger"
              :href="'/api/admin/delete/' + product.id"
              onclick="return confirm('Ви дійсно хочете видалити даний товар?');"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
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
    async deleteCategory(cat_id) {
        await axios.delete("/api/categories/" + cat_id);
        this.$router.push("/admin/categories");
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
.search {
  width: 60% !important;
  display: unset;
}
.search:focus {
  border: 1px solid rgba(151, 151, 151, 0.678);
}
.add-button {
  background-color: #4da9bdff;
  color: white;
  border-radius: 50px;
  border: none;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
  line-height: 2em;
  padding: 10px 20px;
  width: fit-content;
}

.add-button:hover {
  background-color: rgb(46, 136, 156);
  color: white !important;
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