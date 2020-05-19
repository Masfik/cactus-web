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
  grid-template-columns: minmax(280px, 1fr) 5fr;
  grid-template-rows: $navbar-height calc(100vh - #{$navbar-height});
}

#sidebar {
  grid-area: sidebar;
  z-index: 1;
  background-color: $primary;
  color: white;
  @include shadow(true);
}

#header {
  grid-area: header;
  z-index: 2;
  background-color: $background-lighter;
  @include shadow();
}

#main {
  grid-area: main;
  background-color: $background;
}
</style>
