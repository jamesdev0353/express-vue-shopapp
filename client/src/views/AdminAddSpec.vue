	<template>
  <div class="wrapper mt-5">
    <div class="container mt-4 add-container">
      <div class="col-md-6 col-10 mx-auto">
        <h2 class="reg-title">Додати характеристику</h2>
        <form @submit.prevent="addSpec()"
          novalidate
        >
          <div v-if="regMessage" class="alert alert-success" role="alert">
            Ви успішно додали характеристику!
          </div>

          <div class="form-group">
            <label for="name">Назва характеристики</label>

            <input
              @blur="$v.formReg.name.$touch()"
              :class="status($v.formReg.name)"
              v-model.trim="formReg.name"
              type="text"
              class="form-control"
              id="name"
              name="name"
            />

            <div class="invalid-feedback" v-if="!$v.formReg.name.required">
              {{ reqText }}
            </div>

            <label for="name">Значення</label>
            <input
              @blur="$v.formReg.value.$touch()"
              :class="status($v.formReg.value)"
              v-model.trim="formReg.value"
              type="text"
              class="form-control"
              id="value"
              name="value"
            />

            <div class="invalid-feedback" v-if="!$v.formReg.value.required">
              {{ reqText }}
            </div>
          </div>

          <button
            type="button"
            class="button button-back mb-3 mr-2"
            @click="$router.go(-1)"
          >
            Назад
          </button>
          <button
            :disabled="disabledBtn"
            type="submit"
            class="button mb-3 ml-2"
          >
            Додати
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      formReg: {
        name: "",
        value: "",
      },
    };
  },

  computed: {
    disabledBtn() {
      return this.$v.formReg.name.$invalid || this.$v.formReg.value.$invalid;
    },
  },

  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
        error: validation.$error,
      };
    },
    async addSpec() {
      await axios.post(
        "/api/admin/specs/add/" + this.$route.params.product_id,
        {
          name: this.formReg.name,
          value: this.formReg.value,
        }
      );
      this.$router.push({ name: 'AdminSpecsTable', params: this.$route.params.product_id});
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
      name: {
        required,
      },
      value: {
        required,
      },
    },
  },
};
</script>
