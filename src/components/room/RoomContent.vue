<template>
  <div style="padding: 45px;">
    <div class="card">
      <video id="room-video">
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          type="video/mp4"
        />
      </video>
      <div class="container">
        Content
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomContent"
};
</script>

<style lang="scss" scoped>
#room-video {
  width: 100%;
  border-top-left-radius: $card-border-radius;
  border-top-right-radius: $card-border-radius;
}
</style>
