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

<script>
import RoomDefaultLayout from "../layouts/RoomDefaultLayout";
import Chat from "@/components/room/chat/Chat";
import RoomContent from "@/components/room/RoomContent";

export default {
  name: "Room",
  components: {
    RoomContent,
    Chat,
    RoomDefaultLayout
  }
};
</script>
