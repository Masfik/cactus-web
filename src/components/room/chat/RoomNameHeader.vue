<template>
  <div id="room-name-header" >
    <div id="room-name" class="container-x">
      <font-awesome-icon icon="times" @click="closeChat($event)" />
      <span @click="switchThemeTest">{{ roomName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, SetupContext } from "@vue/composition-api";

export default {
  name: "RoomNameHeader",
  setup(_: any, ctx: SetupContext) {
    const roomName = computed(
      () => ctx.root.$store.state.roomStore.currentRoom.name
    );

    function theme() {
      const de = document.documentElement; // TODO: everything is temporary here

      if (de.getAttribute("theme") !== "nord") de.setAttribute("theme", "nord");
      else de.setAttribute("theme", "none");
    }

    return {
      roomName,
      switchThemeTest: theme,
      closeChat(event: Event) {
        event.stopPropagation();
        ctx.root.$emit("CLOSE_CHAT");
      }
    };
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
    * { vertical-align: middle; }
  }

  .fa-times {
    cursor: pointer;
    width: 36px;
    color: $caribbean-green-darker;
    font-size: 1.6em;
    display: none;
  }

  @media (max-width: 980px) {
    .fa-times {
      display: inline-block;
    }
  }
}
</style>
