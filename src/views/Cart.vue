<template>
  <v-layout>
    <v-container grid-list-md text-xs-center>
      <v-card class="">
        <h2 class="headline mb-5">Список товаров:</h2>
        <v-layout row wrap class="mb-3" v-if="$store.state.cart < 1">
          <v-layout column>
            <v-flex>
              <h1>Ваша корзина пуста</h1>
            </v-flex>
          </v-layout>
          <v-layout column>
            <v-flex>
              <h2>Добавляйте понравившиеся товары в корзину</h2>
            </v-flex>
          </v-layout>
        </v-layout>
        <div v-else>
          <v-layout
            row
            wrap
            class="text-xs-center"
            v-for="(item, index) in $store.state.cart"
            :key="index"
          >
            <v-layout
              column
              style="width: 100px; overflow: hidden; padding: 0 10px"
            >
              <v-flex xs3>
                <p>{{ item.name }}</p>
              </v-flex>
            </v-layout>
            <v-layout column style="width: 100px;">
              <v-flex xs3>
                <img class="cart-image" :src="item.main_pic" alt="" />
              </v-flex>
            </v-layout>
            <v-layout column>
              <v-flex xs3>
                <p>
                  {{
                    item.discount
                      ? (
                          item.price -
                          (item.price * item.discount) / 100
                        ).toFixed(1)
                      : item.price
                  }}$
                </p>
              </v-flex>
            </v-layout>
            <v-layout column>
              <v-flex xs3>
                <v-icon @click="deleteFromCart(index, item)">delete</v-icon>
              </v-flex>
            </v-layout>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap class="mb-3 cart-btns">
            <v-flex xs6>
              <h3 class="headline mb-0">
                Всего: {{ $store.state.cart_total.toFixed(1) }}$
              </h3>
              <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center"
              >
                <v-text-field
                  style="max-width: 300px"
                  v-model="promo"
                  label="Промокод"
                ></v-text-field>
                <p v-if="$store.state.used_promo.length > 0">
                  Применённый промокод:
                  {{ $store.state.used_promo[0] }}
                  <v-icon @click="deletePromocode">delete</v-icon>
                </p>
                <v-btn class="pr-page-btn" @click="checkPromo"
                  >Применить промокод
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs6>
              <div
                style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center"
              >
                <v-btn class="pr-page-btn">Оформить покупку</v-btn>
                <v-btn class="pr-page-btn">Заказать по телефону</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
      top="top"
      vertical="vertical"
    >
      {{ $store.state.promo_accept }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      textSnack: "",
      snackbar: false,
      data: this.$store.state.data,
      promo: ""
    };
  },
  created() {
    this.$store.dispatch("loadPromocodes");
  },
  methods: {
    deleteFromCart(index, item) {
      this.$store.commit("deleteFromCart", {
        item,
        index
      });
    },
    checkPromo() {
      this.$store.commit("checkPromocode", this.promo);
      this.snackbar = true;
    },
    deletePromocode() {
      this.$store.commit("deletePromocode");
      this.$store.commit("recreateCartTotal");
    }
  }
};
</script>
<style>
.container.grid-list-md :not(:only-child) .layout:last-child {
  margin: auto -4px !important;
}

.container.grid-list-md :not(:only-child) .layout:first-child {
  margin: auto -4px !important;
}

.cart-image {
  height: 100px;
}

@media screen and (max-width: 430px) {
  .cart-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column !important;
  }
}

@media screen and (max-width: 600px) {
  .cart-image {
    width: 100px;
  }
}
</style>
