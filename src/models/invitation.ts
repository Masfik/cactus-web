import { InvitationType } from "@/models/invitation-type";
import { User } from "@/models/user";

export interface Invitation {
  id: string;
  from: User;
  type: InvitationType;
  when: Date;
  dismissed: boolean;
}
