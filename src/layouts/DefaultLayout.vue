<template>
  <div id="layout-container">
    <div id="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div id="header">
      <slot name="header"></slot>
    </div>
    <div id="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout"
};
</script>

<style lang="scss" scoped>
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
  z-index: 1;
  background-color: var(--c-primary);
  color: var(--c-text-on-primary);
}

#header {
  @include shadow();
  grid-area: header;
  z-index: 2;
  background-color: var(--c-header-color);
}

#main {
  grid-area: main;
}
</style>
