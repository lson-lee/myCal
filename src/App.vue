<template>
  <v-app id="inspire">
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center">
      <v-avatar
          class="me-10 ms-4"
          color="grey-darken-1"
          size="32"
      ></v-avatar>

      <v-btn
          v-for="link in links"
          :key="link"
          variant="text"
      >
        <router-link :to="link.to">{{link.text}}</router-link>
      </v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field
            density="compact"
            hide-details
            variant="solo"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>

  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
              >
                <v-list-item-title>
                  List Item {{ n }}
                </v-list-item-title>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item
                  link
                  color="grey-lighten-4"
              >
                <v-list-item-title>
                  Refresh
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
              min-height="70vh"
              rounded="lg"
          >
            <router-view></router-view>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script setup lang="ts">
import {routes} from '@/router'
const links = routes.map(item => ({
  to: item.path,
  text: item.meta.text,
}))
</script>