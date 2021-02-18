<template>
  <div class="cart">
    <div class="container">
      <div v-if="displayCart == 1"></div>
      <div class="text-center empty" v-if="displayCart == 2">
        <h2>Ваша корзина порожня</h2>
        <img class="mt-2 empty-cart mr-4" src="@/assets/empty-cart.svg" />
        <router-link to="/categories" class="mt-3 button start"
          >Почати покупки</router-link
        >
      </div>
      <div class="row mt-3" v-if="displayCart == 3">
        <div class="col col-lg-7 col-12">
          <h3 class="my-4">Замовлення</h3>
          <div
            class="card product-card mt-3 mb-5"
            v-for="item of cartItems"
            :key="item.id"
          >
            <div class="row">
              <div class="col my-auto col-10">
                <div class="row">
                  <div class="col my-auto col-lg-4 col-7">
                    <img class="image img-prod" :src="item.img" alt="product" />
                  </div>
                  <div class="col my-auto col-lg-3 col-5">
                    <router-link
                      :to="'products/' + item.product_id"
                      class="text-dark"
                    >
                      <p class="name">{{ item.name }}</p>
                    </router-link>
                  </div>
                  <div class="col my-auto col-lg-3 col-7">
                    <p class="parameter">Кількість</p>
                    <b-input @change="changeCount($event, item.id)"
                      class="count"
                      type="number"
                      :value="item.count"
                      min="1"
                    />
                  </div>
                  <div class="col my-auto col-lg-2 col-5">
                    <p class="parameter">Ціна</p>
                    <p class="price">{{ item.price }} грн</p>
                  </div>
                </div>
              </div>
              <div class="col my-auto col-lg-2 col-1">
                <a href="" @click="deleteFromCart(item.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="text-muted"
                    class="bi bi-x-circle delete"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col">
              <h5 class="text-left ml-5">Разом</h5>
            </div>
            <div class="col">
              <h4 class="text-right mr-5">{{ fullPrice }} грн</h4>
            </div>
          </div>
        </div>
        <div class="col col-lg-5 col-12">
          <h3 class="my-4">Оформлення</h3>
          <form class="ordering" @submit.prevent="addOrder()">
            <div class="row">
              <div class="col-12" v-for="user of userInfo" :key="user.id">
                <p class="section my-2">Користувач</p>
                <p class="user-info">
                  Ім'я та прізвище: {{ user.name }} {{ user.surname }}
                </p>
                <p class="user-info">Електронна пошта: {{ user.email }}</p>
                <p class="user-info">Номер телефону: {{ user.phone }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Оплата</p>
                <b-form-select
                  name="type"
                  class="form-select-md"
                  v-model="key_payment"
                >
                  <b-form-select-option value="1"
                    >Картою онлайн</b-form-select-option
                  >
                  <b-form-select-option value="2"
                    >При отриманні товару</b-form-select-option
                  >
                </b-form-select>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Доставка</p>
                <b-form-select
                  data-live-search="true"
                  name="type"
                  class="form-select-md"
                  @change="onchangeDelivery()"
                  v-model="key_delivery"
                >
                  <b-form-select-option value="1">
                    Самовивіз Нова Пошта
                  </b-form-select-option>
                  <b-form-select-option value="2">
                    Кур'єр Нова Пошта
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Область</p>
                <b-form-select
                  name="type"
                  class="form-select-md"
                  @change="onchangeArea()"
                  v-model="area_ref"
                >
                  <b-form-select-option
                    v-for="reg of regions.data"
                    :key="reg.Description"
                    :value="reg.Ref"
                  >
                    {{ reg.Description }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <p class="section my-2">Населений пункт</p>
                <b-form-select required
                  name="type"
                  class="form-select-md"
                  @change="onchangeCity()"
                  v-model="city_ref"
                >
                  <b-form-select-option
                    v-for="city of cities.data"
                    :key="city.Ref"
                    :value="city.Ref"
                  >
                    {{ city.Description }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>
            <div class="row" v-if="display_warehouse">
              <div class="col-12">
                <p class="section my-2">Відділення</p>
                <b-form-select required
                  name="type"
                  class="form-select-md"
                  v-model="warehouse_ref"
                >
                  <b-form-select-option
                    v-for="warehouse of warehouses.data"
                    :key="warehouse.Description"
                    :value="warehouse.Ref"
                  >
                    {{ warehouse.Description }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>

            <div class="row" v-if="display_address">
              <div class="col-12">
                <p class="section my-2">Вулиця, будинок, квартира</p>
                <input class="form-control" required v-model="address" />
              </div>
            </div>

            <div class="row mt-4">
              <button class="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-wallet-fill mr-1"
                  viewBox="0 2 18 16"
                >
                  <path
                    d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"
                  />
                  <path
                    d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"
                  />
                </svg>
                Оформити замовлення
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      key_delivery: 1,
      key_payment: 1,
      area_ref: "71508131-9b87-11de-822f-000c2965ae0e",
      city_ref: "33ab7ee7-9e33-11e9-898c-005056b24375",
      warehouse_ref: "6eebcc98-b1d4-11e9-8c22-005056b24375",
      cities: [],
      regions: [],
      warehouses: [],
      cartItems: [],
      fullPrice: 0,
      display_warehouse: true,
      display_address: false,
      displayCart: 1,
      userInfo: null,
      area: null,
      city: null,
      warehouse: null,
      address: null,
      currentValue: 0,
      countDict: {},
      apiKey: "1248264db38907916e355ff139ab2def",
      url: "https://api.novaposhta.ua/v2.0/json/",
    };
  },
  methods: {
    onchangeArea: function () {
      axios
        .post(this.url, {
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: {
            AreaRef: this.area_ref,
          },
          apiKey: this.apiKey,
        })
        .then((response) => {
          this.cities = response.data;
        });
      this.warehouse_ref = null;
      this.onchangeWarehouse();
    },
    onchangeDelivery: function () {
      if (this.key_delivery == 1) {
        this.display_address = false;
        this.display_warehouse = true;
      } else if (this.key_delivery == 2) {
        this.display_warehouse = false;
        this.display_address = true;
      }
    },
    onchangeCity: function () {
      axios
        .post(this.url, {
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: this.city_ref,
          },
          apiKey: this.apiKey,
        })
        .then((response) => {
          this.warehouses = response.data;
        });
    },

    deleteFromCart(order_id) {
      axios.delete("/api/orders/" + order_id);
      axios
        .get("/api/orders/0", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.cartItems = response.data;
          if (this.cartItems.length != 0) {
            this.displayCart = 3;
          } else {
            this.displayCart = 2;
          }
          for (var i = 0; i < this.cartItems.length; i++) {
            this.fullPrice += this.cartItems[i].price * this.cartItems[i].count;
          }
          console.log(this.cartItems);
        });
    },
    async addOrder() {
      await axios
        .post(this.url, {
          apiKey: this.apiKey,
          modelName: "Address",
          calledMethod: "getAreas",
          methodProperties: {
            Ref: this.area_ref,
          },
        })
        .then((response) => {
          this.area = response.data.data[0].Description;
        });
      await axios
        .post(this.url, {
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: {
            Ref: this.city_ref,
          },
          apiKey: this.apiKey,
        })
        .then((response) => {
          this.city = response.data.data[0].Description;
        });
      if (this.key_delivery == 1) {
        this.address = null;
        await axios
          .post(this.url, {
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
              Ref: this.warehouse_ref,
            },
            apiKey: this.apiKey,
          })
          .then((response) => {
            this.warehouse = response.data.data[0].Description;
          });
      }

      await axios.post(
        "/api/orders",
        {
          payment_method: this.key_payment,
          delivery_method: this.key_delivery,
          region: this.area,
          city: this.city,
          delivery_address: this.warehouse || this.address,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      this.$router.push({ name: "Success" });
    },
    changeCount(event, id) {
      this.countDict[id] = event;
      this.fullPrice = 0
      for (var i = 0; i < this.cartItems.length; i++) {
        if (!(this.cartItems[i].id in this.countDict))
        {
          this.countDict[this.cartItems[i].id] = this.cartItems[i].count;
        }
        for(var key in this.countDict)
        {
          if (this.cartItems[i].id == key)
          {
            this.fullPrice += this.cartItems[i].price * this.countDict[key];
          }
        }
      }
    }
  },
  mounted() {
    if (localStorage.getItem("token") == null) {
      this.$router.push({ name: "Main" });
    }
    axios
      .post(this.url, {
        apiKey: this.apiKey,
        modelName: "Address",
        calledMethod: "getAreas",
        methodProperties: {
          CityRef: this.city_ref,
        },
      })
      .then((response) => {
        this.regions = response.data;
      });
    axios
      .post(this.url, {
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: this.area_ref,
        },
        apiKey: this.apiKey,
      })
      .then((response) => {
        this.cities = response.data;
      });
    axios
      .post(this.url, {
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: this.city_ref,
        },
        apiKey: this.apiKey,
      })
      .then((response) => {
        this.warehouses = response.data;
      });
    axios
      .get("/api/orders/0", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.cartItems = response.data;
        if (this.cartItems.length != 0) {
          this.displayCart = 3;
        } else {
          this.displayCart = 2;
        }
        for (var i = 0; i < this.cartItems.length; i++) {
          this.fullPrice += this.cartItems[i].price * this.cartItems[i].count;
        }
        console.log(this.cartItems);
      });
    axios
      .get("/api/users", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.userInfo = response.data;
      });
  },
};
</script>

<style scoped>
.img-prod {
  height: 120px;
  width: auto;
}
.button {
  width: 70%;
  margin: auto;
}

.start {
  width: 30%;
}
.cart {
  min-height: 100vh;
}

.empty {
  margin-top: 20vh;
}
.empty-cart {
  max-height: 20vh;
}

.ordering {
  padding: 30px;
  border-radius: 10px;
  border: 1px solid rgba(206, 206, 206, 0.678);
  margin-inline: 10px;
}

p {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
}

.user-info {
  margin: 0;
  text-align: left;
  font-size: 13px;
  margin-left: 10px;
}

.section {
  text-align: left;
  margin-left: 10px;
}
.count {
  height: 20px;
  width: 60px;
  margin: auto;
}
p {
  margin: 0;
}
.name {
  text-align: left;
  font-size: 14px;
}

.card {
  border-radius: 10px;
}

.parameter {
  font-size: 9px;
}

.product-card {
  margin-inline: 10px;
  padding: 10px 0px;
  box-shadow: 5px 5px 10px 0px #e0e0e0;
}

@media (max-width: 768px) {
  .name {
    font-size: 14px;
  }
  .price {
    font-size: 15px;
  }

  .delete {
    margin: 0;
  }
}
</style>