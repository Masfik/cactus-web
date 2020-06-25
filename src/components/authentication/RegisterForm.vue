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
      <button class="primary-color" onclick="">Register</button>
    </form>
    <router-link to="/login" class="colored-link">
      <small>Already have an account? Login here</small>
    </router-link>
  </div>
</template>

<script lang="ts">
import { inject, ref, SetupContext } from "@vue/composition-api";
import { Service } from "@/services/service";

export default {
  name: "RegisterForm",
  setup(_: any, ctx: SetupContext) {
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

    function registerUser() {
      authService
        .register(email.value, password.value)
        .then(user => {
          ctx.root.$router.push({ name: "home" });
          console.log(`User created: ${user}`);
        })
        .catch(console.error);
    }

    return {
      firstName,
      lastName,
      username,
      email,
      password,
      repeatPassword,
      acceptedTerms,
      registerUser
    };
  }
};
</script>
