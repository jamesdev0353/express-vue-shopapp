<template>
  <div class="main" style="margin-top: -40px">
    <div class="contacts-container">
      <div class="contacts">
        <div class="row">
          <div class="col-8 column d-flex justify-content-center mx-auto">
            <div class="text-center">
              <h3 class="first">Наші контакти</h3>
              <p>інстаграм: @shop4you</p>
              <p>телефон: +380123456789</p>
              <h3>Адреса</h3>
              <p>м. Коломия, вул. Шевченка 14/23</p>
              <h3>Графік роботи</h3>
              <p>будні: 10:00-18:00</p>
              <p>вихідні: 11:00-17:00</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1321.0298677955132!2d25.046365685006524!3d48.532086926176184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736d3b37df9f0ad%3A0xcf38ee476cc227c1!2sROZETKA!5e0!3m2!1sen!2sua!4v1613643515937!5m2!1sen!2sua"
                width="600"
                height="450"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
          </div>
        </div>
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
  min-height: 100vh;
}

p {
  margin: 0;
  color: rgb(148, 148, 148);
  font-size: 18px;
}

h3 {
  margin-top: 4vh;
  color: rgb(70, 70, 70);
  font-size: 32px;
}

.first {
  margin-top: 1vh;
}

.column {
  background-color: white;
  height: 70%;
  border-radius: 50px;
  padding: 30px 0;
  margin: 60px 0;
}
.back {
  width: 100%;
  position: relative;
  height: 100vh;
  object-fit: cover;
}

.contacts {
  background: url("~@/assets/shopping-mall.jpg");
}

.contacts-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

iframe {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>