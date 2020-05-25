<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "card"
};
</script>

<style lang="scss" scoped>
.card {
  @include shadow();
  border-radius: $card-border-radius;
  background-color: $background-lighter;

  > .container {
    padding: $card-container-spacing;
  }
}
</style>
