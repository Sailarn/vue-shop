<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Товары в таблице</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.name"
                    label="Наименование"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.product_code"
                    label="Код товара"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.price"
                    label="Цена"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.category"
                    :items="categories"
                    label="Категория"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.sub_category"
                    :items="sub_categories"
                    label="Подкатегория"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.main_pic"
                    label="Гл. картинка"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-combobox
                    style="overflow: hidden"
                    v-model="editedItem.gallery"
                    :items="editedItem.gallery"
                    :search-input.sync="search2"
                    hide-selected
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
                            >". Press
                            <kbd>enter</kbd>
                            to create a new one
                          </v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-combobox>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.description"
                    label="Описание"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.discount"
                    label="Скидка"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.screen"
                    label="Экран"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.color"
                    label="Цвет"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.memmory"
                    label="Память"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.ram"
                    label="ОЗУ"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.graphic"
                    label="Графика"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.main_camera"
                    label="Главная камера"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.front_camera"
                    label="Передняя камера"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.os"
                    label="Система"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.resolution"
                    label="Разрешение экрана"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.cpu"
                    label="Процессор"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedItem.battery"
                    label="Батарея"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    v-model="editedItem.inStock"
                    :items="inStock_var"
                    label="Наличие"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="data" class="elevation-1">
      <template v-slot:items="props">
        <td>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark flat v-on="on">
                {{ props.item.name }}
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click="optionsDropdown(index, props.item)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
        <td>{{ props.item.product_code }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.category }}</td>
        <td>{{ props.item.sub_category }}</td>
        <td>
          <img style="max-width: 100px;" :src="props.item.main_pic" alt="" />
        </td>
        <td>{{ props.item.discount }}</td>
        <td>{{ props.item.instock ? "В наличии" : "Нет в наличии" }}</td>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snackbar"
      :timeout="1000"
      top="top"
      vertical="vertical"
    >
      {{ textSnack }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import postgresArray from "postgres-array";

export default {
  data: () => ({
    textSnack: "",
    snackbar: false,
    dialog: false,
    headers: [
      { text: "Наименование", value: "name" },
      { text: "Код товара", value: "code" },
      { text: "Цена", value: "price" },
      { text: "Категория", value: "category" },
      { text: "Подкатегория", value: "sub_category" },
      { text: "Гл.Картинка", value: "main_pic" },
      { text: "Скидка", value: "discount" },
      { text: "Наличие", value: "instock" }
    ],
    data: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
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
    sub_categories: ["Не добавлять", "Популярное", "Новинки"],
    showMenu: false,
    items: [{ title: "Редактировать" }, { title: "Удалить" }],
    inStock_var: ["Нет в наличии", "Есть в наличии"],
    add_links: [],
    search2: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async created() {
    await this.getProducts();
  },

  methods: {
    optionsDropdown(index, item) {
      if (index === 0) {
        this.editItem(item);
      } else {
        this.deleteItem(item);
      }
    },
    async getProducts() {
      const baseUrl = "admin/products";
      await this.$axios
        .get(baseUrl)
        .then(response => {
          this.data = response.data;
          for (let item of response.data) {
            if (item.gallery.length > 0) {
              Object.assign(item, {
                gallery: postgresArray.parse(item.gallery, value => value)
              });
            }
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const baseUrl = "admin/deleteProduct";
      this.$axios
        .post(baseUrl, {
          id: item.id
        })
        .then(() => {})
        .catch(error => {
          throw new Error(error);
        });
      const index = this.data.indexOf(item);
      this.data.splice(index, 1);
    },
    close() {
      this.dialog = false;
    },

    save() {
      if (this.editedItem.inStock === undefined) {
        this.editedItem.inStock = this.data
          .map(item =>
            item.product_code === this.editedItem.product_code
              ? item.instock
              : "No"
          )
          .filter(item => item !== "No")[0];
      }
      const baseUrl = "admin/updateProduct";
      this.$axios
        .put(baseUrl, this.editedItem)
        .then(() => {
          this.snackbar = true;
          this.textSnack = "Товар отредактирован";
          this.data = [];
          setTimeout(() => {
            this.getProducts();
          }, 1000);
          this.close();
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
};
</script>
<style>
.v-chip {
  max-width: 20px !important;
  overflow: hidden;
}
</style>
