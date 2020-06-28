import { Room } from "@/models/room";

export interface RoomRepository {
  /**
   * Get the room by an ID.
   * This method should throw and exception when no result is found because
   * the user will likely avoid searching by ID  — only the script should
   * automatically make use of this function and, in most cases, succeed.
   *
   * @param id
   * @return Promise<Room>
   */
  getRoom(id: string): Promise<Room>;

  /**
   * Provides the user with the remote to control the content being watched.
   * This can only be executed when the user is currently connected to a room.
   */
  obtainRemote(): Promise<void>;

  /**
   * Update the title of what the user is currently watching.
   * This can only be executed when the user is currently connected to a room.
   *
   * @param title
   */
  updateWatching(title: string): Promise<void>;

  /**
   * Update the name of the room by optionally providing an ID.
   * If the ID is not specified, the method will attempt to update the room that
   * the user is currently connected to (if they have the permission to do so).
   *
   * @param name
   * @param roomId?
   */
  updateName(name: string, roomId?: number): Promise<void>;

  /**
   * Update the picture of a room by optionally providing an ID.
   * If the ID is not specified, the method will attempt to update the room that
   * the user is currently connected to (if they have the permission to do so).
   *
   * @param url
   * @param roomId?
   */
  updatePicture(url: string, roomId?: number): Promise<void>;

  /**
   * Update the description of a room by optionally providing an ID.
   * If the ID is not specified, the method will attempt to update the room that
   * the user is currently connected to (if they have the permission to do so).
   *
   * @param url
   * @param roomId?
   */
  updateDescription(url: string, roomId?: number): Promise<void>;

  /**
   * Delete a room by optionally providing an ID.
   * If the ID is not specified, the method will attempt to delete the room that
   * the user is currently connected to (if they have the permission to do so).
   *
   * @param roomId?
   */
  delete(roomId?: number): Promise<void>;
}
