<template>
  <div class="home">
    <default-layout>
      <template v-slot:sidebar>
        <sidebar />
      </template>

      <template v-slot:header>
        <Header />
      </template>

      <template v-slot:main>
        <room />
      </template>
    </default-layout>
  </div>
</template>

<script lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/header/Header.vue";
import Room from "@/views/Room.vue";

export default {
  name: "Homepage",
  components: {
    Room,
    DefaultLayout,
    Sidebar,
    Header
  }
};
</script>