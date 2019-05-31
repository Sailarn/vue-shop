<template>
  <v-layout wrap style="height: 200px;">
    <v-container>
      <v-layout justify-center v-if="!$store.state.login_spinner">
        <Login v-if="!$store.state.auth" />
        <h1 v-else>Добро пожаловать</h1>
      </v-layout>
      <v-progress-circular
        v-else
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-container>
  </v-layout>
</template>
<script>
import Login from "../components/Private/Login.vue";

export default {
  name: "AdminPanel",
  components: {
    Login
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
