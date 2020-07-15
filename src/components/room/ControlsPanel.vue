<template>
  <div id="controls">
    <div class="input-controls">
      <button
        class="btn with-icon"
        :class="{ active: isStreaming }"
        @click="toggleStream"
      >
        <font-awesome-icon icon="desktop" />
        {{ isStreaming ? "Stop Streaming" : "Start Streaming" }}
      </button>
      <button class="btn with-icon">
        <font-awesome-icon icon="microphone-slash" />
        Enable Mic
      </button>
      <button class="btn with-icon">
        <font-awesome-icon icon="video-slash" />
        Enable Camera
      </button>
    </div>
    <div class="media-controls">
      <button class="btn with-icon">
        <font-awesome-icon icon="trash" />
        Control
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, SetupContext } from "@vue/composition-api";

export default {
  name: "ControlsPanel",
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    const isStreaming = computed(
      () => $store.getters["streamStore/isStreaming"]
    );

    function toggleStream() {
      if (isStreaming.value) $store.dispatch("streamStore/endStream");
      else $store.dispatch("streamStore/startStream");
    }

    return {
      isStreaming,
      toggleStream
    };
  }
};
</script>

<style lang="scss" scoped>
#controls {
  padding: 5px;
  border-top: 1px solid var(--c-background-darker);
  display: flex;
  flex-flow: row;

  button {
    border-radius: 16px;
  }

  > .input-controls {
    flex-grow: 1;
  }

  > .media-controls {
    text-align: right;
  }

  button.active {
    color: var(--c-primary-darker);
    font-weight: bold;
  }
}

@media (max-width: 750px) {
  #controls {
    > * {
      justify-content: space-evenly;
      flex-grow: 1;
      display: flex;
    }
    button {
      font-size: 0;
      width: auto;
    }
  }
}
</style>
