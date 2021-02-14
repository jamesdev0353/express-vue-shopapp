<template>
  <div class="cart">
    <div class="container">
      <div class="row mt-3">
        <div class="col col-lg-7 col-12">
          <h3 class="my-4">Замовлення</h3>
          <ProductCart />
          <ProductCart />
          <hr />
          <div class="row">
            <div class="col">
              <h5 class="text-left ml-5">Разом</h5>
            </div>
            <div class="col">
              <h4 class="text-right mr-5">400 грн</h4>
            </div>
          </div>
        </div>
        <div class="col col-lg-5 col-12">
          <h3 class="my-4">Оформлення</h3>
          <form class="ordering">
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Користувач</p>
                    <p class="user-info">Ім'я та прізвище: Петро Смішнявий</p>
                    <p class="user-info">Електронна пошта: petroroflan@gmail.com</p>
                    <p class="user-info">Номер телефону: +380123456789</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Оплата</p>
                <b-form-select name="type" class="form-select-md">
                  <b-form-select-option selected="selected"
                    >Картою онлайн</b-form-select-option
                  >
                  <b-form-select-option
                    >При отриманні товару</b-form-select-option
                  >
                </b-form-select>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="section my-2">Доставка</p>
                <b-form-select data-live-search="true"
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
                <b-form-select
                  name="type"
                  class="form-select-md"
                  @change="onchangeCity()"
                  v-model="city_ref"
                >
                  <b-form-select-option
                    v-for="city of cities.data"
                    :key="city.Description"
                    :value="city.Ref"
                  >
                    {{ city.Description }}
                  </b-form-select-option>
                </b-form-select>
              </div>
            </div>
            <div class="row" v-if="display_warehouse">
              <div class="col-12">
                <p class="section my-2" >Відділення</p>
                <b-form-select
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
                <p class="section my-2" >Вулиця, будинок, квартира</p>
                <input class="form-control"/>
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
import ProductCart from "@/components/ProductCart.vue";
import axios from "axios";
export default {
  components: {
    ProductCart,
  },
  data() {
    return {
      key_delivery: 1,
      area_ref: "71508131-9b87-11de-822f-000c2965ae0e",
      city_ref: "33ab7ee7-9e33-11e9-898c-005056b24375",
      warehouse_ref: "6eebcc98-b1d4-11e9-8c22-005056b24375",
      cities: [],
      regions: [],
      warehouses: [],
      display_warehouse: true,
      display_address: false,
      apiKey: "1248264db38907916e355ff139ab2def",
      url: "https://api.novaposhta.ua/v2.0/json/"
    };
  },
  methods: {
    onchangeArea: function() {
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
        this.warehouse_ref = null
        this.onchangeWarehouse()
    },
    onchangeDelivery: function() {
      if (this.key_delivery == 1)
      {
        this.display_address = false;
        this.display_warehouse = true;
      }
      else if (this.key_delivery == 2)
      {
        this.display_warehouse = false;
        this.display_address = true;
      }
    },
    onchangeCity: function() {
      axios
        .post(this.url, {
          modelName: "AddressGeneral",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: this.city_ref,
          },
          apiKey: this.apiKey
        })
        .then((response) => {
          this.warehouses = response.data;
        });
    },
  },
  mounted() {
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
        apiKey: this.apiKey
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
  },
};
</script>

<style scoped>
.button {
  width: 70%;
  margin: auto;
}
.cart {
  min-height: 100vh;
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
</style>