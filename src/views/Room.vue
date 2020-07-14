<template>
  <room-default-layout>
    <template v-slot:content>
      <room-content :peer-connection="localPeerConnection" />
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
    const { $store } = ctx.root;

    const route = computed(() => ctx.root.$route.params);

    function joinRoom(route: { [key: string]: string }) {
      $store.dispatch("roomStore/joinRoom", route.roomId);
    }

    // TODO: find a cleaner way of doing this
    setTimeout(() => joinRoom(route.value), 100);

    // Obtaining the localPeerConnection from the store
    const localPeerConnection = computed(
      () => $store.state.streamStore.localPeerConnection
    );

    // Watching the route parameters
    watch(route, route => {
      // Run joinRoom() whenever the /:roomId changes from the URL path
      joinRoom(route);

      $store.dispatch("streamStore/createPeerConnection");
    });
    return {
      localPeerConnection
    };
  }
};
</script>
