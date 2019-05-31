<template>
  <v-container>
    <v-layout>
      <v-flex>
        <h1>Промокоды</h1>
        <PromocodesEditor />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PromocodesEditor from "./PromocodesEditor";

export default {
  components: {
    PromocodesEditor
  }
};
</script>
