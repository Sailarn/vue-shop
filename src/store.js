import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    drawer: false,
    data: [],
    all_data: [],
    filtered_data: [],
    spinner: true,
    login_spinner: true,
    max_price: 0,
    min_price: 0,
    all_prices: [],
    cart: [],
    cart_total: 0,
    promo: [],
    used_promo: [],
    perPage: 5,
    popular_products: [],
    new_products: [],
    promo_accept: "",
    filter: false,
    page: 1
  },
  mutations: {
    auth() {
      this.state.auth = !this.state.auth;
    },
    drawer() {
      this.state.drawer = !this.state.drawer;
    },
    allData(state, payload) {
      state.all_data = payload;
    },
    setData(state, payload) {
      state.popular_products = state.all_data.filter(item => {
        if (item.sub_category === "Популярное") {
          return item;
        }
      });
      state.new_products = state.all_data.filter(item => {
        if (item.sub_category === "Новинки") {
          return item;
        }
      });
      let data;
      if (state.filter) {
        data = state.filtered_data;
      } else {
        data = payload.data;
      }
      state.data = data.slice(payload.page, payload.perPage);
      this.state.spinner = false;
    },
    checkLogin() {
      this.state.login_spinner = false;
    },
    resetFilter(state) {
      state.filter = false;
      state.max_price = 2000;
      state.min_price = 0;
    },
    filterData(state, data) {
      state.filter = true;
      state.filtered_data = data;
    },
    setMaxMinPrice(state, data) {
      state.all_prices = data.map(item => item.price);
      state.max_price = Math.max(...state.all_prices) + 5;
      state.min_price = Math.min(...state.all_prices) - 5;
    },
    addToCart(state, data) {
      state.cart.push(data);
      if (data.discount) {
        state.cart_total =
          +state.cart_total +
          +(data.price - (data.price * data.discount) / 100);
      } else {
        state.cart_total = +state.cart_total + +data.price;
      }
    },
    recreateCartTotal(state) {
      state.cart_total = 0;
      for (let data of this.state.cart)
        if (data.discount) {
          state.cart_total =
            +state.cart_total +
            +(data.price - (data.price * data.discount) / 100);
        } else {
          state.cart_total = +state.cart_total + +data.price;
        }
    },
    deleteFromCart(state, payload) {
      if (payload.item.discount) {
        state.cart_total =
          +state.cart_total -
          +(
            payload.item.price -
            (payload.item.price * payload.item.discount) / 100
          );
      } else {
        state.cart_total = +state.cart_total - +payload.item.price;
      }
      state.cart.splice(payload.index, 1);
    },
    checkPromocode(state, promo) {
      for (let old of state.used_promo) {
        if (old === promo || state.used_promo.length > 0) {
          return (state.promo_accept = "Один промокод уже был применён");
        }
      }
      for (let item of state.promo) {
        if (item.text === promo) {
          state.cart_total =
            state.cart_total - (state.cart_total * item.discount) / 100;
          state.used_promo.push(promo);
          state.promo_accept = "Промокод применён";
        } else {
          state.promo_accept = "Введенный неверный промокод";
        }
      }
    },
    setPromocodes(state, data) {
      state.promo = data;
    },
    deletePromocode(state) {
      state.used_promo.pop();
    },
    pageChanged(state, page) {
      state.page = page;
    },
    perPage(state, perPage) {
      state.perPage = perPage;
    }
  },
  actions: {
    loadProducts({ commit }, page) {
      const baseUrl = "products";
      axios
        .get(baseUrl)
        .then(response => {
          let payload;
          if (!this.state.filter) {
            commit("allData", response.data);
            payload = {
              data: response.data,
              page: page === 1 ? 0 : parseInt((page - 1) * this.state.perPage),
              perPage: parseInt(page * this.state.perPage)
            };
          } else {
            payload = {
              page: page === 1 ? 0 : parseInt((page - 1) * this.state.perPage),
              perPage: parseInt(page * this.state.perPage)
            };
          }
          commit("setData", payload);
          commit("setMaxMinPrice", response.data);
          commit("pageChanged", page);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    filter({ commit }, payload) {
      const baseUrl = "filter";
      axios
        .post(baseUrl, payload)
        .then(response => {
          let page = 1;
          const payload = {
            page: page === 1 ? 0 : parseInt((page - 1) * this.state.perPage),
            perPage: parseInt(page * this.state.perPage)
          };
          commit("filterData", response.data);
          commit("setData", payload);
          commit("setMaxMinPrice", response.data);
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    loadPromocodes({ commit }) {
      axios
        .get(`admin/promocodes`)
        .then(response => {
          commit("setPromocodes", response.data);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
});
