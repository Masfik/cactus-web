import { Message } from "@/models/message";
import { User } from "@/models/user";
import { UserGroup } from "@/models/user-group";

export interface Room {
  id: string;

  /**
   * Name of the room (this can also be the name of the recipient in 1 to 1
   * rooms).
   */
  name: string;

  /**
   * Type of the room (Private or Group).
   */
  type: RoomType;

  description: string;

  /**
   * Photo URL of the room (this can also be the photo of the recipient in
   * 1 to 1 rooms).
   */
  photo: String;

  /**
   * What the user is currently watching.
   */
  watching: string;

  /**
   * A list of members (1 to 1 rooms will have a maximum length of 2).
   */
  members: Member[];

  /**
   * Who is currently viewing the content being broadcasted.
   */
  viewers: User[];

  /**
   * Who is currently holding the remote to control the broadcasted content.
   */
  remote?: User;

  messages: Message[];
}

export enum RoomType {
  PRIVATE,
  GROUP
}

export interface Member extends User {
  userGroup?: UserGroup;
}
