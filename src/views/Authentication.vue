<template>
  <div id="login">
    <div id="login-box">
      <Logo color="var(--c-text-on-bg)" class="logo" />
      <h2>Welcome!</h2>
      <div class="social-icons">
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from "@/components/common/Logo.vue";
import { onMounted, SetupContext } from "@vue/composition-api";

export default {
  name: "Login",
  components: { Logo },
  setup(_: any, ctx: SetupContext) {
    onMounted(() => {
      if (ctx.root.$store.state.isUserAuthenticated)
        ctx.root.$router.replace({ name: "home" });
    });
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
    circle at 65% 50%,
    var(--c-sidebar-search),
    var(--c-sidebar) 100px
  );

  #login-box {
    @include overflow(y);
    @include shadow(true);
    height: 90vh;
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

        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
