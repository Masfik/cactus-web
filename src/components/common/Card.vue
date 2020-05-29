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
  border-radius: $s-card-border-radius;
  background-color: var(--c-background-lighter);

  > .container {
    padding: $s-card-container-spacing;
  }
}
</style>
