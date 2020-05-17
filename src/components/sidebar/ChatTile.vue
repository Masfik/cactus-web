<template>
  <div class="chat-tile">
    <div class="avatar">
      <img src="../../assets/user.png" alt="User's avatar" />
      <span class="online-status"></span>
    </div>
    <div class="chat-details">
      <span class="chat-name">{{ name }}</span>
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
      name: String,
      activityName: String
    }
  };
</script>

<style lang="scss" scoped>
  .chat-tile {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .avatar {
    display: inline-flex;
    position: relative;
    margin-right: 10px;

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }

    span.online-status {
      height: 12px;
      width: 12px;
      background-color: #a5a5a5;
      border: white solid 2px;
      border-radius: 50%;
      bottom: 0;
      right: 0;
      position: absolute;
    }
  }

  .chat-details {
    .chat-name {
      font-weight: bold;
      text-overflow: ellipsis;
    }

    .activity {
      font-size: smaller;

      .activity-icon {
        margin-right: 5px;
      }

      .activity-name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 50px;
      }
    }
  }
</style>
