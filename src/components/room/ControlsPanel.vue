<template>
  <div id="controls">
    <div class="input-controls">
      <button class="btn with-icon" @click="endStream">
        <font-awesome-icon icon="desktop" />
        Stop Streaming
      </button>
      <button class="btn with-icon active">
        <font-awesome-icon icon="microphone-slash" />
        Unmute Mic
      </button>
    </div>
    <div class="media-controls">
      <button class="btn with-icon">
        <font-awesome-icon icon="trash" />
        Control
      </button>
    </div>
    <div class="viewers">
      <button class="btn with-icon">
        <font-awesome-icon icon="video" />
        Testing
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { SetupContext } from "@vue/composition-api";

export default {
  name: "ControlsPanel",
  setup(_: any, ctx: SetupContext) {
    function endStream() {
      ctx.root.$store.dispatch("streamStore/endStream");
    }

    return { endStream };
  }
};
</script>

<style lang="scss" scoped>
#controls {
  padding: 5px;
  border-top: 1px solid var(--c-background-darker);
  display: flex;
  flex-flow: row;

  > .input-controls {
    flex-grow: 1;
  }

  > :last-child {
    text-align: right;
  }

  > .media-controls {
    text-align: center;
  }

  .active {
    color: var(--c-danger);
  }
}
</style>
