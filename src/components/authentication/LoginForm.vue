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
import { ref, SetupContext } from "@vue/composition-api";

export default {
  name: "LoginForm",
  setup(_: any, { root }: SetupContext) {
    // Loading spinner
    const loading = ref(false);

    // Form data
    const email = ref(""),
      password = ref("");

    function login() {
      loading.value = true;
      const payload = { email: email.value, password: password.value };

      root.$store
        .dispatch("userStore/login", payload)
        .then(() => root.$router.push({ name: "home" }))
        .catch(console.error)
        .finally(() => (loading.value = false));
    }

    return { email, password, login, loading };
  }
};
</script>
