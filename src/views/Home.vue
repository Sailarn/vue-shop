<template>
  <v-app>
    <v-container fluid>
      <v-layout justify-space-around column fill-height>
        <ProductsCarousel
          name="Популярное"
          :items="$store.state.popular_products"
        />
        <ProductsCarousel name="Новинки" :items="$store.state.new_products" />
        <ProductsList />
      </v-layout>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import ProductsList from "../components/ProductsList";
import Footer from "../components/Footer";
import ProductsCarousel from "../components/ProductsCarousel";

export default {
  name: "home",
  components: {
    ProductsList,
    ProductsCarousel,
    Footer
  },
  created() {
    this.$axios
      .post(`loginCheck`, {
        session: localStorage.auth_admin
      })
      .then(res => {
        if (res.data.statusCode === 200 && this.$store.state.auth === false) {
          this.$store.commit("auth");
          this.$store.commit("checkLogin");
        } else {
          this.$store.commit("checkLogin");
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};
</script>
