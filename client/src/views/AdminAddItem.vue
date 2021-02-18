  
<template>
  <div class="container mt-4 add-container">
    <div class="col-md-6 col-10 mx-auto">
      <h2 class="reg-title">Додати товар</h2>
      <form @submit.prevent="addItem()">
        <div v-if="regMessage" class="alert alert-success" role="alert">
          Ви успішно додали товар!
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
            name="name"
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
            name="brand"
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
            name="description"
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
            name="price"
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
            name="count"
          />

          <div class="invalid-feedback" v-if="!$v.formReg.count.required">
            {{ reqText }}
          </div>
          <div class="invalid-feedback" v-if="!$v.formReg.count.alpha">
            {{ alphaText }}
          </div>
        </div>

        <div v-for="spec in specs" :key="spec.id">
          <div class="form-group">
            <label>{{ spec.name }}</label>

            <input type="text" class="form-control" :name="'spec_' + spec.id" />
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
            <div class="card">
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
import { required, helpers, url } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[0-9]*$/);
import axios from "axios";
export default {
  data() {
    return {
      regMessage: false,
      reqText: "Поле обов'язкове для заповнення",
      alphaText: "Заборонені будь-які символи, крім цифр",
      reqUrl: "Вставте посилання",
      formReg: {
        name: "",
        brand: "",
        image: "",
      },
      avatar: null,
      specs: [],
    };
  },

  async created() {
    try {
      const res = await axios.get(
        "/api/admin/additem/" + this.$route.params.cat
      );
      this.specs = res.data;
    } catch (e) {
      console.error(e);
    }
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
    addItem() {
      axios.post("/api/admin/additem/" + this.$route.params.cat, {
        image: this.formReg.image,
        price: this.formReg.surname,
        name: this.formReg.name,
        brand: this.formReg.brand,
        count: this.formReg.count,
        description: this.formReg.desc,
      });
      //this.$router.go(-2)
      console.log('sflksl')
      //this.$router.push({ name: 'AdminTableOfSubCategory' })
      //this.$router.push({ path: `/admin/categories/${this.$route.params.cat}`})
      this.$router.push({ name: 'AdminTableOfSubCategory', params: this.$route.params.cat });
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
</style>