<template>
  <p v-if="isUserAuthenticated === null && isLoading">Loading...</p>
  <div class="home" v-else-if="isUserAuthenticated">
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
import { computed, inject, ref, SetupContext } from "@vue/composition-api";
import { Service } from "@/services/service";
import { AuthService } from "@/services/auth/auth.service";

export default {
  name: "Homepage",
  components: {
    DefaultLayout,
    Sidebar,
    Header
  },
  setup(_: any, ctx: SetupContext) {
    const isLoading = ref(true);
    // Injected AuthService
    const authService = inject(Service.AUTH) as AuthService;

    authService.onAuthStateChanged(authUser => {
      const isAuthenticated = authUser !== null;
      ctx.root.$store.commit("setAuthenticated", isAuthenticated);

      if (isAuthenticated) {
        // TODO: data fetching
        isLoading.value = false;
      } else {
        // TODO: clear Store
        ctx.root.$router.push({ name: "login" });
      }
    });

    return {
      isUserAuthenticated: computed(
        () => ctx.root.$store.state.isUserAuthenticated
      ),
      isLoading
    };
  }
};
</script>
