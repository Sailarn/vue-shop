<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <div>
      <h3>Добавить новый промокод</h3>
      <v-text-field
        v-model="promo_text"
        label="Текст промокода"
        required
      ></v-text-field>
      <v-text-field
        v-model="promo_discount"
        label="Процент скидки"
        required
      ></v-text-field>
      <v-btn @click="addPromo">Добавить</v-btn>
    </div>
    <v-data-table :headers="headers" :items="promocodes" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.text }}</td>
        <td class="text-xs-left">{{ props.item.discount }}</td>
        <td class="text-xs-left">
          <v-icon small @click="deletePromo(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      promo_text: "",
      promo_discount: 0,
      headers: [
        { text: "Текст промокода", value: "text" },
        { text: "Скидка", value: "discount" },
        { text: "Действия", value: "actions", sortable: false }
      ],
      promocodes: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    deletePromo(item) {
      this.$axios
        .post(`admin/promocodes`, {
          id: item.id
        })
        .then(() => {
          this.getData();
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    addPromo() {
      this.$axios
        .post(`admin/promocodes`, {
          text: this.promo_text,
          discount: this.promo_discount
        })
        .then(() => {
          this.getData();
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    getData() {
      this.$axios
        .get(`promocodes`)
        .then(res => {
          this.promocodes = res.data;
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
};
</script>
