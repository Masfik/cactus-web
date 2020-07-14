<template>
  <ul id="header-items">
    <li>
      <a class="mobile-only" id="sidebar-toggle">
        <font-awesome-icon icon="bars" @click="openSidebar()" />
      </a>
    </li>
    <li>
      <a href="">
        <div class="notifications">
          <font-awesome-icon icon="bell" class="bell-icon" />
          <span class="count">8</span>
        </div>
      </a>
    </li>
    <li id="header-profile" @click="logout">
      <img src="@/assets/user.png" alt="User's avatar" />
      <span class="username">{{ fullName }}</span>
      <font-awesome-icon icon="caret-down" />
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, SetupContext } from "@vue/composition-api";

export default {
  name: "Header",
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    function logout() {
      $store.dispatch("authStore/logout");
    }

    return {
      logout,
      fullName: computed(() => $store.getters["userStore/fullName"]),
      invitationsCount: computed(
        () => $store.getters["userStore/invitationsCount"]
      ),
      openSidebar() {
        ctx.root.$emit("OPEN_SIDEBAR");
      }
    };
  }
};
</script>

<style lang="scss" scoped>
#sidebar-toggle {
  position: absolute;
  left: 20px;
  top: calc(#{$s-header-height/2} - .65em);
  font-size: 1.3em;
}

@media (max-width: 768px) {
  .username {
    display: none;
  }
}

ul#header-items {
  height: 100%;
  list-style-type: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-block-start: 0;
  margin-block-end: 0;

  li {
    margin: 0 $s-header-items-spacing;

    .notifications {
      position: relative;

      .bell-icon {
        font-size: 28px;
      }

      .count {
        position: absolute;
        width: $s-badge;
        height: $s-badge;
        line-height: $s-badge;
        border-radius: 50%;
        background-color: var(--c-accent);
        color: var(--c-text-on-primary);
        text-align: center;
        font-size: x-small;
        font-weight: bold;
        top: 0;
        right: -3px;
      }
    }

    &#header-profile {
      user-select: none;
      cursor: pointer;
      $spacing: 10px;

      img {
        @include circular-avatar(35px);
        margin-right: $spacing;
        vertical-align: middle;
      }

      span.username {
        margin-right: $spacing;
      }
    }
  }

  &:last-child {
    margin-right: $s-header-items-spacing;
  }
}
</style>
