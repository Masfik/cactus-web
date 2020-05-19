<template>
  <room-default-layout>
    <template v-slot:content>
      <div class="card">
        <div class="container">
          <h4>Test</h4>
        </div>
      </div>
    </template>

    <template v-slot:chat>
      <chat />
    </template>
  </room-default-layout>
</template>

<script>
import RoomDefaultLayout from "../layouts/RoomDefaultLayout";
import Chat from "@/components/room/chat/Chat";

export default {
  name: "Room",
  components: {
    Chat,
    RoomDefaultLayout
  }
};
</script>

<style scoped></style>
