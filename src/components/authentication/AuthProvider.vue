<template>
  <div>
    <p v-if="isLoggedIn === null">Loading...</p>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted, provide, ref, Ref } from "@vue/composition-api";
import { Service } from "@/services/service";
import { FirebaseAuthService } from "@/services/auth/firebase-auth.service";

export default {
  name: "AuthProvider",
  setup() {
    // Authentication service
    const authService: AuthService = new FirebaseAuthService();
    // isLoggedIn ref
    const isLoggedIn: Ref<boolean | null> = ref(null);

    // Listening to authentication status when the component is created
    onMounted(() =>
      authService.onAuthStateChanged(
        authUser => (isLoggedIn.value = !!authUser)
      )
    );

    // Providing the authService to descendants
    provide(Service.AUTH, authService);

    return { isLoggedIn };
  }
};
</script>
