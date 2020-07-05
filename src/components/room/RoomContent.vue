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
      <div class="container">
        <editable id="watching-title">
          <h3>The Imitation Game</h3>
        </editable>
        <div id="watching-description">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_.jpg"
            alt="The Imitation Game"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            commodi consequatur consequuntur dolor eos fuga illum in incidunt
            itaque labore minima minus necessitatibus nostrum reiciendis...
            <span> <b>Year:</b> 2014 </span>
            <span> <b>Length:</b> 1 hour </span>
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script lang="ts">
import Card from "@/components/common/Card.vue";
import Editable from "@/components/common/Editable.vue";
import { ref, SetupContext } from "@vue/composition-api";
import StartBroadcasting from "@/components/room/StartBroadcasting.vue";

export default {
  name: "RoomContent",
  components: { StartBroadcasting, Card, Editable },
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

#watching-title {
  width: 100%;
  margin-bottom: $s-container-spacing;

  > *:first-child {
    @extend %text-ellipsis;
    max-width: $s-room-video-min-width - $s-card-container-spacing;
    margin-top: 0;
    margin-bottom: 0;
  }
}

#watching-description {
  display: flex;
  flex-flow: row;

  img {
    max-height: $s-poster-image-height;
    margin-right: 10px;
    border-radius: $s-card-border-radius;
  }

  p {
    margin-top: 0;
    font-size: smaller;

    > :first-child {
      margin-top: 8px;
    }

    span {
      display: block;
      margin-block-start: 4px;

      b {
        color: var(--c-text-on-bg);
      }
    }
  }
}
</style>
