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

  getRoom = async (id: string): Promise<Room> =>
    (await this.axiosInstance.get(`/room/${id}`)).data;

  joinRoom = async (id: string): Promise<void> =>
    (await this.axiosInstance.get(`/room/${id}/join`)).data;

  obtainRemote = (): Promise<void> => this.axiosInstance.put("/room?remote");

  updateWatching = (title: string): Promise<void> =>
    this.axiosInstance.put("/room", { title });

  updateName = (name: string, roomId?: string): Promise<void> =>
    this.axiosInstance.put(`/room${this.optionalId(roomId)}`, { name });

  updatePicture = (url: string, roomId?: string): Promise<void> =>
    this.axiosInstance.put(`/room${this.optionalId(roomId)}`, { picture: url });

  updateDescription = (description: string, roomId?: string): Promise<void> =>
    this.axiosInstance.put(`/room${this.optionalId(roomId)}`, { description });

  delete = (roomId?: string): Promise<void> =>
    this.axiosInstance.delete(`/room${this.optionalId(roomId)}`);
}
