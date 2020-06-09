<template>
  <div id="login">
    <div id="login-box">
      <Logo color="var(--c-text-on-bg)" class="logo" />
      <h2>Sign Up</h2>
      <div class="social-icons col">
        <font-awesome-icon
          :icon="['fab', 'twitter-square']"
          style="color: #1B9CEA"
        />
        <font-awesome-icon
          :icon="['fab', 'facebook-square']"
          style="color: #4466AE"
        />
        <font-awesome-icon
          :icon="['fab', 'github-square']"
          style="color: #24292e"
        />
      </div>
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
          I agree to **placeholder**'s <a href="">Terms and Conditions</a>.
        </label>
        <button class="primary-color" onclick="">Sign Up</button>
      </form>
      <small><a href="">Already have an account? Login here</a></small>
    </div>
  </div>
</template>

<script>
import Logo from "../components/common/Logo";

export default {
  name: "Login",
  components: {
    Logo
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background: repeating-radial-gradient(
    circle at 65vw 50vh,
    var(--c-sidebar-search),
    var(--c-sidebar) 100px
  );

  #login-box {
    @include overflow(y);
    @include shadow(true);
    height: 85vh;
    min-width: 380px;
    width: 30vw;
    background-color: var(--c-background);
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 30px;

    .logo {
      display: block;
      width: 65%;
      margin: 0 auto 50px auto;
    }

    .social-icons {
      margin-bottom: 10px; /* TODO: Use a less random value */
      font-size: 42px;

      > .svg-inline--fa {
        vertical-align: initial;

        &:not(:last-of-type) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
