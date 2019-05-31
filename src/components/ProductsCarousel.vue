<template>
  <v-flex>
    <h1>{{ name }}</h1>
    <carousel
      :perPageCustom="[[320, 1], [768, 2], [960, 3], [1440, 5], [1920, 7]]"
      :autoplay="true"
      :autoplayTimeout="5000"
      :mouse-drag="true"
      :loop="true"
    >
      <slide v-for="(item, index) in items" :key="index">
        <v-flex>
          <v-card class="card-carousel">
            <v-img
              contain
              class="white--text"
              height="300px"
              :src="item.main_pic"
            >
            </v-img>
            <v-card-title primary-title>
              <div>
                <span class="title blue--text">{{ item.name }}</span
                ><br />
                <div v-if="item.discount">
                  <span class="title"
                    >Со скидкой:
                    {{
                      (item.price - (item.price * item.discount) / 100).toFixed(
                        1
                      )
                    }}
                    USD</span
                  >
                  <br />
                  <del class="">Цена: {{ item.price }} USD</del>
                </div>
                <div v-else>
                  <span class="title">Цена: {{ item.price }} USD</span>
                </div>
                <div
                  style="max-height: 60px; overflow: hidden; text-overflow: ellipsis;"
                >
                  {{ item.description }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                color="orange"
                @click="$router.push({ path: `product/${item.product_code}` })"
                >Подробнее
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </slide>
    </carousel>
  </v-flex>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "topproducts",
  components: {
    Carousel,
    Slide
  },
  props: ["name", "items"]
};
</script>
<style>
.card-carousel {
  display: flex !important;
  justify-content: space-around !important;
  flex-direction: column;
  min-height: 600px;
  max-width: 300px;
  margin: 10px;
}

@media screen and (max-width: 960px) {
  .card-carousel {
    max-width: initial !important;
  }
}
</style>
