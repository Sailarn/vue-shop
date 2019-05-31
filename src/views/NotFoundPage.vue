<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card
          style="height: 500px; display: flex; flex-direction: column; justify-content: space-between"
        >
          <h1>Страница не найдена :(</h1>
          <div>
            <v-btn @click="$router.push({ path: '/' })"
              >Вернуться на главную</v-btn
            >
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
