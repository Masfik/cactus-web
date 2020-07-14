<template>
  <div id="room-layout">
    <div id="room-content">
      <slot name="content"></slot>
    </div>
    <div id="room-chat" @click="openChatIfTablet()" :class="isChatOpen ? 'open' : ''">
      <font-awesome-icon icon="inbox" />
      <slot name="chat"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, SetupContext } from "@vue/composition-api";

export default {
  name: "RoomDefaultLayout",
  setup(_: any, ctx: SetupContext) {
    const isChatOpen = ref(false);
    function openChatIfTablet() {
      if (window.matchMedia("(max-width: 1140px)").matches) {
        isChatOpen.value = true;
      }
    }
    ctx.root.$on("CLOSE_CHAT", () => {
      isChatOpen.value = false;
    });
    return {
      isChatOpen,
      openChatIfTablet
    };
  }
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

.fa-inbox {
  opacity: 0;
  position: absolute;
  top: 25px;
  left: 25px;
  color: $caribbean-green-darker;
  font-size: 1.2em;
  pointer-events: none;
  transition: opacity .2s ease;
}

@media (max-width: 768px) {
  #room-content {
    width: 100vw;
    min-width: unset;
    #room-container {
      padding: 60px 15px;
    }
  }
  #room-chat {
    transition: none !important;
  }
  #room-chat.open {
    top: $s-header-height;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - #{$s-header-height});
    border-radius: 0;
  }
}

@media (max-width: 980px) {
  #room-chat {
    position: fixed;
    right: 15px;
    bottom: 15px;
    border-radius: 24px;
    width: 240px;
    height: calc(100% - #{$s-header-height} - 30px);
    transition: transform .6s cubic-bezier(.61,.28,.24,1.19);

    #chat-content {
      transition: opacity .4s ease;
    }

    &:not(.open) {
      $size: calc(100% - #{$s-chat-open-button});
      transform: translate($size, $size);
      border-radius: 48px;
      transition: transform .6s cubic-bezier(.68,-0.24,.52,1.05);

      #chat-content {
        transition: opacity .5s ease;
        opacity: 0;
        pointer-events: none;
      }

      .fa-inbox {
        opacity: 1;
      }
    }
  }
}
</style>
