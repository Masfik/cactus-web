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
      <button class="primary-color" onclick="">Login</button>
    </form>
    <router-link to="/register" class="colored-link">
      <small>Don't have an account? Register here</small>
    </router-link>
  </div>
</template>

<script lang="ts">
import { inject, ref, SetupContext } from "@vue/composition-api";
import { Service } from "@/services/service";

export default {
  name: "LoginForm",
  setup(_: any, ctx: SetupContext) {
    // Form data
    const email = ref(""),
      password = ref("");

    // Injected authentication service
    const authService = inject(Service.AUTH) as AuthService;

    function login() {
      authService
        .login(email.value, password.value)
        .then(async user => {
          ctx.root.$store.state.isUserAuthenticated = true;
          await ctx.root.$router.push({ name: "home" });
        })
        .catch(console.error);
    }

    return { email, password, login };
  }
};
</script>
