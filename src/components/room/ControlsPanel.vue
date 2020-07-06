<template>
  <div id="controls">
    <div class="input-controls">
      <button class="btn with-icon">
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
export default {
  name: "ControlsPanel"
};
</script>

<style lang="scss" scoped>
#controls {
  padding: 5px;
  border-top: 1px solid var(--c-background-darker);
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;

  > * {
    flex: 1;
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
