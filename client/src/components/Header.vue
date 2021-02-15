<template>
  <header class="p-3">
    <b-navbar collapseOnSelect expand="md" toggleable="md" bg="white">
      <b-container>
        <router-link to="/">
          <b-navbar-brand>
            <img
              src="@/assets/logo.svg"
              width="30"
              class="d-inline-block align-top"
              alt="logo"
            />
            SHOP4YOU
          </b-navbar-brand>
        </router-link>
        <b-navbar-toggle target="navbar-toggle-collapse" bg="white" />
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <router-link class="mx-3 text-muted" to="/categories">
              Каталог
            </router-link>
            <router-link class="mx-3 text-muted" to="#"> Новинки </router-link>
            <router-link class="mx-3 text-muted" to="/contacts"> Контакти </router-link>
            <router-link class="mx-3 text-muted" to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 18 21"
              >
                <path
                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
            </router-link>
            <router-link
              v-if="displayLogin"
              class="ml-3 auth-button"
              to="/login"
            >
              Вхід
            </router-link>
            <button v-if="displayLogin == false" class="ml-3 profile-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span class="ml-2">Ім'я</span>
            </button>
            <button
              v-if="displayLogin == false"
              class="ml-0 auth-button button-exit"
              @click="removeLocalStorage()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </button>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      tokens: [],
      displayLogin: true,
    };
  },
  async created() {
    if (localStorage.getItem("token") != null) {
      this.displayLogin = false;
    }
  },
  methods: {
    removeLocalStorage() {
      localStorage.removeItem("token");
      this.displayLogin = true;
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
@media (max-width: 767px) {
  a {
    margin-top: 10px;
  }

  .auth-button,
  .profile-button {
    margin-left: 0 !important;
    align-self: center;
  }
}

header {
  background: #fff;
}

.button-exit {
  width: 30px !important;
}

.profile-button {
  background-color: rgb(238, 238, 238);
  color: rgb(143, 143, 143);
  border: none;
  border-radius: 50px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 2em;
  padding: 0 15px;
  width: fit-content;
}

.profile-button:hover {
  background-color: rgb(228, 228, 228);
}

.auth-button {
  background-color: #4da9bdff;
  border: none;
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  height: 30px;
  width: 100px;
  text-align: center;
  line-height: 2em;
}

.auth-button:hover {
  background-color: rgb(46, 136, 156);
  color: white !important;
}

.navbar {
  font-weight: 600;
}

.navbar-brand {
  font-weight: 600;
}

.navbar-nav {
  font-weight: 600;
  line-height: 2em;
}

a:hover {
  color: black !important;
  text-decoration: none;
}
</style>