import { Room, RoomType } from "@/models/room";
import { Message } from "@/models/message";
import { RoomRepository } from "@/repositories/room.repository";
import { CactusRoomRepository } from "@/repositories/cactus/cactus-room.repository";
import { User } from "@/models/user";
import { MessageBlock } from "@/models/message-block";

// Room Repository
const roomRepository: RoomRepository = new CactusRoomRepository();

export const roomStore = {
  namespaced: true,

  state: {
    currentRoom: {
      id: "",
      name: "",
      type: RoomType.PRIVATE,
      description: "",
      members: [],
      viewers: [],
      messageBlocks: []
    } as Room,
    rooms: [] as Room[]
  },

  getters: {
    viewerCounter: (state: any) => state.currentRoom.members.length
  },

  mutations: {
    setRooms(state: any, rooms: Room[]) {
      state.rooms = rooms;
    },

    addRoom(state: any, room: Room) {
      state.rooms.push(room);
    },

    setCurrentRoom(state: any, room: Room) {
      state.currentRoom = room;
    },

    addMessageBlock(state: any, messageBlock: MessageBlock) {
      state.currentRoom.messageBlocks.push(messageBlock);
    },

    addMessageToMessageBlock(
      state: any,
      payload: { blockIndex: number; message: Message }
    ) {
      state.currentRoom.messageBlocks[payload.blockIndex].messages.push(
        payload.message
      );
    },

    setRemote(state: any, user: User) {
      state.currentRoom.remote = user;
    }
  },

  actions: {
    setRooms({ commit }: any, rooms: Room[]) {
      commit("setRooms", rooms);
    },

    async joinRoom({ commit }: any, room: Room) {
      await roomRepository.joinRoom(room.id);
      commit("setCurrentRoom", room);
    },

    addMessage({ state, commit }: any, message: Message) {
      const msgBlocks = state.currentRoom.messageBlocks as MessageBlock[];
      const blocksLength = msgBlocks.length;

      const lastSender = msgBlocks[blocksLength - 1]?.from;
      const currentSender = message.from;

      if (blocksLength === 0 || lastSender?.id !== currentSender.id)
        commit("addMessageBlock", {
          id: Math.random().toString(),
          from: currentSender,
          messages: [message]
        } as MessageBlock);
      else
        commit("addMessageToMessageBlock", {
          blockIndex: blocksLength - 1,
          message
        });
    },

    async obtainRemote({ commit, rootState }: any) {
      await roomRepository.obtainRemote();
      commit("setRemote", rootState.userStore.user);
    }
  }
};
