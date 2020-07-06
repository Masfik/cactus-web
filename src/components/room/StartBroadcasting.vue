<template>
  <div class="start-broadcasting">
    <start-video-img />
    <small>
      It's a little too quiet in here...
    </small>
    <button class="btn outline-primary-color" @click="startBroadcasting">
      <font-awesome-icon icon="desktop" /> Start Broadcasting
    </button>
  </div>
</template>

<script lang="ts">
import { SetupContext } from "@vue/composition-api";
import StartVideoImg from "@/assets/start_video.vue";

export default {
  name: "StartBroadcasting",
  components: { StartVideoImg },
  setup(props: any, { root }: SetupContext) {
    function startBroadcasting() {
      const constraints = { video: true, audio: true };

      navigator.mediaDevices
        .getDisplayMedia(constraints)
        .then((stream: MediaStream) => root.$emit("streamingStarted", stream))
        .catch(console.error());
    }

    return { startBroadcasting };
  }
};
</script>

<style lang="scss" scoped>
div.start-broadcasting {
  text-align: center;

  > * {
    display: block;
    margin: auto;
  }

  > *:not(:first-child) {
    margin-top: $s-container-spacing;
  }

  > svg {
    width: 200px;
  }

  > button > svg {
    margin-right: 5px;
  }
}
</style>
