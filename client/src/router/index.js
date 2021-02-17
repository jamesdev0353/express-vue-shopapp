import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Catalog from "../views/Catalog.vue";
import Contacts from "../views/Contacts.vue";
import Products from "../views/Products.vue";
import LoginForm from "../views/LoginForm";
import Registration from "../views/RegistrationForm";
import ProductDetails from "../views/ProductDetails.vue";
import ShoppingCart from "../views/ShoppingCart";
import Subcategories from "../views/Subcategories";
import ForgetPassword from "../views/ForgetPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AdminTable from "../views/AdminTable.vue";
import AdminEditItem from "../views/AdminEditItem.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/categories",
    name: "categories",
    component: Catalog,
  },
  {
    path: "/categories/:category_id",
    name: "subcategories",
    component: Subcategories,
  },

  {
    path: "/categories/:category_id/:subcategory_id",
    name: "Subcategories",
    component: Products,
  },
  {
    path: "/products/:product_id",
    name: "ProductDetails",
    component: ProductDetails,
  },
  {
    path: "/cart",
    name: "Cart",
    component: ShoppingCart,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/resetPassword/:token",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/admin",
    name: "adminmain",
    component: () => {
      return import("../views/AdminMain.vue");
    },
  },
  {
    path: "/admin/categories",
    name: "Admincategory",
    component: () => {
      return import("../views/AdminCategory.vue");
    },
  },
  {
    path: "/admin/categories/:cat",
    name: "AdminTableOfSubCategory",
    component: AdminTable,
  },
  {
    path: "/admin/additem/:cat",
    name: "Adminadditem",
    component: () => {
      return import("../views/AdminAddItem.vue");
    },
  },
  {
    path: "/admin/addcategory",
    name: "Adminaddcategory",
    component: () => {
      return import("../views/AdminAddCategory.vue");
    },
  },
  {
    path: "/admin/addsubcategory/:cat",
    name: "Adminaddsubcategory",
    component: () => {
      return import("../views/AdminAddSubCategory.vue");
    },
  },
  {
    path: "/admin/delete/:product_id",
    name: "AdminDelProd",
    component: AdminTable,
  },
  {
    path: "/admin/edit/:product_id",
    name: "AdminEditProd",
    component: AdminEditItem,
  },
  {
    path: "/admin/soldItems",
    name: "Adminsolditems",
    component: () => {
      return import("../views/AdminSoldItems.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
