import { Room } from "@/models/room";
import { Message } from "@/models/message";
import { RoomRepository } from "@/repositories/room.repository";
import { CactusRoomRepository } from "@/repositories/cactus/cactus-room.repository";
import { User } from "@/models/user";

// Room Repository
const roomRepository: RoomRepository = new CactusRoomRepository();

export const roomStore = {
  namespaced: true,

  state: {
    currentRoom: {} as Room,
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

    addMessage(state: any, message: Message) {
      state.currentRoom.messages.push(message);
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

    async obtainRemote({ commit, rootState }: any) {
      await roomRepository.obtainRemote();
      commit("setRemote", rootState.userStore.user);
    }
  }
};
