<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="dark">
              <v-toolbar-title>Добавить Товар</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-checkbox
                v-model="auto_switch"
                label="Товар из таблицы"
              ></v-checkbox>
              <v-checkbox
                v-model="clear_form"
                label="Стирать при добавлении"
              ></v-checkbox>
              <v-checkbox
                v-model="inStock"
                label="Товар в наличии"
              ></v-checkbox>
              <v-form ref="form" v-model="valid" lazy-validation>
                <div v-if="auto_switch">
                  <v-select
                    :items="tables"
                    label="Таблица"
                    v-on:change="changeTable"
                  ></v-select>
                  <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="itemsNames"
                    :search-input.sync="search"
                    :rules="nameRules"
                    cache-items
                    class="mx-3"
                    flat
                    hide-no-data
                    label="Товар из Гугл Таблиц"
                    solo-inverted
                    v-on:change="selectedItems"
                  ></v-autocomplete>
                </div>
                <div v-else>
                  <v-text-field
                    v-model="select"
                    :rules="nameRules"
                    label="Своё название товара"
                    v-on:change="selectedItems"
                    required
                    clearable
                  ></v-text-field>
                </div>
                <v-text-field
                  v-model="price"
                  label="Цена($$$)"
                  :rules="priceRules"
                  required
                  clearable
                ></v-text-field>
                <v-text-field
                  v-model="code"
                  label="Код Товара"
                  :rules="codeRules"
                  required
                  clearable
                ></v-text-field>
                <v-select
                  :items="categories"
                  label="Категория товара"
                  v-on:change="e => (this.category = e)"
                ></v-select>
                <v-select
                  v-model="sub_categories[0]"
                  :items="sub_categories"
                  label="Подкатегория товара"
                  v-on:change="e => (this.sub_category = e)"
                ></v-select>
                <v-textarea
                  name="input-7-1"
                  label="Описание Товара"
                  v-model="description"
                ></v-textarea>
                <img :src="imageUrl" height="150" v-if="imageUrl" />
                <v-text-field
                  label="Ссылка на картинку"
                  v-model="imageUrl"
                  clearable
                ></v-text-field>
                <div v-for="(item, index) in model" :key="index">
                  <img :src="item" height="150" v-if="model.length > 0" />
                </div>
                <v-combobox
                  v-model="model"
                  :items="add_links"
                  :search-input.sync="search2"
                  hide-selected
                  hint="Максимум 10 ссылки"
                  label="Доп картинки товара"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template v-slot:no-data>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          No results matching "<strong>{{ search2 }}</strong
                          >". Press <kbd>enter</kbd>
                          to create a new one
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-combobox>
                <v-text-field
                  label="Скидка"
                  v-model="discount"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Экран"
                  v-model="p_screen"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Разрешение экрана"
                  v-model="resolution"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Цвет"
                  v-model="color"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Память устройства"
                  v-model="memmory"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Оперативная память"
                  v-model="ram"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Процессор"
                  v-model="cpu"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Графика"
                  v-model="graphic"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Главная камера"
                  v-model="main_camera"
                  clearable
                ></v-text-field>
                <v-text-field
                  label="Передняя камера"
                  v-model="front_camera"
                  clearable
                ></v-text-field>
                <v-select
                  :items="os_list"
                  label="Операционная система"
                  v-on:change="e => (this.os = e)"
                ></v-select>
                <v-text-field
                  label="Батарея"
                  v-model="battery"
                  clearable
                ></v-text-field>
                <v-btn :disabled="!valid" color="success" @click="validate">
                  Добавить
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      top="top"
      vertical="vertical"
    >
      {{ textSnack }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
export default {
  name: "AddProduct",
  data: () => ({
    inStock: true,
    textSnack: "",
    snackbar: false,
    auto_switch: true,
    clear_form: false,
    tables: [
      "Apple",
      "Samsung Aks",
      "Playstation",
      "Samsung + sigma",
      "Xiaomi",
      "Акустика",
      "Наушники",
      "GOPRO",
      "Powerbank",
      "USB",
      "Электротранспорт"
    ],
    table: 1,
    valid: true,
    description: "",
    price: "",
    categories: [
      "Смартфоны",
      "Ноутбуки",
      "Планшеты",
      "Зарядные устройства",
      "Чехлы",
      "Ремешки",
      "Наушники",
      "Провода",
      "Колонки",
      "Электротранспорт"
    ],
    category: "",
    sub_categories: ["Не добавлять", "Популярное", "Новинки"],
    sub_category: "",
    items: [],
    itemsNames: [],
    imageUrl: "",
    gallery: [],
    code: "",
    name: "",
    discount: "",
    p_screen: "",
    color: "",
    memmory: "",
    ram: "",
    graphic: "",
    main_camera: "",
    front_camera: "",
    os: "",
    resolution: "",
    cpu: "",
    battery: "",
    os_list: ["Android", "IOS", "Windows", "MacOS", "Linux"],
    loading: false,
    search: null,
    select: null,
    priceRules: [v => !!v || "Введите цену"],
    nameRules: [v => !!v || "Введите название товара"],
    codeRules: [v => !!v || "Введите код товара"],
    add_links: [],
    model: [],
    search2: null
  }),
  watch: {
    search() {
      this.fetchData();
    },
    model(val) {
      if (val.length > 10) {
        this.$nextTick(() => this.model.pop());
      }
    }
  },
  methods: {
    changeTable(e) {
      this.table = this.tables.indexOf(e);
      this.items = [];
      this.itemsNames = [];
    },
    async fetchData() {
      const baseUrl = `admin/getFromGoogle/${this.table}`;
      this.loading = true;
      await this.$axios
        .get(baseUrl)
        .then(response => {
          if (response.data.length > 0) {
            this.items = response.data;
            this.itemsNames = response.data.map(item => item.name);
            this.loading = false;
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    selectedItems(e) {
      this.name = e;
      this.items.map(item => {
        if (item.name.includes(e)) {
          if (item.price) {
            this.price = parseFloat(item.price.replace(",", "."));
          }
          this.code = item.code;
        }
      });
    },
    validate() {
      const body = {
        name: this.name,
        price: this.price,
        code: this.code,
        category: this.category,
        description: this.description,
        imageUrl: this.imageUrl,
        discount: this.discount,
        p_screen: this.p_screen,
        color: this.color,
        memmory: this.memmory,
        ram: this.ram,
        graphic: this.graphic,
        main_camera: this.main_camera,
        front_camera: this.front_camera,
        os: this.os,
        battery: this.battery,
        cpu: this.cpu,
        resolution: this.resolution,
        gallery: this.model,
        inStock: this.inStock,
        sub_category: this.sub_category
      };
      if (this.$refs.form.validate()) {
        const baseUrl = "admin/addProduct";
        this.$axios
          .post(baseUrl, body)
          .then(response => {
            if (response.data === false) {
              this.snackbar = true;
              this.textSnack = "Товар с таким кодом уже есть";
            } else {
              this.snackbar = true;
              this.textSnack = "Товар добавлен";
            }
            if (this.clear_form) {
              this.$refs.form.reset();
            }
          })
          .catch(error => {
            throw new Error(error);
          });
      }
    }
  }
};
</script>
