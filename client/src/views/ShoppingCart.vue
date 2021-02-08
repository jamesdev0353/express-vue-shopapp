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
              <h4 class="text-right mr-5" >400 грн</h4>
            </div>
          </div>
        </div>
        <div class="col col-lg-5 col-12">
          <h3 class="my-4">Оформлення</h3>
          <form class="ordering">
            <div class="row">
              <div class="col-md-12">
                <p class="section">Контактні дані</p>
              </div>
              <div class="col-md-6 mt-2">
                <input
                  class="form-control form-control-md"
                  placeholder="Ім'я"
                  required
                  autofocus
                />
              </div>
              <div class="col-md-6 mt-2">
                <input
                  class="form-control form-control-md"
                  placeholder="Прізвище"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-2">
                <input
                  class="form-control form-control-md"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div class="col-md-6 mt-2">
                <input
                  class="form-control form-control-md"
                  placeholder="Телефон"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <p class="section my-2">Доставка</p>
                <b-form-select name="type" class="form-select-md">
                  <b-form-select-option selected
                    >Нова пошта</b-form-select-option
                  >
                  <b-form-select-option>УкрПошта</b-form-select-option>
                </b-form-select>
              </div>
              <div class="col-md-6">
                <p class="section">Оплата</p>
                <b-form-select name="type" class="form-select-md">
                  <b-form-select-option selected
                    >Картою онлайн</b-form-select-option
                  >
                  <b-form-select-option
                    >При отриманні товару</b-form-select-option
                  >
                </b-form-select>
              </div>
            </div>

            <div class="row mt-4">
              <button class="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet-fill mr-1" viewBox="0 2 18 16">
  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
</svg>
Перейти до оплати</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCart from "@/components/ProductCart.vue";
export default {
  components: {
    ProductCart,
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

.section {
  text-align: left;
  margin-left: 10px;
}
</style>