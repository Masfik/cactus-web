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
  props: {
    peerConnection: {
      type: RTCPeerConnection,
      required: true
    }
  },
  setup(props: { peerConnection: RTCPeerConnection }, ctx: SetupContext) {
    const { $store } = ctx.root;

    // The <video> element from the template ↑
    const videoEl = ref<HTMLVideoElement>(null);

    // Watching the changes applied to the Stream from the store
    const unwatchStream = $store.watch(
      state => state.streamStore.stream,
      (stream: MediaStream | null) => {
        // Setting the stream to the <video> element
        videoEl.value!.srcObject = stream;

        if (!stream) return;

        // Adding the stream to the local peer connection
        if ($store.state.streamStore.isStreamer) {
          props.peerConnection.addStream(stream);
          $store.dispatch("streamStore/createOffer").catch(console.error);
        }
      }
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
