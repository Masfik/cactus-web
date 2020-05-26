<template>
  <div id="room-name-header">
    <div id="room-name" class="container-x">
      MasfikNET's Room
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomNameHeader"
};
</script>

<style lang="scss" scoped>
#room-name-header {
  height: $header-height;
  min-height: $header-height;
  border-bottom: $background-darker solid 1px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  font-size: smaller;

  #room-name {
    @extend %text-ellipsis;
    margin: auto;
    line-height: $header-height;
    text-transform: uppercase;
  }
}
</style>
