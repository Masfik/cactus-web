<template>
  <router-link :to="{ name: 'room', params: { roomId: name } }">
    <div class="room-tile" @contextmenu.prevent="roomContext">
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
  </router-link>
</template>

<script lang="ts">
export default {
  name: "ChatTile",
  props: {
    name: {
      type: String,
      required: true
    },
    activityName: String
  },
  setup() {
    function roomContext() {
      // TODO: show different context menu
    }

    return { roomContext };
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

a {
  color: inherit;
}

.router-link-active > .room-tile {
  background-color: var(--c-room-tile-selected);
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
