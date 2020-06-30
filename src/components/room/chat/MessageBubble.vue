<template>
  <div class="message-bubble">
    {{ message.data }}
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Message } from "@/models/message";

export default {
  name: "MessageBubble",
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.message-bubble {
  display: table;
  max-width: 70%;
  margin-top: $s-message-spacing;
  padding: 10px;
  font-size: smaller;
  border-radius: $s-bubble-first-last-radius;

  // Text wrapping
  overflow-wrap: break-word;
  word-wrap: break-word;
}
</style>
