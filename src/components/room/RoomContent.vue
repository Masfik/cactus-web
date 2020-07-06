<template>
  <div class="row" id="room-container">
    <Card>
      <div id="video-container">
        <start-broadcasting />
        <video
          v-show="isStreaming"
          autoplay
          playsinline
          id="room-video"
          ref="videoEl"
        />
      </div>
    </Card>
    <ContentWatchingCard v-if="isStreaming" :content-watching="{}" />
  </div>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import { ref, SetupContext } from "@vue/composition-api";
import StartBroadcasting from "@/components/room/StartBroadcasting.vue";
import ContentWatchingCard from "@/components/room/ContentWatchingCard.vue";

export default {
  name: "RoomContent",
  components: { ContentWatchingCard, StartBroadcasting, Card },
  setup(_: any, ctx: SetupContext) {
    const videoEl = ref<HTMLVideoElement>(null);
    const isStreaming = ref(false);

    ctx.root.$on("streamingStarted", (stream: MediaStream) => {
      stream.oninactive = () => (isStreaming.value = false);
      videoEl.value!.srcObject = stream;
      isStreaming.value = true;
    });

    return {
      videoEl,
      isStreaming
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
    border-radius: $s-card-border-radius;
    height: 100%;
    background-color: var(--c-background-lighter);
  }
}
</style>
