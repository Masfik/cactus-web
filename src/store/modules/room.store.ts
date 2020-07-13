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
      name: "Testing's Room",
      type: RoomType.PRIVATE,
      description: "",
      members: [],
      viewers: [],
      messageBlocks: []
    } as Room,
    rooms: [] as Room[]
  },

  getters: {
    getRoomById: (state: any) => (id: string) => {
      const foundRooms = state.rooms.filter((room: Room) => room.id == id);
      return foundRooms ? foundRooms[0] : null;
    },

    viewerCounter: (state: any) => state.currentRoom.members.length
  },

  mutations: {
    setRooms(state: any, rooms: Room[]) {
      // Adding an empty array of messages to all rooms
      rooms.map(room => (room.messageBlocks = []));
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

    async joinRoom({ getters, commit }: any, id: Room) {
      const room = getters.getRoomById(id);
      if (!room) return;

      //await roomRepository.joinRoom(room);
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
