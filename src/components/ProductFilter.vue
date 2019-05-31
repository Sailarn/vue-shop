<template>
    <v-card class="ml-2 mr-2" style="width: 100%;">
        <v-flex>
            <p>Товаров на странице</p>
            <v-radio-group
                    style="justify-content: center"
                    v-model="$store.state.perPage"
                    row
            >
                <v-radio
                        v-for="n in perPageOptions"
                        :key="n"
                        :label="`${n}`"
                        :value="n"
                        @change="productsPerPage(n)"
                ></v-radio>
            </v-radio-group>
        </v-flex>
        <v-form
                ref="form"
                class="fw-bold d-flex flex-column justify-content-center align-items-center"
                v-model="valid"
                lazy-validation
                p4
        >
            <v-card-text class="fw-bold">Опции</v-card-text>
            <v-select
                    v-model="sortBy"
                    :items="sortOptions"
                    v-on:change="e => (this.sortBy = e)"
            ></v-select>
            <v-select
                    v-model="category"
                    :items="categories"
                    label="Категория Товара"
                    v-on:change="e => (this.category = e)"
            ></v-select>
            <v-flex
                    shrink
                    style="width: 100%; display: flex; flex-direction: row !important;"
            >
                <v-text-field
                        v-model="priceFrom"
                        class="mt-0 mr-1"
                        hide-details
                        single-line
                        type="number"
                ></v-text-field>
                <v-text-field
                        v-model="priceTo"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                ></v-text-field>
            </v-flex>
            <v-flex class="px-3">
                <v-range-slider
                        v-model="price"
                        :max="maxPrice"
                        :min="minPrice"
                ></v-range-slider>
            </v-flex>
            <v-flex>
                <v-switch
                        v-model="filterPrice"
                        label="Учитывать цену в фильтре"
                ></v-switch>
            </v-flex>
            <div class="d-flex">
                <v-btn color="warning" flat small @click="defaultOptions"
                >Сбросить Опции
                </v-btn>
                <v-btn small @click="filter">Отфильтровать</v-btn>
            </div>
        </v-form>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                perPage: 5,
                perPageOptions: [2, 5, 10],
                valid: true,
                categories: [
                    "Всё",
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
                filterPrice: false,
                category: "",
                price: [0, 2000],
                sortOptions: ["Сначала дешёвые", "Сначала дорогие"],
                sortBy: ""
            };
        },
        created() {
            this.sortBy = this.sortOptions[1];
            this.category = this.categories[0];
        },
        methods: {
            filter() {
                let payload;
                if (this.filterPrice) {
                    payload = {
                        category: this.category,
                        min_price: this.price[0],
                        max_price: this.price[1],
                        sortBy: this.sortBy
                    };
                } else {
                    payload = {
                        category: this.category,
                        min_price: 0,
                        max_price: 2000,
                        sortBy: this.sortBy
                    };
                }
                this.$store.dispatch("filter", payload);
                this.$store.commit("pageChanged", 1);
            },
            defaultOptions() {
                this.$store.dispatch("loadProducts", 1);
                this.price = [0, 2000];
                this.$store.commit("resetFilter");
                this.category = this.categories[0];
            },
            productsPerPage(value) {
                this.$store.commit("perPage", value);
                this.$store.dispatch("loadProducts", 1);
            }
        },
        computed: {
            minPrice: function () {
                return this.$store.state.data.length > 0
                    ? this.$store.state.min_price
                    : 0;
            },
            maxPrice: function () {
                return this.$store.state.data.length > 0
                    ? this.$store.state.max_price
                    : 2000;
            },
            priceFrom: function () {
                return this.price[0].toFixed(1);
            },
            priceTo: function () {
                return this.price[1].toFixed(1);
            }
        }
    };
</script>
<style>
    label {
        margin: 0 !important;
    }
</style>
