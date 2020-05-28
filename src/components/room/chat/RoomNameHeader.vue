<template>
  <div id="room-name-header">
    <div id="room-name" class="container-x">
      MasfikNET's Room {{ test }}
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  name: "RoomNameHeader",
  setup() {
    const test = ref(3);

    setTimeout(() => test.value++, 4000);

    return { test };
  }
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
