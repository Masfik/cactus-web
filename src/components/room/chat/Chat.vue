<template>
  <div id="chat-content">
    <room-name-header />
    <div id="message-list-container">
      <div id="msg-list-scrollable">
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
    </div>
    <send-message-bar />
  </div>
</template>

<script lang="ts">
import MessageBubble from "@/components/room/chat/MessageBubble.vue";
import SendMessageBar from "@/components/room/chat/SendMessageBar.vue";
import RoomNameHeader from "@/components/room/chat/RoomNameHeader.vue";

export default {
  name: "Chat",
  components: { RoomNameHeader, SendMessageBar, MessageBubble },
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
  flex-direction: column-reverse;
  padding: $s-message-list-container-spacing;

  #msg-list-scrollable {
    flex-grow: 1;
    display: flex;
    flex-flow: column;
  }

  .recipient,
  .sender {
    &:first-child {
      margin-top: auto;
    }
  }

  .recipient {
    display: flex;
    margin-top: $s-message-block-spacing;

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
      background: var(--c-bubble-recipient-color);
      color: var(--c-text-on-primary);
    }
  }

  .sender {
    margin-top: $s-message-block-spacing;

    > div.message-container > div.messages > *.message-bubble {
      @include bubble-borders(sender);
      margin-left: auto;
      margin-right: 0;
      background: var(--c-bubble-sender-color);
      color: var(--c-text-on-primary);
    }
  }
}
</style>
