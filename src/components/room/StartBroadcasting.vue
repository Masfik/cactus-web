<template>
  <div class="start-broadcasting">
    <img src="@/assets/start_video.svg" alt="Start Watching" />
    <small>
      It's a little too quiet in here...
    </small>
    <button class="btn primary-color">
      Start Broadcasting
    </button>
  </div>
</template>

<script>
export default {
  name: "StartBroadcasting"
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

  img {
    width: 200px;
  }
}
</style>
