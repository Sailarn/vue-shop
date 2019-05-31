<template>
    <v-layout class="products-container" row wrap align-center fill-height>
        <v-flex
                class="filter"
                d-flex
                xl4
                lg4
                md5
                sm6
                xs12
                style="align-self: self-start"
        >
            <ProductFilter/>
        </v-flex>
        <v-flex
                class="products"
                style="flex-wrap: wrap"
                d-flex
                xl8
                lg8
                md7
                sm6
                xs12
        >
            <div
                    v-for="(item, index) in $store.state.data"
                    :key="index"
                    style="max-width: 320px"
            >
                <ProductCard v-bind:item="item"/>
            </div>
            <p v-if="$store.state.data.length < 1">
                Нет товара по заданным параметрам
            </p>
        </v-flex>
        <v-flex>
            <v-pagination
                    v-if="$store.state.data.length > 0"
                    v-model="$store.state.page"
                    :length="paginationLength"
                    @input="next"
            ></v-pagination>
        </v-flex>
        <v-progress-linear
                :indeterminate="true"
                v-if="$store.state.spinner"
        ></v-progress-linear>
    </v-layout>
</template>
<script>
    import ProductCard from "./ProductCard";
    import ProductFilter from "./ProductFilter";

    export default {
        components: {
            ProductCard,
            ProductFilter
        },
        data() {
            return {
                initialPage: 1,
                page: 1
            };
        },
        created() {
            if (!this.$store.state.filter) {
                this.$store.dispatch("loadProducts", this.initialPage);
            }
        },
        computed: {
            paginationLength() {
                if (this.$store.state.filter) {
                    return Math.ceil(
                        this.$store.state.filtered_data.length / this.$store.state.perPage
                    );
                } else {
                    return Math.ceil(
                        this.$store.state.all_data.length / this.$store.state.perPage
                    );
                }
            }
        },
        methods: {
            next(page) {
                this.$store.commit("pageChanged", page);
                this.$store.dispatch("loadProducts", page);
            }
        }
    };
</script>
<style>
    .products-container {
        margin-top: 50px;
    }

    @media screen and (max-width: 720px) {
        .products-container {
            flex-direction: column !important;
        }

        .products {
            margin-top: 20px;
            max-width: 100% !important;
            justify-content: center;
        }

        .filter {
            flex-basis: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
        }
    }
</style>
