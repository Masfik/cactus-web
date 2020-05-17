<template>
  <div class="home">
    <default-layout>
      <template v-slot:sidebar>
        <img src="../assets/logo.svg" alt="Logo" id="logo" />
        <div class="container">
          <label>
            <input type="text" placeholder="Search" class="text-field" />
          </label>
        </div>
        <div class="container">
          <chat-tile
              name="MasfikNET"
              activity-name="Watching Spongebob"
          />
        </div>
      </template>

      <template v-slot:header>

      </template>

      <template v-slot:main>

      </template>
    </default-layout>
  </div>
</template>

<script lang="ts">
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import ChatTile from "@/components/sidebar/ChatTile.vue";

  export default {
    name: "Homepage",
    components: {
      DefaultLayout,
      ChatTile
    }
  };
</script>

<style scoped>
  #logo {
    padding: 25px 40px 10px;
    width: calc(100% - 80px);
  }
</style>
