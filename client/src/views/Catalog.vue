<template>
  <div class="catalog">
    <h2 class="mt-4 text-center">Каталог</h2>

    <b-container class="mt-4">
      <b-row class="ml-0 categories-b-row">
        <b-col class="my-3 col-lg-3 col-md-4 col-sm-6 col-6">
          <router-link to="/products">
            <div class="category">
              <img
                src="@/assets/laptop.jpg"
                class="image category-img"
                alt="category"
              />
              <div class="category-name">
                <h5>Електроніка</h5>
              </div>
            </div>
          </router-link>
        </b-col>
        <b-col class="my-3 col-lg-3 col-md-4 col-sm-6 col-6">
          <div class="category">
            <img
              src="@/assets/laptop.jpg"
              class="image category-img"
              alt="category"
            />
            <div class="category-name">
              <h5>Електроніка</h5>
            </div>
          </div>
        </b-col>
        <b-col class="my-3 col-lg-3 col-md-4 col-sm-6 col-6">
          <div class="category">
            <img
              src="@/assets/laptop.jpg"
              class="image category-img"
              alt="category"
            />
            <div class="category-name">
              <h5>Електроніка</h5>
            </div>
          </div>
        </b-col>
        <b-col class="my-3 col-lg-3 col-md-4 col-sm-6 col-6">
          <div class="category">
            <img
              src="@/assets/laptop.jpg"
              class="image category-img"
              alt="category"
            />
            <div class="category-name">
              <h5>Електроніка</h5>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row> </b-row>
    </b-container>
  </div>
</template>

<style>

.catalog {
  min-height: 100vh;
}
.category-img {
  width: 100%;
  position: relative;
  border-radius: 50px;
  filter: brightness(20%);
}

.category {
  display: flex;
  flex-direction: column;
}

.category-name {
  width: 50%;
  text-align: left;
  position: absolute;
  color: white;
  margin: 15%;
}

.container {
  position: relative;
  text-align: center;
  padding: 0px;
}
</style>