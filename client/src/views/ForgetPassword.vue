  
<template>
  <div class="container wrapper mt-5">
    <div class="col-sm-4 mx-auto">
      <h2 class="reg-title">Ваш Email</h2>
      <form method="POST" action="/api/forgetPassword" novalidate>
        <!-- @submit.prevent="userRegister" -->
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

        <button
          type="button"
          class="btn btn-light mr-2"
          @click="$router.push({ name: 'Login' })"
        >
          Назад
        </button>
        <button :disabled="disabledBtn" type="submit" class="btn btn-primary">
          Далі
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені пробіли а також інші символи",
      formReg: {
        email: "",
      },
    };
  },

  computed: {
    disabledBtn() {
      return this.$v.formReg.email.$invalid;
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