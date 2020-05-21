<template>
  <div id="chat-content">
    <div id="messages" class="container">
      <div class="recipient">
        <message-bubble :message="{ data: 'Hello World!' }" />
      </div>
      <div class="sender">
        <message-bubble
          :message="{
            data:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque deleniti dolores excepturi, ' +
              'ipsa modi natus neque officia quaerat, quidem, sed velit vitae voluptate? Dicta doloremque excepturi ' +
              'minus numquam voluptas!'
          }"
        />
        <message-bubble :message="{ data: 'Prolonged message' }" />
      </div>
      <div class="recipient">
        <message-bubble :message="{ data: 'Hello Spongebob' }" />
        <message-bubble :message="{ data: 'Testing' }" />
        <message-bubble :message="{ data: 'How are you?' }" />
        <message-bubble :message="{ data: 'How was work?' }" />
        <message-bubble
          :message="{ data: 'I hope everything is going well for ya.' }"
        />
      </div>
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

<script lang="ts">
import MessageBubble from "@/components/room/chat/MessageBubble.vue";
export default {
  name: "Chat",
  components: { MessageBubble }
};
</script>

<style lang="scss" scoped>
#chat-content {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#messages {
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  @include overflow(y);

  .recipient > *.message-bubble {
    @include bubble-borders(recipient);
    background: $color5;
    color: $text-on-primary;
  }

  .sender > *.message-bubble {
    @include bubble-borders(sender);
    margin-left: auto;
    margin-right: 0;
    background: $primary;
    color: $text-on-primary;
  }
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
