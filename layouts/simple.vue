<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-toolbar-title>FinanciApp</v-toolbar-title>
      <template v-slot:append>
        <v-btn rounded="shaped" color="primary">Login</v-btn>
        <v-btn rounded="shaped">About</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
