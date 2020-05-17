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
    justify-content: stretch;
    display: grid;
    grid-template-areas:
        "sidebar header"
        "sidebar main";
    grid-template-columns: minmax(280px, 1fr) 5fr;
    grid-template-rows: 60px calc(100vh - 60px);
  }

  #sidebar {
    grid-area: sidebar;
    z-index: 1;
    background-color: $primary;
    color: white;
    overflow: auto;
    -webkit-box-shadow: $light-theme-shadow;
    box-shadow: $light-theme-shadow;
  }

  #header {
    grid-area: header;
    z-index: 2;
    background-color: $background-lighter;
    -webkit-box-shadow: $light-theme-shadow;
    box-shadow: $light-theme-shadow;
  }

  #main {
    grid-area: main;
    background-color: $background;
  }
</style>
