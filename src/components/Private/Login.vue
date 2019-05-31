<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="dark">
              <v-toolbar-title>Вход</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  label="Имя"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :rules="passRules"
                  :type="show ? 'text' : 'password'"
                  label="Пароль"
                  @click:append="show = !show"
                ></v-text-field>
                <v-btn :disabled="!valid" color="success" @click="validate">
                  Login
                </v-btn>
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Информация
                    </v-card-title>

                    <v-card-text>
                      {{ dialog_info }}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="dialog = false">
                        Ok
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    show: false,
    dialog: false,
    dialog_info: "",
    valid: true,
    name: "",
    nameRules: [v => !!v || "Введите имя"],
    password: "",
    passRules: [v => !!v || "Введите пароль"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const baseUrl = "admin/login";
        this.$axios
          .post(baseUrl, {
            name: this.name,
            password: this.password
          })
          .then(res => {
            this.dialog_info = res.data.message;
            this.dialog = true;
            if (res.data.statusCode === 200) {
              this.$store.commit("auth");
              localStorage.auth_admin = res.data.session;
              this.$router.push({ path: "/" });
            }
          })
          .catch(err => {
            throw new Error(err);
          });
      }
    }
  }
};
</script>
