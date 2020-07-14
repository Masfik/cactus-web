<template>
  <div id="layout-container">
    <div id="sidebar" :class="isSidebarOpen ? 'open' : ''">
      <slot name="sidebar"></slot>
    </div>
    <div class="sidebar-backdrop" @click="closeSidebar()"></div>
    <div id="header">
      <slot name="header"></slot>
    </div>
    <div id="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, SetupContext } from "@vue/composition-api";

export default {
  name: "DefaultLayout",
  setup(_: any, ctx: SetupContext) {
    const isSidebarOpen = ref(false);
    ctx.root.$on("OPEN_SIDEBAR", () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    });
    const closeSidebar = () => isSidebarOpen.value = false;
    return {
      isSidebarOpen,
      closeSidebar
    };
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 1140px) {
  #layout-container {
    grid-template-columns: 75px 5fr !important;
  }
}

@media (max-width: 980px) {
  #layout-container {
    grid-template-columns: 75px 5fr !important;
  }
}

@media (max-width: 768px) {
  #layout-container {
    padding-top: $s-header-height;
    justify-content: unset;
    display: block !important;
  }

  #header {
    position: fixed;
    top: 0;
    left: 0;
    height: $s-header-height;
    width: 100vw;
  }

  #sidebar {
    position: fixed;
    top: 0;
    left: -320px;
    width: 300px;
    bottom: 0;
    transition: transform .3s ease;

    &.open {
      transform: translateX(320px);
    }
  }

  &.open ~ .sidebar-backdrop {
    opacity: 1;
    pointer-events: auto;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition: opacity .3s ease;
  right: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 1000;
  background-color: #0004;
}

#layout-container {
  display: grid;
  justify-content: stretch;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: minmax($s-sidebar-min-width, 1fr) 5fr;
  grid-template-rows: $s-header-height calc(100vh - #{$s-header-height});
}

#sidebar {
  @include shadow(true);
  grid-area: sidebar;
  background-color: var(--c-sidebar);
  color: var(--c-text-on-primary);
  z-index: 10000;
}

#header {
  @include shadow();
  grid-area: header;
  z-index: 2;
  background-color: var(--c-header);
}

#main {
  grid-area: main;
}
</style>
