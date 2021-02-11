<template>
  <div class="card product-card mt-3">
    <div class="row">
      <div class="col my-auto col-3">
        <img class="image img-prod" src="@/assets/hp.png" alt="product" />
      </div>
      <div class="col my-auto col-3">
        <router-link to="#" class="text-dark">
          <p class="name">Ноутбук hp elitebook 840 g1</p>
        </router-link>
      </div>
      <div class="col my-auto col-2">
        <p class="parameter">Кількість</p>
        <b-input class="count" type="number" value="1" min="1" />
      </div>
      <div class="col my-auto col-2">
        <p class="parameter">Ціна</p>
        <p class="price">200 грн</p>
      </div>
      <div class="col my-auto col-2">
        <router-link to="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="text-muted"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.count {
  height: 20px;
  width: 50px;
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
}

@media (max-width: 767px) {
  .name {
    font-size: 12px;
  }
  .price {
    font-size: 13px;
  }
}
</style>