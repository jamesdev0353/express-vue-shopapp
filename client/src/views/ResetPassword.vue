  
<template>
  <div class="container mt-4">
    <div class="col-sm-4 mx-auto"> 
      <h2 class="reg-title">Скидання пароля</h2>
      <form method ="POST" :action="'/api/resetPassword/'+$route.params.token" novalidate> <!--@submit.prevent="userRegister" -->
        <div v-if="regMessage" class="alert alert-success" role="alert">
          Ви успішно скинули пароль!
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
            name = "password"
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
          @click="$router.push({ name: 'email' })"
        >
          Назад
        </button>
        <button :disabled="disabledBtn" type="submit" class="btn btn-primary">
          Змініти пароль
        </button>
      </form>
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
        this.$v.formReg.password.$invalid ||
        this.$v.formReg.passwordConfirm.$invalid
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
        minLength: minLength(8),
      },
      passwordConfirm: {
        sameAs: sameAs("password"),
      },
    },
  },
};
</script>

<style>
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