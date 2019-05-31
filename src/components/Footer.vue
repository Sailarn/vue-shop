<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title class="teal"></v-card-title>
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2019 — <strong>Developer: denis9524@gmail.com</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "fab fa-instagram"
      },
      {
        icon: "fab fa-facebook"
      }
    ]
  })
};
</script>
<style>
.icon-link {
  color: white !important;
}

.icon-link:hover {
  color: black !important;
}
</style>
