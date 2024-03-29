<template>
  <div v-if="isUserAuthenticated === false && !isDataLoaded" class="loading">
    <div>
      <img src="/assets/img/undraw_clean_up_ucm0.svg" />
      <h2>Loading</h2>
      <small>
        Cleaning your screen...
      </small>
    </div>
  </div>

  <div v-else class="home">
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

    const isUserAuthenticated = computed(
      () => $store.getters["authStore/isAuthenticated"]
    );
    const isDataLoaded = computed(
      () => $store.getters["userStore/isDataLoaded"]
    );

    // TODO: this part needs to be rewritten from scratch
    // Susceptible to multiple listeners creation when the
    // component mounts and unmounts
    $store.dispatch(
      "authStore/onAuthStateChanged",
      (authUser: AuthUser | null) => {
        // If the user is authenticated and the data has not been loaded:
        if (authUser !== null && !isDataLoaded.value)
          $store
            .dispatch("userStore/loadUserData", authUser)
            .catch(console.error);
        else
          $store
            .dispatch("reset") // <- Resetting entire store
            .then(() => $router.replace("/login"));
      }
    );

    return {
      isUserAuthenticated,
      isDataLoaded
    };
  }
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
  font-size: 1.4em;

  img {
    width: 280px;
  }

  h2 {
    font-size: 4vw;
    margin: 35px 0 10px;
  }
}
</style>
