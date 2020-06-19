<template>
  <div id="room-name-header" @click="switchThemeTest">
    <div id="room-name" class="container-x">
      MasfikNET's Room
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "@vue/composition-api";

export default {
  name: "RoomNameHeader",
  setup() {
    const test = ref(5);

    function theme() {
      const de = document.documentElement; // TODO: everything is temporary here

      if (de.getAttribute("theme") !== "nord") de.setAttribute("theme", "nord");
      else de.setAttribute("theme", "none");
    }

    return { test, switchThemeTest: theme };
  }
};
</script>

<style lang="scss" scoped>
#room-name-header {
  @include shadow();
  height: $s-header-height;
  min-height: $s-header-height;
  border-bottom: var(--c-background-darker) solid 1px;
  cursor: pointer;
  user-select: none;
  text-align: center;
  font-size: smaller;
  font-weight: bold;

  #room-name {
    @extend %text-ellipsis;
    margin: auto;
    line-height: $s-header-height;
    text-transform: uppercase;
  }
}
</style>
