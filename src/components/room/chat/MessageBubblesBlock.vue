<template>
  <!-- Sender message block -->
  <div v-if="isAuthUser(block.from)" class="sender">
    <div class="message-container">
      <div class="messages">
        <message-bubble
          v-for="message of block.messages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>
  </div>

  <!-- Recipient message block -->
  <div v-else class="recipient">
    <img src="@/assets/user.png" alt="User avatar" />
    <div class="message-container">
      <div class="chat-who">{{ fullName }}</div>
      <div class="messages">
        <message-bubble
          v-for="message of block.messages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MessageBubble from "./MessageBubble.vue";
import { AuthUser } from "@/models/auth-user";
import { User } from "@/models/user";
import { computed } from "@vue/composition-api";

export default {
  name: "MessageBubblesBlock",
  components: { MessageBubble },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  setup(props: any) {
    function isAuthUser(user: User): user is AuthUser {
      return "email" in user;
    }

    return {
      isAuthUser,
      fullName: computed(
        () => props.block.from.name + " " + props.block.from.surname
      )
    };
  }
};
</script>

<style lang="scss" scoped>
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
    background: var(--c-bubble-recipient);
    color: var(--c-text-on-primary);
  }
}

.sender {
  margin-top: $s-message-block-spacing;

  > div.message-container > div.messages > *.message-bubble {
    @include bubble-borders(sender);
    margin-left: auto;
    margin-right: 0;
    background: var(--c-bubble-sender);
    color: var(--c-text-on-primary);
  }
}
</style>
