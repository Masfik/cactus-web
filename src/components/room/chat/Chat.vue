<template>
  <div id="chat-content">
    <div id="message-list-container">
      <div class="recipient">
        <img src="@/assets/user.png" alt="User avatar" />
        <div class="message-container">
          <div class="chat-who">MimmiMH</div>
          <div class="messages">
            <message-bubble :message="{ data: 'Hello!' }" />
          </div>
        </div>
      </div>
      <div class="sender">
        <div class="message-container">
          <div class="messages">
            <message-bubble :message="{ data: 'Aaaaa' }" />
            <message-bubble :message="{ data: 'Two messages' }" />
          </div>
        </div>
      </div>
      <div class="recipient">
        <img src="@/assets/user.png" alt="User avatar" />
        <div class="message-container">
          <div class="chat-who">Giuseppe</div>
          <div class="messages">
            <message-bubble :message="{ data: 'Hello Spongebob' }" />
            <message-bubble :message="{ data: 'Testing' }" />
            <message-bubble :message="{ data: 'How are you?' }" />
            <message-bubble :message="{ data: 'How was work?' }" />
            <message-bubble
              :message="{ data: 'I hope everything is going well for ya.' }"
            />
          </div>
        </div>
      </div>
      <div class="recipient">
        <img src="@/assets/user.png" alt="User avatar" />
        <div class="message-container">
          <div class="chat-who">Tommaso</div>
          <div class="messages">
            <message-bubble :message="{ data: lorem }" who="recipient" />
          </div>
        </div>
      </div>
    </div>
    <send-message-bar />
  </div>
</template>

<script lang="ts">
import MessageBubble from "@/components/room/chat/MessageBubble.vue";
import SendMessageBar from "@/components/room/chat/SendMessageBar.vue";
export default {
  name: "Chat",
  components: { SendMessageBar, MessageBubble },
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque deleniti dolores excepturi, " +
        "ipsa modi natus neque officia quaerat, quidem, sed velit vitae voluptate? Dicta doloremque excepturi " +
        "minus numquam voluptas!"
    };
  }
};
</script>

<style lang="scss" scoped>
$message-block-spacing: $message-spacing * 4;

#chat-content {
  display: flex;
  flex-flow: column;
  height: 100%;
}

#message-list-container {
  @include overflow(y);
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: $message-list-container-spacing;

  .recipient {
    display: flex;
    margin-top: $message-block-spacing;

    img {
      @include circular-avatar(36px);
      align-self: flex-end;
      margin-right: 6px;
    }

    .chat-who {
      @extend %text-ellipsis;
      max-width: 150px;
      margin-left: 6px;
      font-size: smaller;
      font-weight: bold;
    }

    > div.message-container > div.messages > *.message-bubble {
      @include bubble-borders(recipient);
      background: $color5;
      color: $text-on-primary;
    }
  }

  .sender {
    margin-top: $message-block-spacing;

    > div.message-container > div.messages > *.message-bubble {
      @include bubble-borders(sender);
      margin-left: auto;
      margin-right: 0;
      background: $primary;
      color: $text-on-primary;
    }
  }
}
</style>
