  
<template>
  <div class="container wrapper mt-5">
    <div class="col-sm-4 mx-auto">
      <h2 class="reg-title">Вхід</h2>
      <form @submit.prevent="getToken">
        <div class="form-group">
          <label for="email">Email</label>

          <input
            @blur="$v.formReg.email.$touch()"
            :class="status($v.formReg.email)"
            v-model.trim="formReg.email"
            type="text"
            class="form-control"
            id="email"
            name="email"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.email.required">
            {{ reqText }}
          </div>
          <div class="invalid-feedback" v-if="!$v.formReg.email.email">
            Будь ласка введіть Email
          </div>
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>

          <input
            @blur="$v.formReg.password.$touch()"
            :class="status($v.formReg.password)"
            v-model.trim="formReg.password"
            type="password"
            class="form-control"
            id="password"
            name="password"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.password.required">
            {{ reqText }}
          </div>
          <div class="invalid-feedback" v-if="!$v.formReg.password.minLength">
            {{ minLengthText }}
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary w-100" :disabled="disabledBtn">
            Увійти
          </button>
          <div class="invalid-feedback message">
            {{ message }}
          </div>
        </div>
        <div class="form-group row align-items-center">
          <div class="col-6 text-left">
            <button
              class="btn btn-light"
              @click="$router.push({ name: 'Registration' })"
            >
              Реєстрація
            </button>
          </div>
          <div class="col-6 text-right">
            <router-link to="/forgetPassword" class="text-dark">
              Забули пароль?
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені пробіли а також інші символи",
      minLengthText: "Мінімальна довжина 6 символів!",
      formReg: {
        email: "",
        password: "",
      },
      res: [1, 2, 3],
      message: null,
    };
  },

  mounted() {
    if (localStorage.getItem("token") != null) {
      this.$router.back();
    }
  },

  computed: {
    disabledBtn1() {
      return (
        this.$v.formReg.name.$invalid ||
        this.$v.formReg.surname.$invalid ||
        this.$v.formReg.email.$invalid
      );
    },
  },

  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
        error: validation.$error,
      };
    },
    getToken() {
      var _this = this;
      axios
        .post("/api/login", {
          password: this.formReg.password,
          email: this.formReg.email,
        })
        .then((response) => {
          console.log(response.data.token);
          localStorage.token = response.data.token;
          location.href = "/";
        })
        .catch(function (error) {
          if (error.response) {
            _this.message = error.response.data.message;
          }
        });
    },
    userRegister() {
      console.group();
      console.log("Email: " + this.formReg.email);
      console.log("Пароль: " + this.formReg.password);
      console.groupEnd();
      this.reset();
    },

    reset() {
      this.step = 1;
      this.regMessage = true;
      setTimeout(() => {
        this.regMessage = false;
      }, 3000);
      for (let input in this.formReg) {
        this.formReg[input] = "";
      }
      this.$v.$reset();
    },
  },
  validations: {
    formReg: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>

<style>
form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 45px -31px rgba(0, 0, 0, 0.75);
}
.message {
  display: block !important;
}
.error {
  background-color: #fdd;
}
.reg-title {
  color: #5d5d5d;
  font-size: 24px;
  margin-bottom: 18px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>