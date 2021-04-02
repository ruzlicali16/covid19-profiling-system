<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green" elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.name == 'addProfile' || $route.name == `editProfile`"
          flat
          dense
          round
          icon="arrow_back"
          to="/"
        />

        <q-toolbar-title>Covid-19 Profiling System</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  created() {}
};
</script>
