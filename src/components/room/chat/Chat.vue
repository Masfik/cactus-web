<template>
  <div id="chat-content">
    <div id="messages" class="container">
      Messages
    </div>
    <div id="send-message-container">
      <div class="send-message-bar">
        <font-awesome-icon icon="smile" id="select-emoji" />
        <input
          type="text"
          placeholder="Write a message..."
          class="text-field"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat"
};
</script>

<style lang="scss" scoped>
#chat-content {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#messages {
  @include overflow(y);
  flex-grow: 1;
}

#send-message-container {
  background-color: $background-darker;

  .send-message-bar {
    $spacing: 10px;

    padding: $spacing;
    display: flex;
    align-items: center;

    #select-emoji {
      font-size: 18pt;
      margin-right: $spacing;
    }
  }
}
</style>
