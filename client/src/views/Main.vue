<template>
  <div>
    <div class="main-page">
      <img src="@/assets/background.png" class="image back" alt="background" />

      <div class="main-container">
        <router-link to="/categories" class="button">Каталог</router-link>
      </div>
    </div>
    <div class="category-1">
      <h4 class="title"><b>Електроніка</b></h4>
      <b-container>
        <b-row class="mt-4">
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
        </b-row>
      </b-container>
    </div>
    <div class="category-1">
      <h4 class="title"><b>Одяг</b></h4>
      <b-container>
        <b-row class="mt-4">
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/clothes-1.jpg" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/clothes-1.jpg" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/clothes-1.jpg" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/clothes-1.jpg" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
        </b-row>
      </b-container>
    </div>
    <div class="category-2">
      <h4 class="title"><b>Електроніка</b></h4>
      <b-container>
        <b-row class="mt-4">
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
          <column class="col-md-3 col-6 product my-auto">
            <img src="@/assets/hp.png" class="image img-prod" />
            <p>hp elitebook 840 g1</p>
          </column>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<style>
body {
  background: #f1f1f1;
  min-height: 100vh;
}

.wrapper {
  min-height: 100vh;
}

.back {
  width: 100%;
  position: relative;
}

.img-prod {
  margin: auto;
  object-fit: cover;
  height: 80%;
  width: 80%;
}

.product {
  height: 100%;
  widows: 100%;
  margin-top: 20px;
  transition: transform 0.2s;
}

.product:hover {
  background: white;
  filter: brightness(90%);
  transform: scale(1.05);
}

b-row {
  align-items: center;
}

.main-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main-container {
  position: absolute;
  width: 100%;
}

.button {
  background-color: #4da9bdff;
  border: none;
  margin-left: 20%;
  margin-top: 12%;
  width: 35vh;
  border-radius: 50px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
}

.button:hover {
  background-color: rgb(46, 136, 156);
  color: white !important;
  text-decoration: none;
}

.category-1,
.category-2 {
  margin: auto;
  margin-top: 20px;
  width: 100%;
  position: relative;
}

.title {
  text-align: center;
  position: relative;
  line-height: 60px;
}

.title::after {
  content: "";
  background: #4da9bdff;
  padding: 5px 80px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .button {
    margin: 0 auto;
    width: 25vh;
    padding: 7px 20px;
  }
  .main-container {
    position: relative;
  }
  p {
    font-size: small;
  }
}
</style>
