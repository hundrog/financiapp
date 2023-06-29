<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-bottom-navigation grow mode="shift" :active="drawer" v-if="mobile">
      <NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" class="link">
        <v-btn :value="item.to">
          <v-icon :icon="item.icon"></v-icon>
          <span>{{ item.text }}</span>
        </v-btn>
      </NuxtLink>
    </v-bottom-navigation>

    <v-navigation-drawer v-model="drawer" v-else>
      <v-list>
        <v-list-subheader>REPORTS</v-list-subheader>

        <NuxtLink v-for="(item, i) in items" :key="i" :to="item.to" class="link">
          <v-list-item :value="item" color="primary" rounded="shaped">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>

  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(null)
const { mobile } = useDisplay()

const items = [
  { text: 'Savings', icon: 'mdi-chart-areaspline', to: "/savings" },
  { text: 'Credits', icon: 'mdi-credit-card', to: "/credits" },
  { text: 'Settings', icon: 'mdi-cog', to: "/settings" },
]
</script>
