<template>
  <div>
    <form class="default-style-form">
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button class="primary-color" onclick="">Login</button>
    </form>
    <router-link to="/register" class="colored-link">
      <small>Don't have an account? Register here</small>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LoginForm"
};
</script>
