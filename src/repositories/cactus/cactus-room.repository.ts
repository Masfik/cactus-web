import { AxiosRepository } from "@/repositories/cactus/axios.repository";
import { RoomRepository } from "@/repositories/room.repository";
import { Room } from "@/models/room";

export class CactusRoomRepository extends AxiosRepository
  implements RoomRepository {
  /**
   * Used to append the ID of the room when the parameter is provided.
   * An empty string will be returned if the ID is undefined.
   * @param id
   */
  private optionalId = (id?: string) => (id ? `?id=${id}` : "");

  getRoom = (id: string): Promise<Room> =>
    this.axios.get(`/room/${id}`).then(r => r.data as Room);

  obtainRemote = (): Promise<void> => this.axios.put("/room?remote");

  updateWatching = (title: string): Promise<void> =>
    this.axios.put("/room", { title });

  updateName = (name: string, roomId?: string): Promise<void> =>
    this.axios.put(`/room${this.optionalId(roomId)}`, { name });

  updatePicture = (url: string, roomId?: string): Promise<void> =>
    this.axios.put(`/room${this.optionalId(roomId)}`, { picture: url });

  updateDescription = (description: string, roomId?: string): Promise<void> =>
    this.axios.put(`/room${this.optionalId(roomId)}`, { description });

  delete = (roomId?: string): Promise<void> =>
    this.axios.delete(`/room${this.optionalId(roomId)}`);
}
