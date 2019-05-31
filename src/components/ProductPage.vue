<template>
  <main class="mt-5 pt-4">
    <div v-if="data.length < 1" class="spinner-back">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="container dark-grey-text mt-5" v-else>
      <div class="row wow fadeIn">
        <v-btn
          flat
          style="position: absolute; top: 100px; left: 20px"
          @click="$router.go(-1)"
        >
          <v-icon style="margin-right: 10px">arrow_back</v-icon>
          Назад
        </v-btn>
        <div class="col-md-6 mb-5">
          <div class="main-img-block" style="margin-bottom: 50px;">
            <img
              v-if="data.length > 0"
              :src="main_pic !== '' ? main_pic : data[0].main_pic"
              class="img-fluid"
              alt=""
            />
          </div>
          <carousel :perPage="3" :mouse-drag="true" :loop="true">
            <slide v-for="(item, index) in gallery" :key="index">
              <img
                @click="main_pic = item"
                style="max-width: 100px; max-height: 100px;"
                :src="item"
                class="img-fluid"
                alt=""
              />
            </slide>
          </carousel>
        </div>
        <div class="col-md-6 mb-4 mt-5" v-if="data.length > 0">
          <div class="p-4">
            <div class="mb-3">
              <h1>{{ data[0].name }}</h1>
            </div>
            <p class="lead" v-if="data[0].discount">
              <span class="mr-1">
                <del>{{ data[0].price }} $</del>
              </span>
              <span
                >{{
                  (
                    data[0].price -
                    (data[0].price * data[0].discount) / 100
                  ).toFixed(1)
                }}
                $</span
              >
            </p>
            <p class="lead" v-else>
              <span>{{ data[0].price }} $</span>
            </p>
            <p
              v-bind:class="{
                'green-text': data[0].instock,
                'red-text': !data[0].instock
              }"
            >
              {{ data[0].instock ? "В наличии" : "Нет в наличии" }}
            </p>
            <p class="lead font-weight-bold">Описание</p>
            <p>{{ data.length > 0 ? data[0].description : false }}</p>
            <p class="lead font-weight-bold">Характеристики</p>
            <p>Категория: {{ data.length > 0 ? data[0].category : false }}</p>
            <p v-if="data[0].color">
              Цвет: {{ data.length > 0 ? data[0].color : false }}
            </p>
            <p v-if="data[0].screen">
              Диагональ экрана: {{ data.length > 0 ? data[0].screen : false }}
            </p>
            <p v-if="data[0].resolution">
              Разрешение экрана:
              {{ data.length > 0 ? data[0].resolution : false }}
            </p>
            <p v-if="data[0].cpu">
              Процессор: {{ data.length > 0 ? data[0].cpu : false }}
            </p>
            <p v-if="data[0].graphic">
              Видеоядро: {{ data.length > 0 ? data[0].graphic : false }}
            </p>
            <p v-if="data[0].memmory">
              Память: {{ data.length > 0 ? data[0].memmory : false }}
            </p>
            <p v-if="data[0].ram">
              Оперативаня память: {{ data.length > 0 ? data[0].ram : false }}
            </p>
            <p v-if="data[0].main_camera">
              Основная камера:
              {{ data.length > 0 ? data[0].main_camera : false }} Мп
            </p>
            <p v-if="data[0].front_camera">
              Фронтальная камера:
              {{ data.length > 0 ? data[0].front_camera : false }} Мп
            </p>
            <p v-if="data[0].os">
              Операционная система: {{ data.length > 0 ? data[0].os : false }}
            </p>
            <p v-if="data[0].battery">
              Батарея: {{ data.length > 0 ? data[0].battery : false }}
            </p>
            <div class="d-flex justify-content-left flex-wrap">
              <v-btn class="pr-page-btn" @click="addToCart"
                >Добавить в корзину
              </v-btn>
              <v-btn class="pr-page-btn">Заказать по телефону</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      top="top"
      vertical="vertical"
    >
      {{ textSnack }}
      <v-btn color="pink" flat @click="$router.push({ path: '/cart' })">
        В корзину
      </v-btn>
    </v-snackbar>
    <Footer />
  </main>
</template>
<script>
import postgresArray from "postgres-array";
import Footer from "../components/Footer";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Footer,
    Carousel,
    Slide
  },
  data() {
    return {
      textSnack: "",
      snackbar: false,
      data: [],
      main_pic: "",
      gallery: []
    };
  },
  created() {
    this.$axios
      .get(`product/${this.$route.params.id}`)
      .then(response => {
        if (response.data.length > 0) {
          this.data = response.data;
          if (response.data[0].gallery.length > 0) {
            Object.assign(this.data[0], {
              gallery: postgresArray.parse(
                response.data[0].gallery,
                value => value
              )
            });
            this.gallery = response.data[0].gallery;
            this.gallery = this.gallery.concat(response.data[0].main_pic);
          }
        }
        setTimeout(() => {
          if (this.data.length < 1) {
            this.$router.push({ path: "/404" });
          }
        }, 5000);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.data[0]);
      this.snackbar = true;
      this.textSnack = "Товар добавлен";
    }
  }
};
</script>
<style>
.spinner-back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.pr-page-btn {
  min-width: 180px;
}

.main-img-block {
  height: 650px;
}

@media screen and (max-width: 1200px) {
  .main-img-block {
    height: 600px;
  }
}

@media screen and (max-width: 960px) {
  .main-img-block {
    height: 450px;
  }
}

@media screen and (max-width: 760px) {
  .main-img-block {
    height: 650px;
  }
}

@media screen and (max-width: 530px) {
  .main-img-block {
    height: 600px;
  }
}

@media screen and (max-width: 450px) {
  .main-img-block {
    height: 550px;
  }
}

@media screen and (max-width: 400px) {
  .main-img-block {
    height: 500px;
  }
}

@media screen and (max-width: 350px) {
  .main-img-block {
    height: 400px;
  }
}
</style>
