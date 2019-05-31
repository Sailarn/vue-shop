<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Simple Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Главная</v-btn>
        <v-btn flat to="/cart">
          <v-icon large color="x-large dark">shopping_cart</v-icon>
          <span class="badge badge-danger ml-2">{{
            $store.state.cart.length
          }}</span>
        </v-btn>
        <v-btn
          color="warning"
          fab
          small
          dark
          v-if="this.$store.state.auth"
          @click.stop="drawerOpen"
        >
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      :touchless="true"
      v-model="drawer"
      temporary
      absolute
      width="200"
      id="drawer"
      class="drawer"
    >
      <v-btn flat to="/">Главная</v-btn>
      <v-btn flat to="/cart">
        <v-icon large color="x-large dark">shopping_cart</v-icon>
        <span class="badge badge-danger ml-2">{{
          $store.state.cart.length
        }}</span>
      </v-btn>
      <v-btn
        color="warning"
        fab
        small
        dark
        v-if="this.$store.state.auth"
        @click.stop="drawerOpen"
      >
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <router-view />
    <v-navigation-drawer
      v-model="$store.state.drawer"
      :mini-variant="mini"
      :touchless="true"
      absolute
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Администратор</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :to="item.path" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Добавить продукт", icon: "add", path: "/admin/addProduct" },
        {
          title: "Редактировать продукт",
          icon: "edit",
          path: "/admin/editProduct"
        },
        { title: "Настройки", icon: "build", path: "/admin/options" },
        { title: "Выйти", icon: "exit_to_app", path: "/admin/logout" }
      ],
      mini: false,
      right: null
    };
  },
  methods: {
    drawerOpen() {
      this.$store.commit("drawer");
    }
  }
};
</script>
<style lang="sass">
*
    text-align: center
</style>
