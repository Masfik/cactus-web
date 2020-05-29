<template>
  <div class="room-tile">
    <div class="avatar">
      <img src="../../assets/user.png" alt="User's avatar" />
      <span class="online-status"></span>
    </div>
    <div class="room-details">
      <div class="room-name">{{ name }}</div>
      <div class="activity">
        <font-awesome-icon icon="tv" class="activity-icon" />
        <span class="activity-name">{{ activityName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatTile",
  props: {
    name: {
      type: String,
      required: true
    },
    activityName: String
  }
};
</script>

<style lang="scss" scoped>
.room-tile {
  width: 100%;
  padding: 12px $s-container-spacing;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: var(--c-room-tile-hover);
    cursor: pointer;
  }
}

.avatar {
  display: inline-flex;
  position: relative;
  margin-right: 10px;

  img {
    @include circular-avatar();
  }

  span.online-status {
    height: $s-statusBall;
    width: $s-statusBall;
    background-color: #a5a5a5;
    border: white solid 2px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    position: absolute;
  }
}

.room-details {
  min-width: 0;
  overflow: hidden;

  .room-name {
    @extend %text-ellipsis;
    font-weight: bold;
  }

  .activity {
    @extend %text-ellipsis;
    font-size: smaller;

    .activity-icon {
      margin-right: 5px;
    }
  }
}
</style>
