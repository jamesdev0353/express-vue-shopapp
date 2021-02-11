<template>
  <div class="login">
    <div class="container mt-4">
      <div class="col-sm-4 mx-auto">
        <h2 class="reg-title">Вхід</h2>
        <form @submit.prevent="userRegister" novalidate>
          <div class="form-group">
            <label for="email">Email</label>

            <input
              @blur="$v.formReg.email.$touch()"
              :class="status($v.formReg.email)"
              v-model.trim="formReg.email"
              type="text"
              class="form-control"
              id="email"
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
            />

            <div class="invalid-feedback" v-if="!$v.formReg.password.required">
              {{ reqText }}
            </div>
            <div class="invalid-feedback" v-if="!$v.formReg.password.minLength">
              {{ minLengthText }}
            </div>
          </div>

          <button type="button" class="btn btn-light mr-2">Увійти</button>
          <button
            :disabled="disabledBtn"
            type="submit"
            class="btn btn-primary"
            @click="$router.push({ name: 'Registration' })"
          >
            Реєстрація
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені пробіли а також інші символи",
      minLengthText: "Мінімальна довжина 8 символів!",
      formReg: {
        email: "",
        password: "",
      },
    };
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

<style scoped>
body {
  background-color: #f1f1f1;
}

.login {
  min-height: 100vh;
}
form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 45px -31px rgba(0, 0, 0, 0.75);
}
.error {
  background-color: #fdd;
}
.reg-title {
  color: #5d5d5d;
  font-size: 24px;
  margin-bottom: 18px;
  padding-left: 20px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>