<template>
  <h2 id="no-room-selected">
    No room selected
  </h2>
</template>

<script>
export default {
  name: "NoRoomSelected"
};
</script>

<style lang="scss" scoped>
#no-room-selected {
  margin: 0;
  text-align: center;
  line-height: calc(100vh - #{$s-header-height});
  user-select: none;
}
</style>
