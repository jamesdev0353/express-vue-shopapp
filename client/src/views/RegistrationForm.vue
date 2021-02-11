	<template>
  <div class="registration">
    <div class="container">
      <div class="col-sm-4 mx-auto">
        <h2 class="reg-title">Реєстрація</h2>
        <form @submit.prevent="userRegister" novalidate style="height: ">
          <div v-if="regMessage" class="alert alert-success" role="alert">
            Ви успішно зареєструвались!
          </div>

          <div class="form-group">
            <label for="name">Ваше імя</label>

            <input
              @blur="$v.formReg.name.$touch()"
              :class="status($v.formReg.name)"
              v-model.trim="formReg.name"
              type="text"
              class="form-control"
              id="name"
            />

            <div class="invalid-feedback" v-if="!$v.formReg.name.required">
              {{ reqText }}
            </div>
            <div class="invalid-feedback" v-if="!$v.formReg.name.alpha">
              {{ alphaText }}
            </div>
          </div>

          <div class="form-group">
            <label for="surname">Ваше прізвище</label>

            <input
              @blur="$v.formReg.surname.$touch()"
              :class="status($v.formReg.surname)"
              v-model.trim="formReg.surname"
              type="text"
              class="form-control"
              id="surname"
            />

            <div class="invalid-feedback" v-if="!$v.formReg.surname.required">
              {{ reqText }}
            </div>
            <div class="invalid-feedback" v-if="!$v.formReg.surname.alpha">
              {{ alphaText }}
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Телефон</label>

            <input
              @blur="$v.formReg.phone.$touch()"
              :class="status($v.formReg.phone)"
              v-model.trim="formReg.phone"
              type="text"
              class="form-control"
              id="phone"
              maxlength="13"
            />

            <div class="invalid-feedback" v-if="!$v.formReg.phone.required">
              {{ reqText }}
            </div>
            <div class="invalid-feedback" v-if="!$v.formReg.phone.minLength">
              Будь ласка введіть ваш телефон
            </div>
          </div>

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
              Будь ласка введіть ваш Email
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

          <div class="form-group">
            <label for="passwordConfirm">Підтвердження пароля</label>

            <input
              @blur="$v.formReg.passwordConfirm.$touch()"
              :class="status($v.formReg.passwordConfirm)"
              v-model.trim="formReg.passwordConfirm"
              type="password"
              class="form-control"
              id="passwordConfirm"
            />

            <div
              class="invalid-feedback"
              v-if="!$v.formReg.passwordConfirm.sameAs"
            >
              {{ passwordConfirmText }}
            </div>
          </div>

          <button
            type="button"
            class="btn btn-light mr-2"
            @click="$router.push({ name: 'Login' })"
          >
            Назад
          </button>
          <button :disabled="disabledBtn" type="submit" class="btn btn-primary">
            Зареєструватись
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  email,
  required,
  minLength,
  helpers,
  sameAs,
} from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Zа-яёА-А-ЯҐЄІЇ-яґєії]*$/);

export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені пробіли а також інші символи",
      minLengthText: "Мінімальна довжина 6 символів!",
      passwordConfirmText: "Паролі не співпадають",
      formReg: {
        email: "",
        phone: "",
        name: "",
        surname: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },

  computed: {
    disabledBtn() {
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
      console.log("Ви зареєстурвались!");
      console.log("Ваше імя: " + this.formReg.name);
      console.log("Ваша прізвище: " + this.formReg.surname);
      console.log("Email: " + this.formReg.email);
      console.log("Телефон: " + this.formReg.phone);
      console.log("Пароль: " + this.formReg.password);
      console.groupEnd();
      this.reset();
    },

    reset() {
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
      phone: {
        required,
        minLength: minLength(13),
      },
      name: {
        required,
        alpha,
      },
      surname: {
        required,
        alpha,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirm: {
        sameAs: sameAs("password"),
      },
    },
  },
};
</script>

<style scoped>
.registration {
  min-height: 100vh;
}
body {
  background-color: #f1f1f1;
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
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>