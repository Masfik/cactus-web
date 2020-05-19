<template>
  <div class="home">
    <default-layout>
      <template v-slot:sidebar>
        <img src="../assets/logo.svg" alt="Logo" id="logo"/>
        <div class="container">
          <label>
            <input type="text" placeholder="Search" maxlength="32" class="text-field"/>
          </label>
        </div>
        <chat-tile v-for="n in 12" :key="n"
            name="MasfikNET"
            activity-name="Watching Spongebob"
        />
      </template>

      <template v-slot:header>
        <a href="">MasfikNET</a>
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

<style lang="scss" scoped>
  #logo {
    padding: 25px 40px 10px;
    width: calc(100% - 80px);
  }

  .text-field {
    color: #FFFFFF;
    background-color: lighten($primary, 4);

    &::placeholder {
      color: #FFFFFF;
    }
  }

  #header {
    margin: 0 $container-spacing;
  }

  .card {
    margin: 20px;
    border-radius: 20px;
    background-color: #FFFFFF;
    @include shadow();
  }
</style>
