	<template>
  <div class="wrapper mt-5">
    <div class="container">
      <div class="col-sm-4 mx-auto">
        <h2 class="reg-title">Додати характеристику</h2>
        <form
          method="POST"
          :action="'/api/admin/specs/add/' + $route.params.product_id" 
          novalidate
          style="height: "
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
            class="btn btn-light mr-2"
            @click="$router.push({ name: 'Admincategory' })"
          >
            Назад
          </button>
          <button :disabled="disabledBtn" type="submit" class="btn btn-primary">
            Додати
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

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
      return (
        this.$v.formReg.name.$invalid ||
        this.$v.formReg.value.$invalid
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
      value:{
        required,
      },
    },
  },
};
</script>

<style scoped>
body {
  background: #f1f1f1;
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