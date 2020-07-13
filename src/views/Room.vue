<template>
  <room-default-layout>
    <template v-slot:content>
      <room-content />
    </template>

    <template v-slot:chat>
      <chat />
    </template>
  </room-default-layout>
</template>

<script lang="ts">
import RoomContent from "@/components/room/RoomContent.vue";
import Chat from "@/components/room/chat/Chat.vue";
import RoomDefaultLayout from "@/layouts/RoomDefaultLayout.vue";
import { computed, SetupContext, watch } from "@vue/composition-api";

export default {
  name: "Room",
  components: {
    RoomContent,
    Chat,
    RoomDefaultLayout
  },
  setup(_: any, ctx: SetupContext) {
    const route = computed(() => ctx.root.$route.params);

    // TODO: find a cleaner way of doing this
    setTimeout(
      () => ctx.root.$store.dispatch("roomStore/joinRoom", route.value.roomId),
      100
    );

    // Change room when the roomId changes from the URL path
    watch(route, route => {
      ctx.root.$store.dispatch("roomStore/joinRoom", route.roomId);
    });
  }
};
</script>
