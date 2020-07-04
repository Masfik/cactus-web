import { User } from "@/models/user";
import { UserGroup } from "@/models/user-group";
import { MessageBlock } from "@/models/message-block";

export interface Room {
  id: string;

  /**
   * Name of the room.
   * (this can also be the name of the recipient in 1 to 1 rooms).
   */
  name: string;

  /**
   * Type of the room (Private or Group).
   */
  type: RoomType;

  /**
   * The description of the room.
   * This value can be changed by users with appropriate permissions.
   */
  description?: string;

  /**
   * Photo URL of the room.
   * (this can also be the photo of the recipient in 1 to 1 rooms).
   */
  photo?: string;

  /**
   * What the user is currently watching.
   */
  watching?: string;

  /**
   * A list of members
   * (1 to 1 rooms will have a maximum length of 2).
   */
  members: Member[];

  /**
   * Who is currently viewing the content being broadcasted.
   */
  viewers: User[];

  /**
   * Who is currently holding the remote to control the broadcasted content.
   * Undefined when no user holds the remote.
   */
  remote?: User;

  /**
   * An array that holds MessageGroups.
   */
  messageBlocks: MessageBlock[];
}

export enum RoomType {
  PRIVATE,
  GROUP
}

export interface Member extends User {
  userGroup?: UserGroup;
}
