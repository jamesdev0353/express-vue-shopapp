  
<template>
  <div class="container mt-4">
    <div class="col-sm-4 mx-auto">
      <h2 class="reg-title">Додати товар</h2>
      <form @submit.prevent="userRegister" novalidate>
        <div v-if="regMessage" class="alert alert-success" role="alert">
          Ви успішно додали товар!
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
            <div class="card" style="width: 19rem">
              <img class="card-img-top" :src="avatar" alt="Зображення" />
              <div class="card-body">
                <p class="card-text"></p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="name">Назва товару</label>

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
        </div>

        <div class="form-group">
          <label for="brand">Бренд</label>

          <input
            @blur="$v.formReg.brand.$touch()"
            :class="status($v.formReg.brand)"
            v-model.trim="formReg.brand"
            type="text"
            class="form-control"
            id="brand"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.brand.required">
            {{ reqText }}
          </div>
        </div>

        <div class="form-group">
          <label for="desc">Опис</label>

          <textarea
            @blur="$v.formReg.desc.$touch()"
            :class="status($v.formReg.desc)"
            v-model.trim="formReg.desc"
            type="text"
            class="form-control"
            id="desc"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.desc.required">
            {{ reqText }}
          </div>
        </div>

        <div class="form-group">
          <label for="surname">Ціна</label>

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
          <label for="count">Кількість</label>

          <input
            @blur="$v.formReg.count.$touch()"
            :class="status($v.formReg.count)"
            v-model.trim="formReg.count"
            type="text"
            class="form-control"
            id="count"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.count.required">
            {{ reqText }}
          </div>
          <div class="invalid-feedback" v-if="!$v.formReg.count.alpha">
            {{ alphaText }}
          </div>
        </div>

        <button
          type="button"
          class="btn btn-light mr-2"
          @click="$router.push({ name: 'table' })"
        >
          Назад
        </button>

        <button
          :disabled="disabledBtn"
          type="submit"
          class="btn btn-primary"
          @click="$router.push({ name: 'table' })"
        >
          Додати
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, helpers, url } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[0-9]*$/);

export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обовязкове для заповнення",
      alphaText: "Заборонені любі символи крім цифр",
      reqUrl: "Потрібна силка",
      formReg: {
        name: "",
        brand: "",
        image: "",
      },
      avatar: null,
    };
  },

  computed: {
    disabledBtn() {
      return (
        this.$v.formReg.image.$invalid ||
        this.$v.formReg.name.$invalid ||
        this.$v.formReg.surname.$invalid ||
        this.$v.formReg.count.$invalid ||
        this.$v.formReg.desc.$invalid ||
        this.$v.formReg.brand.$invalid
      );
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
      surname: {
        required,
        alpha,
      },
      brand: {
        required,
        //alpha,
      },
      count: {
        required,
        alpha,
      },
      desc: {
        required,
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

.img {
  width: 100px;
  height: 20px;
}
</style>