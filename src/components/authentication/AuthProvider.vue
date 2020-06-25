<template>
  <div>
    <p v-if="isAuthenticated === null">Loading...</p>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import {
  computed,
  onMounted,
  provide,
  SetupContext
} from "@vue/composition-api";
import { Service } from "@/services/service";
import { FirebaseAuthService } from "@/services/auth/firebase-auth.service";

export default {
  name: "AuthProvider",
  setup(_: any, ctx: SetupContext) {
    // Authentication service
    const authService: AuthService = new FirebaseAuthService();
    // isAuthenticated from the Store
    const isAuthenticated = computed(
      () => ctx.root.$store.state.isUserAuthenticated
    );

    // Listening to authentication status when the component is created
    onMounted(() =>
      authService.onAuthStateChanged(
        authUser => (ctx.root.$store.state.isUserAuthenticated = !!authUser)
      )
    );

    // Providing the authService to descendants
    provide(Service.AUTH, authService);

    return { isAuthenticated };
  }
};
</script>
