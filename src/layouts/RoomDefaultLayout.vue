<template>
  <div id="room-layout">
    <div id="room-content">
      <slot name="content"></slot>
    </div>
    <div id="room-chat">
      <slot name="chat"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomDefaultLayout"
};
</script>

<style lang="scss" scoped>
#room-layout {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}

#room-content {
  @include overflow(y);
  flex: 3;
  min-width: 600px;
  height: calc(100vh - #{$navbar-height});
  border-radius: $card-border-radius;
}

#room-chat {
  @include shadow();
  flex: 1;
  min-width: $sidebar-min-width;
  background-color: $background-lighter;
  height: calc(100vh - #{$navbar-height});
}
</style>
