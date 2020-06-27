<template>
  <div>
    <form class="default-style-form" @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button class="primary-color" v-if="!loading">Login</button>
      <button class="primary-color" v-else disabled>
        <font-awesome-icon icon="spinner" spin />
      </button>
    </form>
    <router-link to="/register" class="colored-link">
      <small>Don't have an account? Register here</small>
    </router-link>
  </div>
</template>

<script lang="ts">
import { inject, ref, SetupContext } from "@vue/composition-api";
import { Service } from "@/services/service";
import { AuthService } from "@/services/auth/auth.service";

export default {
  name: "LoginForm",
  setup(_: any, ctx: SetupContext) {
    // Loading spinner
    const loading = ref(false);

    // Form data
    const email = ref(""),
      password = ref("");

    // Injected authentication service
    const authService = inject(Service.AUTH) as AuthService;

    function login() {
      loading.value = true;
      authService
        .login(email.value, password.value)
        .then(() => ctx.root.$router.push({ name: "home" }))
        .catch(console.error)
        .finally(() => (loading.value = false));
    }

    return { email, password, login, loading };
  }
};
</script>
