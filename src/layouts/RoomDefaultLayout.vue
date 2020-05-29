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
  min-width: $s-room-video-min-width;
  height: calc(100vh - #{$s-header-height});
  border-radius: $s-card-border-radius;
}

#room-chat {
  @include shadow();
  overflow: hidden;
  flex: 1;
  min-width: $s-sidebar-min-width;
  background-color: var(--c-background-lighter);
  height: calc(100vh - #{$s-header-height});
}
</style>
