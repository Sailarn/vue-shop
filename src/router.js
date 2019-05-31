import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AdminPanel from "./views/AdminPanel";
import AddProduct from "./components/Private/AddProduct";
import EditProduct from "./components/Private/EditProduct";
import Options from "./components/Private/Options";
import Cart from "./views/Cart";
import NotFoundPage from "./views/NotFoundPage";
import store from "./store";

Vue.use(Router);

const Product = resolve => {
  require.ensure(["./components/ProductPage.vue"], () => {
    resolve(require("./components/ProductPage.vue"));
  });
};

export default new Router({
  routes: [
    {
      path: "/admin",
      name: "adminpanel",
      component: AdminPanel
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin/addProduct",
      name: "addProduct",
      component: AddProduct,
      beforeEnter(to, from, next) {
        if (store.state.auth) {
          next();
        } else {
          next({
            path: "/admin"
          });
        }
      }
    },
    {
      path: "/admin/editProduct",
      name: "editProduct",
      component: EditProduct,
      beforeEnter(to, from, next) {
        if (store.state.auth) {
          next();
        } else {
          next({
            path: "/admin"
          });
        }
      }
    },
    {
      path: "/admin/options",
      name: "adminOptions",
      component: Options,
      beforeEnter(to, from, next) {
        if (store.state.auth) {
          next();
        } else {
          next({
            path: "/admin"
          });
        }
      }
    },
    {
      path: "/admin/logout",
      name: "logout",
      beforeEnter(to, from, next) {
        localStorage.auth_admin = false;
        store.commit("auth");
        store.commit("drawer");
        next({
          path: "/admin"
        });
      }
    },
    { path: "/product/:id", component: Product },
    { path: "/cart", component: Cart },
    { path: "*", component: NotFoundPage }
  ]
});
