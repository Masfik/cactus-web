<template>
  <div>
    <form class="default-style-form">
      <input type="text" placeholder="First Name" maxlength="32" required />
      <input type="text" placeholder="Last Name" maxlength="32" required />
      <input type="text" placeholder="Username" maxlength="32" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <input type="password" placeholder="Repeat Password" required />
      <label>
        <input
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

<script>
export default {
  name: "RegisterForm"
};
</script>
