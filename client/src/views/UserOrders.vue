<template>
  <div class="user-orders">
      <h3 class="mt-5 text-center"> Мої замовлення </h3>
    <div class="row">
      <div class="col col-lg-2 col-0"></div>
      <div class="col col-lg-8 col-12">
        <div class="card product-card mt-3">
          <div class="row">
            <div class="col my-auto col-md-3 col-6 text-center">
              <p class="parameter">Замовлення</p>
              <p class="value">№4783948</p>
            </div>
            <div class="col my-auto col-md-3 col-6 text-center">
              <p class="parameter">Дата</p>
              <p class="value">17.02.2020</p>
            </div>
            <div class="col my-auto col-md-3 col-6 text-center">
              <p class="parameter">Сума замовлення</p>
              <p class="value">1000 грн</p>
            </div>
            <div class="col my-auto col-md-3 col-6 text-center">
              <p class="parameter">Статус замовлення</p>
              <p class="value text-success">Виконано</p>
            </div>
          </div>
          <hr />
          <h5>Товари</h5>
          <div class="row mt-3">
            <div class="col my-auto col-md-4 col-7 text-center">
              <img
                class="image img-prod"
                src="@/assets/background.png"
                alt="product"
              />
            </div>
            <div class="col my-auto col-md-3 col-5 text-center">
              <router-link :to="'products/' + 113" class="text-dark">
                <p class="name">hp elitebook 840 g1</p>
              </router-link>
            </div>
            <div class="col my-auto col-md-2 col-7 text-center">
              <p class="parameter">Кількість</p>
              <p class="value">1</p>
            </div>
            <div class="col my-auto col-md-3 col-5 text-center">
              <p class="parameter">Ціна</p>
              <p class="value">100 грн</p>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col my-auto col-md-4 col-7 text-center">
              <img
                class="image img-prod"
                src="@/assets/hp.png"
                alt="product"
              />
            </div>
            <div class="col my-auto col-md-3 col-5 text-center">
              <router-link :to="'products/' + 113" class="text-dark">
                <p class="name">hp elitebook 840 g1</p>
              </router-link>
            </div>
            <div class="col my-auto col-md-2 col-7 text-center">
              <p class="parameter">Кількість</p>
              <p class="value">1</p>
            </div>
            <div class="col my-auto col-md-3 col-5 text-center">
              <p class="parameter">Ціна</p>
              <p class="value">100 грн</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-lg-2 col-0"></div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}

.user-orders {
    min-height: 100vh;
}
.name {
  font-size: 18px;
}

.value {
  font-size: 18px;
}

.card {
  border-radius: 10px;
}

.parameter {
  font-size: 9px;
}

.product-card {
  margin-inline: 10px;
  padding: 20px 40px;
  box-shadow: 5px 5px 10px 0px #e0e0e0;
}

.button {
  width: 70%;
  margin: auto;
}

@media (max-width: 768px) {
  .name {
    font-size: 14px;
  }
  .value {
    font-size: 15px;
  }
}
</style>