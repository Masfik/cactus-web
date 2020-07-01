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
import { ref, SetupContext } from "@vue/composition-api";

export default {
  name: "RegisterForm",
  setup(_: any, { root }: SetupContext) {
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

    function registerUser() {
      loading.value = true;
      const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value
      };

      root.$store
        .dispatch("userStore/register", payload)
        .then(() => root.$router.push({ name: "home" }))
        .catch(console.error)
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
