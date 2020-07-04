<template>
  <div id="chat-content">
    <room-name-header />
    <div id="message-list-container">
      <div id="msg-list-scrollable">
        <message-bubbles-block
          v-for="block of messageBlocks"
          :key="block.id"
          :block="block"
        />
      </div>
    </div>
    <send-message-bar />
  </div>
</template>

<script lang="ts">
import SendMessageBar from "@/components/room/chat/SendMessageBar.vue";
import RoomNameHeader from "@/components/room/chat/RoomNameHeader.vue";
import MessageBubblesBlock from "@/components/room/chat/MessageBubblesBlock.vue";
import { computed, SetupContext } from "@vue/composition-api";
import { Message } from "@/models/message";
import { User } from "@/models/user";
import { Room } from "@/models/room";
import { UserStatus } from "@/models/user-status";

export default {
  name: "Chat",
  components: { MessageBubblesBlock, RoomNameHeader, SendMessageBar },
  setup(_: any, ctx: SetupContext) {
    const { $store } = ctx.root;

    const messageBlocks = computed(
      () => ($store.state.roomStore.currentRoom as Room).messageBlocks
    );

    const mimmi: User = {
      friends: [],
      id: "45",
      name: "Mimmi",
      surname: " 🧼",
      rooms: [],
      status: UserStatus.ONLINE,
      username: "MimmiMH"
    };

    setInterval(() => {
      $store.dispatch("roomStore/addMessage", {
        id: Math.random().toString(),
        from: mimmi,
        data: `Some reeeeally random message. ${Math.random().toString()}`
      } as Message);
    }, 5000);

    return {
      messageBlocks
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
}
</style>
