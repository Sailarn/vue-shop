<template>
  <div>
    <v-hover>
      <v-card
        class="card"
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        @click="$router.push({ path: `product/${item.product_code}` })"
      >
        <v-img contain class="white--text" height="300px" :src="item.main_pic">
        </v-img>
        <v-card-title>
          <div class="mx-5">
            <span class="title blue--text">{{ item.name }}</span
            ><br />
            <div v-if="item.discount">
              <span class="title"
                >Со скидкой:
                {{
                  (item.price - (item.price * item.discount) / 100).toFixed(1)
                }}
                USD</span
              >
              <br />
              <del class="">Цена: {{ item.price }} USD</del>
            </div>
            <div v-else>
              <span class="title">Цена: {{ item.price }} USD</span>
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
            large
            round
            depressed
            class="mx-auto"
            v-on:click.stop.prevent="addToCart(item)"
          >
            <span>Добавить в корзину</span>
            <v-icon large color="x-large dark">shopping_cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      top="top"
      vertical="vertical"
    >
      {{ textSnack }}
      <v-btn color="pink" flat @click="$router.push({ path: '/cart' })">
        В корзину
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      textSnack: "",
      snackbar: false,
      hover: false,
      image:
        "http://www.radionetplus.ru/uploads/posts/2013-04/1365401196_teplye-oboi-1.jpeg"
    };
  },
  props: ["item"],
  methods: {
    addToCart(item) {
      this.$store.commit("addToCart", item);
      this.snackbar = true;
      this.textSnack = "Товар добавлен";
    }
  }
};
</script>
<style>
.card {
  width: 300px;
  height: 550px;
  margin: 0 10px 10px 10px;
}

.card:hover {
  cursor: pointer;
}
</style>
