<template>
  <div class="room-tile">
    <div class="avatar">
      <img src="../../assets/user.png" alt="User's avatar" />
      <span class="online-status"></span>
    </div>
    <div class="room-details">
      <span class="room-name">{{ name }}</span>
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
$statusBall: 14px;

.room-tile {
  width: 100%;
  padding: $container-spacing;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: lighten($primary, 2);
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
    height: $statusBall;
    width: $statusBall;
    background-color: #a5a5a5;
    border: white solid 2px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    position: absolute;
  }
}

.room-details {
  .room-name {
    font-weight: bold;
    /* TODO: add ellipsis */
  }

  .activity {
    font-size: smaller;

    .activity-icon {
      margin-right: 5px;
    }

    .activity-name {
      /* TODO: add ellipsis */
    }
  }
}
</style>
