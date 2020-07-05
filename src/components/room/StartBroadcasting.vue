<template>
  <div class="start-broadcasting">
    <img src="@/assets/start_video.svg" alt="Start Watching" />
    <small>
      It's a little too quiet in here...
    </small>
    <button class="btn primary-color" @click="startBroadcasting">
      <font-awesome-icon icon="desktop" /> Start Broadcasting
    </button>
  </div>
</template>

<script lang="ts">
import { SetupContext } from "@vue/composition-api";

export default {
  name: "StartBroadcasting",
  setup(props: any, { root }: SetupContext) {
    function startBroadcasting() {
      navigator.mediaDevices
        .getDisplayMedia({
          video: true,
          audio: true
        })
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

  > img {
    width: 200px;
  }

  > button > svg {
    margin-right: 5px;
  }
}
</style>
