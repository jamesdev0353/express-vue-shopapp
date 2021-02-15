<template>
  <div class="main">
          <div class="contacts-container">
      <img src="@/assets/shopping-mall.jpg" class="image back" alt="background" />

      <div class="contacts">
          <div class="row" >
              <div class="col-lg-2 col-1">
              </div>
              <div class="col-lg-8 col-10 column d-flex justify-content-center">
              <div class="text-center">
                  <h3 class="first">Наші контакти</h3>
                  <p>інстаграм: @shop4you </p>
                  <p>телефон: +380123456789</p>
                  <h3>Адреса</h3>
                  <p>м. Коломия, вул. Шевченка 14/23 </p>
                  <h3>Графік роботи</h3>
                  <p>будні: 10:00-18:00 </p>
                  <p>вихідні: 11:00-17:00 </p>
              </div>
              </div>
              <div class="col-lg-2 col-1">
              </div>
          </div>
      </div>
      <div>
      </div>
  </div>
  </div>
</template>

<style scoped>

.main {
    min-height: 100vh;
}

.row {
    margin: 0;
    padding-top: 15vh;
    min-height: 100vh;
}

p {
    margin: 0;
    color: rgb(148, 148, 148);
    font-size: 18px
}

h3 {
    margin-top: 4vh;
    color: rgb(70, 70, 70);
    font-size: 32px
}

.first {
    margin-top: 1vh;
}

.column {
    background-color: white;
    height: 70%;
    border-radius: 50px;
    padding: 30px 0;

}
.back {
  width: 100%;
  position: relative;
   height: 100vh;
      object-fit: cover;
}
.contacts-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contacts {
  position: absolute;
  width: 100%;
}

@media (max-width: 400px) {
}
</style>