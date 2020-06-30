<template>
  <div>
    <form class="default-style-form" @submit.prevent="registerUser">
      <input
        v-model="firstName"
        type="text"
        placeholder="First Name"
        maxlength="32"
        required
      />
      <input
        v-model="lastName"
        type="text"
        placeholder="Last Name"
        maxlength="32"
        required
      />
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        maxlength="32"
        required
      />
      <input type="email" placeholder="Email" v-model="email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="repeatPassword"
        type="password"
        placeholder="Repeat Password"
        required
      />
      <label>
        <input
          v-model="acceptedTerms"
          type="checkbox"
          name="terms-conditions"
          value="terms-conditions"
          required
        />
        <!-- TODO -->
        I agree to LogoIpsum's
        <a href="" class="colored-link">Terms and Conditions</a>.
      </label>
      <button class="primary-color" v-if="!loading">Register</button>
      <button class="primary-color" v-else disabled>
        <font-awesome-icon icon="spinner" spin />
      </button>
    </form>
    <router-link to="/login" class="colored-link">
      <small>Already have an account? Login here</small>
    </router-link>
  </div>
</template>

<script lang="ts">
import { inject, ref, SetupContext } from "@vue/composition-api";
import { Service } from "@/services/service";
import { AuthService } from "@/services/auth/auth.service";
import axios from "axios";
import { CactusUserRepository } from "@/repositories/cactus/cactus-user-repository";
import { AuthUser } from "@/models/auth-user";

export default {
  name: "RegisterForm",
  setup(_: any, ctx: SetupContext) {
    // Loading spinner
    const loading = ref(false);

    // Form data
    const firstName = ref(""),
      lastName = ref(""),
      username = ref(""),
      email = ref(""),
      password = ref(""),
      repeatPassword = ref(""),
      acceptedTerms = ref(false);

    // Injected authentication service
    const authService = inject(Service.AUTH) as AuthService;

    // TODO: the following blocks of code will be removed
    const axiosInstance = axios.create();

    function registerUser() {
      loading.value = true;
      authService
        .register(email.value, password.value)
        .then(user => {
          axiosInstance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user?.token}`;
            return config;
          });
          return new CactusUserRepository(axiosInstance).createUser({
            ...(user as AuthUser),
            name: firstName.value,
            surname: lastName.value,
            username: username.value
          });
        })
        .catch(console.error)
        .then(() => ctx.root.$router.push({ name: "home" }))
        .finally(() => (loading.value = false));
    }

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      repeatPassword,
      acceptedTerms,
      registerUser,
      loading
    };
  }
};
</script>
