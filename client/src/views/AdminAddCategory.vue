<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <h2 class="reg-title">Додати категорію</h2>
      <form @submit.prevent="addCategory()">
        <!-- @submit.prevent="userRegister" -->
        <div v-if="regMessage" class="alert alert-success" role="alert">
          Ви успішно додали категорію!
        </div>
        <div class="form-group">
          <label for="name">Назва категорії</label>

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
        </div>

        <div class="form-group">
          <label for="image">Фотографія</label>

          <input
            @blur="$v.formReg.image.$touch()"
            :class="status($v.formReg.image)"
            v-model.trim="formReg.image"
            type="text"
            class="form-control"
            id="image"
            name="image"
            @change="GetImage"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.image.required">
            {{ reqText }}
          </div>

          <div class="invalid-feedback" v-if="!$v.formReg.image.url">
            {{ reqUrl }}
          </div>
          <br />
          <div>
            <div class="card card-image">
              <img class="card-img-top" :src="formReg.image" />
            </div>
          </div>
        </div>

        <button
          type="button"
          class="button button-back mb-3 mr-2"
          @click="$router.go(-1)"
        >
          Назад
        </button>
        <button :disabled="disabledBtn" type="submit" class="button mb-3 ml-2">
          Додати
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, url } from "vuelidate/lib/validators";
import axios from 'axios'
//const alpha = helpers.regex("alpha", /^[a-zA-Zа-яёА-А-ЯҐЄІЇ-яґєії]*$/);

export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      reqUrl: "Потрібна силка",
      formReg: {
        name: "",
      },
      avatar: null,
    };
  },

  computed: {
    disabledBtn() {
      return this.$v.formReg.image.$invalid || this.$v.formReg.name.$invalid;
    },
  },

  methods: {
    GetImage(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.avatar = e.target.result;
      };
    },
    status(validation) {
      return {
        "is-invalid": validation.$error,
        error: validation.$error,
      };
    },
    async addCategory() {
      await axios.post("/api/admin/addcategory", {
        name: this.formReg.name,
        image: this.formReg.image,
      });
      this.$router.push({ name: "Admincategory" });
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
        //        alpha,
      },
      image: {
        required,
        url,
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
  padding-left: 20px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.img {
  width: 100px;
  height: 20px;
}
</style>