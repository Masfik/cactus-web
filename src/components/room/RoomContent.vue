<template>
  <div class="row" id="room-container">
    <Card>
      <div id="video-container">
        <start-streaming />
        <video
          v-show="isStreaming"
          id="room-video"
          ref="videoEl"
          autoplay
          playsinline
          oncontextmenu=""
        />
      </div>
      <controls-panel />
    </Card>
    <content-watching-card v-show="isStreaming" :content-watching="{}" />
  </div>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import {
  computed,
  onBeforeUnmount,
  ref,
  SetupContext
} from "@vue/composition-api";
import StartStreaming from "@/components/room/StartStreaming.vue";
import ContentWatchingCard from "@/components/room/ContentWatchingCard.vue";
import ControlsPanel from "@/components/room/ControlsPanel.vue";

export default {
  name: "RoomContent",
  components: { ControlsPanel, ContentWatchingCard, StartStreaming, Card },
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    const videoEl = ref<HTMLVideoElement>(null);

    // Watching the changes applied to the Stream from the store
    const unwatchStream = $store.watch(
      state => state.streamStore.stream,
      value => (videoEl.value!.srcObject = value)
    );

    onBeforeUnmount(() => {
      $store.dispatch("streamStore/endStream");
      unwatchStream(); // Before mounting, stop watching stream changes
    });

    return {
      videoEl,
      isStreaming: computed(() => $store.getters["streamStore/isStreaming"])
    };
  }
};
</script>

<style lang="scss" scoped>
#room-container {
  padding: 60px;
}

#video-container {
  width: 100%;
  padding-top: 56.25%;
  position: relative;

  > * {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  video {
    border-top-right-radius: $s-card-border-radius;
    border-top-left-radius: $s-card-border-radius;
    height: 100%;
    background-color: var(--c-background-lighter);
  }
}
</style>
