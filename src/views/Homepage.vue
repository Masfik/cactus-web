<template>
  <p v-if="isUserAuthenticated === false && isLoading">Loading...</p>
  <div class="home" v-else>
    <default-layout>
      <template v-slot:sidebar>
        <sidebar />
      </template>

      <template v-slot:header>
        <Header />
      </template>

      <template v-slot:main>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </template>
    </default-layout>
  </div>
</template>

<script lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/header/Header.vue";
import { computed, SetupContext } from "@vue/composition-api";
import { AuthUser } from "@/models/auth-user";

export default {
  name: "Homepage",
  components: {
    DefaultLayout,
    Sidebar,
    Header
  },
  setup(_: any, ctx: SetupContext) {
    const { $store, $router } = ctx.root;
    const isLoading = computed(() => $store.state["userStore/loading"]);
    const isUserAuthenticated = computed(
      () => $store.getters["userStore/isUserAuthenticated"]
    );

    $store.dispatch(
      "userStore/onAuthStateChanged",
      async (authUser: AuthUser | null) => {
        if (authUser !== null) {
          // If user is already authenticated, only the token will be refreshed
          if (isUserAuthenticated.value)
            await $store.dispatch("userStore/updateToken", authUser.token);
          else
            await $store
              .dispatch("userStore/loadUserData", authUser)
              .catch(console.error);
        } else {
          $store
            .dispatch("userStore/reset") // <- Resetting user store
            .then(() => $router.replace({ name: "login" }));
        }
      }
    );

    return {
      isUserAuthenticated,
      isLoading
    };
  }
};
</script>
