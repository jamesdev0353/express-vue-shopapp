  
<template>
  <div class="container wrapper mt-5">
    <div class="col-sm-4 mx-auto">
      <h2 class="reg-title">Ваш Email</h2>
      <form @submit.prevent="sendEmail()">
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

        <div class="invalid-feedback message mb-3">
          {{ message }}
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
import axios from 'axios'
export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені пробіли а також інші символи",
      formReg: {
        email: "",
      },
      message: null
    };
  },

  mounted() {
    if (localStorage.getItem("token") != null) {
      this.$router.back();
    }
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
    sendEmail(){
      var _this = this;
      axios
        .post("/api/forgetPassword", {
          email: this.formReg.email,
        })
        .then((response) => {
          if (response.status == 200) {
          this.$router.push({ name: "EmailSend" });
          }
        })
        .catch(function (error) {
          if (error.response) {
            _this.message = error.response.data.message;
          }
        });
    }
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