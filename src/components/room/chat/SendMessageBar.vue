<template>
  <div id="send-message-container">
    <div class="send-message-bar">
      <font-awesome-icon icon="smile" id="select-emoji" />
      <input
        type="text"
        placeholder="Write a message..."
        class="text-field"
        v-model="text"
        @keyup.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from "@vue/composition-api";
import { Message } from "@/models/message";

export default {
  name: "SendMessageBar",
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    const text = ref("");

    function sendMessage() {
      if (text.value == "") return;

      $store.dispatch("roomStore/addMessage", {
        from: $store.state.userStore.user,
        id: Math.random().toString(),
        data: text.value
      } as Message);

      text.value = "";
    }

    return { text, sendMessage };
  }
};
</script>

<style lang="scss" scoped>
#send-message-container {
  background-color: var(--c-background-darker);

  .send-message-bar {
    $spacing: 10px;

    padding: $spacing;
    display: flex;
    align-items: center;

    #select-emoji {
      font-size: 18pt;
      margin-right: $spacing;
    }

    .text-field {
      background-color: var(--c-send-message-bg);
    }
  }
}
</style>
