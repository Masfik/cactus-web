import { Room } from "@/models/room";
import { Message } from "@/models/message";
import { RoomRepository } from "@/repositories/room.repository";
import { CactusRoomRepository } from "@/repositories/cactus/cactus-room.repository";

// Room Repository
const roomRepository: RoomRepository = new CactusRoomRepository();

export const roomStore = {
  namespaced: true,

  state: {
    room: {} as Room
  },

  getters: {
    viewerCounter: (state: any) => state.room.members.length
  },

  mutations: {
    async joinRoom(state: any, room: Room) {
      await roomRepository.joinRoom(room.id);
      state.room = room;
    },

    addMessage(state: any, message: Message) {
      state.room.messages.push(message);
    }
  },

  actions: {}
};
