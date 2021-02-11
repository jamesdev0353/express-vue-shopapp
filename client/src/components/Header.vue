<template>
  <header>
    <b-navbar
      collapseOnSelect
      expand="md"
      toggleable="md"
      bg="white"
      class="m-3"
    >
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
            <router-link class="mx-4 text-muted" to="/catalog">
              Каталог
            </router-link>
            <router-link class="mx-4 text-muted" to="#"> Новинки </router-link>
            <router-link class="mx-4 text-muted" to="#"> Контакти </router-link>
            <router-link class="mx-4 text-muted" to="/cart">
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
            <router-link class="ml-4 auth-button" to="/login">
              Вхід
            </router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>


<style>
@media (max-width: 767px) {
  a {
    margin-top: 10px;
  }

  .auth-button {
    margin-left: 0 !important;
    align-self: center;
  }
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